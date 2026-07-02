/**
 * The Prime Eat Window — FishFly's killer synthesis of every condition
 * that drives whether fish are actively feeding at a given hour.
 *
 * For each trip day:
 *   - Compute hour-by-hour scores combining sun/moon/solunar/tide/weather
 *   - Identify "prime windows" (runs of hours where conditions converge)
 *   - Generate a 5★ daily rating
 *   - Render a 4-row SVG chart (Light / Tide / Solunar / Wind)
 *   - Compose top-line summary table + per-day detail cards
 *
 * Visual register matches the v3 design mock (locked):
 *   - Multi-day table at the top (clickable rows = anchor links to detail cards)
 *   - Per-day cards stacked below, each with full 4-row chart + ranked windows
 *   - Three-tier border colors: BEST DAY (ocean), GOOD DAY (sand), WEAK DAY (rust)
 *
 * Renderer is sync. All data comes via context:
 *   - context.timing (intake's exact_dates trip range)
 *   - context.destination (used for lat/lon/tz lookup)
 *   - context.tides (from PR #20, WorldTides — already cached)
 *   - context.weather (from PR #21, StormGlass — already cached)
 * Sun + moon + solunar are computed locally (algorithmic, no API).
 *
 * Returns empty string for month/flexible modes (no specific dates to score).
 */

import { getDestinationMeta } from "./destinations.mjs";
import { computeSolunar } from "./solunar.mjs";
import { sunTimes, formatLocalTime, formatLocalDate, localDayFraction } from "./sun.mjs";

const KT_PER_MS = 1.94384;
const F_PER_C_OFFSET = 32;

/* ============================================================ */
/*  Top-level renderer                                            */
/* ============================================================ */

export function renderPrimeEatWindow(timing, destination, tides, weather, sub_area, metaOverride = null, options = {}) {
  if (!timing || timing.mode !== "exact") return "";
  if (!timing.start_date || !timing.end_date) return "";

  // metaOverride lets callers pass { lat, lon, tz } directly for arbitrary
  // coordinates (e.g. Bite Window's Mapbox-geocoded locations). Trip Scout
  // omits it and falls back to the curated destinations.mjs lookup.
  const meta = metaOverride || getDestinationMeta(destination);
  if (!meta) return "";

  // Build per-day data records
  const days = computeDays(timing, meta, tides, weather);
  if (days.length === 0) return "";

  const destStr = sub_area
    ? `${escapeHtml(sub_area)} · ${escapeHtml(formatDestination(destination))}`
    : escapeHtml(formatDestination(destination));
  const dayCount = days.length;

  const tableRows = days.map((d, i) => renderTableRow(d, i + 1, meta)).join("");
  const detailCards = days.map((d, i) => renderDayCard(d, i + 1, dayCount, meta)).join("");

  // options.sectionNumber: "03" (Trip Scout default) | null/false (Bite Window — no number)
  const sectionNumber = ("sectionNumber" in options) ? options.sectionNumber : "03";
  const numberMarkup = sectionNumber ? `<span class="section-number">${escapeHtml(sectionNumber)}</span>` : "";

  return `
  <section class="section pew-section" id="prime-eat-window">
    <div class="section-header">${numberMarkup}<h2>Prime Eat Window</h2></div>

    <p class="pew-explainer">
      The Prime Eat Window is FishFly's synthesis of every condition that drives whether fish
      are actively feeding at a given hour &mdash; <strong>sunlight, tide stage, solunar peaks,
      wind, and weather.</strong> We score every hour of every day in your trip, identify
      the windows where signals converge, and surface a daily rating so you know when to
      set the alarm and when to use the day for travel or gear prep.
    </p>

    <div class="pew-legend" role="list">
      <div class="pew-legend-item" role="listitem">
        <span class="pew-legend-swatch pew-tier-best"></span>
        <span>Best Day <small>5&#9733;</small></span>
      </div>
      <div class="pew-legend-item" role="listitem">
        <span class="pew-legend-swatch pew-tier-good"></span>
        <span>Good Day <small>3&ndash;4&#9733;</small></span>
      </div>
      <div class="pew-legend-item" role="listitem">
        <span class="pew-legend-swatch pew-tier-weak"></span>
        <span>Weak Day <small>1&ndash;2&#9733;</small></span>
      </div>
    </div>

    <div class="pew-multi">
      <div class="pew-multi-label">Across Your Trip</div>
      <h3 class="pew-multi-headline">${dayCount} day${dayCount === 1 ? "" : "s"} at ${destStr}</h3>

      <div class="pew-multi-table-head" role="row">
        <div role="columnheader">Day</div>
        <div role="columnheader">Eat Window</div>
        <div role="columnheader">Rating</div>
        <div></div>
      </div>
      ${tableRows}
    </div>

    ${detailCards}
  </section>`;
}

/* ============================================================ */
/*  Day data construction                                         */
/* ============================================================ */

function computeDays(timing, meta, tides, weather) {
  const ONE_DAY_MS = 86400000;
  const start = new Date(timing.start_date + "T12:00:00Z");
  const end = new Date(timing.end_date + "T12:00:00Z");
  if (isNaN(start) || isNaN(end) || end < start) return [];

  const days = [];
  for (let t = start.getTime(); t <= end.getTime(); t += ONE_DAY_MS) {
    const d = new Date(t);
    const dateISO = d.toISOString().slice(0, 10);
    if (days.length >= 7) break; // PR #19 cap

    const solunar = computeSolunar(d, meta.lat, meta.lon, meta.tz);
    const tideDay = (tides || []).find((td) => td.date === dateISO) || null;
    const weatherDay = (weather || []).find((wd) => wd.date === dateISO) || null;

    const { hourScores, windows, rating, tier } = scoreDay({
      date: d,
      meta,
      solunar,
      tide: tideDay,
      weather: weatherDay,
    });

    days.push({
      date: d,
      dateISO,
      meta,
      solunar,
      tide: tideDay,
      weather: weatherDay,
      hourScores,
      windows,
      rating,
      tier,
    });
  }
  return days;
}

/* ============================================================ */
/*  Scoring algorithm                                             */
/* ============================================================ */

/**
 * Score each 15-minute slot of the local day on a 0-5 scale combining
 * light + solunar + tide + wind + weather factors. Identify prime windows
 * as runs of consecutive 15-min slots where score >= PRIME_THRESHOLD.
 */
const PRIME_THRESHOLD = 3.2;        // score above this counts as "prime"
const MIN_WINDOW_MINUTES = 45;      // shorter spikes don't count as a window
const SLOT_MINUTES = 15;
const SLOTS_PER_DAY = (24 * 60) / SLOT_MINUTES;  // 96

function scoreDay({ date, meta, solunar, tide, weather }) {
  // Pre-compute helpers
  const dayStartUtcMs = localMidnightUtcMs(date, meta.tz);
  const slots = [];

  for (let i = 0; i < SLOTS_PER_DAY; i++) {
    const slotMs = dayStartUtcMs + i * SLOT_MINUTES * 60 * 1000;
    const slotDate = new Date(slotMs);

    const light = lightFactor(slotDate, solunar, meta.tz);
    const solu = solunarFactor(slotDate, solunar);
    const tideF = tideFactor(slotDate, tide);
    const wind = windFactor(slotDate, weather);
    const wx = weatherFactor(slotDate, weather);

    // Weighted sum, max 5.0
    const score = light * 1.0 + solu * 1.2 + tideF * 1.0 + wind * 1.2 + wx * 0.6;
    slots.push({
      ms: slotMs,
      score,
      factors: { light, solu, tideF, wind, wx },
    });
  }

  // Identify prime windows
  const windows = findPrimeWindows(slots, meta);

  // Daily rating = average of top N slots' scores (N = ~3 hours / 15 min = 12)
  const sortedScores = slots.map((s) => s.score).sort((a, b) => b - a);
  const topN = sortedScores.slice(0, 12);
  const avgTop = topN.reduce((a, b) => a + b, 0) / topN.length;
  // Round to nearest 0.5
  const rating = Math.max(1, Math.min(5, Math.round(avgTop * 2) / 2));
  // Tier mapping
  let tier;
  if (rating >= 4.5) tier = "best";
  else if (rating >= 3.0) tier = "good";
  else tier = "weak";

  return { hourScores: slots, windows, rating, tier };
}

function lightFactor(date, solunar, tz) {
  if (!solunar.sunrise || !solunar.sunset) return 0.6; // unknown → middle
  const t = date.getTime();
  const sr = solunar.sunrise.getTime();
  const ss = solunar.sunset.getTime();
  if (t < sr - 30 * 60 * 1000 || t > ss + 30 * 60 * 1000) return 0; // before twilight / after dusk
  if (t < sr) return 0.4; // civil dawn
  if (t > ss) return 0.4; // civil dusk
  // During daylight: full credit. Slightly higher at golden hours.
  const hoursAfterSunrise = (t - sr) / 3600000;
  const hoursBeforeSunset = (ss - t) / 3600000;
  if (hoursAfterSunrise < 2 || hoursBeforeSunset < 2) return 1.0; // golden hours
  return 0.85; // middle of day
}

function solunarFactor(date, solunar) {
  const t = date.getTime();
  for (const w of solunar.windows || []) {
    if (t >= w.start.getTime() && t <= w.end.getTime()) {
      return w.kind === "major" ? 1.0 : 0.6;
    }
  }
  return 0.2; // outside all windows
}

function tideFactor(date, tide) {
  if (!tide || !Array.isArray(tide.heights) || tide.heights.length === 0) return 0.5;
  const t = date.getTime();
  // Find the height at this moment + 30 min ago by interpolating the heights array
  const hNow = interpHeight(tide.heights, t);
  const hAgo = interpHeight(tide.heights, t - 30 * 60 * 1000);
  if (hNow == null || hAgo == null) return 0.5;
  const range = (tide.range_m && tide.range_m > 0.1) ? tide.range_m : 0.5;
  const deltaPctPer30Min = Math.abs(hNow - hAgo) / range;
  // Steep movement = more feeding; slack = less
  if (deltaPctPer30Min > 0.10) return 1.0;   // strong current
  if (deltaPctPer30Min > 0.05) return 0.85;  // moderate
  if (deltaPctPer30Min > 0.02) return 0.65;  // gentle
  return 0.35; // near slack
}

function interpHeight(heights, atMs) {
  // heights = [{ dt: unix_seconds, height: number }, ...]
  if (!heights.length) return null;
  const samples = heights.map((h) => ({ ms: h.dt * 1000, h: h.height }));
  if (atMs <= samples[0].ms) return samples[0].h;
  if (atMs >= samples[samples.length - 1].ms) return samples[samples.length - 1].h;
  for (let i = 1; i < samples.length; i++) {
    if (atMs <= samples[i].ms) {
      const a = samples[i - 1];
      const b = samples[i];
      const frac = (atMs - a.ms) / (b.ms - a.ms);
      return a.h + (b.h - a.h) * frac;
    }
  }
  return null;
}

function windFactor(date, weather) {
  if (!weather || !Array.isArray(weather.hours) || weather.hours.length === 0) return 0.7;
  const ms = date.getTime();
  // Find the closest hour
  let closest = null;
  let bestDiff = Infinity;
  for (const h of weather.hours) {
    const hMs = new Date(h.time).getTime();
    const diff = Math.abs(hMs - ms);
    if (diff < bestDiff) {
      bestDiff = diff;
      closest = h;
    }
  }
  if (!closest || closest.windSpeed == null) return 0.7;
  const kts = closest.windSpeed * KT_PER_MS;
  if (kts < 8) return 1.0;
  if (kts < 12) return 0.85;
  if (kts < 15) return 0.55;
  if (kts < 18) return 0.25;
  return 0.0; // unfishable
}

function weatherFactor(date, weather) {
  if (!weather || !Array.isArray(weather.hours) || weather.hours.length === 0) return 1.0;
  const ms = date.getTime();
  let closest = null;
  let bestDiff = Infinity;
  for (const h of weather.hours) {
    const hMs = new Date(h.time).getTime();
    const diff = Math.abs(hMs - ms);
    if (diff < bestDiff) {
      bestDiff = diff;
      closest = h;
    }
  }
  if (!closest) return 1.0;
  const precip = closest.precipitation ?? 0;
  if (precip >= 5) return 0.0;     // heavy rain / squall
  if (precip >= 1) return 0.4;     // moderate rain
  if (precip >= 0.2) return 0.8;   // light drizzle
  return 1.0;
}

/**
 * Find prime windows: runs of slots where score >= threshold.
 * Returns top 3 windows by mean score.
 */
function findPrimeWindows(slots, meta) {
  const windows = [];
  let runStart = -1;
  for (let i = 0; i <= slots.length; i++) {
    const above = i < slots.length && slots[i].score >= PRIME_THRESHOLD;
    if (above && runStart === -1) runStart = i;
    if (!above && runStart !== -1) {
      const lengthSlots = i - runStart;
      const lengthMin = lengthSlots * SLOT_MINUTES;
      if (lengthMin >= MIN_WINDOW_MINUTES) {
        const segment = slots.slice(runStart, i);
        const meanScore = segment.reduce((a, b) => a + b.score, 0) / segment.length;
        const peakSlot = segment.reduce((max, s) => s.score > max.score ? s : max, segment[0]);
        windows.push({
          startMs: segment[0].ms,
          endMs: segment[segment.length - 1].ms + SLOT_MINUTES * 60 * 1000,
          meanScore,
          peakSlot,
          factorsAtPeak: peakSlot.factors,
        });
      }
      runStart = -1;
    }
  }
  // Sort descending by mean score, take top 3
  windows.sort((a, b) => b.meanScore - a.meanScore);
  const top = windows.slice(0, 3);
  // Generate reasoning for each
  for (const w of top) {
    w.reasoning = describeWindow(w, meta);
    // Window star rating: round mean score to nearest 0.5 then floor to int for stars
    w.stars = Math.max(1, Math.min(5, Math.round(w.meanScore)));
  }
  // Return in time order
  top.sort((a, b) => a.startMs - b.startMs);
  return top;
}

function describeWindow(w, meta) {
  // Use the factors at the peak moment as a tag, plus a one-line summary
  const f = w.factorsAtPeak;
  const tags = [];
  if (f.light >= 0.9) tags.push("golden hour");
  else if (f.light >= 0.5) tags.push("daylight");
  if (f.solu >= 0.9) tags.push("solunar major");
  else if (f.solu >= 0.5) tags.push("solunar minor");
  if (f.tideF >= 0.9) tags.push("strong tide");
  else if (f.tideF >= 0.7) tags.push("moving tide");
  if (f.wind >= 0.9) tags.push("calm wind");
  else if (f.wind >= 0.7) tags.push("light wind");
  if (f.wx < 0.5) tags.push("weather caveat");
  return tags.join(" · ");
}

/* ============================================================ */
/*  Multi-day table row                                           */
/* ============================================================ */

function renderTableRow(day, dayNum, meta) {
  const tierClass = `pew-tier-${day.tier}`;
  const stars = formatStars(day.rating);
  const dateLabel = formatLocalDate(day.date, meta.tz);
  const top = day.windows[0];
  const topTime = top ? formatWindowTime(top, meta.tz) : "&mdash;";
  const topReason = top ? escapeHtml(top.reasoning || "Conditions stack up") : "Limited windows today";

  return `
      <a class="pew-multi-row ${tierClass}" href="#pew-day-${dayNum}" role="row">
        <div class="pew-multi-day" role="cell">${escapeHtml(dateLabel)}</div>
        <div class="pew-multi-eatwindow" role="cell">
          <div class="pew-multi-time">${topTime}</div>
          <div class="pew-multi-reason">${topReason}</div>
        </div>
        <div class="pew-multi-rating" role="cell">${stars}</div>
        <button class="pew-view-btn" aria-label="View ${escapeHtml(dateLabel)} chart" tabindex="-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </a>`;
}

/* ============================================================ */
/*  Per-day detail card                                           */
/* ============================================================ */

function renderDayCard(day, dayNum, dayCount, meta) {
  const tierClass = `pew-tier-${day.tier}`;
  const badge = day.tier === "best" ? "BEST DAY" : day.tier === "good" ? "GOOD DAY" : "WEAK DAY";
  const stars = formatStars(day.rating);
  const dateHeadline = formatLocalDate(day.date, meta.tz, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const subline = describeDay(day);

  const chartSvg = renderDayChart(day, meta);
  const windowsList = renderWindowsList(day, meta);

  return `
    <article class="pew-card ${tierClass}" id="pew-day-${dayNum}">
      <div class="pew-eyebrow-row">
        <div class="pew-eyebrow"><span class="pew-mark"></span>Day ${dayNum} of ${dayCount}</div>
        <div class="pew-rating">${stars} <span class="pew-badge">${badge}</span></div>
      </div>
      <h3 class="pew-day-headline">${escapeHtml(dateHeadline)}</h3>
      <div class="pew-sub">${subline}</div>
      ${chartSvg}
      <div class="pew-windows-label">Prime Windows Today</div>
      ${windowsList}
      <a class="pew-back" href="#prime-eat-window">&uarr; Back to trip summary</a>
    </article>`;
}

function describeDay(day) {
  // Synthesize a 1-line description from the day's data
  const sol = day.solunar;
  const parts = [];
  if (day.tide?.station) parts.push(`<strong>${escapeHtml(day.tide.station)}</strong>`);
  if (sol.rating === "Excellent") parts.push("solunar peak day");
  else if (sol.rating === "Good") parts.push("strong solunar window");
  else if (sol.rating === "Poor") parts.push("weak solunar phase");

  // Pull a wind summary from weather
  if (day.weather?.summary) {
    const s = day.weather.summary;
    const minKt = (s.windMin_ms || 0) * KT_PER_MS;
    const maxKt = (s.windMax_ms || 0) * KT_PER_MS;
    if (maxKt > 0) {
      parts.push(`${Math.round(minKt)}&ndash;${Math.round(maxKt)} kt wind`);
    }
  }
  return parts.length ? parts.join(" &middot; ") : "Conditions analyzed";
}

/* ============================================================ */
/*  Windows list (below the chart on each day card)               */
/* ============================================================ */

function renderWindowsList(day, meta) {
  if (!day.windows.length) {
    return `<div class="pew-windows-empty">No prime windows today. Use the day for travel, gear maintenance, or fly tying.</div>`;
  }
  const items = day.windows.map((w) => {
    const stars = formatStars(w.stars);
    const time = formatWindowTime(w, meta.tz);
    const reason = escapeHtml(w.reasoning || "Conditions align");
    return `
      <li class="pew-window">
        <div class="pew-window-rating">${stars}</div>
        <div class="pew-window-time">${time}</div>
        <div class="pew-window-reason">${reason}</div>
      </li>`;
  }).join("");
  return `<ul class="pew-windows-list">${items}</ul>`;
}

/* ============================================================ */
/*  The 4-row per-day chart                                       */
/* ============================================================ */

const CHART_W = 880;
const CHART_H = 280;
const ROW_HEIGHTS = { light: 50, tide: 60, solunar: 60, wind: 60 };
const ROW_GAP = 8;
// Total: 50+8+60+8+60+8+60 = 254. Plus 13 top hour-scale + 13 bottom = 280

function renderDayChart(day, meta) {
  // X-axis: 0 = local midnight, CHART_W = next local midnight
  // Hour labels at top
  const hourLabels = `
    <g class="pew-chart-axis">
      <text x="0"   y="11" text-anchor="start">12 AM</text>
      <text x="220" y="11" text-anchor="middle">6 AM</text>
      <text x="440" y="11" text-anchor="middle">NOON</text>
      <text x="660" y="11" text-anchor="middle">6 PM</text>
      <text x="${CHART_W}" y="11" text-anchor="end">12 AM</text>
    </g>
    <line x1="0" y1="18" x2="${CHART_W}" y2="18" class="pew-chart-axis-line"/>`;

  // Row positions
  const rowY = {
    light:   25,
    tide:    25 + ROW_HEIGHTS.light + ROW_GAP,
    solunar: 25 + ROW_HEIGHTS.light + ROW_GAP + ROW_HEIGHTS.tide + ROW_GAP,
    wind:    25 + ROW_HEIGHTS.light + ROW_GAP + ROW_HEIGHTS.tide + ROW_GAP + ROW_HEIGHTS.solunar + ROW_GAP,
  };

  const lightRow = renderLightRow(day, meta, rowY.light, ROW_HEIGHTS.light);
  const tideRow = renderTideRow(day, meta, rowY.tide, ROW_HEIGHTS.tide);
  const solunarRow = renderSolunarRow(day, meta, rowY.solunar, ROW_HEIGHTS.solunar);
  const windRow = renderWindRow(day, meta, rowY.wind, ROW_HEIGHTS.wind);

  // HTML overlays for stretched-text-free labels (same fix as PR #22)
  const overlayLabels = renderChartOverlayLabels(day, meta, rowY);

  return `
    <div class="pew-chart-wrap">
      <svg class="pew-chart" viewBox="0 0 ${CHART_W} ${CHART_H}" preserveAspectRatio="none" role="img" aria-label="Prime Eat Window chart for ${escapeHtml(day.dateISO)}">
        ${hourLabels}
        ${lightRow}
        ${tideRow}
        ${solunarRow}
        ${windRow}
      </svg>
      ${overlayLabels}
    </div>`;
}

function renderLightRow(day, meta, y, h) {
  const sol = day.solunar;
  const labelY = y + h / 2 + 3;
  const sr = sol.sunrise ? localDayFraction(sol.sunrise, meta.tz) : null;
  const ss = sol.sunset ? localDayFraction(sol.sunset, meta.tz) : null;

  let band = "";
  if (sr !== null && ss !== null) {
    const x0 = Math.max(0, sr * CHART_W);
    const w = Math.max(0, (ss - sr) * CHART_W);
    band = `<rect x="${x0.toFixed(2)}" y="${y}" width="${w.toFixed(2)}" height="${h}" class="pew-row-light-band"/>`;
  }

  let srTick = "", ssTick = "";
  if (sr !== null) {
    const x = sr * CHART_W;
    srTick = `<line x1="${x.toFixed(2)}" y1="${y - 2}" x2="${x.toFixed(2)}" y2="${y + h + 2}" class="pew-row-light-tick"/>`;
  }
  if (ss !== null) {
    const x = ss * CHART_W;
    ssTick = `<line x1="${x.toFixed(2)}" y1="${y - 2}" x2="${x.toFixed(2)}" y2="${y + h + 2}" class="pew-row-light-tick"/>`;
  }

  return `
    <g class="pew-row pew-row-light">
      <rect x="0" y="${y}" width="${CHART_W}" height="${h}" class="pew-row-bg"/>
      ${band}
      ${srTick}
      ${ssTick}
    </g>`;
}

function renderTideRow(day, meta, y, h) {
  const tide = day.tide;
  if (!tide || !Array.isArray(tide.heights) || tide.heights.length === 0) {
    return `
      <g class="pew-row pew-row-tide">
        <rect x="0" y="${y}" width="${CHART_W}" height="${h}" class="pew-row-bg"/>
        <text x="${CHART_W / 2}" y="${y + h / 2 + 3}" text-anchor="middle" class="pew-row-empty-text">tide data unavailable</text>
      </g>`;
  }

  // Build a tide curve scaled to row dimensions
  const minH = tide.min_m;
  const maxH = tide.max_m;
  const range = Math.max(maxH - minH, 0.1);
  const padY = 6;
  const pts = tide.heights.map((p, i) => {
    const x = (i / Math.max(tide.heights.length - 1, 1)) * CHART_W;
    const yNorm = (maxH - p.height) / range;
    const yy = y + padY + yNorm * (h - 2 * padY);
    return `${x.toFixed(2)},${yy.toFixed(2)}`;
  });
  const linePath = `M ${pts.join(" L ")}`;
  const fillPath = `M ${pts[0]} L ${pts.slice(1).join(" L ")} L ${CHART_W},${y + h} L 0,${y + h} Z`;

  // Extreme circles
  const circles = (tide.extremes || []).map((e) => {
    const ts = new Date(e.dt * 1000);
    const frac = localDayFraction(ts, meta.tz);
    if (frac === null || frac < -0.02 || frac > 1.02) return "";
    const clamped = Math.max(0, Math.min(1, frac));
    const x = clamped * CHART_W;
    const yNorm = (maxH - e.height) / range;
    const yy = y + padY + yNorm * (h - 2 * padY);
    const isHigh = (e.type || "").toLowerCase() === "high";
    return `<circle cx="${x.toFixed(2)}" cy="${yy.toFixed(2)}" r="2" class="pew-tide-extreme-${isHigh ? "high" : "low"}"/>`;
  }).join("");

  return `
    <g class="pew-row pew-row-tide">
      <rect x="0" y="${y}" width="${CHART_W}" height="${h}" class="pew-row-bg"/>
      <path d="${fillPath}" class="pew-row-tide-fill"/>
      <path d="${linePath}" class="pew-row-tide-line"/>
      ${circles}
    </g>`;
}

function renderSolunarRow(day, meta, y, h) {
  const sol = day.solunar;
  const padY = 4;
  let rects = "";
  for (const w of sol.windows || []) {
    const startFrac = localDayFraction(w.start, meta.tz);
    const endFrac = localDayFraction(w.end, meta.tz);
    if (startFrac === null || endFrac === null) continue;
    // Clamp to day
    const a = Math.max(0, Math.min(1, startFrac));
    const b = Math.max(0, Math.min(1, endFrac));
    if (b <= a) continue;
    const x = a * CHART_W;
    const ww = (b - a) * CHART_W;
    const cls = w.kind === "major" ? "pew-row-solunar-major" : "pew-row-solunar-minor";
    const yy = y + padY;
    const hh = h - 2 * padY;
    rects += `<rect x="${x.toFixed(2)}" y="${yy}" width="${ww.toFixed(2)}" height="${hh}" rx="2" class="${cls}"/>`;
  }
  // Moon transit tick
  let transitTick = "";
  if (sol.upperTransit) {
    const frac = localDayFraction(sol.upperTransit, meta.tz);
    if (frac !== null && frac >= 0 && frac <= 1) {
      const x = frac * CHART_W;
      transitTick = `<line x1="${x.toFixed(2)}" y1="${y - 1}" x2="${x.toFixed(2)}" y2="${y + h + 1}" class="pew-row-solunar-transit"/>`;
    }
  }
  return `
    <g class="pew-row pew-row-solunar">
      <rect x="0" y="${y}" width="${CHART_W}" height="${h}" class="pew-row-bg"/>
      ${rects}
      ${transitTick}
    </g>`;
}

const CASTABLE_THRESHOLD_KTS = 15;
const MAX_WIND_KTS_CHART = 25;

function renderWindRow(day, meta, y, h) {
  const wx = day.weather;
  if (!wx || !Array.isArray(wx.hours) || wx.hours.length === 0) {
    // Same tone as PR #47's Weather-section empty state: honest, actionable.
    // Kept compact so it fits the single-row SVG viewport at chart-width scale.
    return `
      <g class="pew-row pew-row-wind">
        <rect x="0" y="${y}" width="${CHART_W}" height="${h}" class="pew-row-bg"/>
        <text x="${CHART_W / 2}" y="${y + h / 2 + 3}" text-anchor="middle" class="pew-row-empty-text">Beyond 10-day forecast window</text>
      </g>`;
  }
  // Sort hours by time, map to (x, y) where y is wind speed (knots)
  const sorted = wx.hours.slice().sort((a, b) => new Date(a.time) - new Date(b.time));
  const n = sorted.length;
  const padY = 6;
  const pts = sorted.map((hh, i) => {
    const x = (i / Math.max(n - 1, 1)) * CHART_W;
    const ktsRaw = (hh.windSpeed || 0) * KT_PER_MS;
    const kts = Math.min(ktsRaw, MAX_WIND_KTS_CHART);
    const yNorm = 1 - kts / MAX_WIND_KTS_CHART;
    const yy = y + padY + yNorm * (h - 2 * padY);
    return { x, y: yy, kts };
  });
  const fillPath = `M ${pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" L ")} L ${CHART_W},${y + h} L 0,${y + h} Z`;
  const linePath = `M ${pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" L ")}`;

  // Threshold line position
  const thresholdY = y + padY + (1 - CASTABLE_THRESHOLD_KTS / MAX_WIND_KTS_CHART) * (h - 2 * padY);
  const thresholdLine = `<line x1="0" y1="${thresholdY.toFixed(2)}" x2="${CHART_W}" y2="${thresholdY.toFixed(2)}" class="pew-row-wind-threshold"/>`;

  // Rust segments: where wind > threshold
  const rustPaths = [];
  let segStart = null;
  for (let i = 0; i < pts.length; i++) {
    const above = pts[i].kts > CASTABLE_THRESHOLD_KTS;
    if (above && segStart === null) segStart = i;
    if ((!above || i === pts.length - 1) && segStart !== null) {
      const endIdx = above ? i : i - 1;
      if (endIdx >= segStart) {
        const seg = pts.slice(segStart, endIdx + 1);
        const p = `M ${seg[0].x.toFixed(2)},${thresholdY.toFixed(2)} L ${seg.map(s => `${s.x.toFixed(2)},${s.y.toFixed(2)}`).join(" L ")} L ${seg[seg.length - 1].x.toFixed(2)},${thresholdY.toFixed(2)} Z`;
        rustPaths.push(p);
      }
      segStart = null;
    }
  }

  return `
    <g class="pew-row pew-row-wind">
      <rect x="0" y="${y}" width="${CHART_W}" height="${h}" class="pew-row-bg"/>
      <path d="${fillPath}" class="pew-row-wind-fill"/>
      ${rustPaths.map(p => `<path d="${p}" class="pew-row-wind-rust"/>`).join("")}
      ${thresholdLine}
      <path d="${linePath}" class="pew-row-wind-line"/>
    </g>`;
}

/**
 * Render HTML overlay labels for each row (row labels on the left,
 * sunrise/sunset times, etc.) — same fix as PR #22, avoids SVG text stretching.
 */
function renderChartOverlayLabels(day, meta, rowY) {
  const meta_ = meta;
  const sol = day.solunar;
  const labels = [];

  // Row labels (left edge) — positioned with absolute left:0 outside the chart container
  // Actually, the chart is full-width — labels go INSIDE the chart at left edge.
  const rowLabels = [
    { y: rowY.light + ROW_HEIGHTS.light / 2, text: "LIGHT" },
    { y: rowY.tide + ROW_HEIGHTS.tide / 2, text: "TIDE" },
    { y: rowY.solunar + ROW_HEIGHTS.solunar / 2, text: "SOLUNAR" },
    { y: rowY.wind + ROW_HEIGHTS.wind / 2, text: "WIND" },
  ];
  for (const r of rowLabels) {
    const topPct = (r.y / CHART_H) * 100;
    labels.push(`<span class="pew-chart-row-label" style="top:${topPct.toFixed(2)}%">${r.text}</span>`);
  }

  // Sunrise / sunset times
  if (sol.sunrise) {
    const frac = localDayFraction(sol.sunrise, meta_.tz);
    if (frac !== null) {
      const leftPct = frac * 100;
      const topPct = ((rowY.light + ROW_HEIGHTS.light + 4) / CHART_H) * 100;
      labels.push(`<span class="pew-chart-marker pew-chart-marker-sand" style="left:${leftPct.toFixed(2)}%; top:${topPct.toFixed(2)}%">&uarr; ${escapeHtml(formatLocalTime(sol.sunrise, meta_.tz, { hour: "numeric", minute: "2-digit", hour12: false }))}</span>`);
    }
  }
  if (sol.sunset) {
    const frac = localDayFraction(sol.sunset, meta_.tz);
    if (frac !== null) {
      const leftPct = frac * 100;
      const topPct = ((rowY.light + ROW_HEIGHTS.light + 4) / CHART_H) * 100;
      labels.push(`<span class="pew-chart-marker pew-chart-marker-sand" style="left:${leftPct.toFixed(2)}%; top:${topPct.toFixed(2)}%">&darr; ${escapeHtml(formatLocalTime(sol.sunset, meta_.tz, { hour: "numeric", minute: "2-digit", hour12: false }))}</span>`);
    }
  }

  // Tide H/L labels — positioned next to the tide row extremes
  for (const e of day.tide?.extremes || []) {
    const ts = new Date(e.dt * 1000);
    const frac = localDayFraction(ts, meta_.tz);
    if (frac === null || frac < -0.02 || frac > 1.02) continue;
    const clamped = Math.max(0, Math.min(1, frac));
    const leftPct = clamped * 100;
    const isHigh = (e.type || "").toLowerCase() === "high";
    const tideRowBottom = rowY.tide + ROW_HEIGHTS.tide;
    const topPct = ((tideRowBottom - 14) / CHART_H) * 100;
    const cls = `pew-chart-marker pew-chart-marker-tide ${isHigh ? "pew-chart-marker-sand" : "pew-chart-marker-ocean"}`;
    const label = `${isHigh ? "H" : "L"} ${formatLocalTime(ts, meta_.tz, { hour: "numeric", minute: "2-digit", hour12: false }).replace(/^(\d):/, "0$1:")}`;
    labels.push(`<span class="${cls}" style="left:${leftPct.toFixed(2)}%; top:${topPct.toFixed(2)}%">${escapeHtml(label)}</span>`);
  }

  // Moon transit label
  if (sol.upperTransit) {
    const frac = localDayFraction(sol.upperTransit, meta_.tz);
    if (frac !== null && frac >= 0 && frac <= 1) {
      const leftPct = frac * 100;
      const topPct = ((rowY.solunar + ROW_HEIGHTS.solunar + 4) / CHART_H) * 100;
      labels.push(`<span class="pew-chart-marker pew-chart-marker-ocean" style="left:${leftPct.toFixed(2)}%; top:${topPct.toFixed(2)}%">&#9789; ${escapeHtml(formatLocalTime(sol.upperTransit, meta_.tz, { hour: "numeric", minute: "2-digit", hour12: false }))}</span>`);
    }
  }

  return `<div class="pew-chart-overlay">${labels.join("")}</div>`;
}

/* ============================================================ */
/*  Helpers                                                       */
/* ============================================================ */

function formatStars(rating) {
  const filled = Math.max(0, Math.min(5, Math.floor(rating + 0.25)));
  const empty = 5 - filled;
  return `<span class="pew-stars">${"★".repeat(filled)}<span class="pew-stars-empty">${"★".repeat(empty)}</span></span>`;
}

function formatWindowTime(w, tz) {
  const start = new Date(w.startMs);
  const end = new Date(w.endMs);
  const fmt = (d) => formatLocalTime(d, tz, { hour: "numeric", minute: "2-digit", hour12: false }).replace(/^(\d):/, "0$1:");
  return `${fmt(start)} &ndash; ${fmt(end)}`;
}

function localMidnightUtcMs(date, tz) {
  // Convert the local-time midnight of date's local-tz day to a UTC ms timestamp
  const dateISO = date.toISOString().slice(0, 10);
  // We approximate: find UTC midnight, then find what hour it shows in local tz, derive offset
  const [y, m, d] = dateISO.split("-").map(Number);
  const utcMidnight = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour: "numeric", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const parts = fmt.formatToParts(utcMidnight);
  const px = Object.fromEntries(parts.filter(p => p.type !== "literal").map(p => [p.type, p.value]));
  const hh = parseInt(px.hour, 10) === 24 ? 0 : parseInt(px.hour, 10);
  const mm = parseInt(px.minute, 10);
  const offsetMin = hh * 60 + mm;
  if (offsetMin < 12 * 60) return utcMidnight.getTime() - offsetMin * 60 * 1000;
  return utcMidnight.getTime() + (24 * 60 - offsetMin) * 60 * 1000;
}

function formatDestination(dest) {
  if (!dest) return "Your Trip";
  if (typeof dest === "string") return dest;
  return [dest.area, dest.island, dest.country].filter(Boolean).join(" · ") || "Your Trip";
}

function escapeHtml(s) {
  if (typeof s !== "string") return "";
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
