/**
 * Curated sub-area / specific-spot suggestions per library destination.
 *
 * Used by the intake form's "Specific area or lodge (optional)" datalist to
 * give the user typeahead suggestions for the most common sub-spots within
 * each destination. User can ALWAYS type custom text in addition to or
 * instead of these suggestions — these are just hints.
 *
 * The sub_area string (whatever the user picks or types) flows through to
 * Claude's prompt so the report can be tailored to that specific spot
 * ("December tarpon AT MARATHON specifically…") rather than the broader
 * library region.
 *
 * Add or refine suggestions as we learn what users actually type.
 */

export const SUB_AREAS_BY_DESTINATION = {
  // === Bahamas ===
  "Andros, Bahamas": [
    "North Andros", "Central Andros", "South Andros",
    "Cargill Creek", "Fresh Creek", "Mangrove Cay",
    "Andros Bonefish Club", "Bair's Lodge", "Andros South",
  ],
  "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)": [
    "Marsh Harbour", "Treasure Cay", "Cherokee Sound", "Elbow Cay",
    "Long Island", "Acklins", "Crooked Island", "Cat Island", "Eleuthera",
  ],
  "Bimini, Bahamas": [
    "North Bimini", "South Bimini", "Alice Town", "Bimini Sands",
  ],

  // === Caribbean ===
  "Turks & Caicos": [
    "Providenciales", "North Caicos", "South Caicos", "Middle Caicos", "Grand Turk",
  ],
  "Cayman Islands": [
    "Grand Cayman", "Little Cayman", "Cayman Brac",
  ],
  "ABC Islands (Bonaire, Aruba, Curaçao)": [
    "Bonaire", "Aruba", "Curaçao",
  ],
  "Jardines de la Reina, Cuba": [
    "Avalon mothership", "Tortuga lodge", "Avalon Fleet",
  ],
  "Cuba — Cayo Cruz / Cayo Largo": [
    "Cayo Cruz", "Cayo Largo", "Cayo Romano", "Cayo Coco", "Cayo Guillermo",
  ],

  // === Florida & Gulf Coast ===
  "Florida Keys (Lower & Middle Keys)": [
    "Islamorada", "Marathon", "Big Pine Key", "Key West",
    "Lower Keys", "Cudjoe Key", "Sugarloaf Key", "Key Largo",
    "Tavernier", "Plantation Key", "Summerland Key",
  ],
  "Biscayne Bay & Everglades, FL": [
    "Biscayne Bay", "Flamingo", "Florida Bay", "Whitewater Bay",
    "Ten Thousand Islands", "Chokoloskee", "Everglades City",
  ],
  "Mosquito Lagoon & Indian River Lagoon, FL": [
    "Mosquito Lagoon", "Indian River", "Banana River",
    "Titusville", "Edgewater", "Oak Hill", "New Smyrna Beach",
  ],
  "Tampa Bay & Sanibel, FL": [
    "Tampa Bay", "Sanibel Island", "Captiva", "Boca Grande",
    "Pine Island", "Charlotte Harbor", "Homosassa",
  ],
  "Louisiana Marsh": [
    "Venice", "Hopedale", "Delacroix", "Lafitte",
    "Buras", "Cocodrie", "Grand Isle",
  ],
  "Texas Gulf Coast / Laguna Madre": [
    "Port Mansfield", "Port Isabel", "South Padre Island",
    "Baffin Bay", "Rockport", "Aransas Pass", "Port O'Connor",
  ],

  // === Atlantic Coast (US) ===
  "Outer Banks, NC": [
    "Cape Lookout", "Cape Hatteras", "Ocracoke",
    "Pamlico Sound", "Roanoke Sound", "Bodie Island",
  ],
  "South Carolina Lowcountry": [
    "Charleston", "Beaufort", "Hilton Head",
    "Bulls Bay", "Bull Island", "Edisto",
  ],
  "Georgia Lowcountry": [
    "Savannah", "Brunswick", "St. Simons",
    "Sea Island", "Cumberland Island", "Jekyll Island",
  ],

  // === Mexico & Central America ===
  "Ambergris Caye & Turneffe, Belize": [
    "San Pedro", "Ambergris Caye", "Turneffe Atoll",
    "Glover's Reef", "Placencia", "Caye Caulker",
  ],
  "Boca Paila & Sian Ka'an, Mexico": [
    "Boca Paila", "Punta Allen", "Tulum",
    "Sian Ka'an north", "Sian Ka'an south",
  ],
  "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)": [
    "Ascension Bay", "Espíritu Santo Bay",
    "Punta Pájaros", "Casa Blanca", "Pez Maya",
  ],
  "Baja California Sur, Mexico": [
    "East Cape", "Cabo Pulmo", "Loreto", "La Paz",
    "Cabo San Lucas", "Magdalena Bay", "Punta Arenas",
  ],
  "Honduras (Rio Sico / Mosquitia)": [
    "Brus Laguna", "Caratasca Lagoon", "Mosquitia coast",
    "Río Sico",
  ],
  "Costa Rica Pacific Coast": [
    "Quepos", "Los Sueños", "Tamarindo",
    "Drake Bay", "Golfito", "Crocodile Bay",
    "Papagayo", "Nicoya Peninsula",
  ],
  "Costa Rica Caribbean (Tortuguero / Río Colorado)": [
    "Tortuguero", "Río Colorado", "Barra del Colorado",
    "Parismina",
  ],
  "Nicaragua (Río San Juan)": [
    "Río San Juan", "El Castillo", "San Carlos",
    "Solentiname Islands",
  ],
  "Bocas del Toro, Panama": [
    "Bocas Town", "Isla Colón", "Isla Bastimentos",
    "Isla Solarte", "Cayos Zapatillas",
  ],

  // === South America ===
  "Los Roques, Venezuela": [
    "Gran Roque", "El Yaque", "Cayo de Agua",
    "Madrisquí", "Crasquí",
  ],

  // === Africa & Middle East ===
  "Sudan / Nubian Flats (Red Sea)": [
    "Sanganeb", "Dungonab Bay", "Suakin Archipelago",
    "Nubian Flats north", "Nubian Flats south",
  ],
  "Oman (Hallaniyat Islands)": [
    "Hallaniyat Islands", "Hasikiyah", "Mirbat", "Sawqirah Bay",
  ],
  "Mozambique (Bazaruto Archipelago)": [
    "Bazaruto Island", "Benguerra Island", "Magaruque",
    "Santa Carolina", "Vilanculos",
  ],
  "Gabón, West Africa": [
    "Setté Cama", "Loango", "Sette Cama lagoon",
  ],
  "Seychelles (Alphonse, Astove, Cosmoledo, Providence)": [
    "Alphonse Island", "Astove Atoll", "Cosmoledo Atoll",
    "Providence Atoll", "Farquhar Atoll", "Poivre",
  ],

  // === Indian Ocean ===
  "Maldives": [
    "Male", "Ari Atoll", "Baa Atoll",
    "North Atoll", "South Atoll", "Huvadhoo Atoll",
  ],
  "Rodrigues, Mauritius": [
    "Port Mathurin", "Pointe Coton", "Grande Montagne",
  ],
  "Madagascar (Nosy Be)": [
    "Nosy Be", "Nosy Iranja", "Nosy Mitsio", "Nosy Sakatia",
  ],

  // === Indo-Pacific & Oceania ===
  "Australia — Exmouth / Ningaloo Reef": [
    "Exmouth", "Ningaloo Reef", "Tantabiddi",
    "Bundegi", "Coral Bay",
  ],
  "Australia — Cape York / Gulf of Carpentaria": [
    "Weipa", "Cooktown", "Cape York",
    "Gulf of Carpentaria", "Aurukun",
  ],
  "Papua New Guinea (Bismarck Archipelago)": [
    "New Britain", "New Ireland", "Kavieng",
    "Bismarck Sea", "Rabaul",
  ],
  "Indonesia (Raja Ampat)": [
    "Misool", "Waigeo", "Batanta", "Salawati",
  ],
  "Solomon Islands": [
    "Honiara", "Western Province", "Russell Islands",
    "Florida Islands", "Marovo Lagoon",
  ],

  // === Pacific ===
  "Hawaii": [
    "Big Island (Hawaii)", "Maui", "Oahu",
    "Kauai", "Molokai", "Lanai",
  ],
  "Christmas Island, Kiribati": [
    "Captain Cook Hotel", "Korean Village", "London",
    "Banana flats", "Paris flats",
  ],
};

/**
 * Get the suggested sub-areas for a destination. Returns an empty array
 * if the destination isn't curated (datalist will be empty, but the user
 * can still type freely).
 */
export function getSubAreasFor(destination) {
  if (!destination || typeof destination !== "string") return [];
  return SUB_AREAS_BY_DESTINATION[destination] || [];
}
