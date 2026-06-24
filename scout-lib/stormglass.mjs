/**
 * StormGlass API client + Netlify Blobs caching layer.
 *
 * One call returns hourly weather data for the ENTIRE trip range (up to
 * 10 days max). We cache the response by <lat-bucket, lon-bucket,
 * startDate, endDate>. So:
 *   - A 5-day Andros intake = 1 API call (~7 of 10 daily on free tier)
 *   - 10 anglers asking about the same destination + same week = 1 call
 *   - 12-hour TTL refreshes the forecast twice per day, plenty for trip
 *     planning (anglers read the report once and act on it)
 *
 * Free tier: 10 requests/day. Paid tier: $19/mo for 10k/month.
 *
 * API docs: https://docs.stormglass.io/
 *
 * Required environment variable: STORMGLASS_API_KEY
 *
 * Consumed by:
 *   - netlify/functions/scout-generate-background.mjs (one call per trip)
 *   - scout-lib/render-weather-chart.mjs (renders from pre-fetched data)
 */

import { getStore } from "@netlify/blobs";

const API_URL = "https://api.stormglass.io/v2/weather/point";
const CACHE_STORE = "weather-cache";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

// Variables we fetch from StormGlass. Each is a single API param.
// Cost: still 1 request regardless of how many params.
const PARAMS = [
  "windSpeed",        // m/s — primary signal
  "windDirection",    // degrees, meteorological (where wind FROM)
  "gust",             // m/s
  "airTemperature",   // °C
  "precipitation",    // mm/hour
  "cloudCover",       // %
  "waveHeight",       // m
];

/**
 * Fetch weather data for the entire trip range in one call.
 *
 * startDate / endDate: "YYYY-MM-DD" strings in LOCAL time at the destination.
 *   We convert to UTC timestamps that span local-midnight to local-midnight
 *   using the destination's IANA timezone.
 *
 * Returns:
 *   {
 *     hours: [
 *       {
 *         time: "2026-11-17T05:00:00+00:00",  // UTC ISO
 *         windSpeed:     5.95,    // m/s, blended ("sg")
 *         windDirection: 124,     // degrees from
 *         gust:          8.08,    // m/s
 *         airTemperature: 28.2,   // °C
 *         precipitation: 0.01,    // mm/h
 *         cloudCover:    4.1,     // %
 *         waveHeight:    0.45,    // m
 *       },
 *       ...
 *     ],
 *     meta: { cost, dailyQuota, requestCount, ... },
 *     _cachedAt: 1234567890123,
 *   }
 *
 * Throws on network/auth errors. Caller (scout-generate-background) catches
 * so the report still generates even when StormGlass is down.
 */
export async function fetchWeatherForTripRange({ lat, lon, tz, startDate, endDate, apiKey }) {
  if (!apiKey) throw new Error("STORMGLASS_API_KEY not configured");
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new Error(`stormglass: invalid lat/lon (${lat}, ${lon})`);
  }
  if (!startDate || !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    throw new Error(`stormglass: invalid startDate '${startDate}'`);
  }
  if (!endDate || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
    throw new Error(`stormglass: invalid endDate '${endDate}'`);
  }

  // Convert local midnight at the destination to UTC Unix timestamps
  const start = localMidnightToUtcTimestamp(startDate, tz);
  // End is exclusive — we want through end-of-endDate, which is midnight of
  // the NEXT day at the destination.
  const end = localMidnightToUtcTimestamp(addDays(endDate, 1), tz);
  if (!start || !end || end <= start) {
    throw new Error(`stormglass: bad time range ${startDate} -> ${endDate} (tz=${tz})`);
  }

  // Cache key: lat/lon bucketed to 2 decimals + the date range
  const latB = (Math.round(lat * 100) / 100).toFixed(2);
  const lonB = (Math.round(lon * 100) / 100).toFixed(2);
  const cacheKey = `${latB}_${lonB}_${startDate}_${endDate}`;

  const cache = getStore(CACHE_STORE);
  try {
    const cached = await cache.get(cacheKey, { type: "json" });
    if (cached && cached._cachedAt && Date.now() - cached._cachedAt < CACHE_TTL_MS) {
      return cached;
    }
  } catch (e) {
    console.warn("[stormglass] cache read failed:", e?.message);
  }

  const url = new URL(API_URL);
  url.searchParams.set("lat", latB);
  url.searchParams.set("lng", lonB);
  url.searchParams.set("params", PARAMS.join(","));
  url.searchParams.set("start", String(start));
  url.searchParams.set("end", String(end));

  const r = await fetch(url.toString(), {
    method: "GET",
    headers: { Authorization: apiKey },
  });
  if (!r.ok) {
    const body = await r.text().catch(() => "");
    throw new Error(`StormGlass HTTP ${r.status}: ${body.slice(0, 240)}`);
  }
  const data = await r.json();
  if (!Array.isArray(data.hours)) {
    throw new Error(`StormGlass: unexpected response shape: ${JSON.stringify(data).slice(0, 240)}`);
  }

  // Normalize: each var.sg is the blended best-pick — flatten to a scalar per
  // hour to keep the cached payload small and the renderer simple.
  const flatHours = data.hours.map((h) => {
    const out = { time: h.time };
    for (const p of PARAMS) {
      const v = h[p];
      if (v && typeof v === "object") {
        // Prefer 'sg' (StormGlass blended); fall back to first available source
        out[p] = typeof v.sg === "number" ? v.sg
          : typeof v.noaa === "number" ? v.noaa
          : typeof v.ecmwf === "number" ? v.ecmwf
          : null;
      } else {
        out[p] = null;
      }
    }
    return out;
  });

  const result = {
    hours: flatHours,
    meta: data.meta || {},
    _cachedAt: Date.now(),
  };

  try {
    await cache.setJSON(cacheKey, result);
  } catch (e) {
    console.warn("[stormglass] cache write failed:", e?.message);
  }

  return result;
}

/**
 * Split the per-hour weather array into per-day arrays for chart rendering.
 *
 * Each day spans local-midnight to local-midnight at the destination's tz.
 * Hours that fall outside the day's window get dropped. Returns an array
 * of { date, hours, summary } objects.
 */
export function splitWeatherByDay({ weather, dates, tz }) {
  if (!weather?.hours || !Array.isArray(dates)) return [];

  const dayBuckets = new Map();
  for (const d of dates) dayBuckets.set(d, []);

  for (const h of weather.hours) {
    const localDate = utcToLocalDateString(h.time, tz);
    if (dayBuckets.has(localDate)) {
      dayBuckets.get(localDate).push(h);
    }
  }

  return dates.map((date) => {
    const hours = dayBuckets.get(date) || [];
    return { date, hours, summary: summarizeDay(hours) };
  });
}

/**
 * Compute summary stats for a single day's hours (used by the chart and the
 * per-day "X kt SE morning, Y kt E afternoon" label).
 */
function summarizeDay(hours) {
  if (!hours.length) return null;
  const winds = hours.map((h) => h.windSpeed).filter((v) => Number.isFinite(v));
  const gusts = hours.map((h) => h.gust).filter((v) => Number.isFinite(v));
  const temps = hours.map((h) => h.airTemperature).filter((v) => Number.isFinite(v));
  const waves = hours.map((h) => h.waveHeight).filter((v) => Number.isFinite(v));
  const precip = hours.map((h) => h.precipitation).filter((v) => Number.isFinite(v));
  return {
    windMin_ms: winds.length ? Math.min(...winds) : null,
    windMax_ms: winds.length ? Math.max(...winds) : null,
    gustMax_ms: gusts.length ? Math.max(...gusts) : null,
    tempMin_C:  temps.length ? Math.min(...temps) : null,
    tempMax_C:  temps.length ? Math.max(...temps) : null,
    waveMax_m:  waves.length ? Math.max(...waves) : null,
    precipTotal_mm: precip.length ? precip.reduce((a, b) => a + b, 0) : 0,
    precipPeak_mmh: precip.length ? Math.max(...precip) : 0,
  };
}

/* ============================================================ */
/*  Time helpers                                                  */
/* ============================================================ */

/**
 * Convert local-midnight at a destination to a UTC Unix timestamp (seconds).
 * Uses Intl.DateTimeFormat to find the wall-clock-to-UTC offset for the date.
 */
function localMidnightToUtcTimestamp(dateStr, tz) {
  if (!dateStr || !tz) return null;
  // Build a Date at UTC midnight, then compute how the destination tz would
  // display that moment. The difference is the offset.
  const [y, m, d] = dateStr.split("-").map(Number);
  const utcMidnight = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
  // What hour/minute does that UTC moment display in the destination tz?
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "numeric", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const parts = fmt.formatToParts(utcMidnight);
  const px = Object.fromEntries(parts.filter(p => p.type !== "literal").map(p => [p.type, p.value]));
  // If the destination shows 19:00 when UTC is 00:00, offset is -5 hours.
  const dispH = parseInt(px.hour, 10) === 24 ? 0 : parseInt(px.hour, 10);
  const dispM = parseInt(px.minute, 10);
  // We want local midnight (00:00). UTC = local - offset. So:
  //   localMidnightUTC = UTC midnight - (displayedHour:displayedMinute - 0:00)
  const offsetMinutes = dispH * 60 + dispM;
  // Edge case: if displayed hour is past noon (e.g. 19:00), the offset is
  // negative — meaning the destination is BEHIND UTC. localMidnight in UTC
  // would be later than UTC midnight by (24 - displayedHour) hours.
  let localMidnightUtcMs;
  if (offsetMinutes < 12 * 60) {
    // Destination is ahead of UTC (e.g. tz=+5, displayed 05:00 at UTC 00:00)
    localMidnightUtcMs = utcMidnight.getTime() - offsetMinutes * 60 * 1000;
  } else {
    // Destination is behind UTC (e.g. tz=-5, displayed 19:00 at UTC 00:00)
    localMidnightUtcMs = utcMidnight.getTime() + (24 * 60 - offsetMinutes) * 60 * 1000;
  }
  return Math.floor(localMidnightUtcMs / 1000);
}

function addDays(dateStr, n) {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function utcToLocalDateString(utcIso, tz) {
  const d = new Date(utcIso);
  if (isNaN(d)) return null;
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
  });
  // en-CA gives "YYYY-MM-DD" directly
  return fmt.format(d);
}
