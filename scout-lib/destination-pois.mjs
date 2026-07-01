/**
 * Per-destination points of interest for the Trip Scout interactive map.
 *
 * Each entry is a list of markers to overlay on the destination map. Two
 * marker kinds, palette-aligned with the rest of the report:
 *
 *   - "airport"  ✈  ocean blue  — entry points (with airline + route notes)
 *   - "lodge"    ★  sand        — primary fishing village / lodge cluster
 *
 * Named flats markers were removed by policy: pinpointing specific fishing
 * flats surfaces sensitive guide-water info and works against the etiquette
 * Trip Scout is trying to model. render-trip-map.mjs also filters `kind:
 * "flats"` defensively at render time.
 *
 * Destinations NOT listed here fall back to a single "centroid" marker
 * (rendered by render-trip-map.mjs) so every destination gets some map
 * content even before its POIs are curated.
 *
 * Keys MUST EXACTLY match the destination names used in destinations.mjs.
 *
 * Curation policy: ≤ 6 markers per destination total (airports + lodge
 * clusters + notable towns). Less is more; the map is a wayfinding aid,
 * not an encyclopedia. Every marker cites a public source in an inline
 * `src:` comment so future maintainers can re-verify without re-researching.
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
      detail: "Heart of central Andros bonefish country. Multiple lodges within a 5-mile radius.",
    },
  ],

  "Biscayne Bay & Everglades, FL": [
    {
      lat: 25.79333, lng: -80.29056, kind: "airport",
      label: "Miami Intl (MIA)",
      detail: "Primary gateway for Biscayne Bay + Everglades anglers. Rental car recommended — most guides launch from marinas 30-60 min south, toward Homestead or Flamingo.",
      // src: https://en.wikipedia.org/wiki/Miami_International_Airport
    },
    {
      lat: 25.47778, lng: -80.47500, kind: "town",
      label: "Homestead, FL",
      detail: "Southernmost mainland town before the Everglades National Park entrance — the last stop for fuel, tackle, and lodging before heading into the park's backcountry.",
      // src: https://en.wikipedia.org/wiki/Homestead,_Florida
    },
    {
      lat: 25.14083, lng: -80.92417, kind: "town",
      label: "Flamingo, FL",
      detail: "The only settlement inside Everglades National Park, at the park's southern tip on Florida Bay. Home to the NPS marina and launch point for backcountry tarpon, snook, and redfish flats.",
      // src: https://en.wikipedia.org/wiki/Flamingo,_Florida
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
    {
      lat: 24.7757, lng: -80.9129, kind: "lodge",
      label: "Hawks Cay Marina, Duck Key",
      detail: "Full-service marina cluster at MM 61 in the Middle Keys with a resident charter fleet — a hub for backcountry and reef trips out of Duck Key, 9 mi from Marathon.",
      // src: https://www.hawkscay.com/
    },
    {
      lat: 24.67333, lng: -81.50417, kind: "lodge",
      label: "Bahia Honda Sporting Club, Cudjoe Key",
      detail: "The only fully-inclusive fly-fishing lodge in the Lower Keys — a Mediterranean-style villa 25 min from Key West specializing in Apr-Jun sight-fishing for migratory tarpon, with permit and bonefish shots on the side.",
      // src: https://www.frontierstravel.com/bahia-honda
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
    {
      lat: 31.2991, lng: -81.3284, kind: "lodge",
      label: "Little St. Simons Island Lodge",
      detail: "Private, boat-access-only barrier island lodge running naturalist-led creek fishing and a dedicated fly-fishing workshop program for redfish, sea trout, and flounder in the surrounding tidal marshes.",
      // src: https://www.littlestsimonsisland.com/activities/fishing
    },
    {
      lat: 31.2017, lng: -81.3317, kind: "lodge",
      label: "Sea Island Resort",
      detail: "Golden Isles resort with a documented saltwater fly-fishing program (via On The Fly Outfitters) targeting tailing redfish on the flats and seasonal tarpon in the marshes behind the island.",
      // src: https://www.seaisland.com/about/sea-island-life/the-art-of-fly-fishing/
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
    {
      lat: 21.39750, lng: -157.73944, kind: "town",
      label: "Kailua, Oahu",
      detail: "Windward Oahu town on Kailua Bay — the primary bonefish (o'io) gateway and access point for wading / kayak flats fishing.",
      // src: https://en.wikipedia.org/wiki/Kailua,_Hawaii
    },
    {
      lat: 19.65000, lng: -155.99417, kind: "town",
      label: "Kailua-Kona",
      detail: "Second-largest Big Island settlement on Kailua Bay (west coast) — commercial hub and charter-boat base for Kona-coast offshore fly-fishing.",
      // src: https://en.wikipedia.org/wiki/Kailua-Kona
    },
  ],

  "Louisiana Marsh": [
    {
      lat: 29.99333, lng: -90.25806, kind: "airport",
      label: "New Orleans Louis Armstrong (MSY)",
      detail: "Primary gateway for the Louisiana marsh; direct flights to nearly every major US city, roughly a 2-hour drive south to Venice.",
      // src: https://en.wikipedia.org/wiki/Louis_Armstrong_New_Orleans_International_Airport
    },
    {
      lat: 29.27694, lng: -89.35472, kind: "town",
      label: "Venice, LA",
      detail: "The 'Fishing Capital of the World' and epicenter of the fishery — southern terminus of the Great River Road, base for bull redfish and offshore trips at the mouth of the Mississippi.",
      // src: https://en.wikipedia.org/wiki/Venice,_Louisiana
    },
    {
      lat: 29.573, lng: -89.786, kind: "lodge",
      label: "Woodland Plantation",
      detail: "Historic 1834 riverfront lodge in West Pointe a la Hache (north of Venice) — sight-fishing for 30-40 lb redfish and black drum in the Deep Delta marsh, ~40 min from MSY.",
      // src: https://woodlandplantation.com/activities/fishing/
    },
    {
      lat: 29.28, lng: -89.35, kind: "lodge",
      label: "Redfish Lodge of Louisiana",
      detail: "Capt. Mike Frenette's all-inclusive lodge at Venice Marina — 50+ years targeting trophy bull reds and slot reds on fly and light tackle at the Delta's mouth.",
      // src: https://www.laredfish.com/lodge
    },
    {
      lat: 29.82056, lng: -89.65667, kind: "lodge",
      label: "Dogwood Lodge (Hopedale)",
      detail: "Yellow Dog-affiliated floating lodge at Breton Sound Marina in Hopedale, ~1 hr from New Orleans — sight-fishing trophy redfish in the clear-water Biloxi Marsh.",
      // src: https://www.yellowdogflyfishing.com/products/dogwood-lodge
    },
  ],

  "Mosquito Lagoon & Indian River Lagoon, FL": [
    {
      lat: 29.18472, lng: -81.06056, kind: "airport",
      label: "Daytona Beach Intl (DAB)",
      detail: "Closest commercial airport to the lagoon system — about 30-40 min from Titusville or New Smyrna Beach launch points. Smaller and often cheaper than routing through Orlando.",
      // src: https://en.wikipedia.org/wiki/Daytona_Beach_International_Airport
    },
    {
      lat: 28.59111, lng: -80.81389, kind: "town",
      label: "Titusville, FL",
      detail: "Main launch town for Mosquito Lagoon's famed clear-water redfish and black drum sight-fishing flats, bordering the Merritt Island / Canaveral NWR shoreline.",
      // src: https://en.wikipedia.org/wiki/Titusville,_Florida
    },
    {
      lat: 29.02444, lng: -80.92694, kind: "town",
      label: "New Smyrna Beach, FL",
      detail: "Southern access point for the Indian River Lagoon and northern Mosquito Lagoon — home to most of the guide fleet working the area's spotted sea trout and redfish flats.",
      // src: https://en.wikipedia.org/wiki/New_Smyrna_Beach,_Florida
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
    {
      lat: 35.79705, lng: -75.54779, kind: "lodge",
      label: "Oregon Inlet Fishing Center",
      detail: "Full-service marina cluster at the north end of the Basnight Bridge in Cape Hatteras National Seashore — hosts one of the largest charter fleets on the Eastern Seaboard, with inshore / nearshore options for redfish, striper, and false albacore.",
      // src: https://www.oregon-inlet.com/oregon-inlet-marina-info/
    },
    {
      lat: 35.21819, lng: -75.69596, kind: "lodge",
      label: "Hatteras Harbor Marina",
      detail: "The only marina on Hatteras Island with its own Charter Boat Association — a multi-boat fleet of inshore and nearshore guides working the Hatteras/Buxton waters for false albacore, red drum, and speckled trout each fall.",
      // src: https://www.hatterasharbor.com/marina
    },
    {
      lat: 35.11278, lng: -75.97583, kind: "town",
      label: "Ocracoke, NC",
      detail: "Ferry-only Outer Banks village (no bridge access) with its own charter/guide fleet — reached via the free Hatteras-Ocracoke ferry or toll ferries from the mainland.",
      // src: https://en.wikipedia.org/wiki/Ocracoke,_North_Carolina
    },
    {
      lat: 35.90472, lng: -75.66944, kind: "town",
      label: "Manteo, NC",
      detail: "Historic Roanoke Island town and Dare County seat, common lodging base and gateway between mainland access roads and the Hatteras/Oregon Inlet fishing grounds.",
      // src: https://en.wikipedia.org/wiki/Manteo,_North_Carolina
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
    {
      lat: 32.1386, lng: -80.8128, kind: "lodge",
      label: "Harbour Town Yacht Basin, Sea Pines",
      detail: "Marina cluster inside Sea Pines Resort where multiple named charter operators dock — targets redfish, tarpon, and shark species in Calibogue Sound.",
      // src: https://www.seapines.com/experiences/watersports
    },
    {
      lat: 32.6034, lng: -80.0939, kind: "lodge",
      label: "Kiawah Island Golf Resort",
      detail: "Charleston-area resort base for saltwater fly fishing — independent fly guides (e.g. Tails of the Tides) launch from Kiawah's creeks and marshes to sight-fish tailing redfish year-round.",
      // src: https://www.tailsofthetides.com/
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
    {
      lat: 26.6611, lng: -82.1539, kind: "lodge",
      label: "Tarpon Lodge, Pine Island",
      detail: "Historic 1926 Old Florida lodge on Pine Island Sound with direct water access to Cabbage Key, Useppa, Boca Grande, and Sanibel/Captiva — well positioned for tarpon, snook, and redfish on the flats and passes.",
      // src: https://www.visitfortmyers.com/listing/tarpon-lodge-restaurant/46387
    },
    {
      lat: 26.47306, lng: -82.14722, kind: "town",
      label: "Sanibel, FL",
      detail: "The namesake barrier island for this region's lower half — a base for accessing Pine Island Sound and San Carlos Bay flats without the longer drive to mainland marinas.",
      // src: https://en.wikipedia.org/wiki/Sanibel,_Florida
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
    {
      lat: 26.55556, lng: -97.43111, kind: "town",
      label: "Port Mansfield, TX",
      detail: "Iconic Lower Laguna Madre tarpon and redfish-flats town — nearly the entire local guide fleet launches from here, anchored by Mansfield Marina.",
      // src: https://en.wikipedia.org/wiki/Port_Mansfield,_Texas
    },
    {
      lat: 27.833, lng: -97.067, kind: "town",
      label: "Port Aransas, TX",
      detail: "Middle-coast launch point on Mustang Island at Aransas Pass — base for guides working the upper Laguna Madre and Corpus Christi Bay flats.",
      // src: https://en.wikipedia.org/wiki/Port_Aransas,_Texas
    },
    {
      lat: 28.02729, lng: -97.05453, kind: "town",
      label: "Rockport, TX",
      detail: "Middle-coast guide hub on Aransas Bay just north of Port Aransas — long-standing base for redfish and speckled trout guides working the northern Laguna Madre complex.",
      // src: https://en.wikipedia.org/wiki/Rockport,_Texas
    },
    {
      lat: 26.1, lng: -97.16667, kind: "town",
      label: "South Padre Island, TX",
      detail: "Southernmost lodging hub on the Lower Laguna Madre's east side — closest beach town to HRL and a base for anglers pursuing tarpon and snook in the southern lagoon.",
      // src: https://en.wikipedia.org/wiki/South_Padre_Island,_Texas
    },
  ],

  // Other 31 destinations: add curated POIs in subsequent batches. Until then
  // the map renders with a single centroid marker (see render-trip-map.mjs default).
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
