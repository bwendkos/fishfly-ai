/**
 * GET /r/:id
 *
 * Serves a stored Trip Scout report HTML by its ID. Reports are permanent
 * and public-by-design (the only protection is the unguessable random ID).
 *
 * Caching: 5-minute browser cache. Cache can be busted by adding a query
 * param if the report content is updated server-side.
 */

import { getReport } from "../../scout-lib/storage.mjs";

export default async (req) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(req.url);
  // Path patterns: /r/abc123 or /r/abc123/anything
  const match = url.pathname.match(/^\/scout\/r\/([a-z0-9]+)\/?$/i);
  if (!match) {
    return notFound();
  }
  const reportId = match[1];

  let html;
  try {
    html = await getReport(reportId);
  } catch (err) {
    console.error("[report] getReport failed:", err);
    return new Response("Server error", { status: 500 });
  }

  if (!html) {
    return notFound();
  }

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
      "X-Report-Id": reportId,
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
};

function notFound() {
  return new Response(
    `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Report not found</title></head>
<body style="font-family: system-ui, sans-serif; max-width: 560px; margin: 80px auto; padding: 0 22px; color: #1a1f2e; line-height: 1.6;">
  <h1 style="font-family: Georgia, serif; font-size: 32px; margin-bottom: 14px;">Report not found</h1>
  <p>The report ID in your link doesn't match anything in our system. It may have been mistyped, or the link may be from a very old email. <a href="https://fishfly.ai/scout" style="color: #1e3a5f;">Generate a new Trip Scout report</a>.</p>
</body>
</html>`,
    {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}
