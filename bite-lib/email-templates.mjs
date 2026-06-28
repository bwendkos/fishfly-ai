/**
 * Email templates for Bite Window transactional emails.
 *
 * Two emails per submission:
 *   1. confirmationEmail — sent immediately after submit, contains magic link
 *   2. reportReadyEmail  — sent after confirm + generation, contains report URL
 *
 * Both return { subject, html } objects passed to sendEmail() in scout-lib/email.mjs.
 *
 * Visual register mirrors Trip Scout's email templates (Playfair Display headlines,
 * sand accent on the CTA bar, cream backgrounds) but the copy is bite-window-specific.
 */

const FROM_NAME = process.env.EMAIL_FROM_NAME || "FishFly";

/* ============================================================ */
/*  Confirmation email — sent after intake submission             */
/* ============================================================ */

export function confirmationEmail({ firstName, confirmationUrl, location, dateLabel }) {
  const locationLabel = location ? escapeHtml(location) : "your spot";
  const dateBlurb = dateLabel ? ` for <strong>${escapeHtml(dateLabel)}</strong>` : "";
  const subject = `${firstName}, confirm your Eat Window for ${location || "your spot"}`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Confirm your Eat Window report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; color: #1a1f2e; margin: 0; padding: 24px; background: #f7f3ec; }
    .container { max-width: 560px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px; }
    h1 { font-family: "Playfair Display", Georgia, serif; font-style: italic; font-size: 26px; margin: 0 0 16px; color: #1a1f2e; }
    p { font-size: 16px; margin: 0 0 16px; }
    .button { display: inline-block; background: #1e3a5f; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: 600; margin: 16px 0; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #d8d2c4; font-size: 14px; color: #4a5568; }
    .url { word-break: break-all; font-size: 13px; color: #8b8478; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hey ${escapeHtml(firstName)} &mdash;</h1>
    <p>Almost there. Click below to confirm your Eat Window report for <strong>${locationLabel}</strong>${dateBlurb} and we&rsquo;ll synthesize sun, tide, solunar, wind, and weather into a single timeline.</p>
    <p><a class="button" href="${confirmationUrl}">Show me the Eat Window</a></p>
    <p>Generation is instant. You&rsquo;ll land on your report a few seconds after clicking the button above.</p>
    <div class="footer">
      <p>If the button doesn&rsquo;t work, paste this into your browser:<br>
        <span class="url">${confirmationUrl}</span></p>
      <p>This link expires in 24 hours. If you didn&rsquo;t request this, you can ignore this email.</p>
      <p>&mdash; ${FROM_NAME}<br>fishfly.ai</p>
    </div>
  </div>
</body>
</html>`;
  return { subject, html };
}

/* ============================================================ */
/*  Report-ready email — sent after report is generated           */
/* ============================================================ */

export function reportReadyEmail({ firstName, reportUrl, location, dateLabel }) {
  const locationLabel = location ? escapeHtml(location) : "your spot";
  const dateBlurb = dateLabel ? escapeHtml(dateLabel) : "";
  const subject = `${firstName}, your Eat Window for ${location || "your spot"} is ready`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your Eat Window report is ready</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; color: #1a1f2e; margin: 0; padding: 24px; background: #f7f3ec; }
    .container { max-width: 560px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px; }
    h1 { font-family: "Playfair Display", Georgia, serif; font-style: italic; font-size: 26px; margin: 0 0 16px; color: #1a1f2e; }
    p { font-size: 16px; margin: 0 0 16px; }
    .button { display: inline-block; background: #1e3a5f; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: 600; margin: 16px 0; }
    .summary { background: #efe9df; padding: 16px; border-left: 4px solid #c89668; margin: 16px 0; font-size: 15px; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #d8d2c4; font-size: 14px; color: #4a5568; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Eat Window is ready, ${escapeHtml(firstName)}.</h1>
    <p>Synthesizing five signals into a single timeline so you know which hours of which days to be on the water.</p>

    <div class="summary">
      <strong>${locationLabel}</strong>${dateBlurb ? "<br>" + dateBlurb : ""}
    </div>

    <p><a class="button" href="${reportUrl}">View my Eat Window</a></p>

    <p>Bookmark or share the link &mdash; reports stay live for 30 days.</p>

    <p>Planning a longer trip with species recommendations, flies, gear, and local intel? Try our full <a href="https://fishfly.ai/scout/" style="color: #1e3a5f; font-weight: 600;">Trip Scout</a> brief.</p>

    <div class="footer">
      <p>Tight lines.<br>&mdash; ${FROM_NAME}</p>
    </div>
  </div>
</body>
</html>`;
  return { subject, html };
}

/* ============================================================ */
/*  Helpers                                                       */
/* ============================================================ */

function escapeHtml(s) {
  if (typeof s !== "string") return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
