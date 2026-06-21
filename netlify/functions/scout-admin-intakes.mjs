/**
 * GET /scout/admin/intakes[.json|.csv]
 *
 * Admin-only inventory of all Trip Scout intakes captured to date.
 * Backed by Netlify Blobs ("intake" store + "report-meta" for report URLs).
 *
 * Auth — provide one of:
 *   - Header: X-Admin-Key: <ADMIN_KEY>  (for scripts / curl)
 *   - Query:  ?admin_key=<ADMIN_KEY>     (for browser viewing — bookmark it)
 *
 * Output format:
 *   - /scout/admin/intakes        -> HTML table (browser-friendly)
 *   - /scout/admin/intakes.json   -> JSON
 *   - /scout/admin/intakes.csv    -> CSV download (spreadsheet-ready)
 *
 * Query filters (all optional):
 *   - ?email=<email>     -> only intakes from this email
 *   - ?since=<iso-date>  -> only intakes created at or after this date
 *   - ?limit=N           -> max N intakes returned (default 200, hard cap 1000)
 *
 * Sorted by created_at descending (newest first).
 */

import { getStore } from "@netlify/blobs";

const HARD_CAP = 1000;

export default async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;

  // ---- Auth ----
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    return jsonResponse(500, { error: "ADMIN_KEY not configured on site" });
  }
  const providedKey =
    req.headers.get("x-admin-key") ||
    url.searchParams.get("admin_key") ||
    "";
  if (providedKey !== adminKey) {
    return jsonResponse(401, { error: "Bad or missing admin key" });
  }

  // ---- Format detection ----
  let format = "html";
  if (path.endsWith(".json")) format = "json";
  else if (path.endsWith(".csv")) format = "csv";

  // ---- Filters ----
  const filterEmail = (url.searchParams.get("email") || "").trim().toLowerCase();
  const filterSince = url.searchParams.get("since");
  const limit = Math.min(
    parseInt(url.searchParams.get("limit") || "200", 10) || 200,
    HARD_CAP
  );

  // ---- Fetch ----
  let intakes;
  try {
    intakes = await fetchAllIntakes();
  } catch (err) {
    console.error("[admin-intakes] fetchAllIntakes failed:", err);
    return jsonResponse(500, { error: "Failed to read intakes from Blobs", details: err?.message });
  }

  // Apply filters + sort
  intakes = intakes
    .filter((i) => {
      if (filterEmail && (i.email || "").toLowerCase() !== filterEmail) return false;
      if (filterSince && i.created_at && i.created_at < filterSince) return false;
      return true;
    })
    .sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""))
    .slice(0, limit);

  // Enrich with report URL
  const publicBase = process.env.PUBLIC_BASE_URL || "https://fishfly.ai/scout";
  for (const i of intakes) {
    if (i.report_id) {
      i.report_url = `${publicBase}/r/${i.report_id}`;
    }
  }

  // ---- Format response ----
  if (format === "json") {
    return jsonResponse(200, { total: intakes.length, intakes });
  }
  if (format === "csv") {
    return csvResponse(intakes);
  }
  return htmlResponse(intakes, { filterEmail, filterSince, adminKey: providedKey });
};

/* ============================================================ */
/*  Data fetching                                                 */
/* ============================================================ */

async function fetchAllIntakes() {
  const store = getStore("intake");
  const { blobs } = await store.list();
  const results = [];
  for (const b of blobs || []) {
    try {
      const intake = await store.get(b.key, { type: "json" });
      if (intake) {
        results.push({ intake_id: b.key, ...intake });
      }
    } catch (err) {
      console.warn(`[admin-intakes] failed to read intake ${b.key}:`, err?.message);
    }
  }
  return results;
}

/* ============================================================ */
/*  Formatters                                                    */
/* ============================================================ */

function formatDestination(dest) {
  if (!dest) return "(unknown)";
  // Phase 2D: destination is a flat string
  if (typeof dest === "string") return dest;
  // Legacy shape: { country, island, area }
  const parts = [dest.area, dest.island, dest.country].filter(Boolean);
  return parts.join(" › ");
}

function formatTiming(t) {
  if (!t) return "—";
  if (t.mode === "exact" && t.start_date && t.end_date) {
    return `${t.start_date} → ${t.end_date} (${t.days || "?"} days)`;
  }
  if (t.mode === "month") {
    return `${t.month || "?"} (${t.days || "?"} days)`;
  }
  if (t.mode === "flexible") {
    return `flexible · ${(t.flex_months || []).join(", ") || "any month"} (${t.days || "?"} days)`;
  }
  return JSON.stringify(t);
}

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function csvResponse(intakes) {
  const cols = [
    "intake_id",
    "created_at",
    "confirmed",
    "first_name",
    "email",
    "destination",
    "timing",
    "species",
    "newsletter_opt_in",
    "report_id",
    "report_url",
  ];

  const escape = (v) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const rows = [cols.join(",")];
  for (const i of intakes) {
    rows.push([
      escape(i.intake_id),
      escape(i.created_at),
      escape(Boolean(i.confirmed_at)),
      escape(i.first_name),
      escape(i.email),
      escape(formatDestination(i.destination)),
      escape(formatTiming(i.timing)),
      escape((i.species || []).join("; ")),
      escape(i.newsletter_opt_in),
      escape(i.report_id),
      escape(i.report_url),
    ].join(","));
  }

  return new Response(rows.join("\n") + "\n", {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="trip-scout-intakes-${new Date().toISOString().slice(0,10)}.csv"`,
    },
  });
}

function htmlResponse(intakes, { filterEmail, filterSince, adminKey }) {
  const filtersApplied = [
    filterEmail ? `email = ${escapeHtml(filterEmail)}` : null,
    filterSince ? `since ${escapeHtml(filterSince)}` : null,
  ].filter(Boolean).join(" · ");

  const rows = intakes.map((i) => {
    const confirmed = i.confirmed_at ? "✓" : "—";
    const newsletter = i.newsletter_opt_in ? "✓" : "—";
    const dateStr = (i.created_at || "").slice(0, 10);
    const timeStr = (i.created_at || "").slice(11, 19);
    const reportCell = i.report_id
      ? `<a href="${escapeAttr(i.report_url)}" target="_blank" rel="noopener">${escapeHtml(i.report_id)}</a>`
      : "—";
    return `
      <tr>
        <td class="mono small">${escapeHtml(dateStr)}<br><span class="dim">${escapeHtml(timeStr)}</span></td>
        <td>${escapeHtml(i.first_name || "")}</td>
        <td class="mono small">${escapeHtml(i.email || "")}</td>
        <td>${escapeHtml(formatDestination(i.destination))}</td>
        <td class="small">${escapeHtml(formatTiming(i.timing))}</td>
        <td class="small">${escapeHtml((i.species || []).join(", "))}</td>
        <td class="center">${newsletter}</td>
        <td class="center">${confirmed}</td>
        <td class="mono small">${reportCell}</td>
      </tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Trip Scout — Intake Inbox</title>
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --bg-cream: #f7f3ec;
    --bg-oyster: #efe9df;
    --ocean: #1e3a5f;
    --sand: #c89668;
    --rust: #8b3a3a;
    --text: #1a1f2e;
    --text-soft: #4a5568;
    --text-muted: #8b8478;
    --rule: #d8d2c4;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: "Inter", -apple-system, sans-serif;
    background: var(--bg-cream);
    color: var(--text);
    line-height: 1.5;
    padding: 32px 24px;
  }
  .container { max-width: 1400px; margin: 0 auto; }
  .header { margin-bottom: 24px; }
  .wordmark {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic;
    font-weight: 700;
    font-size: 22px;
    color: var(--text);
  }
  .wordmark .dot { color: var(--sand); margin: 0 3px; }
  .tagline {
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 10px;
    color: var(--sand);
    letter-spacing: 0.28em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  h1 {
    font-family: "Playfair Display", Georgia, serif;
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 8px;
  }
  .meta {
    color: var(--text-soft);
    font-size: 14px;
    margin-bottom: 24px;
  }
  .actions {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .action-btn {
    font-family: "Inter", sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--ocean);
    background: #ffffff;
    border: 1px solid var(--rule);
    padding: 8px 14px;
    border-radius: 999px;
    text-decoration: none;
    transition: all 0.15s;
  }
  .action-btn:hover { border-color: var(--ocean); }
  .filter-info {
    background: var(--bg-oyster);
    border-left: 3px solid var(--sand);
    padding: 12px 16px;
    margin-bottom: 24px;
    font-size: 13px;
    color: var(--text-soft);
  }
  table {
    width: 100%;
    border-collapse: collapse;
    background: #ffffff;
    border: 1px solid var(--rule);
    font-size: 13px;
  }
  th, td {
    padding: 10px 12px;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid var(--rule);
  }
  th {
    background: var(--bg-oyster);
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text);
    position: sticky;
    top: 0;
  }
  tr:hover td { background: var(--bg-cream); }
  td.mono, .mono { font-family: "JetBrains Mono", monospace; }
  td.small, .small { font-size: 12px; }
  td.center, .center { text-align: center; }
  .dim { color: var(--text-muted); }
  .empty {
    background: #ffffff;
    border: 1px solid var(--rule);
    padding: 48px;
    text-align: center;
    color: var(--text-soft);
  }
  a { color: var(--ocean); text-decoration: none; }
  a:hover { text-decoration: underline; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="wordmark">fish<span class="dot">·</span>fly</div>
    <div class="tagline">Trip Scout · Intake Inbox</div>
    <h1>Intake Inbox</h1>
    <div class="meta">${intakes.length} intake${intakes.length === 1 ? "" : "s"} · newest first</div>
  </div>

  <div class="actions">
    <a class="action-btn" href="?admin_key=${encodeURIComponent(adminKey)}">All intakes</a>
    <a class="action-btn" href="intakes.csv?admin_key=${encodeURIComponent(adminKey)}">Download CSV</a>
    <a class="action-btn" href="intakes.json?admin_key=${encodeURIComponent(adminKey)}">View JSON</a>
  </div>

  ${filtersApplied ? `<div class="filter-info">Filter: ${filtersApplied}</div>` : ""}

  ${intakes.length === 0
    ? `<div class="empty">No intakes match the current filter.</div>`
    : `<table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Name</th>
        <th>Email</th>
        <th>Destination</th>
        <th>Timing</th>
        <th>Species</th>
        <th class="center">Newsletter</th>
        <th class="center">Confirmed</th>
        <th>Report</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`}
</div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

/* ============================================================ */
/*  Helpers                                                       */
/* ============================================================ */

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(s) {
  return escapeHtml(s);
}
