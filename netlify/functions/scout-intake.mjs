/**
 * POST /api/intake
 *
 * Receives the Trip Scout intake form, validates, stores the intake record,
 * and sends a confirmation email with a magic-link token.
 *
 * Returns immediately (no waiting for email send) so the "check your email"
 * UI appears fast.
 *
 * Request body (JSON):
 *   {
 *     first_name, email,
 *     destination: { country, island, area },
 *     timing: { mode, month, days, start_date, end_date, flex_months },
 *     species: [...],
 *     consent: bool,
 *     newsletter_opt_in: bool (optional)
 *   }
 *
 * Response:
 *   200 { ok: true, intake_id } on success
 *   400 { error, details } on validation failure
 *   500 { error } on server failure
 */

import { saveIntake } from "../../scout-lib/storage.mjs";
import { generateId, buildConfirmationToken } from "../../scout-lib/crypto.mjs";
import { sendEmail } from "../../scout-lib/email.mjs";
import { confirmationEmail } from "../../scout-lib/email-templates.mjs";

// ---- Canonical species list (marquee 9 + supporting 11 = 20 total) ----
// TODO: lock this list with Brad before Week 1. Currently includes the 9 marquee
// species per the May 25 conversation. Expand to full 20 once decided.
const VALID_SPECIES = (() => {
  const set = new Set();
  for (const dest of Object.values(SPECIES_BY_DESTINATION)) {
    for (const sp of dest.January || []) {
      set.add(sp.toLowerCase());
    }
  }
  return set;
})();

// ---- Canonical destination structure ----
// Sourced from the live Saltwater Fly Library: all 42 destinations covered.
// VALID_DESTINATIONS is regenerated whenever species-by-destination.mjs changes.
import { VALID_DESTINATIONS, SPECIES_BY_DESTINATION } from "../../scout-lib/species-by-destination.mjs";

// Timing modes
const VALID_TIMING_MODES = new Set(["exact", "month", "flexible"]);
const VALID_MONTHS = new Set([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

export default async (req) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  // ---- Validation ----------
  const errors = [];

  const first_name = strOrNull(body.first_name, 40);
  const email = strOrNull(body.email, 200);
  const destination = body.destination;
  const timing = body.timing;
  const species = Array.isArray(body.species) ? body.species : null;
  const consent = body.consent === true || body.consent === "true";
  const newsletter_opt_in =
    body.newsletter_opt_in === true || body.newsletter_opt_in === "true";

  if (!first_name) errors.push("first_name is required");
  if (!email || !looksLikeEmail(email)) errors.push("email is invalid");
  if (!consent) errors.push("consent is required");

  // ---- Destination validation ----
  // Destination is now a flat string (one of the 42 library regions).
  if (!destination || typeof destination !== "string") {
    errors.push("destination is required");
  } else if (!VALID_DESTINATIONS.has(destination)) {
    errors.push(`destination '${destination}' is not a recognized library region`);
  }

  // ---- Timing validation ----
  if (!timing || typeof timing !== "object") {
    errors.push("timing is required");
  } else {
    if (!VALID_TIMING_MODES.has(timing.mode)) {
      errors.push("timing.mode is invalid");
    }
    if (timing.mode === "month" && !VALID_MONTHS.has(timing.month)) {
      errors.push("timing.month is invalid");
    }
    if (timing.mode === "exact" && (!timing.start_date || !timing.end_date)) {
      errors.push("timing.start_date and end_date required when mode is exact");
    }
    if (!Number.isFinite(timing.days) || timing.days < 1 || timing.days > 21) {
      errors.push("timing.days must be 1-21");
    }
  }

  // ---- Species validation ----
  if (!species || species.length === 0) {
    errors.push("species: must select at least 1");
  } else if (species.length > 6) {
    errors.push("species: max 6 allowed");
  } else {
    const invalidSpecies = species.filter((s) => !VALID_SPECIES.has(s.toLowerCase()));
    if (invalidSpecies.length > 0) {
      errors.push(`species: invalid entries: ${invalidSpecies.join(", ")}`);
    }
  }

  if (errors.length > 0) {
    return json({ error: "Validation failed", details: errors }, 400);
  }

  // ---- Persistence ----------
  const intakeId = generateId(8); // 16 hex chars
  const intake = {
    first_name,
    email,
    destination,
    timing,
    species: species.map((s) => s.toLowerCase()),
    consent,
    newsletter_opt_in,
    user_agent: req.headers.get("user-agent") || null,
    referer: req.headers.get("referer") || null,
  };

  try {
    await saveIntake(intakeId, intake);
  } catch (err) {
    console.error("[intake] saveIntake failed:", err);
    return json({ error: "Failed to save intake" }, 500);
  }

  // ---- Confirmation email ----------
  const token = buildConfirmationToken(intakeId);
  const baseUrl = process.env.PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;
  const confirmationUrl = `${baseUrl}/api/confirm?token=${encodeURIComponent(token)}`;

  const destStr = destination;

  try {
    const { subject, html } = confirmationEmail({
      firstName: first_name,
      confirmationUrl,
      destination: destStr,
    });
    await sendEmail({ to: email, subject, html });
  } catch (err) {
    console.error("[intake] confirmation email failed:", err);
    // Still return success — user sees "check your email" UI
    return json(
      {
        ok: true,
        intake_id: intakeId,
        warning:
          "Email send queued but failed; please contact support if not received in a few minutes.",
      },
      200
    );
  }

  return json({ ok: true, intake_id: intakeId }, 200);
};

/* ============================================================ */
/*  Helpers                                                       */
/* ============================================================ */

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function strOrNull(v, maxLen) {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  if (trimmed.length > maxLen) return null;
  return trimmed;
}

function looksLikeEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
