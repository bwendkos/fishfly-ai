/**
 * Render the tide chart strip for the Weather/Moon/Tides section.
 *
 * For exact-dates trips: one row per trip day, showing the 24-hour tide curve
 * with H/L extreme markers and a tidal range badge on the right.
 *
 * For month/flexible trips: returns empty (no specific dates to chart — the
 * report still includes Claude's tide_summary prose for those modes).
 *
 * Visual register matches the sun-calendar / moon-strip / solunar-chart
 * pattern: per-day rows with date on the left, chart in the middle, summary
 * value on the right.
 *
 * Expects `tidesData` to be pre-fetched by scout-generate-background via
 * scout-lib/worldtides.mjs — the renderer is synchronous and can't fetch.
 *
 * Data flow:
 *   scout-generate-background.mjs
 *     → fetchTidesForTrip(lat, lon, dates, apiKey)
 *     → context.tides
 *     → renderReport(..., context)
 *     → renderWeatherMoonTides
 *     → renderTideChart(timing, destination, context.tides)
 */

import { getDestinationMeta } from "./destinations.mjs";
import { formatLocalTime, formatLocalDate, localDayFraction } from "./sun.mjs";

const W = 100;
const H = 100;
const PAD_TOP = 14;
const PAD_BOTTOM = 14;

export function renderTideChart(timing, destination, tidesData) {
  if (!timing || timing.mode !== "exact") return "";
  if (!Array.isArray(tidesData) || tidesData.length === 0) return "";

  const meta = getDestinationMeta(destination);
  if (!meta) return "";

  const rows = tidesData.map((day) => renderDayRow(day, meta)).join("");

  // Reference-station footer (shows once at the bottom of the chart strip)
  const firstWithStation = tidesData.find((d) => d?.station);
  const stationFooter = firstWithStation
    ? `<div class="tide-chart-source">Reference station: ${escapeHtml(firstWithStation.station)}${
        firstWithStation.station_distance_km
          ? ` (${Math.round(firstWithStation.station_distance_km)} km)`
          : ""
      }</div>`
    : "";

  return `
  <div class="tide-chart">
    <div class="tide-chart-label">Tides at your destination</div>
    <div class="tide-chart-rows">${rows}</div>
    ${stationFooter}
  </div>`;
}

function renderDayRow(day, meta) {
  if (!day || day.error || !Array.isArray(day.heights) || day.heights.length === 0) {
    return `
    <div class="tide-row tide-row-empty">
      <div class="tide-row-date">${formatDate(day?.date, meta.tz)}</div>
      <div class="tide-row-note">Tide data unavailable</div>
    </div>`;
  }

  const minH = day.min_m;
  const maxH = day.max_m;
  // Guard against flat tides — give the curve a minimum visible range.
  const range = Math.max(maxH - minH, 0.1);
  const visualRange = (maxH - minH) > 0.05 ? (maxH - minH) : 0.5; // for the badge

  // === Curve path ===
  const n = day.heights.length;
  const pts = day.heights.map((h, i) => {
    const x = n > 1 ? (i / (n - 1)) * W : W / 2;
    const yNorm = (maxH - h.height) / range; // 0 at top of chart (max), 1 at bottom (min)
    const y = PAD_TOP + yNorm * (H - PAD_TOP - PAD_BOTTOM);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const linePath = `M ${pts.join(" L ")}`;
  const fillPath = `M ${pts[0]} L ${pts.slice(1).join(" L ")} L ${W},${H} L 0,${H} Z`;

  // === Extreme markers (H / L) ===
  // Circles stay in the SVG (paths/shapes scale correctly).
  // Text labels move to HTML overlay so they don't stretch with the viewBox
  // (preserveAspectRatio="none" stretches SVG text glyphs horizontally too).
  const extremeCircles = [];
  const extremeLabels = [];
  for (const e of day.extremes || []) {
    const ts = new Date(e.dt * 1000);
    const fraction = localDayFraction(ts, meta.tz);
    if (fraction === null) continue;
    // Skip extremes outside the day window (WorldTides sometimes returns a
    // small overlap at day boundaries).
    if (fraction < -0.02 || fraction > 1.02) continue;
    const clamped = Math.max(0, Math.min(1, fraction));
    const x = clamped * W;
    const yNorm = (maxH - e.height) / range;
    const y = PAD_TOP + yNorm * (H - PAD_TOP - PAD_BOTTOM);
    const isHigh = (e.type || "").toLowerCase() === "high";
    extremeCircles.push(
      `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.4" class="tide-extreme-${isHigh ? "high" : "low"}"/>`
    );
    const label = `${isHigh ? "H" : "L"} ${formatLocalTime(ts, meta.tz, { hour: "numeric", minute: "2-digit", hour12: false }).replace(/^(\d):/, "0$1:")}`;
    const leftPct = clamped * 100;
    const cls = `tide-extreme-label tide-extreme-label-${isHigh ? "high" : "low"}`;
    extremeLabels.push(
      `<span class="${cls}" style="left:${leftPct.toFixed(2)}%">${escapeHtml(label)}</span>`
    );
  }

  return `
    <div class="tide-row">
      <div class="tide-row-date">${formatDate(day.date, meta.tz)}</div>
      <div class="tide-row-chart">
        <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" class="tide-svg" role="img" aria-label="24-hour tide chart for ${escapeHtml(day.date)}">
          <line x1="0" y1="${(PAD_TOP + (H - PAD_TOP - PAD_BOTTOM) / 2).toFixed(2)}" x2="${W}" y2="${(PAD_TOP + (H - PAD_TOP - PAD_BOTTOM) / 2).toFixed(2)}" class="tide-midline"/>
          <path d="${fillPath}" class="tide-fill"/>
          <path d="${linePath}" class="tide-line"/>
          ${extremeCircles.join("")}
        </svg>
        <div class="tide-overlay-labels">${extremeLabels.join("")}</div>
      </div>
      <div class="tide-row-range">${visualRange.toFixed(1)}m</div>
    </div>`;
}

/**
 * Format an ISO date string ("2026-11-17") as "Tue Nov 17" in the destination's
 * local timezone. Anchored at noon UTC to avoid date drift near IDL.
 */
function formatDate(dateISO, tz) {
  if (!dateISO || !/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) return "—";
  return formatLocalDate(new Date(dateISO + "T12:00:00Z"), tz);
}

function escapeHtml(s) {
  if (typeof s !== "string") return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
