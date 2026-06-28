/**
 * GET /eat-window/api/geocode?q=<query>
 *
 * Mapbox Geocoding proxy for the Bite Window location autocomplete.
 *
 * Why proxy instead of calling Mapbox directly from the browser:
 *   - Token stays on the server (no need to URL-restrict it in Mapbox dashboard)
 *   - We can shape the response to what the autocomplete UI needs
 *   - We restrict the search to known saltwater fishing countries (50 ISO codes)
 *     so users typing generic place names get coastal matches biased correctly
 *   - Future: we can layer in coastal-only filtering at this step
 *
 * Free tier: 100,000 Mapbox geocoding requests/month. With debounced typing
 * (250ms), typical autocomplete burns ~5-10 requests per user query.
 *
 * Required env var: MAPBOX_TOKEN (public-token "pk." format is fine — token
 * never leaves the server, so URL restrictions in Mapbox dashboard are
 * optional but recommended as defense in depth).
 */

const COUNTRY_FILTER = [
  // Caribbean & Bahamas
  "us", "bs", "tc", "ky", "cw", "aw", "bb", "vg", "vi", "pr", "do", "cu", "jm",
  // Central America
  "bz", "mx", "hn", "ni", "cr", "pa",
  // South America (Atlantic + Pacific coasts)
  "co", "ve", "br", "ec",
  // Africa & Middle East
  "sd", "eg", "om", "ae", "mz", "za",
  // Indian Ocean
  "sc", "mv", "mg", "mu", "yt", "io",
  // South / Southeast Asia
  "id", "my", "th", "ph",
  // Oceania
  "au", "nz", "sb", "pg", "ki", "fj", "nc", "vu", "wf", "pf", "ws",
].join(",");

const PLACE_TYPES = [
  "place",         // populated places (towns, cities)
  "locality",      // sub-places (neighborhoods like Marathon-FL)
  "district",      // counties, parishes
  "region",        // states, provinces
  "neighborhood",  // smaller subdivisions
  "poi",           // points of interest (marinas, lodges, named flats)
].join(",");

const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=300", // 5 min — repeated typing of same prefix hits cache
};

export default async (req) => {
  if (req.method !== "GET") {
    return json({ error: "method_not_allowed" }, 405);
  }

  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").trim();
  if (!q || q.length < 2) {
    return json({ suggestions: [] }, 200);
  }
  if (q.length > 120) {
    return json({ error: "query_too_long" }, 400);
  }

  const token = process.env.MAPBOX_TOKEN;
  if (!token) {
    console.error("[bite-geocode] MAPBOX_TOKEN not configured");
    return json({ error: "geocode_unavailable" }, 503);
  }

  // Forward geocoding with country bias + autocomplete
  const mapboxUrl = new URL(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json`
  );
  mapboxUrl.searchParams.set("access_token", token);
  mapboxUrl.searchParams.set("types", PLACE_TYPES);
  mapboxUrl.searchParams.set("country", COUNTRY_FILTER);
  mapboxUrl.searchParams.set("autocomplete", "true");
  mapboxUrl.searchParams.set("limit", "6");
  mapboxUrl.searchParams.set("language", "en");

  let mapboxData;
  try {
    const r = await fetch(mapboxUrl.toString(), { method: "GET" });
    if (!r.ok) {
      const body = await r.text().catch(() => "");
      console.error(`[bite-geocode] Mapbox HTTP ${r.status}: ${body.slice(0, 200)}`);
      return json({ error: "geocode_error", upstream: r.status }, 502);
    }
    mapboxData = await r.json();
  } catch (err) {
    console.error("[bite-geocode] fetch failed:", err?.message);
    return json({ error: "geocode_error" }, 502);
  }

  const suggestions = (mapboxData.features || []).map((f) => ({
    id: f.id,
    name: f.place_name,
    short: f.text,
    lat: f.center?.[1] ?? null,
    lon: f.center?.[0] ?? null,
    types: f.place_type || [],
    country: (f.context || []).find((c) => /^country\./.test(c.id))?.short_code || null,
    relevance: f.relevance ?? null,
  })).filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lon));

  return json({ suggestions }, 200);
};

function json(obj, status) {
  return new Response(JSON.stringify(obj), { status, headers: JSON_HEADERS });
}
