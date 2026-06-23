/**
 * GET /scout/api/status?intake=<intake_id>
 *
 * Lightweight JSON polling endpoint for the /scout/generating.html page.
 * Returns the current state of an intake so the front-end can:
 *   - Show progress indicators
 *   - Auto-redirect to /scout/r/<report_id> when the report is ready
 *   - Surface a "still working" / "something went wrong" message
 *     when the report has been pending too long or has crashed.
 *
 * Status values:
 *   "pending"     — intake exists but user hasn't clicked the magic link yet
 *                   (this should be rare — they get here BY clicking)
 *   "generating"  — confirmed, no report yet, no error
 *   "ready"       — report_id is set; redirect the user to /scout/r/<report_id>
 *   "failed"      — error_log is set (from scout-generate-background crash)
 *
 * The response is intentionally minimal — no PII (email, name, destination
 * details) leaks. The caller already has the intake_id from the URL the
 * server-side redirect built, so we trust that signal.
 */
import { getIntake } from "../../scout-lib/storage.mjs";

const JSON_HEADERS = {
  "Content-Type": "application/json",
  // Browsers cache same-URL GETs aggressively; this endpoint is polled
  // every ~15s and stale data here is actively harmful (user would never
  // see the redirect to a ready report).
  "Cache-Control": "no-store, max-age=0",
};

export default async (req) => {
  if (req.method !== "GET") {
    return jsonResponse({ error: "method_not_allowed" }, 405);
  }

  const url = new URL(req.url);
  const intakeId = url.searchParams.get("intake");

  if (!intakeId || typeof intakeId !== "string" || intakeId.length > 64) {
    return jsonResponse({ error: "missing_intake" }, 400);
  }

  let intake;
  try {
    intake = await getIntake(intakeId);
  } catch (err) {
    console.error("[scout-status] getIntake failed:", err);
    return jsonResponse({ error: "storage_error" }, 500);
  }

  if (!intake) {
    return jsonResponse({ error: "intake_not_found" }, 404);
  }

  // ---- Compute status ----------
  let status;
  const payload = {};

  if (intake.report_id) {
    status = "ready";
    payload.report_id = intake.report_id;
  } else if (intake.error_log) {
    status = "failed";
    // Surface a short, user-safe error message — never the stack.
    payload.error_message = String(intake.error_log.message || "").slice(0, 200) || "Report generation failed.";
  } else if (intake.confirmed_at) {
    status = "generating";
    payload.confirmed_at = intake.confirmed_at;
  } else {
    status = "pending";
  }

  payload.status = status;
  return jsonResponse(payload, 200);
};

function jsonResponse(obj, status) {
  return new Response(JSON.stringify(obj), { status, headers: JSON_HEADERS });
}
