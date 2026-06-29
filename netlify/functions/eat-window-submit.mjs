/**
 * POST /eat-window/api/submit
 *
 * Validates the Bite Window intake, stores it in Blobs, signs a confirmation
 * token, and sends a confirmation email with the magic link.
 *
 * Mirrors scout-intake.mjs but for the Bite Window product line. Returns 200
 * with a generic success response on accept; status messages give the user
 * just enough to act on without revealing whether the email is in the system.
 *
 * Required env vars:
 *   - NETLIFY_SIGNING_SECRET  (HMAC for confirmation tokens)
 *   - PUBLIC_BASE_URL         (defaults to https://fishfly.ai/eat-window)
 *   - SMTP_*                  (sendEmail via scout-lib/email.mjs)
 */

import { saveIntake } from "../../bite-lib/storage.mjs";
import { generateId, buildConfirmationToken } from "../../scout-lib/crypto.mjs";
import { sendEmail } from "../../scout-lib/email.mjs";
import { confirmationEmail } from "../../bite-lib/email-templates.mjs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_TRIP_DAYS = 7;

export default async (req) => {
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad_json" }, 400);
  }

  // -------- Validate --------
  const errors = [];
  const first_name = strOrNull(body.first_name, 40);
  const email = strOrNull(body.email, 200);
  const location = strOrNull(body.location, 200);
  const start_date = strOrNull(body.start_date, 10);
  const end_date = strOrNull(body.end_date, 10);
  const location_lat = Number.isFinite(body.location_lat) ? body.location_lat
                      : (typeof body.location_lat === "string" && body.location_lat) ? parseFloat(body.location_lat)
                      : null;
  const location_lon = Number.isFinite(body.location_lon) ? body.location_lon
                      : (typeof body.location_lon === "string" && body.location_lon) ? parseFloat(body.location_lon)
                      : null;
  const location_country = strOrNull(body.location_country, 8);
  const consent = body.consent === true || body.consent === "true";
  const newsletter_opt_in = body.newsletter_opt_in === true || body.newsletter_opt_in === "true";

  if (!first_name) errors.push("first_name required");
  if (!email || !EMAIL_RE.test(email)) errors.push("valid email required");
  if (!location) errors.push("location required");
  if (!start_date || !DATE_RE.test(start_date)) errors.push("start_date required (YYYY-MM-DD)");
  if (end_date && !DATE_RE.test(end_date)) errors.push("end_date invalid format");
  if (!consent) errors.push("consent required");

  // Date range sanity
  let days = 1;
  let effective_end = start_date;
  if (start_date && DATE_RE.test(start_date)) {
    if (end_date && DATE_RE.test(end_date)) {
      const s = new Date(start_date + "T00:00:00Z").getTime();
      const e = new Date(end_date + "T00:00:00Z").getTime();
      if (e < s) errors.push("end_date is before start_date");
      const d = Math.floor((e - s) / 86400000) + 1;
      if (d > MAX_TRIP_DAYS) errors.push(`trip too long — max ${MAX_TRIP_DAYS} days`);
      days = d;
      effective_end = end_date;
    }
  }

  // lat/lon range sanity (if provided)
  if (location_lat !== null && (location_lat < -90 || location_lat > 90)) errors.push("location_lat out of range");
  if (location_lon !== null && (location_lon < -180 || location_lon > 180)) errors.push("location_lon out of range");

  if (errors.length) {
    return json({ error: "validation_failed", details: errors }, 400);
  }

  // -------- Build intake --------
  const intakeId = generateId(8);
  const intake = {
    first_name,
    email,
    location,
    location_lat,
    location_lon,
    location_country,
    location_tz: tzFromLongitude(location_lon),
    timing: {
      mode: "exact",
      start_date,
      end_date: effective_end,
      days,
    },
    consent,
    newsletter_opt_in,
    user_agent: req.headers.get("user-agent") || null,
  };

  try {
    await saveIntake(intakeId, intake);
  } catch (err) {
    console.error("[bite-submit] saveIntake failed:", err);
    return json({ error: "storage_error" }, 500);
  }

  // -------- Sign token + send confirmation email --------
  let confirmationUrl;
  try {
    const token = buildConfirmationToken(intakeId);
    const baseUrl = process.env.PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;
    // Strip trailing /scout if PUBLIC_BASE_URL is the Trip Scout base
    const root = baseUrl.replace(/\/scout\/?$/, "");
    confirmationUrl = `${root}/eat-window/api/confirm?token=${encodeURIComponent(token)}`;
  } catch (err) {
    console.error("[bite-submit] token sign failed:", err);
    return json({ error: "token_error" }, 500);
  }

  try {
    const dateLabel = days > 1 ? `${start_date} → ${effective_end}` : start_date;
    const { subject, html } = confirmationEmail({
      firstName: first_name,
      confirmationUrl,
      location,
      dateLabel,
    });
    await sendEmail({ to: email, subject, html });
    console.log(`[bite-submit] sent confirmation @ ${intakeId} -> ${email}`);
  } catch (err) {
    console.error("[bite-submit] email send failed:", err);
    // Don't fail the submit — the intake is stored. Return success but note.
    return json({
      ok: true,
      intake_id: intakeId,
      warning: "Intake stored, but confirmation email failed to send. Contact support if you don't receive it.",
    }, 200);
  }

  return json({ ok: true, intake_id: intakeId }, 200);
};

/* ============================================================ */
/*  Helpers                                                       */
/* ============================================================ */

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function strOrNull(v, maxLen) {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  if (trimmed.length > maxLen) return null;
  return trimmed;
}

/**
 * Rough IANA timezone for a longitude. Returns "Etc/GMT±N" — fixed-offset,
 * no DST adjustment. Accurate within ±1 hour during DST months.
 *
 * V2 idea: replace with proper polygon lookup (tz-lookup npm package) or
 * a Mapbox tilequery for precise local timezone.
 */
function tzFromLongitude(lon) {
  if (!Number.isFinite(lon)) return "UTC";
  const offsetHours = Math.round(lon / 15);
  if (offsetHours === 0) return "UTC";
  // Etc/GMT signs are INVERTED from longitude (lon +60 -> Etc/GMT-4)
  const sign = offsetHours > 0 ? "-" : "+";
  return `Etc/GMT${sign}${Math.abs(offsetHours)}`;
}
