/**
 * GET /api/confirm?token=<signed_token>
 *
 * Magic-link target. Validates the token, marks the intake as confirmed,
 * and kicks off the background generation function. Then redirects the
 * user to /confirmed.html with their intake_id so the front-end can show
 * a "we're generating your report" state.
 *
 * The actual Claude call happens in generate-background.js — invoked
 * asynchronously from here. This handler returns quickly (well within
 * the 10s synchronous timeout).
 *
 * Idempotency: if the same token is clicked twice (common from email
 * preview bots), we only kick off generation once.
 */

import { verifyConfirmationToken } from "../../scout-lib/crypto.mjs";
import { getIntake, markIntakeConfirmed } from "../../scout-lib/storage.mjs";
import { addNewsletterSubscriber } from "../../scout-lib/ghost.mjs";

export default async (req) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  // ---- Token verification ----------
  const result = verifyConfirmationToken(token);
  if (!result.valid) {
    console.warn("[confirm] token rejected:", result.reason);
    return redirectTo(req, "/confirm-failed.html?reason=" + encodeURIComponent(result.reason));
  }

  const { intakeId } = result;

  // ---- Lookup intake ----------
  let intake;
  try {
    intake = await getIntake(intakeId);
  } catch (err) {
    console.error("[confirm] getIntake failed:", err);
    return redirectTo(req, "/confirm-failed.html?reason=storage_error");
  }

  if (!intake) {
    return redirectTo(req, "/confirm-failed.html?reason=intake_not_found");
  }

  // ---- Idempotency check ----------
  const alreadyConfirmed = Boolean(intake.confirmed_at);
  const alreadyGenerated = Boolean(intake.report_id);

  if (alreadyGenerated) {
    // Already done — redirect straight to the report
    return redirectTo(req, `/r/${intake.report_id}`);
  }

  if (!alreadyConfirmed) {
    // Mark confirmed
    try {
      await markIntakeConfirmed(intakeId);
    } catch (err) {
      console.error("[confirm] markIntakeConfirmed failed:", err);
      return redirectTo(req, "/confirm-failed.html?reason=update_error");
    }

    // ---- Ghost newsletter opt-in ----
    // Moved from scout-generate-background (post-generation) to here so users
    // are captured for marketing on confirm, not only on successful report
    // completion. Non-fatal — subscription failure doesn't block generation.
    if (intake.newsletter_opt_in) {
      const destStr = typeof intake.destination === "string"
        ? intake.destination
        : (intake.destination?.country || "unknown");
      addNewsletterSubscriber({
        email: intake.email,
        firstName: intake.first_name,
        labels: [
          "source:trip-scout",
          `destination:${destStr.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
          ...(intake.species || []).map((s) => `species:${s.replace(/\s+/g, "-")}`),
        ],
      })
        .then(() => console.log(`[confirm] ghost subscribe done for ${intake.email}`))
        .catch((err) => console.error("[confirm] ghost subscribe failed:", err));
      // Fire-and-forget: don't await. Subscribe call can take 1-3s; the
      // magic-link click flow should return the redirect fast.
    }

    // Kick off background generation by invoking the background function.
    // Netlify background functions are invoked via HTTP POST to their URL;
    // they return 202 immediately and run async up to 15 minutes.
    try {
      await triggerGeneration(req, intakeId);
    } catch (err) {
      // Don't fail the user-facing flow if the trigger fails — the
      // generation can be retried by an admin. Log loudly.
      console.error("[confirm] background trigger failed:", err);
    }
  }

  // ---- Redirect to "generating" UI ----------
  return redirectTo(req, `/generating.html?intake=${intakeId}`);
};

/* ============================================================ */
/*  Helpers                                                       */
/* ============================================================ */

function redirectTo(req, path) {
  const baseUrl = process.env.PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;
  return new Response("", {
    status: 302,
    headers: { Location: `${baseUrl}${path}` },
  });
}

async function triggerGeneration(req, intakeId) {
  // Internal function-to-function calls must hit the SITE root, NOT PUBLIC_BASE_URL
  // (which is https://fishfly.ai/scout — Netlify functions live at /.netlify/functions
  // at the site root, never under /scout). Use the request host directly.
  const internalBase = `https://${req.headers.get("host")}`;
  const generateUrl = `${internalBase}/.netlify/functions/scout-generate-background`;
  const res = await fetch(generateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Trigger": process.env.INTERNAL_TRIGGER_SECRET || "",
    },
    body: JSON.stringify({ intake_id: intakeId }),
  });
  if (res.status !== 202 && !res.ok) {
    throw new Error(`Background trigger returned ${res.status}`);
  }
}
