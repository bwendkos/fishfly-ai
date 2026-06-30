/**
 * Per-destination points of interest for the Trip Scout interactive map.
 *
 * Each entry is a list of markers to overlay on the destination map. Three
 * marker kinds, palette-aligned with the rest of the report:
 *
 *   - "airport"  ✈  ocean blue  — entry points (with airline + route notes)
 *   - "lodge"    ★  sand        — primary fishing village / lodge cluster
 *   - "flats"    ◆  rust        — notable named fishing areas
 *
 * Destinations NOT listed here fall back to a single "centroid" marker
 * (rendered by render-trip-map.mjs) so every destination gets some map
 * content even before its POIs are curated.
 *
 * Keys MUST EXACTLY match the destination names used in destinations.mjs.
 *
 * Curation policy: ≤ 6 markers per destination total. Less is more; the map
 * is a wayfinding aid, not an encyclopedia.
 */

export const DESTINATION_POIS = {
  "Andros, Bahamas": [
    {
      lat: 25.054, lng: -78.049, kind: "airport",
      label: "San Andros (SAQ)",
      detail: "North Andros entry — ~45 min from Nassau via Bahamasair daily. Best for lodges in North Andros.",
    },
    {
      lat: 24.687, lng: -77.749, kind: "airport",
      label: "Andros Town (ASD)",
      detail: "Central Andros entry / Fresh Creek — closest to Cargill Creek & Behring Point lodges. Western Air daily from Nassau.",
    },
    {
      lat: 24.193, lng: -77.660, kind: "airport",
      label: "Mangrove Cay (MAY)",
      detail: "South Andros gateway — best for lodges south of the Middle Bight.",
    },
    {
      lat: 24.330, lng: -77.788, kind: "lodge",
      label: "Behring Point / Cargill Creek",
      detail: "Heart of central Andros bonefish country. Multiple lodges within a 5-mile radius. Middle Bight crab flats 10 min by skiff.",
    },
    {
      lat: 24.620, lng: -77.760, kind: "flats",
      label: "North Bight flats",
      detail: "Wide protected creeks — bonefish, baby tarpon, occasional permit. Best on the incoming tide.",
    },
    {
      lat: 24.080, lng: -77.640, kind: "flats",
      label: "Mars Bay / South flats",
      detail: "Largest bonefish on the island, more wading, fewer boats. A long run from Central but worth the day trip.",
    },
  ],

  // Other 41 destinations: add curated POIs over time. Until then the map
  // renders with a single centroid marker (see render-trip-map.mjs default).
};

/**
 * Get the POI list for a destination, or an empty array if uncurated.
 */
export function getDestinationPOIs(destinationName) {
  if (typeof destinationName !== "string") return [];
  return DESTINATION_POIS[destinationName] || [];
}

/**
 * Recommended zoom level per destination. Heuristic — small island chains
 * want a tighter view than continental coasts. Default is in render-trip-map.mjs.
 */
const DESTINATION_ZOOM = {
  "Andros, Bahamas": 9,
  "Bimini, Bahamas": 11,
  "Turks & Caicos": 10,
  "Florida Keys (Lower & Middle Keys)": 9,
  "Ambergris Caye & Turneffe, Belize": 9,
  "Christmas Island (Kiritimati)": 11,
  "Seychelles (Alphonse, St Joseph, Astove, Cosmoledo)": 6,
};

export function getDestinationZoom(destinationName) {
  return DESTINATION_ZOOM[destinationName] || null;
}
