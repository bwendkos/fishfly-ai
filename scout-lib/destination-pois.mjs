/**
 * Per-destination points of interest for the Trip Scout interactive map.
 *
 * Each entry is a list of markers to overlay on the destination map. One
 * marker kind:
 *
 *   - "airport"  ✈  ocean blue  — entry points (with airline + route notes)
 *
 * WHY AIRPORTS ONLY (Policy — see PR #49):
 * Earlier passes marked "lodges" and "towns" as well, but both surfaced
 * coverage problems that misled users:
 *   - Lodges: my selection was biased toward aggregator-listed operators
 *     (Yellow Dog, Nervous Waters, Frontiers) — which take commissions and
 *     under-represent family-run, direct-book, and newer operations. Marking
 *     3 of 15 real lodges made users assume they were "the best" or "the
 *     only ones" — neither true.
 *   - Towns: Google Maps labels every settlement natively; adding a FishFly
 *     pin on one town while others stayed unmarked created false asymmetry.
 *
 * Airports pass both tests: objective (IATA/ICAO-listed, currently serviced),
 * genuinely additive to the map (users get spatial context on where to fly
 * in), and unbiased (either the airport exists or it doesn't).
 *
 * Lodge recommendations still appear in the report — Claude names specific
 * lodges with rich context in the trip overview + species profiles + logistics
 * sections. The map's job is now purely "where do you fly in?".
 *
 * Named flats markers were also removed by policy: pinpointing specific
 * fishing flats surfaces sensitive guide-water info. render-trip-map.mjs
 * filters `kind: "flats"` defensively at render time.
 *
 * Destinations NOT listed here render with no markers — Google Maps still
 * centers on the destination via meta lookup, but no FishFly pins overlay.
 *
 * Keys MUST EXACTLY match the destination names used in destinations.mjs.
 *
 * Every marker cites a public source in an inline `src:` comment so future
 * maintainers can re-verify without re-researching.
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
  ],

  "Biscayne Bay & Everglades, FL": [
    {
      lat: 25.79333, lng: -80.29056, kind: "airport",
      label: "Miami Intl (MIA)",
      detail: "Primary gateway for Biscayne Bay + Everglades anglers. Rental car recommended — most guides launch from marinas 30-60 min south, toward Homestead or Flamingo.",
      // src: https://en.wikipedia.org/wiki/Miami_International_Airport
    },
  ],

  "Florida Keys (Lower & Middle Keys)": [
    {
      lat: 24.55611, lng: -81.75944, kind: "airport",
      label: "Key West Intl (EYW)",
      detail: "Serves the Lower Keys directly — most Key West-based guides and lodges are a 10-25 min drive from the terminal.",
      // src: https://en.wikipedia.org/wiki/Key_West_International_Airport
    },
    {
      lat: 24.72611, lng: -81.05139, kind: "airport",
      label: "Florida Keys Marathon Intl (MTH)",
      detail: "Puts anglers within 10-20 min of Middle Keys marinas like Duck Key — fewer commercial routes than EYW, but cuts drive time substantially if fishing the Marathon area.",
      // src: https://en.wikipedia.org/wiki/Florida_Keys_Marathon_International_Airport
    },
  ],

  "Georgia Lowcountry": [
    {
      lat: 32.1275, lng: -81.20222, kind: "airport",
      label: "Savannah/Hilton Head (SAV)",
      detail: "Primary commercial gateway for the Georgia Lowcountry with major-carrier service; roughly 45-70 min by car to the Golden Isles marinas at St. Simons and Sea Island.",
      // src: https://en.wikipedia.org/wiki/Savannah/Hilton_Head_International_Airport
    },
    {
      lat: 31.25889, lng: -81.46639, kind: "airport",
      label: "Brunswick Golden Isles (BQK)",
      detail: "Small commercial airport (Delta service to Atlanta) 5 mi north of Brunswick, putting anglers within 15-20 min of the Golden Isles causeways to St. Simons, Sea Island, and Jekyll.",
      // src: https://en.wikipedia.org/wiki/Brunswick_Golden_Isles_Airport
    },
  ],

  "Hawaii": [
    {
      lat: 21.31861, lng: -157.92250, kind: "airport",
      label: "Daniel K. Inouye Intl (HNL)",
      detail: "Primary Hawaii gateway on Oahu, 3 mi northwest of downtown Honolulu — closest major airport to the Kailua Bay bonefish flats.",
      // src: https://en.wikipedia.org/wiki/Daniel_K._Inouye_International_Airport
    },
    {
      lat: 19.73889, lng: -156.04556, kind: "airport",
      label: "Ellison Onizuka Kona Intl (KOA)",
      detail: "Primary airport for the Big Island's leeward (Kona) coast, gateway for offshore / bluewater fly-fishing for tuna and marlin.",
      // src: https://en.wikipedia.org/wiki/Kona_International_Airport
    },
  ],

  "Louisiana Marsh": [
    {
      lat: 29.99333, lng: -90.25806, kind: "airport",
      label: "New Orleans Louis Armstrong (MSY)",
      detail: "Primary gateway for the Louisiana marsh; direct flights to nearly every major US city, roughly a 2-hour drive south to Venice.",
      // src: https://en.wikipedia.org/wiki/Louis_Armstrong_New_Orleans_International_Airport
    },
  ],

  "Mosquito Lagoon & Indian River Lagoon, FL": [
    {
      lat: 29.18472, lng: -81.06056, kind: "airport",
      label: "Daytona Beach Intl (DAB)",
      detail: "Closest commercial airport to the lagoon system — about 30-40 min from Titusville or New Smyrna Beach launch points. Smaller and often cheaper than routing through Orlando.",
      // src: https://en.wikipedia.org/wiki/Daytona_Beach_International_Airport
    },
  ],

  "Outer Banks, NC": [
    {
      lat: 36.89472, lng: -76.20111, kind: "airport",
      label: "Norfolk Intl (ORF)",
      detail: "The nearest major commercial airport for Outer Banks anglers, served by several major airlines. Roughly 1.5-2 hr by car to Hatteras-area marinas and about 1 hr to the northern OBX.",
      // src: https://en.wikipedia.org/wiki/Norfolk_International_Airport
    },
    {
      lat: 36.01758, lng: -75.67158, kind: "airport",
      label: "First Flight (FFA)",
      detail: "Small NPS-operated general-aviation airstrip in Kill Devil Hills next to the Wright Brothers Memorial — useful for private pilots flying directly into the northern Outer Banks near Oregon Inlet.",
      // src: https://en.wikipedia.org/wiki/First_Flight_Airport
    },
  ],

  "South Carolina Lowcountry": [
    {
      lat: 32.89861, lng: -80.04056, kind: "airport",
      label: "Charleston Intl (CHS)",
      detail: "South Carolina's busiest airport with major-carrier and Breeze Airways service — about 30-45 min by car to Charleston-area saltwater fly-fishing put-ins including Kiawah, Folly Beach, and Mount Pleasant.",
      // src: https://en.wikipedia.org/wiki/Charleston_International_Airport
    },
    {
      lat: 32.22444, lng: -80.6975, kind: "airport",
      label: "Hilton Head Island (HHH)",
      detail: "Small commercial airport on Hilton Head with regional jet service to East Coast hubs — about 15-20 min from the Sea Pines/Harbour Town charter fleet.",
      // src: https://en.wikipedia.org/wiki/Hilton_Head_Airport
    },
  ],

  "Tampa Bay & Sanibel, FL": [
    {
      lat: 27.97972, lng: -82.53472, kind: "airport",
      label: "Tampa Intl (TPA)",
      detail: "Primary airport for the upper Tampa Bay / St. Petersburg region — widest range of nonstop routes of any airport in this destination, with the bay's tarpon and redfish flats 20-40 min away.",
      // src: https://en.wikipedia.org/wiki/Tampa_International_Airport
    },
    {
      lat: 26.53611, lng: -81.75528, kind: "airport",
      label: "Southwest Florida Intl (RSW)",
      detail: "The right airport for the Sanibel / Captiva / Pine Island side of this destination — about 45-60 min from Pine Island Sound, avoiding the longer drive down from Tampa.",
      // src: https://en.wikipedia.org/wiki/Southwest_Florida_International_Airport
    },
  ],

  "Texas Gulf Coast / Laguna Madre": [
    {
      lat: 26.22722, lng: -97.65500, kind: "airport",
      label: "Valley International (HRL)",
      detail: "Markets itself as the 'Gateway to South Padre Island' — closest major airport to Port Mansfield and the Lower Laguna Madre (~40-mile drive to Port Mansfield).",
      // src: https://en.wikipedia.org/wiki/Valley_International_Airport
    },
    {
      lat: 27.77028, lng: -97.50111, kind: "airport",
      label: "Corpus Christi Intl (CRP)",
      detail: "Gateway to the middle/upper Laguna Madre — roughly 40-45 min drive to Port Aransas or Rockport guide docks.",
      // src: https://en.wikipedia.org/wiki/Corpus_Christi_International_Airport
    },
  ],

  // Other 31 destinations: add airport POIs in future batches. Until then
  // the map renders with no FishFly pins — Google Maps still centers on
  // the destination centroid via the meta lookup.
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

  // Batch 1 (US destinations)
  "Biscayne Bay & Everglades, FL": 9,
  "Georgia Lowcountry": 8,
  "Hawaii": 6,               // spans HNL (Oahu) to KOA (Big Island), ~200 mi
  "Louisiana Marsh": 8,      // spans MSY to Venice, ~80 mi
  "Mosquito Lagoon & Indian River Lagoon, FL": 9,
  "Outer Banks, NC": 8,      // spans Norfolk to Ocracoke, ~150 mi
  "South Carolina Lowcountry": 8,
  "Tampa Bay & Sanibel, FL": 8,
  "Texas Gulf Coast / Laguna Madre": 7,   // spans Corpus Christi to South Padre, ~150 mi
};

export function getDestinationZoom(destinationName) {
  return DESTINATION_ZOOM[destinationName] || null;
}
