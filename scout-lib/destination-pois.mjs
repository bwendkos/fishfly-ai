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
      // src: https://en.wikipedia.org/wiki/San_Andros_Airport
    },
    {
      lat: 24.687, lng: -77.749, kind: "airport",
      label: "Andros Town (ASD)",
      detail: "Central Andros entry / Fresh Creek — closest to Cargill Creek & Behring Point lodges. Western Air daily from Nassau.",
      // src: https://en.wikipedia.org/wiki/Andros_Town_International_Airport
    },
    {
      lat: 24.193, lng: -77.660, kind: "airport",
      label: "Mangrove Cay (MAY)",
      detail: "South Andros gateway — best for lodges south of the Middle Bight.",
      // src: https://en.wikipedia.org/wiki/Clarence_A._Bain_Airport
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

  "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)": [
    {
      lat: 26.51139, lng: -77.08361, kind: "airport",
      label: "Marsh Harbour (MHH)",
      detail: "Main Abaco gateway — served by Bahamasair from Nassau, American Eagle, and Delta Connection from Atlanta. Best for lodges across central and northern Abaco.",
      // src: https://en.wikipedia.org/wiki/Marsh_Harbour_Airport
    },
    {
      lat: 26.74528, lng: -77.39111, kind: "airport",
      label: "Treasure Cay (TCB)",
      detail: "Secondary Abaco strip serving the Treasure Cay area with mostly Florida-focused flights. Best for lodges in northern Abaco near Treasure Cay and Green Turtle Cay.",
      // src: https://en.wikipedia.org/wiki/Treasure_Cay_Airport
    },
    {
      lat: 23.17917, lng: -75.09361, kind: "airport",
      label: "Deadman's Cay (LGI)",
      detail: "Main entry point for Long Island, serving Deadman's Cay and Clarence Town. Best for Long Island bonefish lodges.",
      // src: https://en.wikipedia.org/wiki/Deadman%27s_Cay_Airport
    },
    {
      lat: 22.74556, lng: -74.18222, kind: "airport",
      label: "Colonel Hill (CRI)",
      detail: "Crooked Island's gateway — Bahamasair connects it to Nassau and to Spring Point on Acklins. Best for Crooked Island flats lodges.",
      // src: https://en.wikipedia.org/wiki/Colonel_Hill_Airport
    },
    {
      lat: 22.44194, lng: -73.97083, kind: "airport",
      label: "Spring Point (AXP)",
      detail: "Acklins' only airport — Bahamasair flies here from Nassau and Colonel Hill. Best for Acklins bonefish lodges.",
      // src: https://en.wikipedia.org/wiki/Spring_Point_Airport
    },
  ],

  "Bimini, Bahamas": [
    {
      lat: 25.7, lng: -79.26472, kind: "airport",
      label: "South Bimini (BIM)",
      detail: "Bimini's main airport — served by American Eagle from Miami, Western Air from Nassau, and Flamingo Air from Freeport. Best for lodges across South and North Bimini via a short boat/taxi transfer.",
      // src: https://en.wikipedia.org/wiki/South_Bimini_Airport
    },
    {
      lat: 25.76694, lng: -79.25, kind: "airport",
      label: "North Bimini (NSB)",
      detail: "Seaplane base in Alice Town — Tropic Ocean Airways flies direct from Fort Lauderdale and Miami seaplane bases. Best for lodges right in North Bimini, skipping the South Bimini ferry transfer.",
      // src: https://en.wikipedia.org/wiki/North_Bimini_Airport
    },
  ],

  "Turks & Caicos": [
    {
      lat: 21.77361, lng: -72.26583, kind: "airport",
      label: "Providenciales (PLS)",
      detail: "Main Turks & Caicos gateway with nonstop service from American, Delta, JetBlue, United, and British Airways from major US/UK hubs. Best for lodges and flats around Providenciales and nearby cays.",
      // src: https://en.wikipedia.org/wiki/Providenciales_International_Airport
    },
    {
      lat: 21.51583, lng: -71.52861, kind: "airport",
      label: "South Caicos (XSC)",
      detail: "Bonefish-focused secondary gateway — InterCaribbean and Caicos Express connect to Providenciales, with American Eagle now flying direct from Miami. Best for South Caicos flats lodges.",
      // src: https://en.wikipedia.org/wiki/Norman_B._Saunders_Sr._International_Airport
    },
  ],

  "Cayman Islands": [
    {
      lat: 19.2925, lng: -81.35917, kind: "airport",
      label: "Grand Cayman (GCM)",
      detail: "Main Cayman gateway — Cayman Airways flies nonstop from Miami and other US hubs. Best for Grand Cayman flats and North Sound lodges.",
      // src: https://en.wikipedia.org/wiki/Owen_Roberts_International_Airport
    },
    {
      lat: 19.68694, lng: -79.88278, kind: "airport",
      label: "Cayman Brac (CYB)",
      detail: "Sister-island airport with a weekly direct Cayman Airways flight from Miami plus regular inter-island hops from Grand Cayman. Best for Cayman Brac's more remote bonefishing.",
      // src: https://en.wikipedia.org/wiki/Charles_Kirkconnell_International_Airport
    },
    {
      lat: 19.66, lng: -80.08889, kind: "airport",
      label: "Little Cayman (LYB)",
      detail: "Inter-island only, reached via Cayman Airways Express turboprop from Grand Cayman or Cayman Brac. Best for Little Cayman's bonefish flats and Bloody Bay lodges.",
      // src: https://en.wikipedia.org/wiki/Edward_Bodden_Airfield
    },
  ],

  "ABC Islands (Bonaire, Aruba, Curaçao)": [
    {
      lat: 12.13111, lng: -68.26861, kind: "airport",
      label: "Bonaire (BON)",
      detail: "Bonaire's sole gateway and the primary fly-fishing entry point of the ABC islands — American, United, Delta, JetBlue, and KLM fly direct from Miami, Newark, and Amsterdam. Best for all Bonaire flats lodges.",
      // src: https://en.wikipedia.org/wiki/Flamingo_International_Airport
    },
  ],

  "Cuba — Cayo Cruz / Cayo Largo": [
    {
      lat: 21.61611, lng: -81.54556, kind: "airport",
      label: "Cayo Largo del Sur (CYO)",
      detail: "Airport located directly on the cay, historically served by Canadian and European charter carriers. Best for lodges and guided fishing based right on Cayo Largo.",
      // src: https://en.wikipedia.org/wiki/Vilo_Acu%C3%B1a_Airport
    },
    {
      lat: 21.42028, lng: -77.8475, kind: "airport",
      label: "Camagüey (CMW)",
      detail: "Mainland gateway for Cayo Cruz — American Airlines flies direct from Miami, followed by a 2-3 hour boat transfer to the Cayo Cruz fishery.",
      // src: https://en.wikipedia.org/wiki/Ignacio_Agramonte_International_Airport
    },
  ],

  "Jardines de la Reina, Cuba": [
    {
      lat: 21.42028, lng: -77.8475, kind: "airport",
      label: "Camagüey (CMW)",
      detail: "The most commonly used gateway for Jardines de la Reina — American Airlines flies nonstop from Miami, followed by a ~2-3 hour drive to Júcaro port and a long boat transfer to the archipelago's liveaboards.",
      // src: https://en.wikipedia.org/wiki/Ignacio_Agramonte_International_Airport
    },
    {
      lat: 22.46111, lng: -78.32861, kind: "airport",
      label: "Cayo Coco (CCC)",
      detail: "Alternate gateway favored by Canadian and European anglers, with charter service from WestJet and Air Transat, followed by an overland transfer to Júcaro and boat to the liveaboards.",
      // src: https://en.wikipedia.org/wiki/Jardines_del_Rey_Airport
    },
  ],

  "Los Roques, Venezuela": [
    {
      lat: 11.94583, lng: -66.67083, kind: "airport",
      label: "Los Roques (LRV)",
      detail: "The archipelago's own airstrip on Gran Roque — Conviasa connects it to Caracas. Best gateway right into the Los Roques flats; confirm schedules close to travel given Venezuela's volatile air-travel environment.",
      // src: https://en.wikipedia.org/wiki/Los_Roques_Airport
    },
    {
      lat: 10.60306, lng: -66.99056, kind: "airport",
      label: "Caracas (CCS)",
      detail: "International hub where anglers connect onward to Los Roques via small carriers (Conviasa, AeroCaribe, SASCA).",
      // src: https://en.wikipedia.org/wiki/Sim%C3%B3n_Bol%C3%ADvar_International_Airport_(Venezuela)
    },
  ],

  "Ambergris Caye & Turneffe, Belize": [
    {
      lat: 17.5392, lng: -88.3083, kind: "airport",
      label: "Philip S. W. Goldson Intl (BZE)",
      detail: "Belize's international gateway near Belize City — American, United, Delta, JetBlue, Southwest from the US plus regional carriers. Anglers connect here to a short Tropic Air / Maya Island Air hop to San Pedro.",
      // src: https://en.wikipedia.org/wiki/Philip_S._W._Goldson_International_Airport
    },
    {
      lat: 17.9146, lng: -87.9711, kind: "airport",
      label: "San Pedro (SPR)",
      detail: "Domestic strip on Ambergris Caye served by Tropic Air and Maya Island Air puddle-jumpers from Belize City. Best for lodges on Ambergris and a boat ride from Turneffe Atoll.",
      // src: https://en.wikipedia.org/wiki/San_Pedro_Airport_(Belize)
    },
  ],

  "Bocas del Toro, Panama": [
    {
      lat: 9.0714, lng: -79.3835, kind: "airport",
      label: "Tocumen Intl (PTY)",
      detail: "Panama City's international hub and Copa Airlines' main base — direct flights from across the Americas and Europe. Anglers connect here to a domestic flight into Bocas.",
      // src: https://en.wikipedia.org/wiki/Tocumen_International_Airport
    },
    {
      lat: 9.3411, lng: -82.25, kind: "airport",
      label: "Bocas del Toro \"Isla Colón\" (BOC)",
      detail: "Domestic airport on Isla Colón served by Air Panama from Panama City (Albrook), a short boat ride from Bocas' tarpon and snook lodges.",
      // src: https://en.wikipedia.org/wiki/Bocas_del_Toro_%22Isla_Col%C3%B3n%22_International_Airport
    },
  ],

  "Costa Rica Caribbean (Tortuguero / Río Colorado)": [
    {
      lat: 9.9939, lng: -84.2088, kind: "airport",
      label: "Juan Santamaría Intl (SJO)",
      detail: "Costa Rica's main international gateway near San José — United, American, Delta, Copa, Avianca and others. Anglers transfer here to a domestic charter flight into Tortuguero or Barra del Colorado.",
      // src: https://en.wikipedia.org/wiki/Juan_Santamar%C3%ADa_International_Airport
    },
    {
      lat: 10.5811, lng: -83.5039, kind: "airport",
      label: "Tortuguero (TTQ)",
      detail: "Small domestic strip served by SANSA and charter operators from San José, the standard air link for lodges around Tortuguero village on this boat-and-canal-only stretch of coast.",
      // src: https://en.wikipedia.org/wiki/Tortuguero_Airport
    },
    {
      lat: 10.7561, lng: -83.5878, kind: "airport",
      label: "Barra del Colorado (BCL)",
      detail: "Grass airstrip at the Nicaragua border with no scheduled airline service today — still used by charter/private aircraft ferrying anglers directly to Río Colorado tarpon and snook lodges, avoiding a long boat transfer.",
      // src: https://en.wikipedia.org/wiki/Barra_del_Colorado_Airport
    },
  ],

  "Costa Rica Pacific Coast": [
    {
      lat: 10.5933, lng: -85.5444, kind: "airport",
      label: "Daniel Oduber Quirós Intl (LIR)",
      detail: "Liberia's international airport in Guanacaste — direct US flights on United, American, Delta, JetBlue, Southwest. The closer international option for anglers fishing the northern and central Pacific coast, avoiding a San José transfer.",
      // src: https://en.wikipedia.org/wiki/Daniel_Oduber_Qu%C3%B3s_International_Airport
    },
    {
      lat: 8.9553, lng: -83.4664, kind: "airport",
      label: "Palmar Sur (PMZ)",
      detail: "Domestic strip served by SANSA from San José, the standard gateway for anglers heading to the Golfo Dulce / Zancudo roosterfish and inshore fishery via short drive or boat transfer.",
      // src: https://en.wikipedia.org/wiki/Palmar_Sur_Airport
    },
    {
      lat: 8.5342, lng: -83.2986, kind: "airport",
      label: "Puerto Jiménez (PJM)",
      detail: "Domestic airstrip on the Osa Peninsula served by SANSA and charter flights from San José. Closest air link for lodges fishing Golfo Dulce, Drake Bay, and the Corcovado offshore/inshore grounds.",
      // src: https://en.wikipedia.org/wiki/Puerto_Jim%C3%A9nez_Airport
    },
  ],

  "Honduras (Rio Sico / Mosquitia)": [
    {
      lat: 15.4526, lng: -87.9236, kind: "airport",
      label: "Ramón Villeda Morales Intl (SAP)",
      detail: "San Pedro Sula's international airport, Honduras's busiest — direct flights from the US on American, United, Delta, and Avianca. The more common international entry point for anglers heading to Mosquitia lodges.",
      // src: https://en.wikipedia.org/wiki/Ram%C3%B3n_Villeda_Morales_International_Airport
    },
    {
      lat: 14.0608, lng: -87.2172, kind: "airport",
      label: "Toncontín Intl (TGU)",
      detail: "Tegucigalpa's international airport, alternate hub with connections from the US and Central America. Still requires a domestic charter east to the Mosquitia region.",
      // src: https://en.wikipedia.org/wiki/Toncont%C3%ADn_International_Airport
    },
    {
      lat: 15.2622, lng: -83.7841, kind: "airport",
      label: "Puerto Lempira (PEU)",
      detail: "Domestic airstrip in the heart of the Mosquitia, reached via charter flight from San Pedro Sula or Tegucigalpa. Practical air gateway to Rio Sico/Mosquitia tarpon and snook camps that are otherwise days away by road.",
      // src: https://en.wikipedia.org/wiki/Puerto_Lempira_Airport
    },
  ],

  "Nicaragua (Río San Juan)": [
    {
      lat: 12.1415, lng: -86.1682, kind: "airport",
      label: "Augusto C. Sandino Intl (MGA)",
      detail: "Managua's international airport, served by Avianca, Copa, United, American, and Spirit. Anglers transfer here to a domestic flight or long drive/boat combination toward San Carlos and the Río San Juan.",
      // src: https://en.wikipedia.org/wiki/Augusto_C._Sandino_International_Airport
    },
    {
      lat: 11.1256, lng: -84.7808, kind: "airport",
      label: "San Carlos (NCR)",
      detail: "Small domestic strip at San Carlos on Lake Nicaragua served by La Costeña from Managua. Standard air link for lodges fishing the Río San Juan for tarpon near its outlet to the Caribbean.",
      // src: https://en.wikipedia.org/wiki/San_Carlos_Airport_(Nicaragua)
    },
  ],

  "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)": [
    {
      lat: 21.0365, lng: -86.8771, kind: "airport",
      label: "Cancún Intl (CUN)",
      detail: "Primary international gateway for the Yucatán with extensive US/Canadian/European service on nearly every major carrier. Anglers make the ~2.5-3 hour drive south through Felipe Carrillo Puerto to Punta Allen and Ascension Bay lodges.",
      // src: https://en.wikipedia.org/wiki/Canc%C3%BAn_International_Airport
    },
    {
      lat: 20.5224, lng: -86.9256, kind: "airport",
      label: "Cozumel Intl (CZM)",
      detail: "Alternate international arrival point on Cozumel island served by American, United, Delta, and charter carriers. Requires a ferry to the mainland plus the same southbound drive to Punta Allen and Espíritu Santo Bay used from Cancún.",
      // src: https://en.wikipedia.org/wiki/Cozumel_International_Airport
    },
  ],

  "Baja California Sur, Mexico": [
    {
      lat: 23.15167, lng: -109.72083, kind: "airport",
      label: "Los Cabos Intl (SJD)",
      detail: "Main gateway to the southern Baja peninsula with heavy direct US and Canadian service on nearly every major carrier. Best air option for anglers fishing the East Cape and Cabo area for roosterfish and dorado.",
      // src: https://en.wikipedia.org/wiki/Los_Cabos_International_Airport
    },
    {
      lat: 24.0725, lng: -110.36222, kind: "airport",
      label: "Manuel Márquez de León Intl (LAP)",
      detail: "La Paz's airport, served by Volaris, Aeroméxico, and Calafia Airlines with domestic connections plus limited US service. Closer gateway for anglers fishing the Sea of Cortez side and Magdalena Bay area.",
      // src: https://en.wikipedia.org/wiki/La_Paz_International_Airport
    },
    {
      lat: 25.98917, lng: -111.34833, kind: "airport",
      label: "Loreto Intl (LTO)",
      detail: "Smaller international airport with Aeroméxico and seasonal Alaska Airlines / direct US service. Most direct gateway for anglers fishing the Loreto Bay area of the Sea of Cortez.",
      // src: https://en.wikipedia.org/wiki/Loreto_International_Airport
    },
  ],

  "Boca Paila & Sian Ka'an, Mexico": [
    {
      lat: 21.0365, lng: -86.8771, kind: "airport",
      label: "Cancún Intl (CUN)",
      detail: "Primary international gateway for the Yucatán — extensive US, Canadian, and European service. Anglers make the ~2.5-3 hour drive south to Boca Paila and the Sian Ka'an Biosphere Reserve lodges.",
      // src: https://en.wikipedia.org/wiki/Canc%C3%BAn_International_Airport
    },
    {
      lat: 18.5045, lng: -88.3267, kind: "airport",
      label: "Chetumal Intl (CTM)",
      detail: "Quintana Roo's state-capital airport with domestic Mexican service on Aeroméxico Connect and Viva. Shorter-drive alternate to reach the southern end of Sian Ka'an and Boca Paila rather than routing through Cancún.",
      // src: https://en.wikipedia.org/wiki/Chetumal_International_Airport
    },
  ],

  "Gabón, West Africa": [
    {
      lat: 0.459, lng: 9.412, kind: "airport",
      label: "Libreville Intl (LBV)",
      detail: "Gabon's main international gateway, served by Air France, Ethiopian, Royal Air Maroc, ASKY, RwandAir. Anglers typically overnight here before a small-aircraft charter (~1.5-2 hrs) to Gamba or Sette Cama for the Loango/Ndogo Lagoon tarpon fishery.",
      // src: https://en.wikipedia.org/wiki/Libreville_International_Airport
    },
    {
      lat: -2.785, lng: 10.047, kind: "airport",
      label: "Gamba (GAX)",
      detail: "Charter-only airstrip (no scheduled carrier) used by fishing lodges as the fly-in point for the Sette Cama/Ndogo Lagoon tarpon fishery. Roughly 1.5-2 hr charter flight from Libreville, then short road-and-boat transfer to camp.",
      // src: https://en.wikipedia.org/wiki/Gamba_Airport
    },
    {
      lat: -2.539, lng: 9.765, kind: "airport",
      label: "Sette Cama (ZKM)",
      detail: "Sand-runway airstrip on the peninsula at Sette Cama village, 2 km from the lagoon-side lodges. Used for direct private/charter flights from Libreville into the heart of the Loango tarpon and threadfin fishery.",
      // src: https://en.wikipedia.org/wiki/Sette_Cama_Airport
    },
  ],

  "Mozambique (Bazaruto Archipelago)": [
    {
      lat: -25.921, lng: 32.573, kind: "airport",
      label: "Maputo Intl (MPM)",
      detail: "Mozambique's main international gateway, served by Airlink, Ethiopian, Kenya Airways, Qatar, TAP Portugal, Turkish. LAM Mozambique offers a direct domestic connection to Vilanculos for the Bazaruto Archipelago.",
      // src: https://en.wikipedia.org/wiki/Maputo_International_Airport
    },
    {
      lat: -22.018, lng: 35.313, kind: "airport",
      label: "Vilankulo (VNX)",
      detail: "Primary mainland gateway to the Bazaruto Archipelago flats — reached via Airlink from Johannesburg (the dominant routing) or LAM from Maputo. Final leg to the islands is a 5-15 min light-aircraft hop or 20-45 min boat transfer.",
      // src: https://en.wikipedia.org/wiki/Vilanculos_Airport
    },
  ],

  "Sudan / Nubian Flats (Red Sea)": [
    {
      lat: 19.434, lng: 37.234, kind: "airport",
      label: "Port Sudan New Intl (PZU)",
      detail: "De facto primary Sudan gateway for Nubian Flats liveaboards — served by Ethiopian, EgyptAir, Qatar, SalamAir, Turkish, and Sudan Airways. Anglers commonly connect via Addis Ababa, then transfer ~3 hours by road to board the liveaboard. Currently affected by conflict — RSF drone strikes reported May 2025; confirm operational status before booking.",
      // src: https://en.wikipedia.org/wiki/Port_Sudan_New_International_Airport
    },
    {
      lat: 15.589, lng: 32.553, kind: "airport",
      label: "Khartoum Intl (KRT)",
      detail: "Sudan's historic main international airport, closed since April 2023 due to civil war damage and only intermittently reopening through 2026 with repeated disruptions. Currently affected by conflict — not a reliable gateway.",
      // src: https://en.wikipedia.org/wiki/Khartoum_International_Airport
    },
  ],

  "Madagascar (Nosy Be)": [
    {
      lat: -18.797, lng: 47.479, kind: "airport",
      label: "Ivato Intl (TNR)",
      detail: "Madagascar's main international gateway near Antananarivo, served by Air Mauritius, Ethiopian, Kenya Airways, Corsair, Emirates, Airlink. Anglers connect onward via Madagascar Airlines' domestic network (Tsaradia) to Nosy Be, typically with an overnight buffer.",
      // src: https://en.wikipedia.org/wiki/Ivato_International_Airport
    },
    {
      lat: -13.312, lng: 48.315, kind: "airport",
      label: "Fascene (NOS)",
      detail: "Direct gateway to the Nosy Be fishing grounds — ~90-minute domestic hop from Antananarivo via Madagascar Airlines/Tsaradia, or seasonal direct flights from Réunion/Mauritius. Short road transfer connects to Hellville and onward liveaboard/lodge embarkation.",
      // src: https://en.wikipedia.org/wiki/Fascene_Airport
    },
  ],

  "Maldives": [
    {
      lat: 4.192, lng: 73.529, kind: "airport",
      label: "Velana Intl (MLE)",
      detail: "Sole gateway for Maldives fly-fishing — Emirates, Qatar, Etihad, SriLankan, IndiGo, Singapore Airlines, Turkish. Anglers transfer directly from here by speedboat or seaplane to liveaboards and guesthouse-based bonefish/GT operations across the atolls.",
      // src: https://en.wikipedia.org/wiki/Velana_International_Airport
    },
  ],

  "Rodrigues, Mauritius": [
    {
      lat: -20.43, lng: 57.683, kind: "airport",
      label: "Sir Seewoosagur Ramgoolam Intl (MRU)",
      detail: "Mauritius's main international gateway, served by Air Mauritius, Emirates, Air France, British Airways, Turkish. Anglers connect onward via Air Mauritius domestic flight (~1.5 hrs) to Rodrigues for the bonefish flats.",
      // src: https://en.wikipedia.org/wiki/Sir_Seewoosagur_Ramgoolam_International_Airport
    },
    {
      lat: -19.758, lng: 63.361, kind: "airport",
      label: "Sir Gaëtan Duval / Plaine Corail (RRG)",
      detail: "Rodrigues Island's sole airport, served by Air Mauritius from Mauritius and seasonal Air Austral from Réunion. 20-60 minute road transfer connects to the bonefish flats and south-coast lodges.",
      // src: https://en.wikipedia.org/wiki/Sir_Ga%C3%ABtan_Duval_Airport
    },
  ],

  "Seychelles (Alphonse, Astove, Cosmoledo, Providence)": [
    {
      lat: -4.674, lng: 55.522, kind: "airport",
      label: "Seychelles Intl (SEZ)",
      detail: "Main international gateway on Mahé, served by Emirates, Qatar, Etihad, Kenya Airways, Ethiopian, Air Seychelles. All outer-atoll fishing charters (Alphonse, Astove, Cosmoledo, Providence) depart from here.",
      // src: https://en.wikipedia.org/wiki/Seychelles_International_Airport
    },
    {
      lat: -7.005, lng: 52.726, kind: "airport",
      label: "Alphonse Island (FSAL)",
      detail: "IDC-operated charter airstrip (no IATA code) and the primary regional connector for the outer-atoll fishery — ~1-hour weekly charter from Mahé. Anglers bound for Cosmoledo and Providence liveaboards stage through here.",
      // src: https://en.wikipedia.org/wiki/Alphonse_Island_Airport
    },
    {
      lat: -10.061, lng: 47.75, kind: "airport",
      label: "Astove Island (FSSA)",
      detail: "Unpaved coral charter airstrip (no IATA code) serving Astove Atoll directly — ~3-hour charter flight from Mahé. Primary air-access point for the Astove flats fishery.",
      // src: https://en.wikipedia.org/wiki/Astove_Island_Airport
    },
  ],

  "Oman (Hallaniyat Islands)": [
    {
      lat: 23.593, lng: 58.284, kind: "airport",
      label: "Muscat Intl (MCT)",
      detail: "Oman's main international gateway, served by Oman Air, Emirates, Qatar, Etihad, Turkish. Anglers connect onward via a domestic flight to Salalah before the road-and-boat transfer to the Hallaniyat Islands.",
      // src: https://en.wikipedia.org/wiki/Muscat_International_Airport
    },
    {
      lat: 17.039, lng: 54.092, kind: "airport",
      label: "Salalah (SLL)",
      detail: "Closest airport to the Dhofar region, served by Oman Air, SalamAir, Qatar, flydubai. From here it is ~2-3 hour road transfer to a coastal launch point (Shuwaymiyah or Hasik) followed by a 1-4 hour boat crossing to the Hallaniyat Islands.",
      // src: https://en.wikipedia.org/wiki/Salalah_Airport
    },
  ],

  "Australia — Cape York / Gulf of Carpentaria": [
    {
      lat: -16.88583, lng: 145.75528, kind: "airport",
      label: "Cairns (CNS)",
      detail: "International/major-domestic gateway to Far North Queensland — Qantas, Virgin Australia, Jetstar from major Australian cities, with onward QantasLink and Skytrans connections north to the Cape. Anglers fly here first, then connect to Weipa or other Cape York strips.",
      // src: https://en.wikipedia.org/wiki/Cairns_Airport
    },
    {
      lat: -12.67861, lng: 141.92528, kind: "airport",
      label: "Weipa (WEI)",
      detail: "Serves western Cape York directly on the Gulf of Carpentaria — QantasLink, Skytrans, Alliance Airlines connect from Cairns and Brisbane. Closest airport to the classic Weipa barramundi and GT flats fishery.",
      // src: https://en.wikipedia.org/wiki/Weipa_Airport
    },
    {
      lat: -10.5856, lng: 142.2927, kind: "airport",
      label: "Horn Island (HID)",
      detail: "Serves the Torres Strait islands at the tip of Cape York via SkyTrans and other regional operators. Best gateway for anglers targeting the Torres Strait's GT and coral trout grounds around Thursday Island — a distinct fishery from the Weipa/Gulf side.",
      // src: https://en.wikipedia.org/wiki/Horn_Island_Airport
    },
  ],

  "Australia — Exmouth / Ningaloo Reef": [
    {
      lat: -31.94, lng: 115.965, kind: "airport",
      label: "Perth (PER)",
      detail: "Western Australia's international and major-domestic hub — Qantas, Virgin Australia, and others. Roughly 1,250 km by road from Exmouth (not a practical drive) — the arrival point anglers fly through before a QantasLink connection to Learmonth.",
      // src: https://en.wikipedia.org/wiki/Perth_Airport
    },
    {
      lat: -22.23583, lng: 114.08861, kind: "airport",
      label: "Learmonth (LEA)",
      detail: "The actual gateway to Exmouth and Ningaloo Reef, served by QantasLink from Perth. Joint civil/RAAF airfield with scheduled passenger service — ~25 min, 36 km drive into Exmouth town, from where lodges and charter boats reach the reef's GT, sailfish, and permit grounds.",
      // src: https://en.wikipedia.org/wiki/Learmonth_Airport
    },
  ],

  "Christmas Island, Kiribati": [
    {
      lat: 1.98611, lng: -157.34972, kind: "airport",
      label: "Cassidy Intl (CXI)",
      detail: "Kiritimati's only airport — Fiji Airways runs the sole international link, a once-weekly flight from Honolulu (also connecting to Nadi). This is the single air gateway for every Christmas Island bonefish and GT flats lodge.",
      // src: https://en.wikipedia.org/wiki/Cassidy_International_Airport
    },
    {
      lat: 21.31861, lng: -157.9225, kind: "airport",
      label: "Honolulu (HNL)",
      detail: "International arrival hub for Christmas Island trips — anglers connect here onto the weekly Fiji Airways flight to Cassidy International (~3 hr flight, crosses the International Date Line).",
      // src: https://en.wikipedia.org/wiki/Daniel_K._Inouye_International_Airport
    },
  ],

  "Papua New Guinea (Bismarck Archipelago)": [
    {
      lat: -9.44333, lng: 147.22, kind: "airport",
      label: "Port Moresby Intl (POM)",
      detail: "PNG's principal international gateway and Air Niugini's hub — connections from Brisbane, Sydney, Cairns, Singapore. Onward domestic legs to Rabaul, Hoskins, and Kavieng. Standard first stop for anglers heading to any Bismarck Sea GT lodge or liveaboard.",
      // src: https://en.wikipedia.org/wiki/Jacksons_International_Airport
    },
    {
      lat: -4.34028, lng: 152.37944, kind: "airport",
      label: "Rabaul / Tokua (RAB)",
      detail: "Built after the 1994 eruption destroyed Rabaul's original airfield — Air Niugini and PNG Air connect it to Port Moresby, Kavieng, Hoskins. Best gateway for East New Britain's volcanic-coast GT and popper fishing around Rabaul and Kokopo.",
      // src: https://en.wikipedia.org/wiki/Rabaul_Airport
    },
    {
      lat: -2.57917, lng: 150.80778, kind: "airport",
      label: "Kavieng (KVG)",
      detail: "Air Niugini's link to New Ireland Province from Port Moresby and Rabaul. Kavieng is a well-known base for GT and reef fishing along St. George's Channel and the Bismarck Sea's northern islands.",
      // src: https://en.wikipedia.org/wiki/Kavieng_Airport
    },
    {
      lat: -5.4621694, lng: 150.4049444, kind: "airport",
      label: "Hoskins (HKN)",
      detail: "Serves West New Britain via Air Niugini and PNG Air flights from Port Moresby, Lae, and Rabaul. Gateway to Kimbe Bay, a noted GT and sportfishing area on the Bismarck Sea's southern shore.",
      // src: https://en.wikipedia.org/wiki/Hoskins_Airport
    },
  ],

  "Solomon Islands": [
    {
      lat: -9.42806, lng: 160.05472, kind: "airport",
      label: "Honiara Intl (HIR)",
      detail: "Solomons' international gateway on Guadalcanal, served by Air Niugini and QantasLink from Brisbane, with Solomon Airlines domestic connections onward. Anglers transit here before flying to Western Province lodges.",
      // src: https://en.wikipedia.org/wiki/Honiara_International_Airport
    },
    {
      lat: -8.3279694, lng: 157.2630917, kind: "airport",
      label: "Munda (MUA)",
      detail: "Solomon Airlines' Western Province hub — since a 2023-24 upgrade also handles direct international flights to Brisbane. Closest major airport to the New Georgia Group's GT and bonefish flats, cutting out a Honiara connection entirely.",
      // src: https://en.wikipedia.org/wiki/Munda_Airport
    },
    {
      lat: -8.69778, lng: 160.68083, kind: "airport",
      label: "Auki / Gwaunaru'u (AKS)",
      detail: "Solomon Airlines' gateway to Malaita Province, ~12 km from Auki town, connecting onward to Honiara. Best access point for fly-fishing operations on Malaita and its outer reefs.",
      // src: https://en.wikipedia.org/wiki/Auki_Gwaunaru%27u_Airport
    },
  ],

  "Indonesia (Raja Ampat)": [
    {
      lat: -8.74806, lng: 115.1675, kind: "airport",
      label: "Denpasar / Bali (DPS)",
      detail: "Common international arrival point for Raja Ampat-bound anglers — Garuda Indonesia flies direct from Denpasar to Sorong, making Bali a convenient stopover before the final leg to the liveaboard departure point.",
      // src: https://en.wikipedia.org/wiki/Ngurah_Rai_International_Airport
    },
    {
      lat: -6.12556, lng: 106.65583, kind: "airport",
      label: "Jakarta Soekarno-Hatta (CGK)",
      detail: "Indonesia's principal international gateway — Garuda Indonesia runs direct flights on to Sorong. Alternate entry point to DPS for anglers heading to Raja Ampat's GT and trevally grounds.",
      // src: https://en.wikipedia.org/wiki/Soekarno%E2%80%93Hatta_International_Airport
    },
    {
      lat: -0.89417, lng: 131.28889, kind: "airport",
      label: "Sorong / Domine Eduard Osok (SOQ)",
      detail: "Essential regional gateway on the Bird's Head Peninsula, served by Garuda Indonesia, Lion Air, Sriwijaya Air from Jakarta and Denpasar. Nearly every Raja Ampat liveaboard guest lands here, then takes the public ferry to Waisai (~2 hours) to reach the fishing grounds.",
      // src: https://en.wikipedia.org/wiki/Domine_Eduard_Osok_Airport
    },
    {
      lat: -0.4255, lng: 130.77583, kind: "airport",
      label: "Marinda / Waisai (RJM)",
      detail: "Small Susi Air-only airstrip on Waigeo Island itself, with feeder flights to and from Sorong. Direct option into Raja Ampat, though most anglers still take the more frequent Sorong ferry rather than this limited-capacity domestic hop.",
      // src: https://en.wikipedia.org/wiki/Marinda_Airport
    },
  ],

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

  // Batch 2 (non-US destinations)
  "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)": 7,
  "Bimini, Bahamas": 11,
  "ABC Islands (Bonaire, Aruba, Curaçao)": 9,
  "Cuba — Cayo Cruz / Cayo Largo": 7,
  "Jardines de la Reina, Cuba": 7,
  "Los Roques, Venezuela": 7,
  "Bocas del Toro, Panama": 7,
  "Costa Rica Caribbean (Tortuguero / Río Colorado)": 9,
  "Costa Rica Pacific Coast": 7,
  "Honduras (Rio Sico / Mosquitia)": 7,
  "Nicaragua (Río San Juan)": 8,
  "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)": 8,
  "Baja California Sur, Mexico": 6,
  "Boca Paila & Sian Ka'an, Mexico": 8,
  "Gabón, West Africa": 7,
  "Mozambique (Bazaruto Archipelago)": 5,
  "Sudan / Nubian Flats (Red Sea)": 6,
  "Madagascar (Nosy Be)": 5,
  "Maldives": 9,
  "Rodrigues, Mauritius": 6,
  "Oman (Hallaniyat Islands)": 6,
  "Australia — Cape York / Gulf of Carpentaria": 6,
  "Australia — Exmouth / Ningaloo Reef": 5,
  "Christmas Island, Kiribati": 5,
  "Papua New Guinea (Bismarck Archipelago)": 5,
  "Solomon Islands": 7,
  "Indonesia (Raja Ampat)": 4,
};

export function getDestinationZoom(destinationName) {
  return DESTINATION_ZOOM[destinationName] || null;
}

