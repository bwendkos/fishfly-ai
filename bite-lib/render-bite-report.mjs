/**
 * Render a complete Bite Window report page.
 *
 * Wraps the Prime Eat Window renderer (scout-lib/render-prime-eat-window.mjs,
 * which Trip Scout also uses as section 03) in a standalone page with the
 * FishFly brand chrome — nav, wordmark, header, footer, Trip Scout
 * cross-promo callout.
 *
 * Imports the existing render-prime-eat-window and render-css modules from
 * scout-lib/ — same renderer, same CSS, same visual register. Bite Window
 * just delivers it as a standalone page instead of embedded in a longer report.
 *
 * Returns a complete <!DOCTYPE html> string ready to be served from /r/<id>.
 */

import { renderPrimeEatWindow } from "../scout-lib/render-prime-eat-window.mjs";
import { renderSunCalendar } from "../scout-lib/render-sun-calendar.mjs";
import { renderMoonCalendar } from "../scout-lib/render-moon-calendar.mjs";
import { renderSolunar } from "../scout-lib/render-solunar.mjs";
import { renderTideChart } from "../scout-lib/render-tide-chart.mjs";
import { renderWeatherChart } from "../scout-lib/render-weather-chart.mjs";
import { renderTripMap } from "../scout-lib/render-trip-map.mjs";
import { getReportCss } from "../scout-lib/render-css.mjs";

export function renderBiteReport(report) {
  const css = getReportCss();
  const { intake, tides, weather, reportId, generatedAt } = report;

  const locationLabel = intake.location || "Your spot";
  const dateLabel = formatDateLabel(intake.timing);

  // The Prime Eat Window section. metaOverride lets us pass the Mapbox-geocoded
  // lat/lon directly — these locations aren't in our curated destinations.mjs.
  const metaOverride = (Number.isFinite(intake.location_lat) && Number.isFinite(intake.location_lon))
    ? {
        lat: intake.location_lat,
        lon: intake.location_lon,
        tz: intake.location_tz || "UTC",
      }
    : null;

  const pewSection = renderPrimeEatWindow(
    intake.timing,
    locationLabel,    // used only for display when metaOverride is set
    tides,
    weather,
    null,             // no sub_area in Bite Window
    metaOverride,
    { sectionNumber: null }  // standalone Eat Window report: no section numbers
  );

  const wmtSection = renderWeatherMoonTides(
    intake.timing,
    locationLabel,
    tides,
    weather,
    metaOverride
  );

  // Interactive destination map. Unlike Trip Scout (which uses curated
  // destinations.mjs centroids + per-destination POIs from destination-pois.mjs),
  // the Eat Window report has a user-supplied lat/lng from Mapbox autocomplete.
  // We render a single marker on the user's exact location instead of trying to
  // match it against curated POIs. Higher default zoom (11) since the user
  // pinpointed a specific spot, not a region.
  const tripMap = metaOverride
    ? renderTripMap({
        meta: metaOverride,
        pois: [{
          lat: metaOverride.lat,
          lng: metaOverride.lon,
          kind: "lodge",
          label: locationLabel,
          detail: "Your fishing location.",
        }],
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
        destinationName: locationLabel,
        zoom: 11,
      })
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(locationLabel)} &mdash; FishFly Eat Window</title>
<link rel="icon" type="image/svg+xml" href="https://fishfly.ai/brand/marks/compass-filled-disc.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&family=Playfair+Display:ital,wght@0,600;0,700;1,700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>${css}</style>
<style>
  /* Bite Window report shell — most styles come from the inlined report CSS above */
  body { background: var(--bg-cream); color: var(--text-primary); font-family: "Inter", sans-serif; line-height: 1.6; margin: 0; padding: 0; }
  .bw-nav { max-width: 1200px; margin: 0 auto; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px 16px; }
  .bw-nav-brand { font-family: "Cormorant Garamond", Georgia, serif; font-style: italic; font-weight: 700; font-size: 24px; color: var(--text-primary); text-decoration: none; letter-spacing: -0.5px; }
  .bw-nav-brand .dot { color: var(--sand); margin: 0 3px; }
  .bw-nav-links { display: flex; gap: 28px; align-items: center; }
  .bw-nav-links a { font-family: "Inter", sans-serif; font-weight: 500; font-size: 14px; color: var(--text-soft); text-decoration: none; transition: color 120ms ease; }
  .bw-nav-links a:hover { color: var(--ocean); }
  .bw-nav-links a.active { color: var(--ocean); font-weight: 600; }
  @media (max-width: 560px) {
    .bw-nav { padding: 16px 20px; }
    .bw-nav-links { gap: 16px; font-size: 13px; }
  }

  .bw-page { max-width: 920px; margin: 0 auto; padding: 24px 32px 64px; }

  .bw-report-header {
    border: 1px solid var(--rule);
    background: #ffffff;
    padding: 32px 36px;
    margin-bottom: 32px;
    position: relative;
  }
  .bw-report-header .trip-dates-eyebrow {
    font-family: "Inter", sans-serif;
    font-weight: 600; font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--sand);
    margin-bottom: 10px;
  }
  .bw-report-header h1 {
    font-family: "Playfair Display", Georgia, serif;
    font-weight: 700;
    font-size: 36px;
    line-height: 1.15;
    color: var(--text-primary);
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }
  .bw-report-header .meta {
    color: var(--text-muted);
    font-size: 14px;
    font-family: "JetBrains Mono", monospace;
    letter-spacing: 0.04em;
  }

  /* Cross-promo callout at the bottom */
  .bw-cross-promo {
    margin-top: 32px;
    padding: 28px 32px;
    background: var(--bg-oyster);
    border-left: 4px solid var(--ocean);
  }
  .bw-cross-promo-label {
    font-family: "Inter", sans-serif;
    font-weight: 600; font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ocean);
    margin-bottom: 8px;
  }
  .bw-cross-promo h3 {
    font-family: "Playfair Display", Georgia, serif;
    font-weight: 700; font-style: italic;
    font-size: 22px;
    color: var(--text-primary);
    margin-bottom: 10px;
    line-height: 1.25;
  }
  .bw-cross-promo p {
    font-size: 14.5px;
    line-height: 1.55;
    color: var(--text-soft);
    margin-bottom: 12px;
  }
  .bw-cross-promo .cta-button {
    display: inline-block;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 12px 22px;
    background: var(--ocean);
    color: #ffffff;
    text-decoration: none;
    border-radius: 3px;
    transition: background 140ms ease;
  }
  .bw-cross-promo .cta-button:hover { background: #2a4d7a; }

  .bw-footer {
    max-width: 1200px;
    margin: 32px auto 0;
    padding: 24px 32px;
    border-top: 1px solid var(--rule);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px 16px;
    font-size: 13px;
    color: var(--text-muted);
  }
  .bw-footer-links { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
  .bw-footer-links a { color: var(--text-soft); text-decoration: none; }
  .bw-footer-links a:hover { color: var(--ocean); }
  .bw-footer-links .sep { color: var(--rule); }

  @media print {
    .bw-nav, .bw-cross-promo, .bw-footer { display: none; }
    body { background: #ffffff; }
    .bw-page { padding: 0 12px; }
    .bw-report-header { border: none; padding: 0 0 18px; }
  }
</style>
</head>
<body>

  <nav class="bw-nav" aria-label="Primary">
    <a href="/" class="bw-nav-brand">fish<span class="dot">&middot;</span>fly</a>
    <div class="bw-nav-links">
      <a href="/">Home</a>
      <a href="/library/">Library</a>
      <a href="/scout/">Trip Scout</a>
      <a href="/eat-window/" class="active">Eat Window</a>
      <a href="/about/">About</a>
      <a href="/blog/">Blog</a>
    </div>
  </nav>

  <main class="bw-page">

    <div class="bw-report-header">
      <div class="trip-dates-eyebrow">${escapeHtml(dateLabel)}</div>
      <h1>${escapeHtml(locationLabel)}</h1>
      <p class="meta">Eat Window &middot; Report ID: ${escapeHtml(reportId)} &middot; Generated ${escapeHtml(formatTimestamp(generatedAt))}</p>
    </div>

    ${tripMap}

    ${pewSection || renderUnavailable(locationLabel)}

    ${wmtSection}

    <section class="bw-cross-promo">
      <div class="bw-cross-promo-label">Planning a longer trip?</div>
      <h3>Get the full FishFly Trip Scout brief.</h3>
      <p>Species recommendations, flies cross-linked to our library, gear lists, logistics, regulations &mdash; all alongside the same Eat Window synthesis you&rsquo;re looking at now.</p>
      <a class="cta-button" href="/scout/">Try Trip Scout &rarr;</a>
    </section>

  </main>

  <footer class="bw-footer">
    <div>&copy; 2026 FishFly.ai</div>
    <div class="bw-footer-links">
      <a href="/">Home</a><span class="sep">&middot;</span>
      <a href="/library/">Library</a><span class="sep">&middot;</span>
      <a href="/scout/">Trip Scout</a><span class="sep">&middot;</span>
      <a href="/eat-window/">Eat Window</a><span class="sep">&middot;</span>
      <a href="/about/">About</a><span class="sep">&middot;</span>
      <a href="/blog/">Blog</a>
    </div>
  </footer>

</body>
</html>`;
}

/**
 * Render the Weather, Moon & Tides section — the same five charts as Trip Scout's
 * section 04, but without Claude prose between them (Bite Window's only Claude
 * call is the Prime Eat Window summary). Each subheading is only rendered when
 * its chart returns content, so month/flexible modes (which skip the tide and
 * weather charts) don't leave empty headings.
 *
 * No section number — the Bite Window standalone report doesn't number its
 * sections (Brad's PR #29 spec).
 */
function renderWeatherMoonTides(timing, destination, tides, weather, metaOverride) {
  const weatherChart = renderWeatherChart(timing, destination, weather, metaOverride);
  const sunCalendar = renderSunCalendar(timing, destination, metaOverride);
  const moonCalendar = renderMoonCalendar(timing);
  const tideChart = renderTideChart(timing, destination, tides, metaOverride);
  const solunarChart = renderSolunar(timing, destination, metaOverride);

  // If nothing renders, suppress the whole section
  if (!weatherChart && !sunCalendar && !moonCalendar && !tideChart && !solunarChart) {
    return "";
  }

  const weatherBlock = weatherChart ? `<h3>Weather</h3>${weatherChart}` : "";
  const sunBlock = sunCalendar ? `<h3>Sun</h3>${sunCalendar}` : "";
  const moonBlock = moonCalendar ? `<h3>Moon</h3>${moonCalendar}` : "";
  const tideBlock = tideChart ? `<h3>Tides</h3>${tideChart}` : "";
  const solunarBlock = solunarChart ? `<h3>Solunar</h3>${solunarChart}` : "";

  return `
  <section class="section">
    <div class="section-header"><h2>Weather, Moon &amp; Tides</h2></div>
    ${weatherBlock}
    ${sunBlock}
    ${moonBlock}
    ${tideBlock}
    ${solunarBlock}
  </section>`;
}

function renderUnavailable(locationLabel) {
  return `
    <div style="background:#ffffff;border:1px solid var(--rule);border-left:3px solid var(--rust);padding:28px 32px;">
      <h2 style="font-family:'Playfair Display',serif;font-style:italic;font-size:24px;color:var(--text-primary);margin-bottom:12px;">No Eat Window today.</h2>
      <p style="font-size:14.5px;color:var(--text-soft);">We couldn&rsquo;t synthesize a Prime Eat Window for <strong>${escapeHtml(locationLabel)}</strong>. The location may not be coastal, or the date range may be too far in the past. Try a fresh request at <a href="/eat-window/" style="color:var(--ocean);font-weight:600;">/eat-window</a>.</p>
    </div>`;
}

function formatDateLabel(timing) {
  if (!timing) return "";
  const start = timing.start_date;
  const end = timing.end_date;
  if (!start) return "";
  const fmt = (iso) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  if (!end || end === start) return fmt(start);
  // Trim year repetition: "Jun 25 – 28, 2026" if same month/year
  const sParts = start.split("-"); const eParts = end.split("-");
  if (sParts[0] === eParts[0] && sParts[1] === eParts[1]) {
    return new Date(start + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
      + " – " + new Date(end + "T00:00:00Z").toLocaleDateString("en-US", { day: "numeric", year: "numeric", timeZone: "UTC" });
  }
  return fmt(start) + " – " + fmt(end);
}

function formatTimestamp(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return ""; }
}

function escapeHtml(s) {
  if (typeof s !== "string") return "";
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
