/**
 * HTML report renderer for Trip Scout.
 *
 * Takes the validated Claude output (matching claude-schema.js) and produces
 * a complete HTML page. Inline CSS via lib/render-css.js so the rendered
 * report is self-contained and prints cleanly.
 *
 * Section renderers map 1:1 to the schema sections:
 *   1. renderTripOverview
 *   2. renderSpeciesProfiles
 *   3. renderWeatherMoonTides
 *   4. renderPackingChecklist
 *   5. renderLogistics
 *   6. renderRegulations
 *
 * TODO: This is a scaffold. Each section renderer is functional but minimal.
 * Real polish happens after first beta reports.
 */

import { getReportCss } from "./render-css.mjs";
import { getSpeciesImageUrl } from "./species-images.mjs";
import { renderMoonCalendar } from "./render-moon-calendar.mjs";
import { renderSunCalendar } from "./render-sun-calendar.mjs";
import { renderSolunar } from "./render-solunar.mjs";
import { renderTideChart } from "./render-tide-chart.mjs";
import { renderWeatherChart } from "./render-weather-chart.mjs";
import { renderPrimeEatWindow } from "./render-prime-eat-window.mjs";
import { renderTripMap } from "./render-trip-map.mjs";
import { getDestinationPOIs, getDestinationZoom } from "./destination-pois.mjs";
import { getDestinationMeta } from "./destinations.mjs";

export function renderReport(report, context) {
  const css = getReportCss();
  const headerTitle = context.sub_area
    ? `${context.sub_area} · ${formatDestination(context.destination)}`
    : formatDestination(context.destination);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(headerTitle)} — FishFly Trip Scout</title>
<link rel="icon" type="image/svg+xml" href="https://fishfly.ai/brand/marks/compass-filled-disc.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>

${renderNav()}
${renderToolbar(context.reportId, context)}

<div class="page">

  ${renderHeader(context, headerTitle, report)}

  ${renderTripOverview(report.trip_overview, context)}

  ${renderSpeciesProfiles(report.species_profiles, context)}

  ${renderPrimeEatWindow(context?.timing, context?.destination, context?.tides, context?.weather, context?.sub_area)}

  ${renderWeatherMoonTides(report.weather_moon_tides, context)}

  ${renderPackingChecklist(report.packing_checklist)}

  ${renderLogistics(report.logistics)}

  ${renderRegulations(report.regulations)}

  ${renderFooter(context)}

</div>

<script>
  // Print button handler
  document.getElementById("print-btn")?.addEventListener("click", () => window.print());
</script>
</body>
</html>`;
}

/* ============================================================ */
/*  Section renderers                                             */
/* ============================================================ */

function renderHeader(context, headerTitle, report) {
  // The wordmark + Trip Scout eyebrow now live in the global nav above.
  // This block is just the article title for the destination + trip-dates eyebrow.
  const tripDates = formatTripDates(context.timing);
  const eyebrow = tripDates
    ? `<div class="trip-dates-eyebrow">${escapeHtml(tripDates)}</div>`
    : "";
  return `
  <div class="report-header">
    ${eyebrow}
    <h1>${escapeHtml(headerTitle)}</h1>
    <p class="meta">
      ${context.species?.length || 0} target species · Generated ${new Date(context.generatedAt).toLocaleDateString()}
    </p>
  </div>
  <figure class="ff-hero">
    <img src="/brand/heroes/sections/report-hero.jpg" alt="Trip destination hero" loading="eager">
  </figure>`;
}

/**
 * Format the timing object as a short display string for the report header
 * eyebrow. A user may run several intakes for the same destination over
 * different windows; this label disambiguates them at a glance.
 *
 *   exact     "Dec 3–7, 2026"  (same month)
 *             "Dec 28 – Jan 3, 2027"  (month-crossing)
 *   month     "December · 7 days"
 *   flexible  "Nov / Dec / Jan · 7 days"
 *
 * Returns null if timing is missing or malformed, in which case the renderer
 * omits the eyebrow entirely.
 */
function formatTripDates(timing) {
  if (!timing || typeof timing !== "object") return null;
  const daysSuffix = (n) => `${n} day${n === 1 ? "" : "s"}`;

  if (timing.mode === "exact" && timing.start_date && timing.end_date) {
    // ISO date strings ("2026-12-03"). Render with UTC to avoid TZ slippage.
    const fmt = (iso) =>
      new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
    const sMon = fmt(timing.start_date);
    const eMon = fmt(timing.end_date);
    const sDay = Number(timing.start_date.slice(8, 10));
    const eDay = Number(timing.end_date.slice(8, 10));
    const yr = timing.end_date.slice(0, 4);
    if (sMon === eMon && sDay === eDay) return `${sMon} ${sDay}, ${yr}`;
    if (sMon === eMon) return `${sMon} ${sDay}–${eDay}, ${yr}`;
    return `${sMon} ${sDay} – ${eMon} ${eDay}, ${yr}`;
  }

  if (timing.mode === "month" && timing.month) {
    return `${timing.month} · ${daysSuffix(timing.days || 0)}`;
  }

  if (timing.mode === "flexible") {
    const months = Array.isArray(timing.flex_months) && timing.flex_months.length
      ? sortFlexMonthsForward(timing.flex_months).map((m) => m.slice(0, 3)).join(" / ")
      : "Flexible";
    return `${months} · ${daysSuffix(timing.days || 0)}`;
  }

  return null;
}

/**
 * Sort flex_months in trip-going-forward order, handling year-crossing windows
 * gracefully. The form's getCheckedFlexMonths() returns months in DOM order
 * (calendar Jan-Dec), so for a winter trip like "Nov / Dec / Jan" we'd get
 * the array ["January", "November", "December"] and render the nonsensical
 * "Jan / Nov / Dec".
 *
 * Algorithm: convert to month numbers, sort ascending, find the largest gap
 * between consecutive months (including the wrap-around from Dec to Jan).
 * The month immediately AFTER that gap is the "start" of the window — render
 * from there, wrapping around if needed.
 *
 * Examples:
 *   ["January", "November", "December"]   ->  Nov, Dec, Jan
 *   ["November", "December"]               ->  Nov, Dec
 *   ["April", "May", "June"]               ->  Apr, May, Jun (no wrap)
 *   ["January", "December"]                ->  Dec, Jan
 *   ["January", "June", "July"]            ->  Jan, Jun, Jul (two clusters,
 *                                              biggest gap is Jul -> Jan)
 */
function sortFlexMonthsForward(monthNames) {
  const MONTH_INDEX = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
  };
  // Map to numbers, drop unknowns, dedupe, sort ascending.
  const nums = Array.from(new Set(monthNames.map((m) => MONTH_INDEX[m]).filter(Boolean))).sort((a, b) => a - b);
  if (nums.length < 2) return monthNames;

  // Find the largest gap between consecutive months (including wrap-around Dec -> Jan).
  let maxGap = 0;
  let maxGapIdx = 0;
  for (let i = 0; i < nums.length; i++) {
    const next = nums[(i + 1) % nums.length];
    const gap = i === nums.length - 1 ? (next + 12 - nums[i]) : (next - nums[i]);
    if (gap > maxGap) { maxGap = gap; maxGapIdx = i; }
  }
  // Start AFTER the largest gap.
  const startIdx = (maxGapIdx + 1) % nums.length;
  const reorderedNums = [...nums.slice(startIdx), ...nums.slice(0, startIdx)];

  const NUMBER_TO_NAME = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  return reorderedNums.map((n) => NUMBER_TO_NAME[n]);
}

/* ============================================================ */
/*  Global nav + toolbar (mirrors safety.road.voyage pattern)    */
/*  Both hidden in print via @media print rules in render-css.   */
/* ============================================================ */

function renderNav() {
  return `<nav class="rpt-nav" aria-label="Primary">
  <div class="rpt-nav-inner">
    <a href="https://fishfly.ai" class="rpt-nav-brand">
      <span class="rpt-wordmark">fish<span class="dot">·</span>fly</span>
      <span class="rpt-brand-tagline">Trip Scout</span>
    </a>
    <div class="rpt-nav-spacer"></div>
    <div class="rpt-nav-links">
      <a href="https://fishfly.ai/">Home</a>
      <a href="https://fishfly.ai/library/">Library</a>
      <a href="https://fishfly.ai/scout/">Trip Scout</a>
      <a href="https://fishfly.ai/about/">About</a>
      <a href="https://fishfly.ai/blog/">Blog</a>
    </div>
    <a href="https://fishfly.ai/scout/" class="rpt-nav-cta">Get Another Report &rarr;</a>
  </div>
</nav>`;
}

function renderToolbar(reportId, context) {
  const id = escapeHtml(reportId || "preview");
  return `<div class="rpt-toolbar">
  <div class="rpt-toolbar-inner">
    <div class="rpt-toolbar-left">
      <span class="rpt-toolbar-dot">&#9679;</span>
      <span><strong>Report ID:</strong> <code class="rpt-report-id">${id}</code></span>
      <span class="rpt-toolbar-sep">&middot;</span>
      <span>Saved permanently</span>
    </div>
    <div class="rpt-toolbar-actions">
      <button class="rpt-tool-btn" onclick="window.print()">Download Printable PDF</button>
      <button class="rpt-tool-btn" onclick="(function(b){navigator.clipboard?.writeText(window.location.href);b.textContent='Copied!';setTimeout(()=>{b.textContent='Copy Link';},1500);})(this)">Copy Link</button>
    </div>
  </div>
</div>`;
}

function renderTripOverview(section, context) {
  if (!section) return "";
  const realityChecks = (section.species_reality_check || [])
    .map(
      (r) => `
    <div class="reality-row reality-${r.viability}">
      <strong>${escapeHtml(capitalize(r.species))}</strong>
      <span class="viability-badge viability-${r.viability}">${formatViability(r.viability)}</span>
      <p>${escapeHtml(r.notes)}</p>
    </div>`
    )
    .join("");

  // Interactive destination map. Sits between the greeting paragraph and the
  // "What to know before you go" prose — grounds the reader geographically
  // before they read the destination context. Gracefully omits if the API
  // key is unset or the destination has no centroid lookup.
  const tripMap = renderTripMap({
    meta: getDestinationMeta(context?.destination),
    pois: getDestinationPOIs(context?.destination),
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
    destinationName: context?.destination,
    zoom: getDestinationZoom(context?.destination),
  });

  return `
  <section class="section">
    <div class="section-header"><span class="section-number">01</span><h2>Trip Overview</h2></div>
    <p class="greeting">${escapeHtml(section.greeting)}</p>
    ${tripMap}
    <h3>What to know before you go</h3>
    ${renderProse(section.destination_reality)}
    <h3>Species reality check</h3>
    <div class="reality-grid">${realityChecks}</div>
    <div class="callout"><strong>Weather note:</strong> ${escapeHtml(section.weather_caveat)}</div>
  </section>`;
}

function renderSpeciesProfiles(profiles, context) {
  if (!Array.isArray(profiles) || profiles.length === 0) return "";
  return `
  <section class="section">
    <div class="section-header"><span class="section-number">02</span><h2>Target Species</h2></div>
    ${profiles.map((p) => renderOneSpecies(p, context)).join("")}
  </section>`;
}

function renderOneSpecies(p, context) {
  // Look up an illustration for this species; renders a banner above the headline
  // when found. Destination context disambiguates regional variants (cubera, etc).
  const speciesImg = getSpeciesImageUrl(p.species, context?.destination);
  const banner = speciesImg
    ? `<img class="species-banner" src="${escapeAttr(speciesImg)}" alt="${escapeAttr(p.species)} illustration" loading="lazy">`
    : "";
  const flies = (p.top_flies || [])
    .map((f, i) => {
      const libraryLink = f.library_url
        ? `<a href="${escapeAttr(f.library_url)}" class="library-link">View in Library →</a>`
        : "";
      const libraryImage = f.library_image_url
        ? `<img src="${escapeAttr(f.library_image_url)}" alt="${escapeAttr(f.name)}" class="fly-image">`
        : "";
      return `
      <div class="fly-card">
        ${libraryImage}
        <div class="fly-body">
          <span class="fly-rank">#${i + 1}</span>
          <h4>${escapeHtml(f.name)}</h4>
          <div class="fly-specs">Hook ${escapeHtml(f.hook_size)} · ${escapeHtml(f.colors)}</div>
          <p>${escapeHtml(f.why_it_works)}</p>
          ${libraryLink}
        </div>
      </div>`;
    })
    .join("");

  return `
  <div class="species-block">
    ${banner}
    <h3>${escapeHtml(capitalize(p.species))}</h3>
    <h4>The fish</h4>
    ${renderProse(p.the_fish)}
    <h4>Gear</h4>
    <ul class="gear-list">
      <li><strong>Rod:</strong> ${escapeHtml(p.gear.rod)}</li>
      <li><strong>Reel:</strong> ${escapeHtml(p.gear.reel)}</li>
      <li><strong>Line:</strong> ${escapeHtml(p.gear.line)}</li>
      <li><strong>Leader:</strong> ${escapeHtml(p.gear.leader)}</li>
      ${p.gear.season_notes ? `<li><strong>Note:</strong> ${escapeHtml(p.gear.season_notes)}</li>` : ""}
    </ul>
    <h4>Top flies</h4>
    <div class="fly-grid">${flies}</div>
    <h4>Presentation</h4>
    ${renderProse(p.presentation)}
    <h4>Conservation</h4>
    ${renderProse(p.conservation)}
  </div>`;
}

function renderWeatherMoonTides(section, context) {
  if (!section) return "";
  // PR #9: moon phase calendar above Claude's moon_summary prose
  const moonCalendar = renderMoonCalendar(context?.timing);
  // PR #10: daylight calendar — needs destination for lat/lon + timezone
  const sunCalendar = renderSunCalendar(context?.timing, context?.destination);
  // PR #11: solunar peak windows — needs destination + timing
  const solunarChart = renderSolunar(context?.timing, context?.destination);
  // PR #20: real tide chart — needs destination + timing + pre-fetched tide data
  // (Empty string for month/flexible mode or when fetch failed — chart renderer
  // handles missing data gracefully and Claude's tide_summary prose still shows.)
  const tideChart = renderTideChart(context?.timing, context?.destination, context?.tides);
  // PR #21: real weather chart — needs destination + timing + pre-fetched weather
  // (Same graceful fallback — empty when data unavailable, Claude prose unaffected.)
  const weatherChart = renderWeatherChart(context?.timing, context?.destination, context?.weather);
  const best = section.best_dates_recommendation
    ? `
    <div class="best-dates">
      <div class="best-dates-label">Recommended window</div>
      <h3>${escapeHtml(section.best_dates_recommendation.window_label)}</h3>
      <h4>Why this window</h4>
      ${renderProse(section.best_dates_recommendation.why_this_window)}
      <h4>How this affects your species</h4>
      ${renderProse(section.best_dates_recommendation.per_species_benefit)}
    </div>`
    : "";
  return `
  <section class="section">
    <div class="section-header"><span class="section-number">04</span><h2>Weather, Moon & Tides</h2></div>
    <h3>Weather</h3>
    ${weatherChart}
    ${renderProse(section.weather_overview)}
    <h3>Sun</h3>
    ${sunCalendar}
    <h3>Moon</h3>
    ${moonCalendar}
    ${renderProse(section.moon_summary)}
    <h3>Tides</h3>
    ${tideChart}
    ${renderProse(section.tide_summary)}
    <h3>Solunar</h3>
    ${solunarChart}
    ${renderProse(section.solunar_summary)}
    ${best}
  </section>`;
}

function renderPackingChecklist(section) {
  if (!section) return "";
  const cat = (label, items) =>
    items && items.length
      ? `<h3>${label}</h3><ul class="checklist">${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`
      : "";
  return `
  <section class="section">
    <div class="section-header"><span class="section-number">05</span><h2>What to Bring</h2></div>
    <figure class="ff-section-opener">
      <img src="/brand/heroes/sections/what-to-bring.jpg" alt="Saltwater fly gear still-life — section opener" loading="lazy">
    </figure>
    <h3 class="checklist-tier">Must Have</h3>
    ${cat("Tackle & Gear", section.must_have?.tackle_and_gear)}
    ${cat("Clothing & Sun", section.must_have?.clothing_sun)}
    ${cat("Travel & Logistics", section.must_have?.travel_logistics)}
    ${cat("Medical & Safety", section.must_have?.medical_safety)}
    <h3 class="checklist-tier">Nice to Have</h3>
    ${cat("Extras", section.nice_to_have?.extras)}
  </section>`;
}

function renderLogistics(section) {
  if (!section) return "";
  const airports = (section.nearest_airports || [])
    .map((a) => `<tr><td><strong>${escapeHtml(a.airport)}</strong></td><td>${escapeHtml(a.details)}</td></tr>`)
    .join("");
  return `
  <section class="section">
    <div class="section-header"><span class="section-number">06</span><h2>How to Get There</h2></div>
    <figure class="ff-section-opener">
      <img src="/brand/heroes/sections/how-to-get-there.jpg" alt="Nautical chart — section opener" loading="lazy">
    </figure>
    <h3>Nearest airports</h3>
    <table><tbody>${airports}</tbody></table>
    <h3>Ground transport</h3>
    ${renderProse(section.ground_transport)}
    <h3>Lodging notes</h3>
    ${renderProse(section.lodging_notes)}
  </section>`;
}

function renderRegulations(section) {
  if (!section) return "";
  const speciesRows = (section.species_regulations || [])
    .map(
      (r) => `
      <tr>
        <td><strong>${escapeHtml(capitalize(r.species))}</strong></td>
        <td>${escapeHtml(r.season)}</td>
        <td>${escapeHtml(r.bag_limit)}</td>
        <td>${escapeHtml(r.size_limit || "—")}</td>
      </tr>`
    )
    .join("");
  return `
  <section class="section">
    <div class="section-header"><span class="section-number">07</span><h2>Regulations</h2></div>
    <figure class="ff-section-opener">
      <img src="/brand/heroes/sections/regulations.jpg" alt="Fishing-permit documents still-life — section opener" loading="lazy">
    </figure>
    <div class="callout callout-warn">⚠️ ${escapeHtml(section.disclaimer_top)}</div>
    <h3>Licenses required</h3>
    ${renderProse(section.licenses_required)}
    <h3>Species regulations</h3>
    <table>
      <thead><tr><th>Species</th><th>Season</th><th>Bag limit</th><th>Size limit</th></tr></thead>
      <tbody>${speciesRows}</tbody>
    </table>
    <div class="callout callout-warn">⚠️ ${escapeHtml(section.disclaimer_bottom)}</div>
  </section>`;
}

function renderFooter(context) {
  return `
  <footer class="report-footer">
    <p>Generated by FishFly Trip Scout — fishfly.ai/scout</p>
    <p class="small">Report ID: ${escapeHtml(context.reportId)} · Generated ${escapeHtml(context.generatedAt)}</p>
    <p class="small">FishFly may earn a commission when you purchase gear through our partner retailers. This costs you nothing extra and helps us keep Trip Scout free.</p>
    <p class="closing">Tight lines.</p>
  </footer>`;
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

function escapeAttr(s) {
  return escapeHtml(s);
}

function capitalize(s) {
  if (typeof s !== "string" || !s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Render a long-prose field as one or more <p> blocks. Splits on double
 * newlines (one or more blank lines) so Claude can opt into multi-paragraph
 * prose in a single schema field without us needing to change the schema.
 *
 * Pairs with the "PARAGRAPH RHYTHM" clause in claude-prompt.mjs (PR #38).
 * Long single-paragraph prose still renders correctly — just as one <p>.
 */
function renderProse(text) {
  if (typeof text !== "string" || !text.trim()) return "";
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("\n    ");
}

function formatDestination(dest) {
  if (!dest) return "Your Trip";
  // PR #6+ destinations are flat library-region strings (e.g. "Andros, Bahamas").
  if (typeof dest === "string") return dest;
  // Legacy shape (pre-PR-#6): { country, island, area }.
  return [dest.area, dest.island, dest.country].filter(Boolean).join(" · ") || "Your Trip";
}

function formatViability(v) {
  return {
    prime: "Prime",
    solid: "Solid",
    marginal: "Marginal",
    non_viable: "Not viable",
  }[v] || v;
}
