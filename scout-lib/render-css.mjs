/**
 * Inline CSS for the Trip Scout report HTML.
 *
 * Single source of truth for all report styling. Matches FishFly brand kit v1.0:
 *   - Cream background, Playfair Display headlines, Inter body
 *   - Ocean blue accent, sand for rules/middots, rust for warnings
 *
 * Includes @media print stylesheet so browser print-to-PDF produces clean output.
 */

export function getReportCss() {
  return `
/* ============================================================
   FishFly brand palette v1.0
   ============================================================ */
:root {
  --bg-cream: #f7f3ec;
  --bg-oyster: #efe9df;
  --ocean: #1e3a5f;
  --sand: #c89668;
  --rust: #8b3a3a;
  --text-primary: #1a1f2e;
  --text-soft: #4a5568;
  --text-muted: #8b8478;
  --rule: #d8d2c4;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-cream);
  color: var(--text-primary);
  line-height: 1.65;
  font-size: 16px;
}

.page {
  max-width: 760px;
  margin: 0 auto;
  padding: 48px 32px 80px;
}

/* ============================================================
   Header
   ============================================================ */
.report-header {
  border: 1px solid var(--rule);
  background: #ffffff;
  padding: 32px;
  margin-bottom: 32px;
  position: relative;
}

.wordmark {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: -0.5px;
}
.wordmark .dot { color: var(--sand); margin: 0 4px; }

.tagline {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--sand);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  margin: 4px 0 16px;
}

.report-header .trip-dates-eyebrow {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sand);
  margin-bottom: 10px;
}

.report-header h1 {
  font-family: "Playfair Display", Georgia, serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.15;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.meta {
  color: var(--text-muted);
  font-size: 14px;
}

.print-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  background: var(--ocean);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0.02em;
}

/* ============================================================
   Sections
   ============================================================ */
.section {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--rule);
}
.section:last-of-type { border-bottom: none; }

.section-header {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--ocean);
}

.section-number {
  font-family: "Playfair Display", serif;
  font-size: 32px;
  font-weight: 600;
  color: var(--sand);
}

.section h2 {
  font-family: "Playfair Display", serif;
  font-weight: 700;
  font-size: 28px;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.section h3 {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ocean);
  margin: 24px 0 12px;
}

.section h4 {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-soft);
  margin: 16px 0 8px;
}

.section p {
  margin-bottom: 12px;
  color: var(--text-primary);
}

/* ============================================================
   Trip Overview specific
   ============================================================ */
.greeting {
  font-size: 18px;
  color: var(--text-primary);
  font-style: italic;
  margin-bottom: 24px;
}

.reality-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}
.reality-row {
  padding: 12px 16px;
  background: var(--bg-oyster);
  border-left: 4px solid var(--rule);
}
.reality-prime { border-left-color: var(--ocean); }
.reality-solid { border-left-color: var(--sand); }
.reality-marginal { border-left-color: var(--text-muted); }
.reality-non_viable { border-left-color: var(--rust); }

.viability-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 3px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-left: 8px;
}
.viability-prime { background: var(--ocean); color: #fff; }
.viability-solid { background: var(--sand); color: #fff; }
.viability-marginal { background: var(--text-muted); color: #fff; }
.viability-non_viable { background: var(--rust); color: #fff; }

.callout {
  background: var(--bg-oyster);
  border-left: 4px solid var(--ocean);
  padding: 14px 18px;
  margin: 16px 0;
  font-size: 15px;
}
.callout-warn {
  border-left-color: var(--rust);
  background: rgba(139, 58, 58, 0.06);
}

/* ============================================================
   Species blocks
   ============================================================ */
.species-block {
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px dashed var(--rule);
}
.species-block:last-child { border-bottom: none; }
.species-block h3 {
  font-family: "Playfair Display", serif;
  font-size: 24px;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 2px solid var(--sand);
  padding-bottom: 8px;
  margin-bottom: 16px;
}

.gear-list {
  list-style: none;
  background: var(--bg-oyster);
  padding: 16px 20px;
  margin: 0 0 16px;
}
.gear-list li {
  padding: 6px 0;
  border-bottom: 1px solid var(--rule);
}
.gear-list li:last-child { border-bottom: none; }

.fly-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 12px 0;
}
.fly-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid var(--rule);
  border-radius: 4px;
}
.fly-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}
.fly-body { flex: 1; }
.fly-rank {
  display: inline-block;
  font-weight: 700;
  color: var(--sand);
  font-size: 13px;
  margin-bottom: 4px;
}
.fly-card h4 {
  font-family: "Playfair Display", serif;
  font-weight: 600;
  font-size: 18px;
  color: var(--text-primary);
  text-transform: none;
  letter-spacing: 0;
  margin-bottom: 4px;
}
.fly-specs {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.fly-card p { font-size: 14px; }
.library-link {
  display: inline-block;
  font-size: 13px;
  color: var(--ocean);
  font-weight: 600;
  margin-top: 8px;
  text-decoration: none;
  border-bottom: 1px solid var(--ocean);
}

/* ============================================================
   Weather / Moon / Tides
   ============================================================ */
.best-dates {
  position: relative;
  background: #ffffff;
  border: 1px solid var(--rule);
  border-left: 4px solid var(--sand);
  padding: 28px 32px;
  margin: 32px 0;
  box-shadow: 0 1px 3px rgba(30, 58, 95, 0.04), 0 4px 12px rgba(30, 58, 95, 0.05);
}
.best-dates-label {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sand);
  margin-bottom: 6px;
}
.best-dates h3 {
  font-family: "Playfair Display", Georgia, serif;
  font-style: italic;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.15;
  color: var(--ocean);
  margin: 0 0 20px;
  letter-spacing: -0.5px;
  text-transform: none;
  padding: 0;
}
.best-dates h4 {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-soft);
  margin-top: 18px;
  margin-bottom: 6px;
}
.best-dates p {
  font-size: 15px;
  color: var(--text-soft);
  line-height: 1.6;
  margin: 0;
}
.best-dates p + h4 { margin-top: 18px; }
@media print {
  .best-dates { break-inside: avoid; box-shadow: none; }
}

/* ============================================================
   Checklists
   ============================================================ */
.checklist-tier {
  font-family: "Playfair Display", serif !important;
  font-size: 20px !important;
  font-weight: 700;
  color: var(--text-primary) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
  margin-top: 24px !important;
  border-top: 1px solid var(--rule);
  padding-top: 12px !important;
}
.checklist {
  list-style: none;
  margin-bottom: 16px;
}
.checklist li {
  padding: 6px 0 6px 24px;
  position: relative;
  border-bottom: 1px solid var(--rule);
}
.checklist li::before {
  content: "□";
  position: absolute;
  left: 0;
  color: var(--text-muted);
  font-size: 16px;
}

/* ============================================================
   Tables
   ============================================================ */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
}
thead {
  background: var(--ocean);
  color: #ffffff;
}
th, td {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid var(--rule);
  font-size: 14px;
}
th {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
tr:nth-child(even) td { background: var(--bg-oyster); }

/* ============================================================
   Footer
   ============================================================ */
.report-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 2px solid var(--ocean);
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
}
.report-footer p { margin: 4px 0; }
.report-footer .small { font-size: 11px; color: var(--text-muted); }
.report-footer .closing {
  font-family: "Playfair Display", serif;
  font-size: 18px;
  color: var(--text-primary);
  margin-top: 24px;
}

/* ============================================================
   Print stylesheet
   ============================================================ */
@media print {
  body { background: #ffffff; }
  .page { max-width: 100%; padding: 24px; }
  .no-print-actions .print-btn { display: none; }
  .report-header { border: none; padding: 0 0 24px; }
  .section {
    page-break-inside: avoid;
    margin-bottom: 32px;
  }
  .section-header { page-break-after: avoid; }
  .species-block { page-break-inside: avoid; }
  .fly-card { page-break-inside: avoid; }
  .library-link, .print-btn { display: none; }
}


/* ============================================================
   Global nav + toolbar (mirrors safety.road.voyage)
   ============================================================ */
.rpt-nav {
  background: var(--bg-cream);
  border-bottom: 1px solid var(--rule);
  padding: 14px 32px;
}
.rpt-nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
}
.rpt-nav-brand {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--text-primary);
  line-height: 1;
}
.rpt-wordmark {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.3px;
}
.rpt-wordmark .dot { color: var(--sand); margin: 0 3px; }
.rpt-brand-tagline {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 9.5px;
  color: var(--sand);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  margin-top: 4px;
}
.rpt-nav-spacer { flex: 1; }
.rpt-nav-links {
  display: flex;
  align-items: center;
  gap: 22px;
}
.rpt-nav-links a {
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-soft);
  text-decoration: none;
  transition: color 0.15s;
}
.rpt-nav-links a:hover { color: var(--ocean); }
.rpt-nav-cta {
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 9px 16px;
  background: var(--ocean);
  color: #ffffff;
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.15s;
  white-space: nowrap;
}
.rpt-nav-cta:hover { background: #2a4d7a; }

/* Toolbar — below the nav, above the article. */
.rpt-toolbar {
  background: var(--bg-oyster);
  border-bottom: 1px solid var(--rule);
  padding: 14px 32px;
}
.rpt-toolbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
}
.rpt-toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: "Inter", sans-serif;
  font-size: 12.5px;
  color: var(--text-soft);
}
.rpt-toolbar-left strong { color: var(--text-primary); font-weight: 600; }
.rpt-toolbar-dot { color: var(--sand); font-size: 10px; }
.rpt-toolbar-sep { color: var(--text-muted); }
.rpt-report-id {
  font-family: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 11.5px;
  color: var(--ocean);
  background: rgba(30, 58, 95, 0.06);
  padding: 2px 6px;
  border-radius: 3px;
}
.rpt-toolbar-actions {
  display: flex;
  gap: 8px;
}
.rpt-tool-btn {
  padding: 8px 14px;
  background: #ffffff;
  border: 1px solid var(--rule);
  border-radius: 999px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.15s;
}
.rpt-tool-btn:hover {
  border-color: var(--ocean);
  color: var(--ocean);
}

/* Print: nav, toolbar, and any leftover .print-btn are hidden in the printed PDF. */
@media print {
  .rpt-nav, .rpt-toolbar, .print-btn { display: none !important; }
  body { background: #ffffff; }
  .page { padding-top: 24px; }
}

/* Responsive: collapse the nav links on narrow viewports. The brand + CTA stay. */
@media (max-width: 700px) {
  .rpt-nav-inner { flex-wrap: wrap; row-gap: 12px; }
  .rpt-nav-links { display: none; }
  .rpt-toolbar-inner { flex-direction: column; align-items: flex-start; }
}

/* Species banner -- watercolor scientific illustration above each species
   block. Cream background blends into the page bg seamlessly. */
.species-banner {
  display: block;
  width: 100%;
  max-width: 760px;
  height: auto;
  margin: 0 auto 8px;
  background: var(--bg-cream);
  border-bottom: 1px solid var(--rule);
}

.species-block .species-banner + h3 {
  margin-top: 16px;
}

@media print {
  .species-banner { break-inside: avoid; }
}

@media (max-width: 720px) {
  .species-banner {
    width: calc(100% + 64px);
    max-width: none;
    margin-left: -32px;
    margin-right: -32px;
  }
}

/* ============================================================
   Moon phase calendar (PR #9) — strip for exact dates, grid for month
   ============================================================ */
.moon-calendar {
  margin: 24px 0 16px;
  padding: 20px 0;
}
.moon-calendar-label {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--sand);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.moon-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 18px 14px;
  align-items: flex-start;
}
.moon-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px 8px;
}
.moon-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 44px;
}
.moon-day .moon-svg {
  flex-shrink: 0;
}
.moon-day-num {
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-soft);
  white-space: nowrap;
}
.moon-day-event .moon-day-num {
  color: var(--ocean);
  font-weight: 600;
}
.moon-day-event-label {
  font-family: "Inter", sans-serif;
  font-size: 9px;
  font-weight: 600;
  color: var(--sand);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  margin-top: 1px;
}
.moon-summary-line {
  font-size: 13px;
  color: var(--text-soft);
  margin-top: 14px;
  line-height: 1.6;
}
.moon-summary-line strong {
  color: var(--text);
  font-weight: 600;
}

@media (max-width: 600px) {
  .moon-strip { gap: 12px 10px; }
  .moon-grid { grid-template-columns: repeat(5, 1fr); }
}

@media print {
  .moon-calendar { break-inside: avoid; }
}

/* ============================================================
   Sun calendar (PR #10) — daylight ribbon per trip day
   Gradient colors are bound to CSS vars so the renderer can
   reference them inline.
   ============================================================ */
:root {
  --gradient-night:    #1a1f2e;
  --gradient-twilight: #c89668;
  --gradient-day:      #f7d8a0;
}
.sun-calendar {
  margin: 24px 0 16px;
  padding: 20px 0 4px;
}
.sun-calendar-label {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--sand);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.sun-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sun-row {
  display: grid;
  grid-template-columns: 110px 64px 1fr 64px 70px;
  align-items: center;
  gap: 14px;
  font-family: "Inter", sans-serif;
  font-size: 12.5px;
}
.sun-row-date {
  color: var(--text);
  font-weight: 600;
  font-size: 13px;
}
.sun-row-rise, .sun-row-set {
  font-family: "JetBrains Mono", monospace;
  color: var(--text-soft);
  font-size: 12px;
  text-align: center;
}
.sun-row-length {
  font-family: "JetBrains Mono", monospace;
  color: var(--text-muted);
  font-size: 11.5px;
  text-align: right;
}
.sun-row-ribbon {
  height: 18px;
  border-radius: 9px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--rule);
}
.sun-row-noon-tick {
  position: absolute;
  top: 2px;
  bottom: 2px;
  width: 1px;
  background: rgba(30, 58, 95, 0.4);
  transform: translateX(-50%);
}
.sun-row-polar {
  grid-template-columns: 110px 1fr;
  font-style: italic;
  color: var(--text-muted);
}
.sun-row-note {
  font-size: 12.5px;
}

@media (max-width: 600px) {
  .sun-row {
    grid-template-columns: 1fr 60px 60px;
    grid-template-areas:
      "date  rise  set"
      "ribbon ribbon ribbon"
      "length length length";
    gap: 4px 10px;
  }
  .sun-row-date { grid-area: date; }
  .sun-row-rise { grid-area: rise; text-align: left; }
  .sun-row-set  { grid-area: set; text-align: right; }
  .sun-row-ribbon { grid-area: ribbon; }
  .sun-row-length { grid-area: length; text-align: right; font-size: 11px; }
}

@media print {
  .sun-calendar { break-inside: avoid; }
  .sun-row-ribbon { box-shadow: inset 0 0 0 0.5pt var(--rule); }
}

/* ============================================================
   Tide chart (PR #20 — WorldTides API)
   Per-day 24-hour tide curve with H/L markers. Visual register
   matches the sun/moon/solunar charts above.
   ============================================================ */
.tide-chart {
  margin: 24px 0 16px;
  padding: 20px 0 4px;
}
.tide-chart-label {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--sand);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.tide-chart-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tide-row {
  display: grid;
  grid-template-columns: 110px 1fr 60px;
  align-items: center;
  gap: 14px;
  font-family: "Inter", sans-serif;
}
.tide-row-date {
  color: var(--text);
  font-weight: 600;
  font-size: 13px;
}
.tide-row-chart {
  height: 56px;
  position: relative;
}
.tide-row-range {
  font-family: "JetBrains Mono", monospace;
  color: var(--text-muted);
  font-size: 12px;
  text-align: right;
}
.tide-svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}
.tide-midline {
  stroke: var(--rule);
  stroke-width: 0.3;
  stroke-dasharray: 1.5 1.5;
}
.tide-fill {
  fill: var(--ocean);
  opacity: 0.08;
}
.tide-line {
  fill: none;
  stroke: var(--ocean);
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.85;
  vector-effect: non-scaling-stroke;
}
/* Extreme markers — circles in SVG, labels as HTML overlay
   (SVG text glyphs stretch horizontally under preserveAspectRatio="none";
   HTML labels render at proper proportions.) */
circle.tide-extreme-low  { fill: var(--ocean); }
circle.tide-extreme-high { fill: var(--sand); }
.tide-overlay-labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.tide-extreme-label {
  position: absolute;
  transform: translateX(-50%);
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  font-weight: 500;
  color: var(--text-soft);
  letter-spacing: 0.02em;
  white-space: nowrap;
}
/* Highs sit above the chart's vertical center; lows sit below. */
.tide-extreme-label-high { top: 2px; color: var(--sand); font-weight: 600; }
.tide-extreme-label-low  { bottom: 2px; }
.tide-row-empty {
  grid-template-columns: 110px 1fr;
  font-style: italic;
  color: var(--text-muted);
}
.tide-row-note {
  font-size: 12.5px;
}
.tide-chart-source {
  margin-top: 14px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

@media (max-width: 600px) {
  .tide-row {
    grid-template-columns: 1fr 60px;
    grid-template-areas:
      "date  range"
      "chart chart";
    gap: 4px 10px;
  }
  .tide-row-date { grid-area: date; }
  .tide-row-range { grid-area: range; text-align: right; }
  .tide-row-chart { grid-area: chart; height: 64px; }
}

@media print {
  .tide-chart { break-inside: avoid; }
  .tide-line { opacity: 1; stroke-width: 1.2; }
  .tide-fill { opacity: 0.15; }
}

/* ============================================================
   PRIME EAT WINDOW (PR #23) — the synthesis section
   v3 mock locked: multi-day clickable table → per-day cards with
   4-row chart + ranked windows. Three border tiers (best=ocean,
   good=sand, weak=rust) with legend.
   ============================================================ */
:root {
  --pew-tier-best: var(--ocean);    /* premium — set the alarm */
  --pew-tier-good: var(--sand);     /* warm — fish hard */
  --pew-tier-weak: var(--rust);     /* alert — weather day */
}

.pew-section { /* inherits .section styling */ }
.pew-explainer {
  font-family: "Inter", sans-serif;
  font-size: 15px;
  line-height: 1.65;
  color: var(--text-soft);
  margin: 8px 0 24px;
  max-width: 700px;
}
.pew-explainer strong { color: var(--text-primary); font-weight: 600; }

/* Legend */
.pew-legend {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding: 14px 18px;
  background: var(--bg-oyster);
  border-left: 3px solid var(--rule);
  margin-bottom: 32px;
}
.pew-legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-soft);
}
.pew-legend-swatch {
  width: 14px; height: 14px;
  border-radius: 2px;
}
.pew-legend-swatch.pew-tier-best { background: var(--pew-tier-best); }
.pew-legend-swatch.pew-tier-good { background: var(--pew-tier-good); }
.pew-legend-swatch.pew-tier-weak { background: var(--pew-tier-weak); }
.pew-legend-item small {
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  text-transform: none;
  margin-left: 4px;
}

/* Multi-day table */
.pew-multi {
  background: #ffffff;
  border: 1px solid var(--rule);
  padding: 28px 32px;
  margin-bottom: 48px;
}
.pew-multi-label {
  font-family: "Inter", sans-serif;
  font-weight: 600; font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sand);
  margin-bottom: 4px;
}
.pew-multi-headline {
  font-family: "Playfair Display", Georgia, serif;
  font-weight: 700; font-style: italic;
  font-size: 22px; line-height: 1.2;
  color: var(--ocean);
  margin-bottom: 22px;
}
.pew-multi-table-head {
  font-family: "Inter", sans-serif;
  font-weight: 600; font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: grid;
  grid-template-columns: 110px 1fr 100px 44px;
  gap: 16px;
  padding-bottom: 10px;
  padding-left: 12px;
  border-bottom: 1px solid var(--rule);
}
.pew-multi-table-head > div:nth-child(3) { text-align: right; }
.pew-multi-row {
  display: grid;
  grid-template-columns: 110px 1fr 100px 44px;
  gap: 16px;
  align-items: center;
  padding: 12px 0 12px 12px;
  border-bottom: 1px solid var(--rule-soft, #e8e2d3);
  border-left: 3px solid transparent;
  color: inherit;
  text-decoration: none;
  transition: background 120ms ease;
  cursor: pointer;
  font-family: "Inter", sans-serif;
}
.pew-multi-row:last-child { border-bottom: none; }
.pew-multi-row:hover { background: var(--bg-cream); }
.pew-multi-row.pew-tier-best { border-left-color: var(--pew-tier-best); }
.pew-multi-row.pew-tier-good { border-left-color: var(--pew-tier-good); }
.pew-multi-row.pew-tier-weak { border-left-color: var(--pew-tier-weak); }

.pew-multi-day {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 14px;
}
.pew-multi-eatwindow { line-height: 1.4; }
.pew-multi-time {
  font-family: "JetBrains Mono", monospace;
  font-weight: 500;
  font-size: 13px;
  color: var(--ocean);
  letter-spacing: 0.02em;
  margin-bottom: 3px;
}
.pew-multi-reason {
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.45;
}
.pew-multi-rating {
  text-align: right;
  font-size: 14px;
  letter-spacing: 0.04em;
}

/* View-chart button (the chevron pill) */
.pew-view-btn {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--bg-cream);
  border: 1px solid var(--rule);
  color: var(--text-soft);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: auto;
  transition: all 140ms ease;
}
.pew-view-btn svg { width: 16px; height: 16px; transition: transform 140ms ease; }
.pew-multi-row:hover .pew-view-btn {
  background: var(--ocean);
  border-color: var(--ocean);
  color: #ffffff;
}
.pew-multi-row:hover .pew-view-btn svg { transform: translateX(2px); }

/* Per-day detail card */
.pew-card {
  background: #ffffff;
  border: 1px solid var(--rule);
  border-left-width: 4px;
  padding: 32px 36px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(30, 58, 95, 0.04), 0 4px 16px rgba(30, 58, 95, 0.06);
  scroll-margin-top: 32px;
}
.pew-card.pew-tier-best { border-left-color: var(--pew-tier-best); }
.pew-card.pew-tier-good { border-left-color: var(--pew-tier-good); }
.pew-card.pew-tier-weak { border-left-color: var(--pew-tier-weak); }

.pew-eyebrow-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}
.pew-eyebrow {
  font-family: "Inter", sans-serif;
  font-weight: 600; font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sand);
}
.pew-mark {
  display: inline-block;
  width: 6px; height: 6px;
  background: var(--sand);
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
  transform: translateY(-1px);
}
.pew-rating {
  font-family: "Inter", sans-serif;
  font-size: 13px; font-weight: 600;
  color: var(--ocean);
  letter-spacing: 0.04em;
}
.pew-stars {
  color: var(--sand);
  font-size: 16px;
  letter-spacing: 0.05em;
}
.pew-stars-empty { color: var(--rule); }
.pew-badge {
  margin-left: 8px;
  font-family: "Inter", sans-serif;
  font-weight: 600; font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.pew-card.pew-tier-best .pew-badge { color: var(--pew-tier-best); }
.pew-card.pew-tier-good .pew-badge { color: var(--pew-tier-good); }
.pew-card.pew-tier-weak .pew-badge { color: var(--pew-tier-weak); }

.pew-day-headline {
  font-family: "Playfair Display", Georgia, serif;
  font-weight: 700; font-style: italic;
  font-size: 28px; line-height: 1.15;
  color: var(--ocean);
  margin: 0 0 6px;
  letter-spacing: -0.3px;
}
.pew-sub {
  font-family: "Inter", sans-serif;
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  margin-bottom: 24px;
}
.pew-sub strong { color: var(--text-soft); font-weight: 600; }

/* The 4-row per-day chart */
.pew-chart-wrap {
  position: relative;
  margin-bottom: 16px;
}
.pew-chart {
  width: 100%;
  height: 280px;
  display: block;
  overflow: visible;
}
.pew-chart-axis text {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  fill: var(--text-muted);
  letter-spacing: 0.04em;
}
.pew-chart-axis-line {
  stroke: var(--rule);
  stroke-width: 0.5;
}
/* Row backgrounds */
.pew-row-bg { fill: var(--bg-oyster); opacity: 0.4; }
.pew-row-light-band { fill: #f7e5cc; opacity: 0.85; }
.pew-row-light-tick { stroke: var(--sand); stroke-width: 1.5; }
.pew-row-tide-line { fill: none; stroke: var(--ocean); stroke-width: 1.5; opacity: 0.85; vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
.pew-row-tide-fill { fill: var(--ocean); opacity: 0.10; }
.pew-tide-extreme-high { fill: var(--sand); }
.pew-tide-extreme-low { fill: var(--ocean); }
.pew-row-solunar-major { fill: var(--sand); opacity: 0.7; }
.pew-row-solunar-minor { fill: var(--sand-soft, #e2c8a6); opacity: 0.7; }
.pew-row-solunar-transit { stroke: var(--ocean); stroke-width: 1; stroke-dasharray: 2 2; opacity: 0.5; }
.pew-row-wind-line { fill: none; stroke: var(--sand); stroke-width: 1.4; vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
.pew-row-wind-fill { fill: var(--sand); opacity: 0.28; }
.pew-row-wind-rust { fill: var(--rust); opacity: 0.45; }
.pew-row-wind-threshold { stroke: var(--rule); stroke-width: 0.4; stroke-dasharray: 2 2; }
.pew-row-empty-text {
  font-family: "Inter", sans-serif;
  font-size: 10px;
  fill: var(--text-muted);
  font-style: italic;
}

/* HTML overlay labels (avoids SVG text stretching — same fix as PR #22) */
.pew-chart-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pew-chart-row-label {
  position: absolute;
  left: 0;
  transform: translateY(-50%);
  font-family: "Inter", sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: rgba(247, 243, 236, 0.85);
  padding: 1px 4px;
  border-radius: 2px;
}
.pew-chart-marker {
  position: absolute;
  transform: translateX(-50%);
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
  background: rgba(247, 243, 236, 0.85);
  padding: 1px 3px;
  border-radius: 2px;
}
.pew-chart-marker-sand { color: var(--sand); font-weight: 600; }
.pew-chart-marker-ocean { color: var(--ocean); }

/* Prime windows list */
.pew-windows-label {
  font-family: "Inter", sans-serif;
  font-weight: 600; font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-soft);
  padding-top: 20px;
  border-top: 1px solid var(--rule-soft, #e8e2d3);
  margin-bottom: 14px;
}
.pew-windows-list {
  list-style: none;
  margin: 0; padding: 0;
}
.pew-window {
  display: grid;
  grid-template-columns: 90px 130px 1fr;
  gap: 16px;
  align-items: baseline;
  padding: 11px 0;
  border-bottom: 1px solid var(--rule-soft, #e8e2d3);
}
.pew-window:last-child { border-bottom: none; }
.pew-window-rating { font-size: 14px; letter-spacing: 0.04em; }
.pew-window-time {
  font-family: "JetBrains Mono", monospace;
  font-weight: 500;
  font-size: 14px;
  color: var(--ocean);
  letter-spacing: 0.02em;
}
.pew-window-reason {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.5;
}
.pew-windows-empty {
  font-family: "Playfair Display", serif;
  font-style: italic;
  color: var(--text-muted);
  font-size: 14px;
  padding: 12px 0;
}
.pew-back {
  display: block;
  text-align: center;
  margin-top: 20px;
  padding-top: 14px;
  border-top: 1px solid var(--rule-soft, #e8e2d3);
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 120ms ease;
}
.pew-back:hover { color: var(--ocean); }

@media (max-width: 600px) {
  .pew-multi-table-head,
  .pew-multi-row {
    grid-template-columns: 80px 1fr 80px;
    gap: 10px;
  }
  .pew-multi-table-head > div:nth-child(4),
  .pew-view-btn { display: none; }
  .pew-card { padding: 24px 20px; }
  .pew-day-headline { font-size: 22px; }
  .pew-window {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "rating time"
      "reason reason";
    gap: 4px 12px;
  }
  .pew-window-rating { grid-area: rating; }
  .pew-window-time { grid-area: time; text-align: right; }
  .pew-window-reason { grid-area: reason; margin-top: 4px; }
  .pew-chart { height: 320px; }
}

@media print {
  .pew-card { break-inside: avoid; box-shadow: none; }
  .pew-multi { break-inside: avoid; }
  .pew-view-btn { display: none; }
  .pew-back { display: none; }
}

/* ============================================================
   Weather chart (PR #21 — StormGlass API)
   Per-day wind-speed area chart with direction labels, precipitation
   markers, and castable-threshold guideline. Same visual register as
   sun/moon/solunar/tide charts.
   ============================================================ */
.weather-chart {
  margin: 24px 0 16px;
  padding: 20px 0 4px;
}
.weather-chart-label {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--sand);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.weather-chart-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.weather-row {
  display: grid;
  grid-template-columns: 110px 1fr 80px;
  align-items: center;
  gap: 14px;
  font-family: "Inter", sans-serif;
}
.weather-row-date {
  color: var(--text);
  font-weight: 600;
  font-size: 13px;
}
.weather-row-chart {
  height: 64px;
  position: relative;
}
.weather-row-stats {
  text-align: right;
}
.weather-row-temp {
  font-family: "JetBrains Mono", monospace;
  color: var(--text-soft);
  font-size: 12px;
  letter-spacing: 0.02em;
}
.weather-row-wave {
  font-family: "JetBrains Mono", monospace;
  color: var(--text-muted);
  font-size: 10.5px;
  margin-top: 3px;
  letter-spacing: 0.02em;
}
.weather-svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}
.weather-threshold-line {
  stroke: var(--rule);
  stroke-width: 0.4;
  stroke-dasharray: 2 2;
}
.weather-wind-fill {
  fill: var(--sand);
  opacity: 0.28;
}
.weather-wind-line {
  fill: none;
  stroke: var(--sand);
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}
.weather-wind-rust {
  fill: var(--rust);
  opacity: 0.45;
}
/* Direction labels + precipitation icons — HTML overlays so they don't
   stretch with the SVG viewBox (preserveAspectRatio="none" distorts text
   glyphs horizontally). Positioned absolutely by left%. */
.weather-overlay-text,
.weather-overlay-icons {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.weather-dir-label {
  position: absolute;
  top: 2px;
  transform: translateX(-50%);
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  font-weight: 500;
  color: var(--text-soft);
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.weather-precip-icon {
  position: absolute;
  bottom: 2px;
  transform: translateX(-50%);
  font-size: 13px;
  color: var(--ocean);
  line-height: 1;
}
.weather-row-empty {
  grid-template-columns: 110px 1fr;
  font-style: italic;
  color: var(--text-muted);
}
.weather-row-note {
  font-size: 12.5px;
}
.weather-chart-source {
  margin-top: 14px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

@media (max-width: 600px) {
  .weather-row {
    grid-template-columns: 1fr 80px;
    grid-template-areas:
      "date  stats"
      "chart chart";
    gap: 4px 10px;
  }
  .weather-row-date { grid-area: date; }
  .weather-row-stats { grid-area: stats; text-align: right; }
  .weather-row-chart { grid-area: chart; height: 70px; }
}

@media print {
  .weather-chart { break-inside: avoid; }
  .weather-wind-line { stroke-width: 1.2; }
  .weather-wind-fill { opacity: 0.35; }
  .weather-wind-rust { opacity: 0.55; }
}

/* ============================================================
   Solunar peak windows (PR #11)
   ============================================================ */
.solunar-calendar {
  margin: 24px 0 16px;
  padding: 20px 0 4px;
}
.solunar-calendar-label {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--sand);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.solunar-scale {
  position: relative;
  height: 16px;
  margin-left: 110px;
  margin-right: 80px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--text-muted);
}
.solunar-scale span {
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
}
.solunar-scale span:first-child { transform: translateX(0%); }
.solunar-scale span:last-child  { transform: translateX(-100%); }

.solunar-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.solunar-row {
  display: grid;
  grid-template-columns: 110px 1fr 80px;
  align-items: center;
  gap: 14px;
  font-family: "Inter", sans-serif;
  font-size: 12.5px;
}
.solunar-row-date {
  color: var(--text);
  font-weight: 600;
  font-size: 13px;
}
.solunar-row-bar {
  position: relative;
  height: 22px;
  background: var(--bg-oyster);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--rule);
}
.solunar-window {
  position: absolute;
  top: 0;
  bottom: 0;
}
.solunar-window-major {
  background: var(--sand);
  opacity: 0.85;
}
.solunar-window-minor {
  background: var(--sand-soft, #e8c9a3);
  opacity: 0.6;
}
.solunar-sun-tick {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--ocean);
  transform: translateX(-50%);
  pointer-events: none;
}
.solunar-row-rating {
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-align: right;
  padding: 4px 0;
}
.solunar-row-rating.rating-excellent { color: var(--ocean); }
.solunar-row-rating.rating-good      { color: var(--sand); }
.solunar-row-rating.rating-average   { color: var(--text-soft); }
.solunar-row-rating.rating-poor      { color: var(--text-muted); }

.solunar-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 14px;
  padding-left: 110px;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  color: var(--text-soft);
}
.solunar-legend > span { display: inline-flex; align-items: center; gap: 6px; }
.solunar-swatch {
  display: inline-block;
  width: 14px;
  height: 10px;
  border-radius: 2px;
}
.solunar-swatch-major { background: var(--sand); opacity: 0.85; }
.solunar-swatch-minor { background: var(--sand-soft, #e8c9a3); opacity: 0.6; box-shadow: inset 0 0 0 1px var(--rule); }
.solunar-swatch-sun   {
  width: 3px; height: 12px; background: var(--ocean); border-radius: 0;
}

@media (max-width: 600px) {
  .solunar-scale { margin-left: 0; margin-right: 0; }
  .solunar-row {
    grid-template-columns: 1fr 70px;
    grid-template-areas: "date rating" "bar bar";
    gap: 4px 10px;
  }
  .solunar-row-date { grid-area: date; }
  .solunar-row-rating { grid-area: rating; text-align: right; }
  .solunar-row-bar { grid-area: bar; }
  .solunar-legend { padding-left: 0; }
}

@media print {
  .solunar-calendar { break-inside: avoid; }
}
`;
}
