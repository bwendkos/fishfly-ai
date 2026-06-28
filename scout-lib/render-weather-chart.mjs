/**
 * Render the weather chart strip for the Weather/Moon/Tides section.
 *
 * For exact-dates trips: one row per trip day, focused on what fly fishermen
 * actually care about — wind speed + direction + precipitation. Temperature
 * range and wave height appear on the right as secondary stats.
 *
 * For month/flexible trips: returns empty (no specific dates to chart).
 *
 * Visual register matches the existing sun/moon/solunar/tide charts:
 * per-day rows with date on the left, chart in the middle, summary stats
 * on the right.
 *
 * Wind threshold convention: > 15 kt sustained is shaded rust ("challenging")
 * because that's where fly casting starts getting hard. The chart is built
 * around wind because that's the limiting factor — temperature and waves are
 * usually secondary considerations for shallow-water saltwater fly.
 *
 * Expects `weatherData` to be the per-day array from splitWeatherByDay() in
 * stormglass.mjs — pre-fetched by scout-generate-background.
 */

import { getDestinationMeta } from "./destinations.mjs";
import { formatLocalDate } from "./sun.mjs";

const W = 100;
const H = 100;
const PAD_TOP = 14;
const PAD_BOTTOM = 14;

// Wind speed scale: 0 to MAX_WIND_KTS spans full chart height
const MAX_WIND_KTS = 25;
// Above this threshold, wind is shaded rust (uncastable)
const CASTABLE_THRESHOLD_KTS = 15;

const KT_PER_MS = 1.94384;
const F_PER_C_OFFSET = 32;

export function renderWeatherChart(timing, destination, weatherData, metaOverride = null) {
  if (!timing || timing.mode !== "exact") return "";
  if (!Array.isArray(weatherData) || weatherData.length === 0) return "";

  const meta = metaOverride || getDestinationMeta(destination);
  if (!meta) return "";

  const rows = weatherData.map((day) => renderDayRow(day, meta)).join("");

  return `
  <div class="weather-chart">
    <div class="weather-chart-label">Conditions at your destination</div>
    <div class="weather-chart-rows">${rows}</div>
    <div class="weather-chart-source">Forecast: StormGlass (blended NOAA + ECMWF + DWD models)</div>
  </div>`;
}

function renderDayRow(day, meta) {
  if (!day || !Array.isArray(day.hours) || day.hours.length === 0) {
    return `
    <div class="weather-row weather-row-empty">
      <div class="weather-row-date">${formatDate(day?.date, meta.tz)}</div>
      <div class="weather-row-note">Weather data unavailable</div>
    </div>`;
  }

  // Build wind-speed area chart
  const windSvg = renderWindArea(day.hours, meta.tz);
  // Direction labels at morning + midday + evening
  const directionLabels = renderDirectionLabels(day.hours, meta.tz);
  // Precipitation icons where rain > 1 mm/h
  const precipIcons = renderPrecipIcons(day.hours, meta.tz);

  // Right-column summary stats
  const tempStr = formatTempRange(day.summary);
  const waveStr = formatWaveMax(day.summary);

  return `
    <div class="weather-row">
      <div class="weather-row-date">${formatDate(day.date, meta.tz)}</div>
      <div class="weather-row-chart">
        <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" class="weather-svg" role="img" aria-label="Weather chart for ${escapeHtml(day.date)}">
          <!-- Castable-threshold guideline -->
          <line x1="0" y1="${thresholdY().toFixed(2)}" x2="${W}" y2="${thresholdY().toFixed(2)}" class="weather-threshold-line"/>
          ${windSvg}
        </svg>
        <div class="weather-overlay-text">${directionLabels}</div>
        <div class="weather-overlay-icons">${precipIcons}</div>
      </div>
      <div class="weather-row-stats">
        <div class="weather-row-temp">${tempStr}</div>
        ${waveStr ? `<div class="weather-row-wave">${waveStr}</div>` : ""}
      </div>
    </div>`;
}

/* ============================================================
   SVG layers
   ============================================================ */

function renderWindArea(hours, tz) {
  const n = hours.length;
  if (n === 0) return "";

  // Map each hour to (x, y) — wind speed in knots, clamped to MAX_WIND_KTS
  const pts = hours.map((h, i) => {
    const x = n > 1 ? (i / (n - 1)) * W : W / 2;
    const ktsRaw = (h.windSpeed ?? 0) * KT_PER_MS;
    const kts = Math.min(ktsRaw, MAX_WIND_KTS);
    const yNorm = 1 - kts / MAX_WIND_KTS; // 0 at top (high wind), 1 at bottom (calm)
    const y = PAD_TOP + yNorm * (H - PAD_TOP - PAD_BOTTOM);
    return { x, y, kts };
  });

  // Full-area path (sand fill)
  const fillPath = `M ${pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" L ")} L ${W},${H} L 0,${H} Z`;
  // Stroke path (sand line)
  const linePath = `M ${pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" L ")}`;

  // Build rust overlay: shaded ABOVE the castable threshold AND where the
  // wind line actually exceeds the threshold. We clip the area below the
  // threshold line to the part where wind is high.
  const tY = thresholdY();
  // For each segment where wind > threshold, build a sub-path that runs along
  // the wind curve, then down along the threshold line back to the start.
  const rustPaths = [];
  let segmentStart = null;
  for (let i = 0; i < pts.length; i++) {
    const above = pts[i].kts > CASTABLE_THRESHOLD_KTS;
    if (above && segmentStart === null) segmentStart = i;
    if ((!above || i === pts.length - 1) && segmentStart !== null) {
      const endIdx = above ? i : i - 1;
      if (endIdx >= segmentStart) {
        const segment = pts.slice(segmentStart, endIdx + 1);
        const segPath = `M ${segment[0].x.toFixed(2)},${tY.toFixed(2)} L ${segment.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" L ")} L ${segment[segment.length - 1].x.toFixed(2)},${tY.toFixed(2)} Z`;
        rustPaths.push(segPath);
      }
      segmentStart = null;
    }
  }

  return `
    <path d="${fillPath}" class="weather-wind-fill"/>
    ${rustPaths.map(p => `<path d="${p}" class="weather-wind-rust"/>`).join("")}
    <path d="${linePath}" class="weather-wind-line"/>`;
}

function renderDirectionLabels(hours, tz) {
  const n = hours.length;
  if (n === 0) return "";

  // Sample at ~25%, ~50%, ~75% of the day. Render as HTML elements positioned
  // by left% so they don't stretch with the SVG viewBox (which uses
  // preserveAspectRatio="none" so paths fill the row width).
  const samples = [Math.floor(n * 0.25), Math.floor(n * 0.5), Math.floor(n * 0.75)];
  return samples
    .map((idx) => {
      const h = hours[idx];
      if (!h || h.windDirection == null || h.windSpeed == null) return "";
      const kts = (h.windSpeed ?? 0) * KT_PER_MS;
      if (kts < 1) return ""; // skip calm hours
      const dir = degreesToCompass(h.windDirection);
      const leftPct = (idx / Math.max(n - 1, 1)) * 100;
      const speedStr = `${Math.round(kts)}kt ${dir}`;
      return `<span class="weather-dir-label" style="left:${leftPct.toFixed(2)}%">${escapeHtml(speedStr)}</span>`;
    })
    .join("");
}

function renderPrecipIcons(hours, tz) {
  const n = hours.length;
  if (n === 0) return "";
  // Show an icon centered over any 2+ hour run of significant precipitation.
  // Rendered as HTML positioned by left% (same reason as direction labels —
  // text inside the viewBox-stretched SVG would distort).
  const icons = [];
  let runStart = null;
  for (let i = 0; i < n; i++) {
    const wet = (hours[i].precipitation ?? 0) >= 1.0;
    if (wet && runStart === null) runStart = i;
    if ((!wet || i === n - 1) && runStart !== null) {
      const runEnd = wet ? i : i - 1;
      if (runEnd - runStart >= 1) {
        const leftPct = ((runStart + (runEnd - runStart) / 2) / Math.max(n - 1, 1)) * 100;
        icons.push(`<span class="weather-precip-icon" style="left:${leftPct.toFixed(2)}%">⛈</span>`);
      }
      runStart = null;
    }
  }
  return icons.join("");
}

/* ============================================================
   Helpers
   ============================================================ */

function thresholdY() {
  return PAD_TOP + (1 - CASTABLE_THRESHOLD_KTS / MAX_WIND_KTS) * (H - PAD_TOP - PAD_BOTTOM);
}

function degreesToCompass(deg) {
  if (deg == null || !Number.isFinite(deg)) return "";
  // Meteorological convention: direction wind COMES FROM
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const norm = ((deg % 360) + 360) % 360;
  return dirs[Math.round(norm / 22.5) % 16];
}

function formatTempRange(summary) {
  if (!summary || summary.tempMin_C == null || summary.tempMax_C == null) return "—";
  const fMin = Math.round(summary.tempMin_C * 1.8 + F_PER_C_OFFSET);
  const fMax = Math.round(summary.tempMax_C * 1.8 + F_PER_C_OFFSET);
  return `${fMin}–${fMax}°F`;
}

function formatWaveMax(summary) {
  if (!summary || summary.waveMax_m == null) return "";
  const ft = summary.waveMax_m * 3.281;
  if (ft < 0.5) return "";
  return `${ft.toFixed(1)} ft seas`;
}

function formatDate(dateISO, tz) {
  if (!dateISO || !/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) return "—";
  return formatLocalDate(new Date(dateISO + "T12:00:00Z"), tz);
}

function escapeHtml(s) {
  if (typeof s !== "string") return "";
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
