/**
 * POST /scout/admin/send-reminder-email
 *
 * Admin-only endpoint that sends a plain email via Gmail SMTP. Designed for
 * agent-side scheduled invocations that need to push a reminder to a real
 * inbox — the FishFly agent sandbox blocks outbound SMTP (firewall policy is
 * HTTP/HTTPS only), so scheduled runs cannot send email directly. This
 * endpoint runs on Netlify's infrastructure, which CAN reach smtp.gmail.com,
 * providing a bridge.
 *
 * Auth:
 *   - Header:  X-Admin-Key: <ADMIN_KEY>
 *   (same value that gates /scout/admin/intakes*)
 *
 * Method:
 *   - POST only. Any other method returns 405.
 *
 * Body (JSON):
 *   {
 *     "to": "recipient@example.com",
 *     "subject": "Subject line",
 *     "body": "Plain text body OR simple HTML"
 *   }
 *
 * Notes on body:
 *   - If body contains "<html>", "<body>", or "<p>", it's treated as HTML.
 *   - Otherwise, treated as plain text and auto-wrapped in a minimal
 *     <pre>-styled HTML shell so it renders correctly in email clients.
 *
 * Response:
 *   200 { ok: true, messageId: "<...>" }         — email delivered to relay
 *   400 { error: "missing required field: <name>" }
 *   400 { error: "invalid 'to' address" }
 *   400 { error: "invalid JSON body" }
 *   401 { error: "Bad or missing admin key" }
 *   405 { error: "method not allowed" }
 *   500 { error: "ADMIN_KEY not configured on site" }
 *   500 { error: "SMTP send failed", detail: "..." }
 *
 * Uses the same sendEmail helper as report-ready emails (scout-lib/email.mjs)
 * so any SMTP config change propagates automatically.
 */

import { sendEmail } from "../../scout-lib/email.mjs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async (req) => {
  // ---- Method check ----
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "method not allowed — POST only" });
  }

  // ---- Auth ----
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    return jsonResponse(500, { error: "ADMIN_KEY not configured on site" });
  }
  const providedKey = req.headers.get("x-admin-key") || "";
  if (providedKey !== adminKey) {
    return jsonResponse(401, { error: "Bad or missing admin key" });
  }

  // ---- Parse body ----
  let payload;
  try {
    payload = await req.json();
  } catch (_e) {
    return jsonResponse(400, { error: "invalid JSON body" });
  }
  if (!payload || typeof payload !== "object") {
    return jsonResponse(400, { error: "body must be a JSON object" });
  }

  const to = typeof payload.to === "string" ? payload.to.trim() : "";
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const bodyRaw = typeof payload.body === "string" ? payload.body : "";

  if (!to) return jsonResponse(400, { error: "missing required field: to" });
  if (!subject) return jsonResponse(400, { error: "missing required field: subject" });
  if (!bodyRaw) return jsonResponse(400, { error: "missing required field: body" });

  if (!EMAIL_RE.test(to)) {
    return jsonResponse(400, { error: "invalid 'to' address" });
  }

  // Length safety cap — 100 KB body is more than enough for a reminder.
  if (bodyRaw.length > 100_000) {
    return jsonResponse(400, { error: "body exceeds 100 KB limit" });
  }
  if (subject.length > 500) {
    return jsonResponse(400, { error: "subject exceeds 500-char limit" });
  }

  // ---- Detect HTML vs plain text ----
  const looksHtml = /<(html|body|p|div|br|a\s|span\s|h[1-6])/i.test(bodyRaw);
  const html = looksHtml
    ? bodyRaw
    : `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1f2e; max-width: 640px; margin: 0 auto; padding: 24px; line-height: 1.55;"><pre style="white-space: pre-wrap; font-family: inherit; font-size: 15px; margin: 0;">${escapeHtml(bodyRaw)}</pre></div>`;

  // ---- Send ----
  try {
    const info = await sendEmail({ to, subject, html });
    return jsonResponse(200, {
      ok: true,
      messageId: info.messageId,
      accepted: info.accepted,
      to,
      subject,
    });
  } catch (err) {
    console.error("[send-reminder-email] SMTP send failed:", err?.message || err);
    return jsonResponse(500, {
      error: "SMTP send failed",
      detail: String(err?.message || err).slice(0, 500),
    });
  }
};

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
