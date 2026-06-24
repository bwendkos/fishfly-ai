/**
 * WorldTides API client + Netlify Blobs caching layer.
 *
 * One call returns 24 hours of tide-height samples (every 10 min) plus the
 * high/low extreme markers for a given <lat, lon, date>. We cache by
 * <lat (2-decimal), lon (2-decimal), date>, so:
 *   - 10 anglers submitting reports for Andros on 2026-11-17 = 1 WorldTides call
 *   - Astronomical predictions are stable enough that a 30-day TTL is safe
 *
 * Free tier: ~100 requests/day. With caching the typical Trip Scout cost is
 * 1 call per (destination + date) combination per 30-day window.
 *
 * API docs: https://www.worldtides.info/apidocs
 *
 * Required environment variable: WORLDTIDES_API_KEY
 *
 * Consumed by:
 *   - netlify/functions/scout-generate-background.mjs (fetches per trip day)
 *   - scout-lib/render-tide-chart.mjs (renders from pre-fetched data)
 */

import { getStore } from "@netlify/blobs";

const API_BASE = "https://www.worldtides.info/api/v3";
const CACHE_STORE = "tide-cache";
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Fetch one day of tide data for a specific lat/lon/date.
 *
 * date: "YYYY-MM-DD" string in LOCAL time at the destination. WorldTides
 *       interprets the date relative to the lat/lon's timezone, so heights
 *       returned span local-midnight to local-midnight.
 *
 * Returns:
 *   {
 *     heights:   [{ dt: 1782273600, date: "2026-11-17T05:00+0000", height: 0.45 }, ...],
 *     extremes:  [{ dt: 1782287520, date: "2026-11-17T07:45+0000", height: 0.95, type: "High" }, ...],
 *     station:   "Fresh Creek",
 *     stationDistance: 12.4,
 *     _cachedAt: 1234567890123  // for TTL checks
 *   }
 *
 * Throws on network/auth errors. Caller (scout-generate-background) catches.
 */
export async function fetchTideDay({ lat, lon, date, apiKey }) {
  if (!apiKey) throw new Error("WORLDTIDES_API_KEY not configured");
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new Error(`worldtides: invalid lat/lon (${lat}, ${lon})`);
  }
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`worldtides: invalid date '${date}' (need YYYY-MM-DD)`);
  }

  // Bucket lat/lon to 2 decimals (~1 km granularity — within tide-station
  // accuracy). Improves cache hit rate when multiple anglers pick the same
  // destination (since destination meta uses a single centroid per region).
  const latB = (Math.round(lat * 100) / 100).toFixed(2);
  const lonB = (Math.round(lon * 100) / 100).toFixed(2);
  const cacheKey = `${latB}_${lonB}_${date}`;

  const cache = getStore(CACHE_STORE);
  try {
    const cached = await cache.get(cacheKey, { type: "json" });
    if (cached && cached._cachedAt && Date.now() - cached._cachedAt < CACHE_TTL_MS) {
      return cached;
    }
  } catch (e) {
    // Cache miss / read error is non-fatal — fall through to live API.
    console.warn("[worldtides] cache read failed:", e?.message);
  }

  const url = new URL(API_BASE);
  url.searchParams.set("heights", "");
  url.searchParams.set("extremes", "");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("lat", latB);
  url.searchParams.set("lon", lonB);
  url.searchParams.set("date", date);
  url.searchParams.set("length", "86400"); // 24 hours
  url.searchParams.set("step", "600");     // 10-min height samples
  url.searchParams.set("datum", "MLLW");   // standard chart datum

  const r = await fetch(url.toString(), { method: "GET" });
  if (!r.ok) {
    const body = await r.text().catch(() => "");
    throw new Error(`WorldTides HTTP ${r.status}: ${body.slice(0, 240)}`);
  }
  const data = await r.json();
  if (data.status !== 200) {
    throw new Error(`WorldTides error: ${JSON.stringify(data).slice(0, 240)}`);
  }

  const result = {
    heights: Array.isArray(data.heights) ? data.heights : [],
    extremes: Array.isArray(data.extremes) ? data.extremes : [],
    station: data.station || null,
    stationDistance: typeof data.stationDistance === "number" ? data.stationDistance : null,
    _cachedAt: Date.now(),
  };

  try {
    await cache.setJSON(cacheKey, result);
  } catch (e) {
    // Cache write failure is non-fatal — log and move on.
    console.warn("[worldtides] cache write failed:", e?.message);
  }

  return result;
}

/**
 * Fetch tide data for every day in a trip's date range.
 *
 * Returns an array of per-day records, one per trip day. Each record includes
 * the raw heights/extremes plus summary stats (min, max, range) for chart
 * rendering. Days that fail to fetch are returned with `error` set and empty
 * arrays — the renderer skips them gracefully.
 */
export async function fetchTidesForTrip({ lat, lon, dates, apiKey }) {
  if (!Array.isArray(dates) || dates.length === 0) return [];
  const out = [];
  for (const date of dates) {
    try {
      const day = await fetchTideDay({ lat, lon, date, apiKey });
      const hs = day.heights.map((h) => h.height).filter((v) => Number.isFinite(v));
      const minH = hs.length ? Math.min(...hs) : null;
      const maxH = hs.length ? Math.max(...hs) : null;
      out.push({
        date,
        heights: day.heights,
        extremes: day.extremes,
        min_m: minH,
        max_m: maxH,
        range_m: minH !== null && maxH !== null ? maxH - minH : null,
        station: day.station,
        station_distance_km: day.stationDistance,
      });
    } catch (err) {
      console.error(`[worldtides] day fetch failed for ${date}:`, err?.message);
      out.push({ date, error: err?.message || "fetch failed", heights: [], extremes: [] });
    }
  }
  return out;
}

/**
 * Compute the ISO local-date strings for each day of a trip.
 * Only returns dates for exact-mode trips — month/flexible modes don't have
 * specific dates to chart.
 *
 * Capped at 7 days (matches the intake cap from PR #19).
 */
export function tripDates(timing) {
  if (!timing) return [];
  if (timing.mode !== "exact" || !timing.start_date || !timing.end_date) return [];

  const start = new Date(timing.start_date + "T12:00:00Z");
  const end = new Date(timing.end_date + "T12:00:00Z");
  if (isNaN(start) || isNaN(end) || end < start) return [];

  const ONE_DAY = 86400000;
  const out = [];
  for (let t = start.getTime(); t <= end.getTime(); t += ONE_DAY) {
    const d = new Date(t);
    out.push(d.toISOString().slice(0, 10));
    if (out.length >= 7) break; // hard cap (matches PR #19)
  }
  return out;
}
