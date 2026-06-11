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

export function renderReport(report, context) {
  const css = getReportCss();
  const headerTitle = formatDestination(context.destination);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FishFly Trip Scout — ${escapeHtml(headerTitle)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
<div class="page">

  ${renderHeader(context, headerTitle, report)}

  ${renderTripOverview(report.trip_overview, context)}

  ${renderSpeciesProfiles(report.species_profiles)}

  ${renderWeatherMoonTides(report.weather_moon_tides)}

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
  return `
  <div class="report-header no-print-actions">
    <div class="wordmark">fish<span class="dot">·</span>fly</div>
    <div class="tagline">Trip Scout</div>
    <h1>${escapeHtml(headerTitle)}</h1>
    <p class="meta">
      ${context.species?.length || 0} target species · Generated ${new Date(context.generatedAt).toLocaleDateString()}
    </p>
    <button id="print-btn" class="print-btn">Print to PDF</button>
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

  return `
  <section class="section">
    <div class="section-header"><span class="section-number">01</span><h2>Trip Overview</h2></div>
    <p class="greeting">${escapeHtml(section.greeting)}</p>
    <h3>What to know before you go</h3>
    <p>${escapeHtml(section.destination_reality)}</p>
    <h3>Species reality check</h3>
    <div class="reality-grid">${realityChecks}</div>
    <div class="callout"><strong>Weather note:</strong> ${escapeHtml(section.weather_caveat)}</div>
  </section>`;
}

function renderSpeciesProfiles(profiles) {
  if (!Array.isArray(profiles) || profiles.length === 0) return "";
  return `
  <section class="section">
    <div class="section-header"><span class="section-number">02</span><h2>Target Species</h2></div>
    ${profiles.map(renderOneSpecies).join("")}
  </section>`;
}

function renderOneSpecies(p) {
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
    <h3>${escapeHtml(capitalize(p.species))}</h3>
    <h4>The fish</h4>
    <p>${escapeHtml(p.the_fish)}</p>
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
    <p>${escapeHtml(p.presentation)}</p>
    <h4>Conservation</h4>
    <p>${escapeHtml(p.conservation)}</p>
  </div>`;
}

function renderWeatherMoonTides(section) {
  if (!section) return "";
  const best = section.best_dates_recommendation
    ? `
    <div class="best-dates">
      <div class="best-dates-label">Recommended window</div>
      <h3>${escapeHtml(section.best_dates_recommendation.window_label)}</h3>
      <h4>Why this window</h4>
      <p>${escapeHtml(section.best_dates_recommendation.why_this_window)}</p>
      <h4>How this affects your species</h4>
      <p>${escapeHtml(section.best_dates_recommendation.per_species_benefit)}</p>
    </div>`
    : "";
  return `
  <section class="section">
    <div class="section-header"><span class="section-number">03</span><h2>Weather, Moon & Tides</h2></div>
    <h3>Weather</h3>
    <p>${escapeHtml(section.weather_overview)}</p>
    <h3>Moon</h3>
    <p>${escapeHtml(section.moon_summary)}</p>
    <h3>Tides</h3>
    <p>${escapeHtml(section.tide_summary)}</p>
    <h3>Solunar</h3>
    <p>${escapeHtml(section.solunar_summary)}</p>
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
    <div class="section-header"><span class="section-number">04</span><h2>What to Bring</h2></div>
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
    <div class="section-header"><span class="section-number">05</span><h2>How to Get There</h2></div>
    <h3>Nearest airports</h3>
    <table><tbody>${airports}</tbody></table>
    <h3>Ground transport</h3>
    <p>${escapeHtml(section.ground_transport)}</p>
    <h3>Lodging notes</h3>
    <p>${escapeHtml(section.lodging_notes)}</p>
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
    <div class="section-header"><span class="section-number">06</span><h2>Regulations</h2></div>
    <div class="callout callout-warn">⚠️ ${escapeHtml(section.disclaimer_top)}</div>
    <h3>Licenses required</h3>
    <p>${escapeHtml(section.licenses_required)}</p>
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

function formatDestination(dest) {
  if (!dest) return "Your Trip";
  return [dest.area, dest.island, dest.country].filter(Boolean).join(" · ");
}

function formatViability(v) {
  return {
    prime: "Prime",
    solid: "Solid",
    marginal: "Marginal",
    non_viable: "Not viable",
  }[v] || v;
}
