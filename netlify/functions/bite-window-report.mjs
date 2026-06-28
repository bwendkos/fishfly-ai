/**
 * GET /bite-window/r/<id>
 *
 * Serves a stored Bite Window report HTML by its ID. Mirrors scout-report.mjs
 * but reads from the bite-report Blobs store.
 *
 * Reports are public-by-design — the only protection is the unguessable
 * random ID. Anglers want to share Tuesday's bite window with fishing buddies.
 */

import { getReport } from "../../bite-lib/storage.mjs";

export default async (req) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const match = url.pathname.match(/^\/bite-window\/r\/([a-z0-9]+)\/?$/i);
  if (!match) {
    return notFound();
  }
  const reportId = match[1];

  let html;
  try {
    html = await getReport(reportId);
  } catch (err) {
    console.error("[bite-report] getReport failed:", err);
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
<head><meta charset="UTF-8"><title>Eat Window report not found</title></head>
<body style="font-family: system-ui, sans-serif; max-width: 560px; margin: 80px auto; padding: 0 22px; color: #1a1f2e; line-height: 1.6;">
  <h1 style="font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 32px; margin-bottom: 14px;">Eat Window report not found</h1>
  <p>The report ID in your link doesn&rsquo;t match anything in our system. It may have been mistyped or the report may have expired. <a href="https://fishfly.ai/bite-window" style="color: #1e3a5f; font-weight: 600;">Generate a new Eat Window report</a>.</p>
</body>
</html>`,
    {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}
