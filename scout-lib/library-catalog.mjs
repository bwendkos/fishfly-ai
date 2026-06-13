/**
 * Saltwater Fly Library catalog — pre-baked from fishfly-ai/data/final_v2.json
 * and fishfly-ai/library/index.html embedded data on 2026-06-13.
 *
 * Used by scout-lib/library-matcher.mjs to cross-link Claude-generated fly
 * recommendations to the live Library.
 *
 * Each entry collapses the per-region cards for one pattern into a single
 * record. target_species is the UNION of species across every region that
 * pattern is used in; regions[] lists each region.
 *
 * library_url uses the live Library's ?q= search-query parameter so the
 * destination page lands on a filtered view showing exactly that pattern
 * (and any same-name matches across regions).
 *
 * Regenerate: run scripts/build-library-catalog.js (TODO) or re-run this
 * generator (see push-pr4 history).
 */

export const LIBRARY_CATALOG = {
  generated_at: "2026-06-13T19:00:00Z",
  source_url: "https://fishfly.ai/library/",
  patterns: [
  {
    "pattern_name": "Albie Whore",
    "originator": "Richard Reagan",
    "pattern_type": "baitfish",
    "image_url": "https://bearsden.com/cdn/shop/products/IMG_4785.jpg?v=1691516687&width=1080",
    "buy_url": "https://bearsden.com/search?q=Albie+Whore",
    "buy_retailer": "Bear's Den",
    "library_url": "https://fishfly.ai/library/?q=Albie+Whore",
    "target_species": [
      "false albacore",
      "little tunny",
      "Spanish mackerel"
    ],
    "regions": [
      "Outer Banks, NC"
    ],
    "description": "Richard Reagan's pearlescent bay anchovy and silverside imitation for false albacore, bonito, and striped bass. Built with sparse white bucktail and flash over a slender hook, its tight, low-profile design cuts through fast rip current. Swing or strip through tidal seams; the Northeast coastal standard from Cape Cod to the Outer Banks during fall blitzes."
  },
  {
    "pattern_name": "Alphlexo Crab",
    "originator": "James Christmas / Alec Gerbec (Umpqua)",
    "pattern_type": "crab",
    "image_url": "https://www.superflies.com/wp-content/uploads/2023/02/alphlexo-crab-original-superflies_jpg.webp",
    "buy_url": "https://www.superflies.com/?s=Alphlexo+Crab",
    "buy_retailer": "Superflies",
    "library_url": "https://fishfly.ai/library/?q=Alphlexo+Crab",
    "target_species": [
      "Indo-Pacific permit",
      "yellowmargin triggerfish",
      "titan triggerfish",
      "bonefish",
      "giant trevally",
      "bluefin trevally",
      "permit",
      "Triggerfish",
      "Bonefish"
    ],
    "regions": [
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Sudan / Nubian Flats (Red Sea)",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)",
      "Maldives",
      "Rodrigues, Mauritius"
    ],
    "description": "Designed by Seychelles guide James Christmas, refined by Umpqua's Alec Gerbec, the Alphlexo Crab uses an open mesh body with orange latex innards over a weighted hook to mimic a crab tumbling across the flat. Sink fast, dead-drift or short strips. The top-ranked Indo-Pacific permit and triggerfish pattern at Alphonse, Astove, and Cosmoledo."
  },
  {
    "pattern_name": "Andino Deceiver",
    "originator": "Bob Popovics / Jimmy Andino (2000s)",
    "pattern_type": "baitfish",
    "image_url": "https://bigyflyco.com/cdn/shop/files/20230712_132017_1051x700.jpg?v=1689193558",
    "buy_url": "https://bigyflyco.com/search?q=Andino+Deceiver",
    "buy_retailer": "Big Y Fly Co",
    "library_url": "https://fishfly.ai/library/?q=Andino+Deceiver",
    "target_species": [
      "roosterfish",
      "jack crevalle",
      "dorado",
      "Pacific sailfish",
      "cubera snapper"
    ],
    "regions": [
      "Baja California Sur, Mexico",
      "Costa Rica Pacific Coast"
    ],
    "description": "Bob Popovics and Jimmy Andino's large streamer with a distinctive muddler-style diving/pushing head and long feather tail, originally tied in Argentina to imitate river dorado baitfish. Crossed over to saltwater as a Baja roosterfish and jack crevalle pattern. Fast, erratic strips make the bulky head push water and create turbulence mimicking panicked baitfish."
  },
  {
    "pattern_name": "Apte II Tarpon Fly",
    "originator": "Stu Apte",
    "pattern_type": "streamer",
    "image_url": "https://cdn11.bigcommerce.com/s-2iqsrmv4m0/products/593/images/979/Apte-II-Tarpon-Fly__65938__39191.1544756164.386.513.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Apte+II+Tarpon+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Apte+II+Tarpon+Fly",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Florida Keys (Lower & Middle Keys)"
    ],
    "description": "A Keys-style hackle-and-saddle fly imitating the shrimp and baitfish that large tarpon feed on in the Lower and Middle Keys. Distinguished from the original Stu Apte Tarpon Fly by adjusted material proportions and hook size. Fished dead-drifted or with a slow strip on incoming tide paths. Sold commercially by Reel Flies."
  },
  {
    "pattern_name": "Articulated Baitfish",
    "originator": "Stephen Chatterton",
    "pattern_type": "baitfish",
    "image_url": "https://fishonfly.com.au/wp-content/uploads/2019/10/ripper-a.jpg",
    "buy_url": "https://www.orvis.com/search?q=Articulated+Baitfish",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Articulated+Baitfish",
    "target_species": [
      "giant trevally",
      "barramundi",
      "queenfish",
      "mangrove jack",
      "Niugini black bass"
    ],
    "regions": [
      "Australia — Cape York / Gulf of Carpentaria",
      "Papua New Guinea (Bismarck Archipelago)"
    ],
    "description": "Imitates a wide range of small baitfish without matching a specific species, relying on a jointed profile at 11.5 cm (4/0) to trigger ambush predators. Developed by Stephen Chatterton (fishonfly.com.au), the two-section articulated design pulses realistically on the strip. Primary pattern for sighted GTs, barramundi, mangrove jack, and queenfish around Australian structure and PNG river systems."
  },
  {
    "pattern_name": "Atlantic Sardine Baitfish",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Atlantic+Sardine+Baitfish",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Atlantic+Sardine+Baitfish",
    "target_species": [
      "Atlantic tarpon",
      "Giant African threadfin",
      "Jack crevalle"
    ],
    "regions": [
      "Gabón, West Africa"
    ],
    "description": "Imitates Atlantic sardines and engraulids—primary forage in Gabon's Ndogo estuary. Tied EP-fiber or Puglisi style in silver/olive on 3/0–5/0, with a flat baitfish profile 8–12 cm long. Fished on floating or intermediate lines through crashing tarpon and threadfin schools. Distinct from Indo-Pacific sardine imitations used in Seychelles."
  },
  {
    "pattern_name": "Avalon Permit Fly",
    "originator": "Mauro Ginevri (Cayo Largo, Cuba, c. 2000s)",
    "pattern_type": "shrimp",
    "image_url": "https://cdn.shopify.com/s/files/1/0211/7110/products/avalon-permit-fly.jpg",
    "buy_url": "https://www.orvis.com/search?q=Avalon+Permit+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Avalon+Permit+Fly",
    "target_species": [
      "permit",
      "bonefish",
      "Indo-Pacific permit",
      "yellowmargin triggerfish",
      "titan triggerfish",
      "bluefin trevally"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize",
      "Florida Keys (Lower & Middle Keys)",
      "Jardines de la Reina, Cuba",
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Los Roques, Venezuela",
      "Cuba — Cayo Cruz / Cayo Largo"
    ],
    "description": "Mauro Ginevri's shrimp imitation developed at Cayo Largo, Cuba, credited with over 134 Cuban permit. Weighted keel and clicking bead system orient the hook up and sink fast. Its large shrimp profile and rattle action trigger permit on hard-bottom flat edges. Cast to tailing fish, let it sink, and strip slowly."
  },
  {
    "pattern_name": "Avalon Tarpon Fly",
    "originator": "Mauro Ginevri (2009)",
    "pattern_type": "streamer",
    "image_url": "https://blog.saltyflytying.com/wp-content/uploads/2013/03/Avalon3.jpg",
    "buy_url": "https://www.orvis.com/search?q=Avalon+Tarpon+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Avalon+Tarpon+Fly",
    "target_species": [
      "tarpon",
      "snook"
    ],
    "regions": [
      "Jardines de la Reina, Cuba"
    ],
    "description": "A slim, Keys-influenced hackle-and-saddle streamer developed by guide Mauro Ginevri at Avalon Fly Fishing Lodge in Cuba's Cayo Largo. Designed as a tarpon companion to Ginevri's Avalon permit fly, with a reduced hackle profile suited to the clear channels of Jardines de la Reina. Fished on a slow intermediate strip in current seams where large tarpon hold."
  },
  {
    "pattern_name": "Bauer Crab",
    "originator": "Will Bauer (1980s)",
    "pattern_type": "crab",
    "image_url": "https://www.fullingmill.com/94627.jpg",
    "buy_url": "https://www.orvis.com/search?q=Bauer+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Bauer+Crab",
    "target_species": [
      "permit"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)"
    ],
    "description": "Will Bauer's 1980s fur-and-rubber-leg crab imitation, developed for Belize permit with guide Lincoln Westby. Dense, compact profile tied on weighted hooks — lands quietly and sinks hook-point-up, imitating a fleeing blue crab. Dead-drifted or twitched on Belizean turtle-grass flats; Belizean guides consider it the most consistently effective permit pattern in the country."
  },
  {
    "pattern_name": "Beast Fleye",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://www.aos.cc/media/catalog/product/cache/e9a3ba468fa12d1c1f06bb0545e99349/b/e/beast_fleye_80_olive_green_back-min.jpg",
    "buy_url": "https://www.orvis.com/search?q=Beast+Fleye",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Beast+Fleye",
    "target_species": [
      "giant trevally"
    ],
    "regions": [
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)"
    ],
    "description": "A large-profile bucktail-over-monofilament baitfish pattern built for giant trevally on Indo-Pacific atolls. Its sparse construction allows long aerodynamic casts to cruising GT on exposed reef edges; the profile fills out when wet to suggest a substantial baitfish. Strip aggressively in short, hard pulls to trigger predatory strikes from fast-moving fish."
  },
  {
    "pattern_name": "Bedhead",
    "originator": "Alphonse Fishing Co. guides (Seychelles, c. 2015)",
    "pattern_type": "crab",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Bedhead",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Bedhead",
    "target_species": [
      "Indo-Pacific permit",
      "Triggerfish"
    ],
    "regions": [
      "Maldives",
      "Rodrigues, Mauritius"
    ],
    "description": "Imitates the dense-bodied sand crabs that permit and triggerfish feed on across Indian Ocean flats. Named for its weighted, compressed EP-fiber crab profile that sinks fast and sits low on the bottom. Developed by Alphonse Fishing Co. guides circa 2015, it features rubberleg movement and a wide silhouette. Deadlocked permit and trigger staple in Seychelles, Maldives, and Rodrigues."
  },
  {
    "pattern_name": "Big Eye Tarpon",
    "originator": "Bob LeMay",
    "pattern_type": "streamer",
    "image_url": "https://cdn.shoplightspeed.com/shops/607904/files/7920515/bigeye-tarpon-small.jpg",
    "buy_url": "https://www.orvis.com/search?q=Big+Eye+Tarpon",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Big+Eye+Tarpon",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Florida Keys (Lower & Middle Keys)"
    ],
    "description": "Bob LeMay's sparsely tied Keys tarpon fly features oversized 3D eyes, palmered hackle body, and a light flash accent that creates shrimp-like undulation on the strip. The exaggerated eye is a visual trigger for shallow-water tarpon. Typically fished with a slow-medium strip on 10–12 weight rods along the Florida Keys migration flats."
  },
  {
    "pattern_name": "Big Eye Tuna Fly",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/1280x1280/products/16341/16346/Big_Eye_Baitfish_Rogers_Herring__32112.1574279590.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Big+Eye+Tuna+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Big+Eye+Tuna+Fly",
    "target_species": [
      "yellowfin tuna",
      "dorado",
      "striped marlin",
      "Pacific sailfish"
    ],
    "regions": [
      "Baja California Sur, Mexico",
      "Costa Rica Pacific Coast"
    ],
    "description": "A large synthetic baitfish imitation dressed with layered EP or craft fibers and dominated by oversized 3D resin eyes that trigger a tuna's hard-wired predator response. Cast to daisy-chaining billfish or teased yellowfin and dorado off Baja. Strip fast and erratically to keep pace with pelagic targets in open water."
  },
  {
    "pattern_name": "Big Game Brush Fly",
    "originator": "Flymen Fishing Company (based on Seychelles GT patterns)",
    "pattern_type": "streamer",
    "image_url": "https://flymenfishingcompany.com/cdn/shop/files/Fish-Skull_Big_Game_Brush_Flies_Grey.png?v=1751468839",
    "buy_url": "https://flymenfishingcompany.com/search?q=Big+Game+Brush+Fly",
    "buy_retailer": "Flymen Fishing Company",
    "library_url": "https://fishfly.ai/library/?q=Big+Game+Brush+Fly",
    "target_species": [
      "giant trevally",
      "bluefin trevally",
      "dogtooth tuna",
      "barramundi"
    ],
    "regions": [
      "Hawaii",
      "Papua New Guinea (Bismarck Archipelago)",
      "Indonesia (Raja Ampat)"
    ],
    "description": "A large, durable brush-style baitfish imitation tied by Flymen Fishing Company for giant trevally, Hawaiian ulua, and GT-class fish worldwide. Built from Fish-Skull Fish-Brush material on a 6/0 hook, available in high-contrast colors like black/purple and grey. Fished with aggressive single or double strips in the breaking surf zone where GT and bluefin trevally ambush bait."
  },
  {
    "pattern_name": "Bird Dog (Captain Sullivan's)",
    "originator": "Capt. Jason Sullivan",
    "pattern_type": "baitfish",
    "image_url": "https://news.orvis.com/wp-content/uploads/2021/11/sully2.jpg",
    "buy_url": "https://www.orvis.com/search?q=Bird+Dog+%28Captain+Sullivan%27s%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Bird+Dog+(Captain+Sullivan's)",
    "target_species": [
      "snook",
      "redfish",
      "tarpon"
    ],
    "regions": [
      "Biscayne Bay & Everglades, FL"
    ],
    "description": "Captain Jason Sullivan's searching baitfish pattern built with white and red EP Ze-Brush fibers for a full, translucent profile. Designed for blind-casting Everglades backcountry when sight-fishing conditions fail. The pulsing synthetic fibers breathe on the pause, triggering snook and redfish holding in low-visibility tannin-stained channels and mangrove edges."
  },
  {
    "pattern_name": "Black & Purple Tarpon Toad",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "http://bigtimeflies.com/cdn/shop/products/tarpon-toad-small-purple-black_800x.jpg?v=1586559781",
    "buy_url": "https://bigtimeflies.com/search?q=Black+%26+Purple+Tarpon+Toad",
    "buy_retailer": "BigTime Flies",
    "library_url": "https://fishfly.ai/library/?q=Black+%26+Purple+Tarpon+Toad",
    "target_species": [
      "Atlantic tarpon"
    ],
    "regions": [
      "Gabón, West Africa"
    ],
    "description": "A colour-specific variant of the Tarpon Toad, substituting black and purple materials throughout for maximum silhouette contrast in Gabon's dark, turbid beach surf. The wide, palmered body pushes water and gives a breathing action on the strip. Universally cited in Sette Cama trip reports as the most-effective tarpon colour in off-coloured Atlantic surf."
  },
  {
    "pattern_name": "Black 'n' Barred",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Black+%27n%27+Barred",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Black+'n'+Barred",
    "target_species": [
      "giant trevally",
      "queenfish",
      "golden trevally",
      "barramundi",
      "threadfin salmon",
      "mangrove jack"
    ],
    "regions": [
      "Australia — Exmouth / Ningaloo Reef",
      "Australia — Cape York / Gulf of Carpentaria"
    ],
    "description": "Black variant of Australia's Pink Thing with barred grizzly hackle saddles over a white belly creating high-contrast fright stripes. Documented by Saltwater Flyrodders Australia as one of Australia's most popular multi-species tropical flies. Particularly effective in tannin-stained water for barramundi, GT, and queenfish across northern Australia and the Gulf of Carpentaria."
  },
  {
    "pattern_name": "Black Brush Fly",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://www.superflies.com/wp-content/uploads/2020/11/gt-brush-fly-black-superflies_jpg.webp",
    "buy_url": "https://www.superflies.com/?s=Black+Brush+Fly",
    "buy_retailer": "Superflies",
    "library_url": "https://fishfly.ai/library/?q=Black+Brush+Fly",
    "target_species": [
      "giant trevally",
      "dogtooth tuna",
      "mangrove jack"
    ],
    "regions": [
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Sudan / Nubian Flats (Red Sea)",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)",
      "Australia — Exmouth / Ningaloo Reef",
      "Papua New Guinea (Bismarck Archipelago)",
      "Indonesia (Raja Ampat)"
    ],
    "description": "All-black palmered brush-fiber streamer regarded by Alphonse Fishing Co. guides as the single most productive Seychelles GT fly ever. Tied large on heavy hooks with optional purple or olive accent fibers. Two-handed fast strip through the surf zone; the bulk and dark silhouette trigger aggressive GT charges on Cosmoledo and Alphonse atolls."
  },
  {
    "pattern_name": "Black Death",
    "originator": "Stu Apte",
    "pattern_type": "streamer",
    "image_url": "https://bigtimeflies.com/cdn/shop/products/black-death-tarpon-fly.jpg?v=1586636004",
    "buy_url": "https://bigtimeflies.com/search?q=Black+Death",
    "buy_retailer": "BigTime Flies",
    "library_url": "https://fishfly.ai/library/?q=Black+Death",
    "target_species": [
      "tarpon",
      "snook"
    ],
    "regions": [
      "Florida Keys (Lower & Middle Keys)",
      "Ambergris Caye & Turneffe, Belize",
      "Jardines de la Reina, Cuba",
      "Los Roques, Venezuela",
      "Boca Paila & Sian Ka'an, Mexico",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)",
      "Honduras (Rio Sico / Mosquitia)",
      "Bocas del Toro, Panama",
      "Cuba — Cayo Cruz / Cayo Largo",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Stu Apte's all-black tarpon streamer, a Florida Keys classic tied with black saddle hackle and a hint of purple. The dark, high-contrast silhouette excels in low-light conditions, overcast days, and in the deeper, darker channels of the Lower Keys. Presented on a slow strip-pause retrieve to laid-up or rolling tarpon; also effective for Belize and Cuba tarpon."
  },
  {
    "pattern_name": "Black Magic",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "https://i.etsystatic.com/26621096/r/il/61fd39/7406903929/il_fullxfull.7406903929_sy4v.jpg",
    "buy_url": "https://www.orvis.com/search?q=Black+Magic",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Black+Magic",
    "target_species": [
      "red drum",
      "speckled sea trout"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre"
    ],
    "description": "A dark-toned shrimp or attractor pattern tied in black, dark earth, and root beer tones for redfish and speckled trout. Its dark silhouette is most effective in tannin-stained Louisiana marsh water and on Texas flats under low-light conditions when predators are feeding with reduced wariness. Fish slow with minimal movement near bottom structure."
  },
  {
    "pattern_name": "Blue/White Pacific Billfish Streamer",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "https://i.etsystatic.com/13339222/r/il/324db5/6752758399/il_fullxfull.6752758399_7u72.jpg",
    "buy_url": "https://www.orvis.com/search?q=Blue%2FWhite+Pacific+Billfish+Streamer",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Blue/White+Pacific+Billfish+Streamer",
    "target_species": [
      "Pacific sailfish",
      "blue marlin",
      "striped marlin",
      "dorado"
    ],
    "regions": [
      "Costa Rica Pacific Coast"
    ],
    "description": "A generic class of large blue-and-white tube fly tied in the round on a 6/0–8/0 hook, imitating the mackerel and flying fish that Pacific billfish target. The blue-over-white color scheme is second only to pink/white in Costa Rica, particularly effective under overcast skies and low-light conditions. Teased to the boat's wake before presenting the fly."
  },
  {
    "pattern_name": "Bonefish Bitters",
    "originator": "Craig Mathews (1980s)",
    "pattern_type": "shrimp",
    "image_url": "https://assets.orvis.com/is/image/orvisprd/1X1X439W_?wid=1280&src=is($object$:1-1)&qlt=85&resMode=sharp2&op_usm=1.75,0.3,2,0",
    "buy_url": "https://www.orvis.com/search?q=Bonefish+Bitters",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Bonefish+Bitters",
    "target_species": [
      "bonefish",
      "permit"
    ],
    "regions": [
      "Andros, Bahamas",
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Los Roques, Venezuela",
      "Bimini, Bahamas",
      "Turks & Caicos",
      "Cayman Islands",
      "ABC Islands (Bonaire, Aruba, Curaçao)",
      "Boca Paila & Sian Ka'an, Mexico",
      "Cuba — Cayo Cruz / Cayo Largo"
    ],
    "description": "Craig Mathews' 1980s crab-shrimp hybrid with a low-riding, wide-bodied profile, rubber legs, and bead-chain eyes that keep the hook point riding up. Tied in tan, olive, and pink to match Caribbean flats forage. Sinks slowly into grass and can be twitched in place for tailing bonefish. Also effective on permit."
  },
  {
    "pattern_name": "Bonefish Scampi",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "https://www.saltwaterflies.com/banded_scampi_side.jpg",
    "buy_url": "https://www.orvis.com/search?q=Bonefish+Scampi",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Bonefish+Scampi",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Christmas Island, Kiribati"
    ],
    "description": "Slim mantis-shrimp silhouette tied with sparse craft fur or rabbit, banded rubber legs, and bead-chain eyes. Sinks steadily without splash — ideal for Christmas Island's deeper channels and faster tidal water where bonefish feed aggressively. Fish with a short, sharp strip retrieve. Henry Cowen's recipe is the most widely tied version."
  },
  {
    "pattern_name": "Bonefish Special",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "http://bearsden.com/cdn/shop/files/IMG_6319.jpg?v=1721143437",
    "buy_url": "https://bearsden.com/search?q=Bonefish+Special",
    "buy_retailer": "Bear's Den",
    "library_url": "https://fishfly.ai/library/?q=Bonefish+Special",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Jardines de la Reina, Cuba"
    ],
    "description": "A generic attractor-shrimp imitation tied in sand/light-brown on hooks #4–#6, effective across varied bonefish flats including the mixed sand and grass bottom of Jardines de la Reina. Sparse profile and weighted eyes produce a quick, quiet sink. Fished on a short, slow strip with pauses; the neutral coloration covers most flat types when a more specific imitation isn't required."
  },
  {
    "pattern_name": "Bonefish Toad",
    "originator": "",
    "pattern_type": "other",
    "image_url": "https://www.flyfishbonehead.com/wp-content/uploads/2015/07/bonefish-toad-bonefish-fly-fly-tying-videos-for-bonefish.jpg",
    "buy_url": "https://www.orvis.com/search?q=Bonefish+Toad",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Bonefish+Toad",
    "target_species": [
      "bonefish",
      "permit"
    ],
    "regions": [
      "Biscayne Bay & Everglades, FL"
    ],
    "description": "A lightweight, unweighted flats pattern with a polypropylene yarn body and rubber legs designed to imitate small crustaceans and worms on mixed sand and grass bottoms. Its neutral buoyancy and soft splash entry make it ideal for skittish fish in shallow Biscayne Bay and Everglades flats. Fish on a dead-drift or minimal strip retrieve."
  },
  {
    "pattern_name": "Borski Slider",
    "originator": "Tim Borski",
    "pattern_type": "slider",
    "image_url": "https://assets.orvis.com/is/image/orvisprd/018Y009W_?wid=1280&src=is($object$:1-1)&qlt=85&resMode=sharp2&op_usm=1.75,0.3,2,0",
    "buy_url": "https://www.orvis.com/search?q=Borski+Slider",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Borski+Slider",
    "target_species": [
      "red drum",
      "speckled sea trout",
      "bonefish",
      "redfish",
      "snook",
      "jack crevalle",
      "spotted seatrout"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Andros, Bahamas",
      "Florida Keys (Lower & Middle Keys)",
      "Biscayne Bay & Everglades, FL",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Los Roques, Venezuela",
      "ABC Islands (Bonaire, Aruba, Curaçao)",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "South Carolina Lowcountry",
      "Georgia Lowcountry",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Tim Borski's wide-bodied, foam-head slider rides hook-point-up on a weedless rig. The bulky deer-hair or foam collar pushes water while the marabou tail breathes on the pause. An unweighted, soft-landing presentation ideal for shallow turtle-grass flats and redfish potholes. Created in the Florida Keys, now used from Andros to the Laguna Madre."
  },
  {
    "pattern_name": "Borski's Orange Butt Tarpon",
    "originator": "Tim Borski (Florida Keys)",
    "pattern_type": "streamer",
    "image_url": "https://cdn11.bigcommerce.com/s-5020eou/images/stencil/1280x1280/products/2301/9635/050_300_side__88317.1448485287.png?c=2",
    "buy_url": "https://www.orvis.com/search?q=Borski%27s+Orange+Butt+Tarpon",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Borski's+Orange+Butt+Tarpon",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)"
    ],
    "description": "Tim Borski's Florida Keys tarpon streamer with a distinctive orange butt and palmered hackle collar over a rabbit or craft-fur body. Fished subsurface on a floating or intermediate line with a slow, steady strip through mangrove lagoons and backcountry channels. Color contrast and pulsing hackle action draw strikes from tarpon holding tight to structure."
  },
  {
    "pattern_name": "Brewer's Amber Shrimp",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Brewer%27s+Amber+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Brewer's+Amber+Shrimp",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Bimini, Bahamas"
    ],
    "description": "Classic Bahamian shrimp imitation in amber and tan with a wood-duck tail that matches the mangrove-edge shrimp bonefish key on in tidal cuts and flat edges. A long-standing must-have pattern for Bahamian flats including Bimini, listed by Angler Adventures as a Bahamas essential. Bead-chain eyes give controlled sink rate for skinny water."
  },
  {
    "pattern_name": "Brown Special Crab",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Brown+Special+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Brown+Special+Crab",
    "target_species": [
      "permit"
    ],
    "regions": [
      "Honduras (Rio Sico / Mosquitia)"
    ],
    "description": "A local-style brown crab imitation in hook sizes #2–#8, built to match the dark crabs of the Bay Islands' turtle-grass and coral flats. Photographed directly in a Fly Fishing Caribe Guanaja Honduras fly box with the caption 'Crab Fly Brown Special Crab.' Presented on a dead-drift or slow strip to permit tailing on the Honduras Mosquitia flats."
  },
  {
    "pattern_name": "Brush Popper",
    "originator": "",
    "pattern_type": "popper",
    "image_url": "https://assets.orvis.com/is/image/orvisprd/3R7C059W_?wid=1280&src=is($object$:1-1)&qlt=85&resMode=sharp2&op_usm=1.75,0.3,2,0",
    "buy_url": "https://www.orvis.com/search?q=Brush+Popper",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Brush+Popper",
    "target_species": [
      "roosterfish",
      "jack crevalle"
    ],
    "regions": [
      "Baja California Sur, Mexico"
    ],
    "description": "A hard-foam-bodied surface popper with a cupped face and brush-style collar, designed for aggressive saltwater species. Stripped fast along Baja California beach breaks, the popping face displaces water with an audible splash that imitates panicked baitfish — the trigger that draws roosterfish and jack crevalle from the wave zone to the surface for explosive strikes."
  },
  {
    "pattern_name": "Bunny Anchovy",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Bunny+Anchovy",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Bunny+Anchovy",
    "target_species": [
      "tarpon",
      "jack crevalle",
      "snook"
    ],
    "regions": [
      "Honduras (Rio Sico / Mosquitia)"
    ],
    "description": "Rabbit-strip anchovy imitation on 1/0–3/0 in white/olive with a pulsing zonker tail replicating schooling baitfish action. Used around Honduras Mosquitia river mouths for tarpon and jack crevalle. Photographed in the Fly Fishing Caribe Honduras fly box as 'Wet Fly Bunny Anchovy'; supple rabbit fur maintains action at low strip speed."
  },
  {
    "pattern_name": "Bunny Bone",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "https://www.saltwaterflies.com/bunny_bone_side.jpg",
    "buy_url": "https://www.orvis.com/search?q=Bunny+Bone",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Bunny+Bone",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Andros, Bahamas",
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Bimini, Bahamas"
    ],
    "description": "An unweighted bonefish shrimp pattern built with a crosscut rabbit fur body that undulates naturally with each twitch of the line. Its minimal splash entry and soft landing are essential for presenting to tailing fish in ultra-skinny Andros and Bahamian out-island water. Fish with a slow, barely-there strip on big hard-sand flats."
  },
  {
    "pattern_name": "Cam Sigler Big Game Tube Fly (Tandem Rigged)",
    "originator": "Cam Sigler (1990s)",
    "pattern_type": "streamer",
    "image_url": "https://cdn.shoplightspeed.com/shops/618341/files/52598621/1500x4000x3/cam-sigler-cam-sigler-big-game-tube-flies-unrigged.jpg",
    "buy_url": "https://www.orvis.com/search?q=Cam+Sigler+Big+Game+Tube+Fly+%28Tandem+Rigged%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Cam+Sigler+Big+Game+Tube+Fly+(Tandem+Rigged)",
    "target_species": [
      "Pacific sailfish",
      "black marlin",
      "blue marlin",
      "striped marlin"
    ],
    "regions": [
      "Costa Rica Pacific Coast"
    ],
    "description": "The definitive Pacific billfish tube fly by Cam Sigler, first tied in the 1990s. Two large tubes slid on a single leader create a 9-inch profile in pink/white — the dominant color on boats out of Quepos and Los Sueños. Bucktail and hackle tied in the round give 360° water movement. Teased to the wake before presenting under the rod tip."
  },
  {
    "pattern_name": "Cam Sigler Mega Marlin Tube Fly",
    "originator": "Cam Sigler (2000s)",
    "pattern_type": "streamer",
    "image_url": "https://www.camsigler.com/flies/MegaMarlinLg.JPG",
    "buy_url": "https://www.orvis.com/search?q=Cam+Sigler+Mega+Marlin+Tube+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Cam+Sigler+Mega+Marlin+Tube+Fly",
    "target_species": [
      "blue marlin",
      "black marlin"
    ],
    "regions": [
      "Costa Rica Pacific Coast"
    ],
    "description": "Cam Sigler's extended-profile marlin fly, developed in the 2000s for large-boat billfish operations. Tied in the round on a heavy 2¾-inch tube with dual hackle sets and large doll eyes, reaching 10.5–12 inches in length. Designed to track straight and push significant water in rough-sea conditions off Golfito and Drake Bay when targeting blue and black marlin."
  },
  {
    "pattern_name": "Candy — Pelagic",
    "originator": "Stephen Chatterton",
    "pattern_type": "baitfish",
    "image_url": "https://fishonfly.com.au/wp-content/uploads/2019/03/candy-pelagics.jpg",
    "buy_url": "https://www.orvis.com/search?q=Candy+%E2%80%94+Pelagic",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Candy+—+Pelagic",
    "target_species": [
      "queenfish",
      "giant trevally",
      "longtail tuna",
      "Spanish mackerel"
    ],
    "regions": [
      "Australia — Cape York / Gulf of Carpentaria"
    ],
    "description": "Match-the-hatch unweighted baitfish imitation designed by Stephen Chatterton (fishonfly.com.au) to replicate the slim schooling baitfish — hardyheads, herrings, anchovies — that pelagics key on. Sparse synthetic-fiber body provides translucency and flash. Stripped fast across breaking schools of queenfish, longtail tuna, and Spanish mackerel off Cape York and the Gulf of Carpentaria."
  },
  {
    "pattern_name": "Casa Blanca Crab (Cuban)",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "https://fishtalesflyshop.com/cdn/shop/files/aqua_flies_casa_blanca_crab_saltwater_flats_fly_white.jpg?v=1743795785&width=600",
    "buy_url": "https://www.fishtalesflyshop.com/search?q=Casa+Blanca+Crab+%28Cuban%29",
    "buy_retailer": "Fish Tales Fly Shop",
    "library_url": "https://fishfly.ai/library/?q=Casa+Blanca+Crab+(Cuban)",
    "target_species": [
      "permit",
      "bonefish"
    ],
    "regions": [
      "Jardines de la Reina, Cuba"
    ],
    "description": "A crab imitation developed in the Casa Blanca flat area of Cuba, tied with local color variations for the turtle-grass and coral-sand flats of Jardines de la Reina. Distinct from the Yucatan-origin Casa Blanca Raghead. Presented with a weighted hook for rapid descent to permit feeding depth; fished with minimal movement once settled near the bottom."
  },
  {
    "pattern_name": "Casa Blanca Raghead",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "https://redsflyfishing.com/cdn/shop/products/iCB003t_a3eb5546-fe6e-4fa3-adb6-ed43e59f2041_813x700.jpg?v=1607026877",
    "buy_url": "https://redsflyfishing.com/search?q=Casa+Blanca+Raghead",
    "buy_retailer": "Red's Fly Shop",
    "library_url": "https://fishfly.ai/library/?q=Casa+Blanca+Raghead",
    "target_species": [
      "permit"
    ],
    "regions": [
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)"
    ],
    "description": "A Rainy's-produced crab fly developed at Casa Blanca Lodge on Ascension Bay. Stacked deer-hair legs and a buoyant raghead body land softly and sink slowly over the turtle-grass and sand flats of the Yucatán. Tan and olive colorways dominate; fished dead-drift or with minimal twitches in front of tailing permit."
  },
  {
    "pattern_name": "Cayman Sleek",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Cayman+Sleek",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Cayman+Sleek",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Cayman Islands"
    ],
    "description": "Developed after Cayman bonefish refused standard Crazy Charlies and Gotchas, the Cayman Sleek features a pearl Mylar body, golden bead-chain eyes, brown-and-tan craft-fur tail, and rubber legs. The slim, shrimp-like silhouette sinks quickly on Cayman's shallow grass flats. Effective across the full size range of Grand Cayman bonefish on a slow-twitch strip."
  },
  {
    "pattern_name": "CF Baitfish",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://www.theflyfishers.com/Content/files/ProductImages/0000001734.jpg?width=1000&height=800&mode=max",
    "buy_url": "https://www.orvis.com/search?q=CF+Baitfish",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=CF+Baitfish",
    "target_species": [
      "red drum",
      "speckled sea trout",
      "Spanish mackerel",
      "jack crevalle",
      "roosterfish",
      "dorado"
    ],
    "regions": [
      "Texas Gulf Coast / Laguna Madre",
      "Baja California Sur, Mexico"
    ],
    "description": "A simple, lightweight craft-fur baitfish pattern tied in two or three layers of stacked fur over a hook with optional flash. Extremely castable and versatile. The craft fur breathes naturally on the retrieve, imitating mullet, sardines, and glass minnows. Effective on redfish and trout inshore, and on roosterfish and dorado along Baja beaches."
  },
  {
    "pattern_name": "Chatto's Baitfish",
    "originator": "Stephen Chatterton",
    "pattern_type": "baitfish",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Chatto%27s+Baitfish",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Chatto's+Baitfish",
    "target_species": [
      "barramundi",
      "giant trevally",
      "queenfish",
      "mangrove jack",
      "threadfin salmon"
    ],
    "regions": [
      "Australia — Cape York / Gulf of Carpentaria"
    ],
    "description": "Reef-minnow baitfish developed by Central Queensland tier Stephen Chatterton. Dumbbell eyes on 2/0–4/0 orient it hook-point up through Cape York mangrove structure. Craft fur or EP fibers in white/olive represent tropical inshore baitfish. Full recipe documented at fishonfly.com.au; effective on barramundi, GT, and mangrove jack in the Gulf of Carpentaria."
  },
  {
    "pattern_name": "Chernobyl Crab",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "http://jacksonholeflycompany.com/cdn/shop/products/chernobyl-crab-or-jackson-hole-fly-company.jpg?v=1721402298",
    "buy_url": "https://jacksonholeflycompany.com/search?q=Chernobyl+Crab",
    "buy_retailer": "Jackson Hole Fly Company",
    "library_url": "https://fishfly.ai/library/?q=Chernobyl+Crab",
    "target_species": [
      "red drum",
      "black drum",
      "sheepshead"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre"
    ],
    "description": "Foam-bodied, rubber-legged crab that floats or slow-sinks, imitating small blue and stone crabs that redfish and drum crush on shell flats. Dense rubber-leg array provides realistic movement. Present with a soft landing on tailing fish and let the legs flutter without stripping. Highly effective on Louisiana marsh edges and Texas Laguna Madre."
  },
  {
    "pattern_name": "Chicone's Crusher Leg Gotcha",
    "originator": "Drew Chicone",
    "pattern_type": "shrimp",
    "image_url": "https://www.saltyflytying.com/cdn/shop/products/new-crusher-legs-fly1_1024x1024@2x.jpg?v=1595849118",
    "buy_url": "https://www.orvis.com/search?q=Chicone%27s+Crusher+Leg+Gotcha",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Chicone's+Crusher+Leg+Gotcha",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)"
    ],
    "description": "Drew Chicone's rubber-legged variant of the classic Gotcha, from his 'Bonefish Flies Abaco' series. Realistic jointed legs tied with Chicone's Crusher Leg material add micro-movement that sells the shrimp imitation to pressured, educated Abaco bonefish. Bead-chain eyes for a quiet entry; fished with short strips on the white sand and turtle-grass flats of the Abaco Marls."
  },
  {
    "pattern_name": "Chicone's Disco Shrimp",
    "originator": "Drew Chicone",
    "pattern_type": "attractor",
    "image_url": "https://cdn.shopify.com/s/files/1/0022/7298/5154/files/disco-shrimp-tan-cmyk__95862.jpg?v=1744484094",
    "buy_url": "https://www.orvis.com/search?q=Chicone%27s+Disco+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Chicone's+Disco+Shrimp",
    "target_species": [
      "redfish",
      "snook",
      "spotted seatrout",
      "juvenile tarpon"
    ],
    "regions": [
      "Mosquito Lagoon & Indian River Lagoon, FL"
    ],
    "description": "Topwater shrimp attractor with a concave gurgler-style disc face and built-in rattle that mimics a snapping, fleeing shrimp. Created by Drew Chicone for the Indian River Lagoon backcountry, it pushes a noisy wake on the surface. Standard Mosquito Lagoon attractor for tailing redfish, snook, and juvenile tarpon; fished with short, erratic strips to trigger violent surface eats."
  },
  {
    "pattern_name": "Chicone's Optical Illusion",
    "originator": "Drew Chicone",
    "pattern_type": "shrimp",
    "image_url": "https://blog.saltyflytying.com/wp-content/uploads/2013/03/Tranqu-Hill-izer.jpg",
    "buy_url": "https://www.orvis.com/search?q=Chicone%27s+Optical+Illusion",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Chicone's+Optical+Illusion",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)"
    ],
    "description": "Drew Chicone's subtle shrimp pattern developed specifically for hard-fished Abaco bonefish. Built with fine synthetic fibers and minimal bulk, its sparse profile and translucent triggers appeal to pressure-wise fish that reject standard patterns. Presented on a long leader with a light tippet on clear hard-sand Abaco flats; documented in Chicone's Bonefish Flies Abaco ebook."
  },
  {
    "pattern_name": "Chili Pepper",
    "originator": "Moana Koffe",
    "pattern_type": "shrimp",
    "image_url": "https://www.saltwaterflies.com/chili_pepper_bc_eye_side.jpg",
    "buy_url": "https://www.orvis.com/search?q=Chili+Pepper",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Chili+Pepper",
    "target_species": [
      "bonefish",
      "yellowmargin triggerfish"
    ],
    "regions": [
      "Christmas Island, Kiribati"
    ],
    "description": "Developed by Christmas Island guide Moana Koffe for full-moon bonefish gatherings on Paris Flat. Features a red-hot-colored body with bead-chain or lead eyes and sparse fiber or calf-tail wing. Sinks quickly to intercept feeding bones. Fished with short strips along the bottom on sand flats; the name references its signature color."
  },
  {
    "pattern_name": "Christmas Island Special",
    "originator": "Randall Kaufmann",
    "pattern_type": "shrimp",
    "image_url": "https://alaskaflyfishinggoods.com/wp-content/uploads/product_images/cxsp_orange.gif",
    "buy_url": "https://alaskaflyfishinggoods.com/?s=Christmas+Island+Special",
    "buy_retailer": "Alaska Fly Fishing Goods",
    "library_url": "https://fishfly.ai/library/?q=Christmas+Island+Special",
    "target_species": [
      "bonefish",
      "yellowmargin triggerfish",
      "Bonefish"
    ],
    "regions": [
      "Andros, Bahamas",
      "Ambergris Caye & Turneffe, Belize",
      "Christmas Island, Kiribati",
      "Hawaii",
      "Los Roques, Venezuela",
      "Sudan / Nubian Flats (Red Sea)",
      "Bimini, Bahamas",
      "Turks & Caicos",
      "ABC Islands (Bonaire, Aruba, Curaçao)",
      "Boca Paila & Sian Ka'an, Mexico",
      "Solomon Islands"
    ],
    "description": "Randall Kaufmann's shrimp-baitfish attractor, tied with a palmered body, bead-chain eyes, and a wing of calf tail or craft fur over a sparse body in orange, pink, or tan. Named for Kiritimati's legendary flats where local guides consider it the top pattern. Fished in sizes 4–8 with a slow strip-pause cadence to imitate fleeing mantis shrimp."
  },
  {
    "pattern_name": "Clouser Deep Minnow",
    "originator": "Bob Clouser (mid-1980s)",
    "pattern_type": "baitfish",
    "image_url": "https://clousersflyfishing.com/cdn/shop/files/0d8a5bf2700850ddec227adc59d8e8a8.jpg?v=1700235655",
    "buy_url": "https://www.orvis.com/search?q=Clouser+Deep+Minnow",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Clouser+Deep+Minnow",
    "target_species": [
      "bonefish",
      "barracuda",
      "jacks",
      "jack crevalle",
      "mutton snapper",
      "snook",
      "tarpon",
      "Spanish mackerel",
      "red drum",
      "striped bass",
      "false albacore",
      "cubera snapper",
      "giant trevally",
      "bluefin trevally",
      "golden trevally",
      "queenfish",
      "speckled sea trout",
      "ladyfish",
      "sierra mackerel",
      "yellowfin tuna",
      "papio jacks",
      "roosterfish",
      "Pacific snook",
      "kingfish",
      "dogtooth tuna",
      "barramundi",
      "threadfin salmon",
      "Niugini black bass",
      "mangrove jack",
      "snapper",
      "Mangrove jack",
      "Spot-tail bass",
      "Coral trout",
      "redfish",
      "spotted seatrout",
      "black drum"
    ],
    "regions": [
      "Andros, Bahamas",
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Florida Keys (Lower & Middle Keys)",
      "Biscayne Bay & Everglades, FL",
      "Outer Banks, NC",
      "Ambergris Caye & Turneffe, Belize",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Jardines de la Reina, Cuba",
      "Christmas Island, Kiribati",
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Baja California Sur, Mexico",
      "Hawaii",
      "Costa Rica Pacific Coast",
      "Los Roques, Venezuela",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)",
      "Australia — Cape York / Gulf of Carpentaria",
      "Papua New Guinea (Bismarck Archipelago)",
      "Indonesia (Raja Ampat)",
      "Bimini, Bahamas",
      "Turks & Caicos",
      "Cayman Islands",
      "ABC Islands (Bonaire, Aruba, Curaçao)",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)",
      "Honduras (Rio Sico / Mosquitia)",
      "Bocas del Toro, Panama",
      "Solomon Islands",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "South Carolina Lowcountry",
      "Georgia Lowcountry",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Bob Clouser's dumbbell-eyed bucktail streamer, developed mid-1980s, fishes hook-point-up to reduce snags. Lead or brass eyes drive a darting jig action on the retrieve. Tied in tan/white for bonefish and flats species; chartreuse/white for stripers, jacks, and redfish. Cast, count down, then strip-strip-pause. Effective in virtually every saltwater environment worldwide."
  },
  {
    "pattern_name": "Clouser Swimming Nymph / Bendback",
    "originator": "Bob Clouser",
    "pattern_type": "other",
    "image_url": "http://clousersflyfishing.com/cdn/shop/files/IMG_9121.jpg?v=1740748935",
    "buy_url": "https://www.orvis.com/search?q=Clouser+Swimming+Nymph+%2F+Bendback",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Clouser+Swimming+Nymph+/+Bendback",
    "target_species": [
      "red drum",
      "striped bass"
    ],
    "regions": [
      "Outer Banks, NC"
    ],
    "description": "Bob Clouser's soft-hackle subsurface nymph adapted into a bendback hook configuration for weedless presentation. In saltwater use along the Outer Banks, the bent hook prevents fouling on Pamlico Sound's dense grass when targeting tailing red drum along flat edges. Moderate sink rate and pulsing hen-hackle legs mimic a shrimp or small baitfish; fished with slow strips near vegetation."
  },
  {
    "pattern_name": "Cockroach",
    "originator": "Norman Duncan (early 1960s)",
    "pattern_type": "streamer",
    "image_url": "http://catalog.theflyshop.com/cdn/shop/files/292F_Cockroach.png?v=1769535469",
    "buy_url": "https://www.orvis.com/search?q=Cockroach",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Cockroach",
    "target_species": [
      "tarpon",
      "Atlantic tarpon"
    ],
    "regions": [
      "Andros, Bahamas",
      "Florida Keys (Lower & Middle Keys)",
      "Biscayne Bay & Everglades, FL",
      "Ambergris Caye & Turneffe, Belize",
      "Jardines de la Reina, Cuba",
      "Los Roques, Venezuela",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)",
      "Honduras (Rio Sico / Mosquitia)",
      "Bocas del Toro, Panama",
      "Cuba — Cayo Cruz / Cayo Largo",
      "Gabón, West Africa",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Norman Duncan's early-1960s Keys tarpon streamer featuring a brown-over-grizzly hackle collar and mixed hackle wing — the defining tarpon fly of the Florida Keys. Its muted natural tones produce reflex strikes from tailing and rolling tarpon in gin-clear water. Swing or slow-strip on intermediate or floating line; the single most widely carried tarpon pattern from the Keys to Cuba."
  },
  {
    "pattern_name": "Cowen's Coyote",
    "originator": "Henry Cowen (early 2000s)",
    "pattern_type": "attractor",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/1280x1280/products/11528/10829/Coyote_Cowens_BluCharWht__42076.1574077695.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Cowen%27s+Coyote",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Cowen's+Coyote",
    "target_species": [
      "dorado",
      "yellowfin tuna",
      "jack crevalle",
      "Pacific snook"
    ],
    "regions": [
      "Costa Rica Pacific Coast"
    ],
    "description": "Henry Cowen's attractor fly from the early 2000s combines a bucktail body with a Colorado-style spinner blade that generates both flash and lateral-line vibration. The blade's sound triggers strikes from dorado, jack crevalle, tuna, and snook in Costa Rica's inshore and mixed offshore water. Fished with variable retrieves — the blade spins on the pause as well as the strip."
  },
  {
    "pattern_name": "Cowen's Magnum Baitfish",
    "originator": "Henry Cowen",
    "pattern_type": "baitfish",
    "image_url": "https://www.henrycowenflyfishing.com/flies_files/CowensBaitfish.jpg",
    "buy_url": "https://www.orvis.com/search?q=Cowen%27s+Magnum+Baitfish",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Cowen's+Magnum+Baitfish",
    "target_species": [
      "striped bass",
      "bluefin tuna",
      "bluefish",
      "dorado",
      "yellowfin tuna",
      "blue marlin",
      "Pacific sailfish"
    ],
    "regions": [
      "Outer Banks, NC",
      "Costa Rica Pacific Coast"
    ],
    "description": "Henry Cowen's large synthetic-fiber baitfish matching adult menhaden or herring — the pattern set a striper world tippet record. Layered craft-fur or synthetic fibers over a long-shank hook create a naturally translucent, full-bodied profile. Stripped aggressively for trophy striped bass from Cape Cod to Montauk and for school bluefin near Cape Hatteras."
  },
  {
    "pattern_name": "Craven's Bonefish Junk",
    "originator": "Charlie Craven",
    "pattern_type": "shrimp",
    "image_url": "http://charliesflybox.com/cdn/shop/files/BonefishJunk_Craven_s.jpg?v=1770407465",
    "buy_url": "https://charliesflybox.com/search?q=Craven%27s+Bonefish+Junk",
    "buy_retailer": "Charlie's Fly Box",
    "library_url": "https://fishfly.ai/library/?q=Craven's+Bonefish+Junk",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Bimini, Bahamas",
      "Turks & Caicos"
    ],
    "description": "Charlie Craven's evolution of the Gotcha adds rubber legs, epoxy-coated bead-chain eyes, and a bright orange hotspot to a tan craft-fur body. Tied on 1/0–2/0, its oversized profile and triggering action suit the large, wary bonefish of Bimini and Turks & Caicos. Fished with sharp short strips, letting it flutter and settle between pulls."
  },
  {
    "pattern_name": "Crazy Charlie",
    "originator": "Charlie Smith / Bob Nauheim (1977)",
    "pattern_type": "shrimp",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/15/Crazy_Charlie_White.jpg",
    "buy_url": "https://www.orvis.com/search?q=Crazy+Charlie",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Crazy+Charlie",
    "target_species": [
      "bonefish",
      "permit"
    ],
    "regions": [
      "Andros, Bahamas",
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Florida Keys (Lower & Middle Keys)",
      "Biscayne Bay & Everglades, FL",
      "Ambergris Caye & Turneffe, Belize",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Jardines de la Reina, Cuba",
      "Christmas Island, Kiribati",
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Hawaii",
      "Los Roques, Venezuela",
      "Mozambique (Bazaruto Archipelago)",
      "Bimini, Bahamas",
      "Turks & Caicos",
      "Cayman Islands",
      "ABC Islands (Bonaire, Aruba, Curaçao)",
      "Boca Paila & Sian Ka'an, Mexico",
      "Honduras (Rio Sico / Mosquitia)",
      "Cuba — Cayo Cruz / Cayo Largo"
    ],
    "description": "Developed on Andros Island around 1977 by guide Charlie Smith and popularized by Bob Nauheim, the Crazy Charlie was the first bonefish fly to use bead-chain eyes to invert the hook and create a jigging action. Sparse calf-tail wing over a mono-wrapped body. Strip-pause on sandy flats. The universal bonefish standard across the Caribbean, Pacific, and Indian Ocean."
  },
  {
    "pattern_name": "Crease Fly",
    "originator": "Joe Blados",
    "pattern_type": "popper",
    "image_url": "https://bearsden.com/cdn/shop/products/Creasefly_black__09152_1800x1800.jpg?v=1657826623",
    "buy_url": "https://bearsden.com/search?q=Crease+Fly",
    "buy_retailer": "Bear's Den",
    "library_url": "https://fishfly.ai/library/?q=Crease+Fly",
    "target_species": [
      "giant trevally",
      "bluefin trevally",
      "golden trevally",
      "queenfish",
      "false albacore",
      "little tunny",
      "Spanish mackerel",
      "red drum",
      "mahi-mahi",
      "longtail tuna",
      "mangrove jack",
      "Queenfish",
      "Bluefin trevally",
      "Giant trevally",
      "snook",
      "redfish",
      "jack crevalle",
      "tarpon"
    ],
    "regions": [
      "Christmas Island, Kiribati",
      "Outer Banks, NC",
      "Australia — Exmouth / Ningaloo Reef",
      "Papua New Guinea (Bismarck Archipelago)",
      "Indonesia (Raja Ampat)",
      "Solomon Islands",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Joe Blados's folded-foam popper designed to imitate peanut bunker for blitzing gamefish off Long Island. Cut from foam sheet, folded over the hook shank, and trimmed to a baitfish silhouette. Strips with a gurgling surface commotion. Generates explosive topwater strikes from false albacore, stripers, and bluefish in fall blitz conditions at Montauk and Cape Cod."
  },
  {
    "pattern_name": "Crystal Popper",
    "originator": "Bob Popovics",
    "pattern_type": "popper",
    "image_url": "https://s.turbifycdn.com/aah/yhst-17105658520519/crystal-popper-92.png",
    "buy_url": "https://www.orvis.com/search?q=Crystal+Popper",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Crystal+Popper",
    "target_species": [
      "snook",
      "tarpon",
      "jack crevalle",
      "giant trevally",
      "bluefin trevally",
      "papio jacks"
    ],
    "regions": [
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Hawaii"
    ],
    "description": "Bob Popovics' hard-bodied cupped-face popper with a clear translucent body and crystal flash collar, producing a loud surface disruption on the strip. Used in Ascension Bay's back lagoons for snook, juvenile tarpon, and jack crevalle. Fast, aggressive strips with short pauses trigger savage surface strikes from predators hunting shallow mangrove systems."
  },
  {
    "pattern_name": "Crystal Schminnow",
    "originator": "Capt. Norm Zeigler",
    "pattern_type": "shrimp",
    "image_url": "https://www.superflies.com/wp-content/uploads/2021/06/norms-crystal-sanibel-schminnow-superflies.jpg",
    "buy_url": "https://www.superflies.com/?s=Crystal+Schminnow",
    "buy_retailer": "Superflies",
    "library_url": "https://fishfly.ai/library/?q=Crystal+Schminnow",
    "target_species": [
      "red drum",
      "speckled sea trout",
      "snook",
      "spotted seatrout",
      "redfish",
      "juvenile tarpon"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Capt. Norm Zeigler's shrimp-minnow hybrid tied with an Estaz body and marabou tail. Its slow sink rate and pulsing marabou action imitate small glass minnows and juvenile shrimp in Louisiana marsh passes and Texas ICW dock-light situations. Fish on a floating or intermediate line with a slow strip-pause retrieve; a versatile year-round inshore option."
  },
  {
    "pattern_name": "Cuban Mantis Shrimp",
    "originator": "",
    "pattern_type": "mantis",
    "image_url": "https://www.saltwaterflies.com/veverkas_mantis.jpg",
    "buy_url": "https://www.orvis.com/search?q=Cuban+Mantis+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Cuban+Mantis+Shrimp",
    "target_species": [
      "permit",
      "snapper",
      "cubera snapper"
    ],
    "regions": [
      "Jardines de la Reina, Cuba"
    ],
    "description": "A mantis shrimp imitation tied in Cuban color variations — tan-olive over cream — distinct from the Veverka Mantis Shrimp. Used by Jardines de la Reina guides on the open flats for permit and bonefish, and near coral edges for large cubera snapper. The articulated claws and weighted eyes produce a realistic rocking descent that triggers flat-refusing permit."
  },
  {
    "pattern_name": "Cubera Diver (Dahlberg Style)",
    "originator": "Ed Truter (rec. c. 2015)",
    "pattern_type": "streamer",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/500x659/products/11362/10511/diving-bug-dahlberg-frog__50122.1574076492.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Cubera+Diver+%28Dahlberg+Style%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Cubera+Diver+(Dahlberg+Style)",
    "target_species": [
      "Cubera snapper",
      "Atlantic tarpon",
      "Jack crevalle"
    ],
    "regions": [
      "Gabón, West Africa"
    ],
    "description": "Dahlberg Diver with spun deerhair diving head and heavy zonker-strip tail on 4/0–8/0. Built heavier than standard Caribbean versions for Gabon's surf and estuary currents. Recommended by African Waters guide Ed Truter for Sette Cama cubera snapper on sink-tip to Di5 lines. The collapsing deerhair head creates pronounced dive-and-flash action."
  },
  {
    "pattern_name": "Cuda Fly",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "https://www.theflyfishers.com/Content/files/ProductImages/Nightmare%20Needlefish.jpg?width=1000&height=800&mode=max",
    "buy_url": "https://www.orvis.com/search?q=Cuda+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Cuda+Fly",
    "target_species": [
      "barracuda"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)"
    ],
    "description": "A long tandem-hook needlefish imitation rigged on wire to prevent bite-offs; typically tied in green or blue-over-white with Mylar tubing or synthetic fibers that create an elongated, slender profile. Fished with a near-instant, full-speed strip — barracuda key on fast-fleeing needlefish and will refuse any pattern that hesitates."
  },
  {
    "pattern_name": "Dahlberg Diver",
    "originator": "Larry Dahlberg",
    "pattern_type": "popper",
    "image_url": "https://ahrexhooks.com/wp-content/uploads/2022/11/Multi-Colour-Diver-by-TP610-by-Andreas-Andersson-03-1024x792.jpg",
    "buy_url": "https://www.orvis.com/search?q=Dahlberg+Diver",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Dahlberg+Diver",
    "target_species": [
      "snook",
      "tarpon",
      "barramundi",
      "mangrove jack",
      "giant trevally",
      "Niugini black bass"
    ],
    "regions": [
      "Biscayne Bay & Everglades, FL",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Australia — Cape York / Gulf of Carpentaria",
      "Papua New Guinea (Bismarck Archipelago)",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)"
    ],
    "description": "Larry Dahlberg's deer-hair surface fly with a spun-and-clipped collar that forces the head underwater on a strip, creating a diving bubble trail, then resurfaces on the pause. Red/white is the signature saltwater color. Ideal for snook holding near mangrove roots and juvenile tarpon in the Everglades backcountry where its erratic dive-and-rise triggers explosive strikes."
  },
  {
    "pattern_name": "Deceiver (Heavy Wire / Bluefish Variant)",
    "originator": "Lefty Kreh",
    "pattern_type": "streamer",
    "image_url": "https://bigyflyco.com/cdn/shop/files/20260317_142416.jpg?v=1773784996&width=1946",
    "buy_url": "https://bigyflyco.com/search?q=Deceiver+%28Heavy+Wire+%2F+Bluefish+Variant%29",
    "buy_retailer": "Big Y Fly Co",
    "library_url": "https://fishfly.ai/library/?q=Deceiver+(Heavy+Wire+/+Bluefish+Variant)",
    "target_species": [
      "red drum",
      "striped bass",
      "bluefish"
    ],
    "regions": [
      "Outer Banks, NC"
    ],
    "description": "Lefty Kreh's Deceiver tied on heavy-wire hooks, often pre-rigged with short wire bite guards for bluefish. Bucktail over saddle hackle tail creates a slim, pulsing baitfish profile. Strip fast and erratically through bluefish blitzes and striper rips at Montauk and the Outer Banks. Durability against bluefish teeth is the defining modification over standard Deceiver builds."
  },
  {
    "pattern_name": "Del Brown's Permit Fly (Merkin)",
    "originator": "Del Brown / Steve Huff",
    "pattern_type": "crab",
    "image_url": "https://assets.orvis.com/is/image/orvisprd/29KX009W_?wid=1024&src=is($object$:1-1)&qlt=85&resMode=sharp2&op_usm=1.75,0.3,2,0",
    "buy_url": "https://www.orvis.com/search?q=Del+Brown%27s+Permit+Fly+%28Merkin%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Del+Brown's+Permit+Fly+(Merkin)",
    "target_species": [
      "permit",
      "bonefish",
      "red drum"
    ],
    "regions": [
      "Andros, Bahamas",
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Florida Keys (Lower & Middle Keys)",
      "Biscayne Bay & Everglades, FL",
      "Ambergris Caye & Turneffe, Belize",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Outer Banks, NC",
      "Los Roques, Venezuela",
      "Bimini, Bahamas",
      "Turks & Caicos",
      "ABC Islands (Bonaire, Aruba, Curaçao)",
      "Boca Paila & Sian Ka'an, Mexico",
      "Honduras (Rio Sico / Mosquitia)"
    ],
    "description": "Del Brown and guide Steve Huff's rug-yarn crab, tied with spun yarn legs, rubber-strand claws, and lead eyes that flip the hook point upward — the definitive permit crab. Brown used it to land a record 513 permit. Sinks quickly to meet feeding permit on the bottom; the weedless hook rides point-up through turtle grass. The benchmark permit pattern on Keys, Bahamas, and Yucatan flats."
  },
  {
    "pattern_name": "DMA (Dark Marabou Anchovy)",
    "originator": "Conrad Botes (c. 2015)",
    "pattern_type": "baitfish",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=DMA+%28Dark+Marabou+Anchovy%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=DMA+(Dark+Marabou+Anchovy)",
    "target_species": [
      "Atlantic tarpon",
      "Giant African threadfin"
    ],
    "regions": [
      "Gabón, West Africa"
    ],
    "description": "Dark marabou streamer imitating the Atlantic anchovy baitfish that concentrate at Gabon's estuary mouths during tarpon season. Created by Conrad Botes circa 2015 as a Sette Cama staple alongside Spongebobs and Tarpon Toads. The marabou tail breathes and pulses on a slow strip. Sinking-line presentation in deep channel mouths draws explosive Atlantic tarpon and giant African threadfin strikes."
  },
  {
    "pattern_name": "Dogtooth Tuna Tube Fly",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://flyfishingmaldives.com/wp-content/uploads/2021/09/Huchen-tube-fly-flash.jpg",
    "buy_url": "https://www.orvis.com/search?q=Dogtooth+Tuna+Tube+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Dogtooth+Tuna+Tube+Fly",
    "target_species": [
      "Dogtooth tuna"
    ],
    "regions": [
      "Maldives",
      "Madagascar (Nosy Be)",
      "Solomon Islands"
    ],
    "description": "A large 20–30 cm tandem-hook tube fly in white/chartreuse or pink/white, built to imitate the flying fish and large baitfish dogtooth tuna pursue over deep reef drop-offs. Fished on full-sinking Di7 lines with fast, erratic strips in the Maldives, Madagascar's Leven Bank, and Solomon Islands seamounts. The tube format allows hook replacement after hard strikes."
  },
  {
    "pattern_name": "Drum Beater",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/1280x1280/products/11512/17132/Drum-beater-olive-pink__94615.1771544205.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Drum+Beater",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Drum+Beater",
    "target_species": [
      "red drum",
      "black drum",
      "redfish"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "Georgia Lowcountry"
    ],
    "description": "A weighted bottom-crawling crab pattern designed to imitate the blue and mud crabs that dominate the forage base on Louisiana oyster reefs and Texas Laguna Madre grass flats. Its weedless hook and chenille or foam legs dig into shell and substrate near feeding drum. Cast ahead of a rooting fish and let it sink; available from Umpqua Feather Merchants."
  },
  {
    "pattern_name": "EP Anchovy",
    "originator": "Enrico Puglisi",
    "pattern_type": "baitfish",
    "image_url": "https://www.tridentflyfishing.com/cdn/shop/files/enrico-puglisi-flies-ep-anchovy-fly-1199965200.jpg?v=1761731656&width=1920",
    "buy_url": "https://www.tridentflyfishing.com/search?q=EP+Anchovy",
    "buy_retailer": "Trident Fly Fishing",
    "library_url": "https://fishfly.ai/library/?q=EP+Anchovy",
    "target_species": [
      "false albacore",
      "little tunny",
      "Spanish mackerel"
    ],
    "regions": [
      "Outer Banks, NC"
    ],
    "description": "Enrico Puglisi's translucent EP-fiber anchovy is sized to match the dense bay anchovy schools that false albacore, bonito, and stripers pin to the surface each fall. Sparse layered fibers over an epoxy head create a clear, slim 2–3-inch profile. Fast, erratic strip retrieve; deadly at Cape Cod, Rhode Island, and Montauk in September–October."
  },
  {
    "pattern_name": "EP Backcountry Baitfish",
    "originator": "Enrico Puglisi",
    "pattern_type": "baitfish",
    "image_url": "https://www.saltwaterflies.com/ep_backcountry_brown_orange.jpg",
    "buy_url": "https://www.orvis.com/search?q=EP+Backcountry+Baitfish",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=EP+Backcountry+Baitfish",
    "target_species": [
      "snook",
      "tarpon",
      "redfish",
      "cubera snapper",
      "Pacific snook",
      "jack crevalle"
    ],
    "regions": [
      "Biscayne Bay & Everglades, FL",
      "Costa Rica Pacific Coast",
      "Boca Paila & Sian Ka'an, Mexico"
    ],
    "description": "Enrico Puglisi's inshore-specific baitfish uses EP fibers stacked in lateral layers to create a translucent, breathing 3-4 inch profile that pulses on a slow retrieve. Tan, brown-orange, and olive color schemes match Everglades backcountry forage. Preferred by Everglades guides for snook along mangrove points and rolling backcountry tarpon in tidal creeks."
  },
  {
    "pattern_name": "EP Baitfish",
    "originator": "Enrico Puglisi (early 1990s)",
    "pattern_type": "baitfish",
    "image_url": "https://feather-craft.com/cdn/shop/files/enrico-puglisi-enrico-puglisi-baitfish-imitations-20-2319430.jpg?v=1773344354&width=600",
    "buy_url": "https://www.feather-craft.com/search?q=EP+Baitfish",
    "buy_retailer": "FeatherCraft",
    "library_url": "https://fishfly.ai/library/?q=EP+Baitfish",
    "target_species": [
      "barracuda",
      "jacks",
      "tarpon",
      "jack crevalle",
      "snook",
      "giant trevally",
      "bluefin trevally",
      "papio jacks",
      "queenfish",
      "golden trevally",
      "dorado",
      "kingfish",
      "sailfish",
      "redfish",
      "Giant trevally",
      "Dogtooth tuna",
      "Spanish mackerel",
      "Wahoo"
    ],
    "regions": [
      "Andros, Bahamas",
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Florida Keys (Lower & Middle Keys)",
      "Biscayne Bay & Everglades, FL",
      "Jardines de la Reina, Cuba",
      "Hawaii",
      "Los Roques, Venezuela",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)",
      "Bocas del Toro, Panama",
      "Tampa Bay & Sanibel, FL",
      "Solomon Islands"
    ],
    "description": "Enrico Puglisi's early-1990s synthetic-fiber baitfish built from layered EP fibers that shed water instantly for long casts. Its translucent, three-dimensional profile collapses on the strip then breathes open on the pause. Tied in mullet, sardine, or pilchard colors depending on target species. Standard tarpon, snook, and barracuda presentation in South Florida and Caribbean waters."
  },
  {
    "pattern_name": "EP Crab",
    "originator": "Enrico Puglisi",
    "pattern_type": "crab",
    "image_url": "https://i.tackledirect.com/images/imgfull/enrico-puglisi-ep-permit-crab-saltwater-fly.jpg",
    "buy_url": "https://www.tackledirect.com/search.php?search_query=EP+Crab",
    "buy_retailer": "Tackle Direct",
    "library_url": "https://fishfly.ai/library/?q=EP+Crab",
    "target_species": [
      "permit",
      "red drum",
      "black drum",
      "sheepshead",
      "redfish",
      "spotted seatrout"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize",
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "South Carolina Lowcountry",
      "Georgia Lowcountry"
    ],
    "description": "Enrico Puglisi's synthetic fiber crab imitation, built with EP brush fibers that produce a lifelike translucent profile and micro-movement in current. Realistic enough to fool permit in the clear shallows of Belize and Yucatan. Equally effective as a slow-sinking crab for Louisiana marsh redfish and sheepshead feeding on oyster reefs; fished with a dead-drift or gentle short strips."
  },
  {
    "pattern_name": "EP Ghost Shrimp",
    "originator": "Enrico Puglisi",
    "pattern_type": "shrimp",
    "image_url": "https://www.saltwaterflies.com/ghost_shrimp_tan.jpg",
    "buy_url": "https://www.orvis.com/search?q=EP+Ghost+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=EP+Ghost+Shrimp",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Andros, Bahamas",
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Bimini, Bahamas",
      "Turks & Caicos",
      "ABC Islands (Bonaire, Aruba, Curaçao)"
    ],
    "description": "Enrico Puglisi's translucent synthetic shrimp pattern built with sparse EP fibers over a bead-chain or lead-eye system. Its ghostly, semi-transparent profile closely matches the glass shrimp prevalent on Bahamian hard-sand flats. Lightweight enough for a quiet water entry critical on spooky fish; strip slowly along bottom or allow to flutter on a dead sink."
  },
  {
    "pattern_name": "EP GT's Sardina",
    "originator": "Enrico Puglisi",
    "pattern_type": "baitfish",
    "image_url": "http://saltflypro.com/cdn/shop/files/EPGTSardina_3b047cec-ab0c-478e-ad7b-851a78fcdda0.jpg?v=1755053370",
    "buy_url": "https://saltflypro.com/search?q=EP+GT%27s+Sardina",
    "buy_retailer": "Salt Fly Pro",
    "library_url": "https://fishfly.ai/library/?q=EP+GT's+Sardina",
    "target_species": [
      "roosterfish",
      "jack crevalle",
      "dorado",
      "giant trevally",
      "queenfish",
      "Spanish mackerel",
      "longtail tuna"
    ],
    "regions": [
      "Baja California Sur, Mexico",
      "Australia — Exmouth / Ningaloo Reef"
    ],
    "description": "Enrico Puglisi's oversized sardine imitation tied on 5/0–8/0 hooks with layered EP fibers and 3D eyes for giant trevally, roosterfish, and large dorado. The broad, iridescent profile displaces significant water on the strip. Fished with fast, aggressive retrieves that match the desperate flight of a sardine being herded by pelagic predators."
  },
  {
    "pattern_name": "EP Micro Crab",
    "originator": "Enrico Puglisi",
    "pattern_type": "crab",
    "image_url": "https://www.saltwaterflies.com/ep_micro_crab.jpg",
    "buy_url": "https://www.orvis.com/search?q=EP+Micro+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=EP+Micro+Crab",
    "target_species": [
      "bonefish",
      "permit"
    ],
    "regions": [
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Florida Keys (Lower & Middle Keys)",
      "Hawaii"
    ],
    "description": "Enrico Puglisi's small crab imitation uses EP fiber legs and a sparse flat body to replicate juvenile crabs in sizes 6–10. Minimal splash on entry makes it ideal for tailing bonefish in skinny water and permit rooting in turtle grass. Lead or bead-chain eyes in varying weights match different flat depths. Used across Bahamas, Belize, and the Florida Keys."
  },
  {
    "pattern_name": "EP Minnow / Mullet",
    "originator": "Enrico Puglisi",
    "pattern_type": "baitfish",
    "image_url": "http://www.tridentflyfishing.com/cdn/shop/files/enrico-puglisi-flies-ep-mullet-fly-1199941020.jpg?v=1761734060",
    "buy_url": "https://www.tridentflyfishing.com/search?q=EP+Minnow+%2F+Mullet",
    "buy_retailer": "Trident Fly Fishing",
    "library_url": "https://fishfly.ai/library/?q=EP+Minnow+/+Mullet",
    "target_species": [
      "red drum",
      "Spanish mackerel",
      "false albacore",
      "redfish",
      "spotted seatrout",
      "snook"
    ],
    "regions": [
      "Outer Banks, NC",
      "Mosquito Lagoon & Indian River Lagoon, FL"
    ],
    "description": "Enrico Puglisi's EP-fiber minnow in finger-mullet or scaled mullet colors — olive/white or tan/gray with distinct lateral flash. Larger profile (3–5 inches) than basic EP baitfish; swims with a breathing, collapsing action. Effective on Outer Banks red drum sight-casted in Pamlico Sound, and for Spanish mackerel blitzing finger mullet along inlets. Cast ahead, strip-pause."
  },
  {
    "pattern_name": "EP Mullet",
    "originator": "Enrico Puglisi",
    "pattern_type": "baitfish",
    "image_url": "http://www.tridentflyfishing.com/cdn/shop/files/enrico-puglisi-flies-ep-mullet-fly-1199941020.jpg?v=1761734060",
    "buy_url": "https://www.tridentflyfishing.com/search?q=EP+Mullet",
    "buy_retailer": "Trident Fly Fishing",
    "library_url": "https://fishfly.ai/library/?q=EP+Mullet",
    "target_species": [
      "red drum",
      "speckled sea trout",
      "jack crevalle",
      "snook",
      "dorado",
      "roosterfish",
      "Pacific snook",
      "cubera snapper",
      "tarpon",
      "redfish"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Baja California Sur, Mexico",
      "Costa Rica Pacific Coast",
      "Bocas del Toro, Panama",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Enrico Puglisi's EP-fiber mullet imitation, layered to create a hollow, translucent baitfish profile matching juvenile and finger mullet. Tied in 3–6-inch versions in silver-white or gray. Covers the dominant forage species across Laguna Madre, Louisiana marshes, and Baja beaches. Cast into feeding lanes and stripped at medium pace — the EP-fiber tail breathes between strips; irresistible to roosterfish and large trout."
  },
  {
    "pattern_name": "EP Peanut Butter",
    "originator": "Enrico Puglisi (2000s)",
    "pattern_type": "baitfish",
    "image_url": "https://www.tridentflyfishing.com/cdn/shop/files/enrico-puglisi-flies-ep-peanut-butter-fly-1199965103.png?v=1761683533&width=2250",
    "buy_url": "https://www.tridentflyfishing.com/search?q=EP+Peanut+Butter",
    "buy_retailer": "Trident Fly Fishing",
    "library_url": "https://fishfly.ai/library/?q=EP+Peanut+Butter",
    "target_species": [
      "roosterfish",
      "dorado",
      "yellowfin tuna",
      "jack crevalle",
      "tarpon",
      "snook"
    ],
    "regions": [
      "Costa Rica Pacific Coast",
      "Cuba — Cayo Cruz / Cayo Largo"
    ],
    "description": "Enrico Puglisi's EP Fiber baitfish imitation built from layered synthetic fibers that taper to a translucent tail, creating a lifelike profile and soft undulation in the water. Works as a universal small baitfish across species — roosterfish, dorado, yellowfin tuna, and jack crevalle. Fished with medium-speed strips on an intermediate or floating line in Costa Rica's inshore and offshore grounds."
  },
  {
    "pattern_name": "EP Spawning Shrimp",
    "originator": "Enrico Puglisi",
    "pattern_type": "shrimp",
    "image_url": "https://www.yellowdogflyfishing.com/cdn/shop/files/00SH-S03-4wg_1216x.jpg?v=1743537615",
    "buy_url": "https://www.yellowdogflyfishing.com/search?q=EP+Spawning+Shrimp",
    "buy_retailer": "Yellow Dog Flyfishing",
    "library_url": "https://fishfly.ai/library/?q=EP+Spawning+Shrimp",
    "target_species": [
      "permit",
      "bonefish",
      "redfish",
      "spotted seatrout",
      "snook"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Hawaii",
      "Turks & Caicos",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "South Carolina Lowcountry",
      "Georgia Lowcountry"
    ],
    "description": "Enrico Puglisi's realistic synthetic spawning shrimp tied in multiple colors and eye weights to cover shallow flats through deeper cuts. Its EP fiber body produces lifelike translucency that mimics shrimp in spawn — a trigger for permit and bonefish alike. Sink it to the bottom on turtle-grass and sand; fished in Belize, Mexico's Ascension Bay, and beyond."
  },
  {
    "pattern_name": "Fatboy",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Fatboy",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Fatboy",
    "target_species": [
      "barramundi",
      "mangrove jack",
      "giant trevally"
    ],
    "regions": [
      "Australia — Cape York / Gulf of Carpentaria"
    ],
    "description": "Bulky Australian saltwater fly with a voluminous synthetic or EP-fiber body generating maximum water displacement. Listed by SWOFFA as a core Cape York barramundi pattern. The pushed-water signature is critical in turbid Gulf of Carpentaria conditions where barramundi and GT rely on the lateral line to locate prey at night or in low visibility."
  },
  {
    "pattern_name": "Flaming Lamborghini",
    "originator": "Fulling Mill",
    "pattern_type": "baitfish",
    "image_url": "https://cdn.shopify.com/s/files/1/0022/7298/5154/products/93545_6b94419c-f966-4808-86ee-d9d355ff3847.jpg?v=1547692578",
    "buy_url": "https://www.orvis.com/search?q=Flaming+Lamborghini",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Flaming+Lamborghini",
    "target_species": [
      "giant trevally",
      "bluefin trevally",
      "queenfish",
      "mangrove jack",
      "dogtooth tuna",
      "Giant trevally"
    ],
    "regions": [
      "Australia — Exmouth / Ningaloo Reef",
      "Australia — Cape York / Gulf of Carpentaria",
      "Papua New Guinea (Bismarck Archipelago)",
      "Indonesia (Raja Ampat)",
      "Maldives"
    ],
    "description": "Large, vivid coral-grouper-profile baitfish fly tied on Gamakatsu SL12 6/0 by Fulling Mill. Orange-red brushy body mimics the reef baitfish GTs crush around coral heads and rubble flats. Fished on a fast 12-weight with an aggressive strip-pause retrieve at Exmouth, Raja Ampat, PNG, and the Maldives. Recomended by The Flyfisher Australia in their curated GT selection."
  },
  {
    "pattern_name": "Flashtail Whistler",
    "originator": "Dan Blanton",
    "pattern_type": "streamer",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/1280x1280/products/11380/17164/Flashtail_Whistler_Blanton_RedYel__51108.1575587625.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Flashtail+Whistler",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Flashtail+Whistler",
    "target_species": [
      "snook",
      "tarpon",
      "jack crevalle",
      "giant trevally",
      "papio jacks",
      "barracuda",
      "ladyfish",
      "Queenfish",
      "Giant trevally",
      "Brassy trevally",
      "Bluefin trevally",
      "Bigeye trevally"
    ],
    "regions": [
      "Biscayne Bay & Everglades, FL",
      "Hawaii",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)",
      "Bocas del Toro, Panama",
      "Madagascar (Nosy Be)",
      "Solomon Islands"
    ],
    "description": "Dan Blanton's classic cone-head streamer built around a prominent bead-chain or lead-eye head, bucktail collar, and a long Flashabou tail. The rattling, flashy profile imitates injured baitfish and draws reaction strikes. Red/white and orange/yellow are standard colors for snook in Everglades passes and Biscayne Bay; also works for tarpon and jacks."
  },
  {
    "pattern_name": "Flashy Profile",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://themissionflymag.com/wp-content/uploads/2023/07/img-214.jpg",
    "buy_url": "https://www.orvis.com/search?q=Flashy+Profile",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Flashy+Profile",
    "target_species": [
      "dorado",
      "yellowfin tuna",
      "striped marlin",
      "jack crevalle"
    ],
    "regions": [
      "Baja California Sur, Mexico",
      "Costa Rica Pacific Coast"
    ],
    "description": "A wide-body synthetic streamer built with layered flash material and a broad lateral silhouette designed to reflect maximum light. Used primarily in Baja bluewater teaser-and-fly sequences where hookless teasers are used to raise billfish — the Flashy Profile is then presented on the drop. Its lateral-line-triggering flash profile also works on dorado and yellowfin tuna."
  },
  {
    "pattern_name": "Fleeing Crab",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "http://saltflypro.com/cdn/shop/files/Cathys_Fleeing_Crab_Beck_Tan__21669.jpg?v=1744921104",
    "buy_url": "https://saltflypro.com/search?q=Fleeing+Crab",
    "buy_retailer": "Salt Fly Pro",
    "library_url": "https://fishfly.ai/library/?q=Fleeing+Crab",
    "target_species": [
      "bonefish",
      "Indo-Pacific permit",
      "yellowmargin triggerfish",
      "Bonefish",
      "Triggerfish",
      "redfish"
    ],
    "regions": [
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Rodrigues, Mauritius",
      "South Carolina Lowcountry",
      "Georgia Lowcountry"
    ],
    "description": "Barred tan-and-white craft-fur crab with orange rubber legs, bead-chain eyes, and a flat profile that sinks slowly hook-point-up. Minimal bulk lands softly and presents a convincing fleeing posture. Listed by Alphonse Fishing Co. as a top-three Seychelles bonefish fly; also draws permit and triggerfish on open sand and turtle-grass flats."
  },
  {
    "pattern_name": "Flexo Crab",
    "originator": "InTheRiffle team",
    "pattern_type": "crab",
    "image_url": "https://www.ashlandflyshop.com/cdn/shop/products/IMG_7442_2000x.jpg?v=1479590539",
    "buy_url": "https://www.ashlandflyshop.com/search?q=Flexo+Crab",
    "buy_retailer": "Ashland Fly Shop",
    "library_url": "https://fishfly.ai/library/?q=Flexo+Crab",
    "target_species": [
      "permit",
      "yellowmargin triggerfish",
      "bonefish",
      "Indo-Pacific permit",
      "titan triggerfish",
      "triggerfish",
      "bluefin trevally"
    ],
    "regions": [
      "Jardines de la Reina, Cuba",
      "Christmas Island, Kiribati",
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Los Roques, Venezuela",
      "Sudan / Nubian Flats (Red Sea)",
      "Oman (Hallaniyat Islands)",
      "Boca Paila & Sian Ka'an, Mexico",
      "Cuba — Cayo Cruz / Cayo Largo"
    ],
    "description": "The InTheRiffle team's soft-body crab built around expandable mesh tubing (flexo mesh) over a weighted core, producing a realistic carapace that collapses and re-inflates on the sink. The top triggerfish pattern at Christmas Island and the Seychelles; also used for permit at Jardines de la Reina. Presented to feeding fish and allowed to free-sink, triggering inspection-and-eat responses."
  },
  {
    "pattern_name": "Flymen Sailfish Fly (Tandem Pink/White Tube)",
    "originator": "Flymen Fishing Company (2010s)",
    "pattern_type": "streamer",
    "image_url": "https://www.yellowdogflyfishing.com/cdn/shop/files/Screenshot2024-12-23at10.22.15AM_grande.png?v=1734981512",
    "buy_url": "https://www.yellowdogflyfishing.com/search?q=Flymen+Sailfish+Fly+%28Tandem+Pink%2FWhite+Tube%29",
    "buy_retailer": "Yellow Dog Flyfishing",
    "library_url": "https://fishfly.ai/library/?q=Flymen+Sailfish+Fly+(Tandem+Pink/White+Tube)",
    "target_species": [
      "Pacific sailfish",
      "blue marlin"
    ],
    "regions": [
      "Costa Rica Pacific Coast"
    ],
    "description": "Flymen Fishing Company's commercially produced tandem two-hook tube fly in the standard pink-and-white billfish color scheme. Tied in the round on linked tubes with layered bucktail, hackle, and Flashabou. Stocked by Yellow Dog Flyfishing and used widely on Costa Rica Pacific charter boats as a proven, accessible alternative to custom Cam Sigler builds for Pacific sailfish."
  },
  {
    "pattern_name": "Gabon Surf Clouser",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://www.saltwaterflies.com/classic_deep_olive_white.jpg",
    "buy_url": "https://www.orvis.com/search?q=Gabon+Surf+Clouser",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Gabon+Surf+Clouser",
    "target_species": [
      "Atlantic tarpon",
      "Senegal kob",
      "Leerfish (garrick)"
    ],
    "regions": [
      "Gabón, West Africa"
    ],
    "description": "The Clouser Deep Minnow tied heavy — large lead dumbbell eyes, 3/0–4/0 hooks — in olive/white or chartreuse/white for fast-sinking presentations through Gabon's ripping beach surf at Sette Cama. Developed as a reliable all-rounder across multiple species; referenced in trip reports as the go-to fly when tarpon, Senegal kob, and leerfish are crashing bait in the shore break."
  },
  {
    "pattern_name": "Game Changer",
    "originator": "Blane Chocklett",
    "pattern_type": "baitfish",
    "image_url": "https://images.north40.com/images/1247321-P/BA_tfp_blane_chocklett_s_feather_game_changer_flymen___1247321-P__.jpg?width=800&format=pjpg",
    "buy_url": "https://north40.com/?s=Game+Changer",
    "buy_retailer": "North 40 Outfitters",
    "library_url": "https://fishfly.ai/library/?q=Game+Changer",
    "target_species": [
      "red drum",
      "striped bass",
      "giant trevally",
      "dogtooth tuna",
      "Niugini black bass",
      "barramundi",
      "tarpon"
    ],
    "regions": [
      "Outer Banks, NC",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)",
      "Papua New Guinea (Bismarck Archipelago)",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)",
      "Cuba — Cayo Cruz / Cayo Largo"
    ],
    "description": "Blane Chocklett's multi-segment articulated fly uses Chocklett's Articulated Shanks linked by loops, each dressed with EP fibers or craft fur, creating a continuously S-curving swimming action. Sized 4–8 inches for trophy stripers chasing bunker and herring. The lifelike swimming profile triggers big fish that ignore conventional bucktail patterns."
  },
  {
    "pattern_name": "Gartside Gurgler",
    "originator": "Jack Gartside (1988)",
    "pattern_type": "gurgler",
    "image_url": "https://cdn.shopify.com/s/files/1/0569/0877/5562/files/Gurgler-074.jpg?v=1644514443",
    "buy_url": "https://www.orvis.com/search?q=Gartside+Gurgler",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Gartside+Gurgler",
    "target_species": [
      "red drum",
      "speckled sea trout",
      "jack crevalle",
      "roosterfish",
      "snook",
      "tarpon",
      "striped bass",
      "bluefish",
      "giant trevally",
      "bluefin trevally",
      "papio jacks",
      "barracuda",
      "redfish",
      "spotted seatrout"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Baja California Sur, Mexico",
      "Biscayne Bay & Everglades, FL",
      "Outer Banks, NC",
      "Hawaii",
      "Cayman Islands",
      "Boca Paila & Sian Ka'an, Mexico",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "South Carolina Lowcountry",
      "Georgia Lowcountry",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Jack Gartside's 1988 design uses a folded foam back strip over a bucktail or craft-fur body to create a low-riding surface fly. On the strip, the foam lip dips and pushes water creating a gurgling sound; at rest it floats hook-point-up. Highly versatile — worked slowly for snook and redfish, stripped fast to draw topwater strikes from stripers and bluefish."
  },
  {
    "pattern_name": "Generic Baitfish Pattern (Needlefish / Offshore)",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "http://saltflypro.com/cdn/shop/products/GarfishNeedlefishfly.jpg?v=1611688601",
    "buy_url": "https://saltflypro.com/search?q=Generic+Baitfish+Pattern+%28Needlefish+%2F+Offshore%29",
    "buy_retailer": "Salt Fly Pro",
    "library_url": "https://fishfly.ai/library/?q=Generic+Baitfish+Pattern+(Needlefish+/+Offshore)",
    "target_species": [
      "giant trevally",
      "queenfish"
    ],
    "regions": [
      "Christmas Island, Kiribati"
    ],
    "description": "Long slim synthetics in 1/0–4/0 replicating needlefish, ballyhoo, and slender forage around Christmas Island reef edges and channel drop-offs. Built 4–8 inches with EZ Body, craft fur, or EP fibers over a flash core. Retrieve fast with long strips to match erratic needlefish movement. Triggers large GT and queenfish on a reaction strike."
  },
  {
    "pattern_name": "Ghetto Super Fly",
    "originator": "Makani Christensen (Fly Fish Hawaii / Keawe Adventures)",
    "pattern_type": "mantis",
    "image_url": "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3864330897718180412",
    "buy_url": "https://www.orvis.com/search?q=Ghetto+Super+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Ghetto+Super+Fly",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Hawaii"
    ],
    "description": "Hawaii's most effective bonefish fly, tied by Makani Christensen of Fly Fish Hawaii, imitates a mantis shrimp in multiple color variations with adjustable bead-chain weight for different reef depths on Oahu. The fly's low profile and soft material movement trigger bonefish feeding on coral sand and mixed rubble flats. Considered the go-to pattern by local guides across the island chain."
  },
  {
    "pattern_name": "Golden Knight",
    "originator": "Alphonse Fishing Co. / FlyzInc (Seychelles, c. 2016)",
    "pattern_type": "shrimp",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Golden+Knight",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Golden+Knight",
    "target_species": [
      "Bonefish",
      "Indo-Pacific permit"
    ],
    "regions": [
      "Maldives",
      "Rodrigues, Mauritius"
    ],
    "description": "Bonefish shrimp pattern developed by Alphonse Fishing Co. guides. Gold/tan Crystal Chenille or UV-dubbed body with bead-chain or tungsten eyes and a sparse craft-fur wing. Available in multiple weights for shallow sand to coral rubble. The FlyzInc-produced version is a standard Seychelles and Maldives guide-box fly for tailing bonefish and Indo-Pacific permit."
  },
  {
    "pattern_name": "Got Milk (Rio)",
    "originator": "Rio Products",
    "pattern_type": "attractor",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Got+Milk+%28Rio%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Got+Milk+(Rio)",
    "target_species": [
      "Milkfish"
    ],
    "regions": [
      "Maldives"
    ],
    "description": "RIO Products' neutral-buoyancy synthetic foam plankton imitation designed specifically for surface-feeding milkfish. The foam body and sparse hackle mimic the small organisms milkfish sip from the surface film. Dead-drifted or given a micro-twitch in a milkfish feeding lane; used widely in the Maldives and Seychelles where tailing or surface-feeding milkfish present one of fly fishing's hardest targets."
  },
  {
    "pattern_name": "Grand Slam Crab",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "https://assets.orvis.com/is/image/orvisprd/1X57019W_?wid=1280&src=is($object$:1-1)&qlt=85&resMode=sharp2&op_usm=1.75,0.3,2,0",
    "buy_url": "https://www.orvis.com/search?q=Grand+Slam+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Grand+Slam+Crab",
    "target_species": [
      "permit"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize"
    ],
    "description": "A foam or deer-hair crab pattern tied to imitate the small crabs that permit and bonefish root for on shallow turtle-grass flats in Belize and Caribbean destinations. Its realistic profile and weedless hook design allow presentations into the zones where permit are feeding. Cast two rod-lengths ahead of a tailing or cruising permit and let it sink to the bottom."
  },
  {
    "pattern_name": "Greg's Flats Fly",
    "originator": "Greg Miheve",
    "pattern_type": "other",
    "image_url": "https://flyfishsd.com/cdn/shop/articles/IMG_0267.jpg?v=1686269680&width=1600",
    "buy_url": "https://www.orvis.com/search?q=Greg%27s+Flats+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Greg's+Flats+Fly",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)"
    ],
    "description": "Greg Miheve's versatile Bahamian bonefish pattern pairs an iridescent body with split calf-tail claws that can pass as either shrimp or crab depending on retrieve speed and depth. Documented in Dick Brown's Bonefish Fly Patterns. Lightweight with minimal splash on entry; works across sandy, grassy, and hard-bottom Bahamian out-island flats."
  },
  {
    "pattern_name": "Grim Reaper",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "https://www.theflyfishers.com/Content/files/ProductImages/grim-reaper-fly-bp.jpg?width=1000&height=800&mode=max",
    "buy_url": "https://www.orvis.com/search?q=Grim+Reaper",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Grim+Reaper",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)"
    ],
    "description": "A dark-profile tarpon streamer in black and purple built with palmered feathers or marabou to maximize movement in low visibility. Listed by Pesca Maya for Ascension Bay backcountry lake tarpon. The high-contrast silhouette cuts through tannin-stained water where lighter flies go unseen. Strip-and-pause retrieve; the full profile pulses on the drop."
  },
  {
    "pattern_name": "Grocery Fly",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://www.saltwaterflies.com/ep_roosterfish_sardina.jpg",
    "buy_url": "https://www.orvis.com/search?q=Grocery+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Grocery+Fly",
    "target_species": [
      "roosterfish",
      "dorado",
      "jack crevalle"
    ],
    "regions": [
      "Baja California Sur, Mexico"
    ],
    "description": "Locally developed Baja baitfish streamer in tan-and-white matching the sardine silhouettes roosterfish key on in the surf zone. Tied 4–6 inches with synthetic fibers or bucktail for durability. Stripped fast near the surface along rocky points and beach breaks. A staple East Cape and La Paz guide fly for roosters, dorado, and jacks."
  },
  {
    "pattern_name": "GT Brush Fly",
    "originator": "Tim Babich / FlyCastaway (Tan variant originator); broader GT brush tradition via South African Indian Ocean guides",
    "pattern_type": "baitfish",
    "image_url": "https://www.ashlandflyshop.com/cdn/shop/products/IMG_0121_2000x.jpg?v=1524179272",
    "buy_url": "https://www.ashlandflyshop.com/search?q=GT+Brush+Fly",
    "buy_retailer": "Ashland Fly Shop",
    "library_url": "https://fishfly.ai/library/?q=GT+Brush+Fly",
    "target_species": [
      "giant trevally",
      "bluefin trevally",
      "queenfish",
      "kingfish",
      "dogtooth tuna",
      "Giant trevally",
      "Bluefin trevally",
      "Bigeye trevally"
    ],
    "regions": [
      "Christmas Island, Kiribati",
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Sudan / Nubian Flats (Red Sea)",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)",
      "Australia — Exmouth / Ningaloo Reef",
      "Australia — Cape York / Gulf of Carpentaria",
      "Papua New Guinea (Bismarck Archipelago)",
      "Indonesia (Raja Ampat)",
      "Maldives",
      "Rodrigues, Mauritius",
      "Madagascar (Nosy Be)",
      "Solomon Islands"
    ],
    "description": "A large, 4–6-inch EP-brush baitfish imitation tied on 4/0–6/0 hooks in black, purple, red, or tan, designed to push water and create a strong silhouette in the clear flats water where giant trevally hunt. Standard subsurface GT fly at Christmas Island and the Seychelles; fast, aggressive long strips mimic a fleeing baitfish. The bulk and movement of EP-brush fibers trigger the explosive predatory response that defines GT fly fishing."
  },
  {
    "pattern_name": "GT Bus Ticket",
    "originator": "Fulling Mill",
    "pattern_type": "baitfish",
    "image_url": "https://www.fullingmill.com/core/media/media.nl?id=39282&c=3752701&h=ZVOu4h6wg6218dxLHdzdV4G1evAoydxKBd-rMuK5i3INgj7Z",
    "buy_url": "https://www.orvis.com/search?q=GT+Bus+Ticket",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=GT+Bus+Ticket",
    "target_species": [
      "giant trevally"
    ],
    "regions": [
      "Australia — Exmouth / Ningaloo Reef"
    ],
    "description": "A Fulling Mill-produced open-flats baitfish pattern in lighter neutral colours designed to imitate small schooling baitfish over white sand and coral. The streamlined profile casts easily on 10–12 wt rods and maintains a lifelike swimming action at retrieve speed. Listed as a best-seller by Australian retailers and confirmed in curated Indo-Pacific GT fly boxes for Ningaloo and beyond."
  },
  {
    "pattern_name": "GT Flashy Profile",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=GT+Flashy+Profile",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=GT+Flashy+Profile",
    "target_species": [
      "giant trevally",
      "queenfish",
      "Spanish mackerel",
      "golden trevally"
    ],
    "regions": [
      "Australia — Exmouth / Ningaloo Reef",
      "Australia — Cape York / Gulf of Carpentaria",
      "Indonesia (Raja Ampat)"
    ],
    "description": "High-flash baitfish streamer in chartreuse/white or white/silver on 3/0–5/0 tied with Flashabou and synthetic fiber. Explicitly listed in The Flyfisher Australia staff-curated GT fly selection. Stripped fast across flats or through current seams, flash triggers aggressive GT feeding. Secondary target species include queenfish, Spanish mackerel, and golden trevally."
  },
  {
    "pattern_name": "GT Mullet",
    "originator": "James Christmas",
    "pattern_type": "baitfish",
    "image_url": "https://cdn.shopify.com/s/files/1/0022/7298/5154/products/92545.jpg?v=1547661985",
    "buy_url": "https://www.orvis.com/search?q=GT+Mullet",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=GT+Mullet",
    "target_species": [
      "giant trevally",
      "queenfish",
      "bluefin trevally"
    ],
    "regions": [
      "Australia — Exmouth / Ningaloo Reef",
      "Indonesia (Raja Ampat)"
    ],
    "description": "Broadside mullet-profile baitfish fly on 6/0, created by Alphonse guide James Christmas. Slim EP-fiber construction delivers an enticing flank silhouette while remaining aerodynamic enough to throw on a 12-weight GT rod. Primarily stripped fast across tropical flats to trigger GT, queenfish, and bluefin trevally attacks. Used at Ningaloo, Raja Ampat, and Alphonse Island's sand-flat feeds."
  },
  {
    "pattern_name": "Gummy Minnow",
    "originator": "Blane Chocklett (late 1990s)",
    "pattern_type": "baitfish",
    "image_url": "https://www.saltwaterflies.com/gummyminnow_pearl2.jpg",
    "buy_url": "https://www.orvis.com/search?q=Gummy+Minnow",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Gummy+Minnow",
    "target_species": [
      "bonefish",
      "tarpon",
      "snook",
      "jacks",
      "jack crevalle"
    ],
    "regions": [
      "Los Roques, Venezuela",
      "Honduras (Rio Sico / Mosquitia)"
    ],
    "description": "Blane Chocklett's translucent baitfish imitation built from Sili-Skin or similar flexible film material, creating a lifelike minnow profile with near-neutral buoyancy. Mimics sardina and small baitfish. The go-to Los Roques bonefish pattern in pearl and grey, sizes 2 and 6, retrieved steadily through sardina-feeding flats."
  },
  {
    "pattern_name": "Gym Sock",
    "originator": "Fulling Mill",
    "pattern_type": "baitfish",
    "image_url": "https://bigtimeflies.com/cdn/shop/products/gym-sock_700x.jpg?v=1669423376",
    "buy_url": "https://bigtimeflies.com/search?q=Gym+Sock",
    "buy_retailer": "BigTime Flies",
    "library_url": "https://fishfly.ai/library/?q=Gym+Sock",
    "target_species": [
      "giant trevally"
    ],
    "regions": [
      "Australia — Exmouth / Ningaloo Reef"
    ],
    "description": "A translucent mullet-imitating streamer by Fulling Mill built with hollow synthetic fibres that collapse when wet, producing a lifelike mullet silhouette with minimal water resistance. Listed as a top-five must-have GT and roosterfish pattern by Big Y Fly Co and Australian retailers. Stripped fast through GT feeding lanes at Ningaloo, Exmouth, and Indo-Pacific reef systems."
  },
  {
    "pattern_name": "Half and Half",
    "originator": "Bob Clouser",
    "pattern_type": "baitfish",
    "image_url": "https://news.orvis.com/wp-content/uploads/2018/08/halfandhalf.jpg",
    "buy_url": "https://www.orvis.com/search?q=Half+and+Half",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Half+and+Half",
    "target_species": [
      "striped bass",
      "bluefish",
      "false albacore",
      "roosterfish",
      "jack crevalle",
      "cubera snapper",
      "Pacific snook",
      "tripletail",
      "tarpon",
      "snook"
    ],
    "regions": [
      "Outer Banks, NC",
      "Costa Rica Pacific Coast",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Bocas del Toro, Panama"
    ],
    "description": "Bob Clouser's hybrid of his Clouser Minnow front and a Deceiver rear — dumbbell eyes up front flip the hook point skyward while rear bucktail and hackle trail like a large baitfish. Sinks quickly in current, ideal for big stripers holding in deep rip seams at Monomoy, Montauk, and Cape Hatteras. Strip in long, fast pulls to trigger predatory strikes."
  },
  {
    "pattern_name": "Heavy Gabon Deceiver",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/500x659/products/15802/21357/Deceiver-HD-Salt__23135.1613499828.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Heavy+Gabon+Deceiver",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Heavy+Gabon+Deceiver",
    "target_species": [
      "Atlantic tarpon",
      "Giant African threadfin",
      "Cubera snapper"
    ],
    "regions": [
      "Gabón, West Africa"
    ],
    "description": "Lefty's Deceiver scaled for Gabon's powerful surf and estuary currents. Extra-long white/olive saddle hackles, Flashabou lateral line, and lead-wrap or tungsten core on 4/0–6/0 achieve the sink rate needed in the Sette Cama surf. Targets Atlantic tarpon, giant threadfin, and cubera snapper; the undulating tail remains effective in strong current."
  },
  {
    "pattern_name": "Hollow Fleye",
    "originator": "Bob Popovics",
    "pattern_type": "baitfish",
    "image_url": "https://cdn.shopify.com/s/files/1/1865/3837/files/FFF-Bucktail-Hollow-Fleye-1_1024x1024.jpg?v=1679085829",
    "buy_url": "https://www.orvis.com/search?q=Hollow+Fleye",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Hollow+Fleye",
    "target_species": [
      "bluefin tuna",
      "striped bass",
      "bluefish",
      "dorado",
      "yellowfin tuna",
      "sailfish",
      "Giant trevally",
      "Dogtooth tuna",
      "Wahoo"
    ],
    "regions": [
      "Outer Banks, NC",
      "Baja California Sur, Mexico",
      "Madagascar (Nosy Be)",
      "Solomon Islands"
    ],
    "description": "Bob Popovics's hollow bucktail construction technique stacks loose clumps of hair in a layered cone around the hook shank, building a large, air-trapping body that collapses and re-inflates on each strip. Despite matching a 6–8-inch bunker profile, it casts lighter than it looks. Dominant striper fly from the Canal to Montauk; also fished for Baja tuna and billfish."
  },
  {
    "pattern_name": "Hot-Legs Crazy Charlie",
    "originator": "Fish-Bones Fly Fishing (Grand Cayman)",
    "pattern_type": "shrimp",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Hot-Legs+Crazy+Charlie",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Hot-Legs+Crazy+Charlie",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Cayman Islands"
    ],
    "description": "Cayman Islands variant of the classic Crazy Charlie, developed by Fish-Bones Fly Fishing (Grand Cayman). Distinguishing feature is orange-tipped rubber legs that add movement in the micro-currents of sand-and-grass flats. Sparse body and bead-chain eyes ensure a fast, quiet sink for bone-sensitive fish. The go-to pattern for Cayman's resident bonefish, particularly in mixed-substrate conditions."
  },
  {
    "pattern_name": "Indo-Pacific Triggerfish Crab",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "https://flyfishingmaldives.com/wp-content/uploads/2021/07/transparent-crab-maldives-fly-1024x768.jpg",
    "buy_url": "https://www.orvis.com/search?q=Indo-Pacific+Triggerfish+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Indo-Pacific+Triggerfish+Crab",
    "target_species": [
      "Titan triggerfish",
      "Picasso triggerfish",
      "Yellow-margin triggerfish"
    ],
    "regions": [
      "Maldives"
    ],
    "description": "A small (size 4–6), low-profile coral-rubble crab imitation with a point-up keel hook, rubber legs, and suede claws, designed to land softly on sand without spooking. Fished on a dead-drift to tailing titan, Picasso, and yellow-margin triggerfish on Maldives flats at Huvadhoo Atoll and similar Indo-Pacific reef systems. The keel hook minimises snag on coral substrate."
  },
  {
    "pattern_name": "Isla Blanca Killer",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Isla+Blanca+Killer",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Isla+Blanca+Killer",
    "target_species": [
      "permit"
    ],
    "regions": [
      "Honduras (Rio Sico / Mosquitia)"
    ],
    "description": "Locally tied Honduras crab imitation for permit on the Bay Islands' clear-water sand and coral flats. Rubber legs, foam or hard body in tan/olive, and bead-chain eyes on #2–#6 produce a slow fall. Photographed in the Fly Fishing Caribe Honduras fly box gallery. Presented ahead of tailing permit, then stripped slowly across the bottom."
  },
  {
    "pattern_name": "James Sand Prawn",
    "originator": "James Christmas (Alphonse Fishing Co., c. 2013)",
    "pattern_type": "shrimp",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=James+Sand+Prawn",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=James+Sand+Prawn",
    "target_species": [
      "Bonefish",
      "Indo-Pacific permit",
      "Triggerfish"
    ],
    "regions": [
      "Maldives",
      "Rodrigues, Mauritius"
    ],
    "description": "Large sand-prawn imitation on #4 hook by Alphonse guide James Christmas, featuring a mono loop-and-bead weedguard and sound-generating bead clacker. The rattle and bulk attract multiple bonefish simultaneously on schooling fish. Classified as a Seychelles bonefish and permit staple, it translates directly to Maldivian and Rodrigues flats where similar sand prawns dominate forage."
  },
  {
    "pattern_name": "KIFF Pop Star",
    "originator": "KIFF Flies (designed for Seychelles guides, c. 2018)",
    "pattern_type": "popper",
    "image_url": "http://nervouswater.com.au/cdn/shop/products/Popstars_1200x1200.png?v=1675397707",
    "buy_url": "https://www.orvis.com/search?q=KIFF+Pop+Star",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=KIFF+Pop+Star",
    "target_species": [
      "Giant trevally",
      "Bluefin trevally",
      "Queenfish"
    ],
    "regions": [
      "Maldives",
      "Madagascar (Nosy Be)"
    ],
    "description": "A large foam-and-PVC rattle popper designed by KIFF Flies at the request of Seychelles GT guides, prioritising easy casting over maximum head size. The internal rattle chamber adds sound displacement to the surface commotion. Listed in the Complete Seychelles Fly Assortment and directly applicable to Maldives GT and Madagascar queenfish in choppy Mozambique Channel conditions."
  },
  {
    "pattern_name": "Kinky Muddler (large sand eel/baitfish)",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://calflyfisher.com/wp-content/uploads/2024/05/sadil_scott_feb2023_at_the_vise_1-1045x437.jpg",
    "buy_url": "https://www.orvis.com/search?q=Kinky+Muddler+%28large+sand+eel%2Fbaitfish%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Kinky+Muddler+(large+sand+eel/baitfish)",
    "target_species": [
      "bluefin tuna",
      "striped bass"
    ],
    "regions": [
      "Outer Banks, NC"
    ],
    "description": "A muddler-style baitfish pattern tied with kinky synthetic fiber (Kinky Fibre or similar) over a spun deer-hair head. Tied large on 4/0–6/0 hooks to imitate sand eels or adult bunker for bluefin tuna and stripers. The muddler head pushes water and creates turbulence. Cast into breaking fish or trolled to the transom on bluewater runs."
  },
  {
    "pattern_name": "Kraken Crab",
    "originator": "Alphonse Fishing Company / Blue Safari guides (Seychelles)",
    "pattern_type": "crab",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Kraken+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Kraken+Crab",
    "target_species": [
      "yellowmargin triggerfish",
      "titan triggerfish",
      "bonefish"
    ],
    "regions": [
      "Sudan / Nubian Flats (Red Sea)"
    ],
    "description": "Crustacean imitation covering crabs, hermit crabs, and coral invertebrates for Indian Ocean reef species. Marabou or rubber legs in olive, dark brown, tan, or white on #2–#4 with a sculpted foam carapace. Developed by Alphonse Fishing Co./Blue Safari guides as a cross-over triggerfish, bonefish, and permit pattern. Presented dead-drift or with a slow creeping retrieve."
  },
  {
    "pattern_name": "Kung Fu Crab",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Kung+Fu+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Kung+Fu+Crab",
    "target_species": [
      "permit",
      "bonefish"
    ],
    "regions": [
      "Honduras (Rio Sico / Mosquitia)"
    ],
    "description": "Rubber-legged crab on #2–4, listed by Fly Fishing Caribe Guanaja as a dedicated permit pattern for the Bay Islands. Articulated rubber legs produce constant movement with minimal angler input — essential for spooky Honduras permit. Fished with a dead-sink presentation ahead of tailing fish in the Bay Islands and Mosquitia region."
  },
  {
    "pattern_name": "Kwan",
    "originator": "Steve Farrar",
    "pattern_type": "shrimp",
    "image_url": "https://orlandooutfitters.com/cdn/shop/products/foxy-kwan-bc-2.jpg?v=1539707123",
    "buy_url": "https://orlandooutfitters.com/search?q=Kwan",
    "buy_retailer": "Orlando Outfitters",
    "library_url": "https://fishfly.ai/library/?q=Kwan",
    "target_species": [
      "red drum",
      "speckled sea trout",
      "bonefish",
      "permit",
      "redfish",
      "spotted seatrout",
      "black drum"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Hawaii",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "South Carolina Lowcountry",
      "Georgia Lowcountry"
    ],
    "description": "Steve Farrar's hybrid shrimp-crab tied with craft fur and palmered hackle that lands with an ultra-soft splash ideal for spooky fish. Extremely slow sink rate suits the ultra-shallow Laguna Madre and Louisiana duck ponds. Present to tailing redfish and let it settle; hackle fibers flutter naturally without stripping. The defining Lower Laguna Madre sight-fishing pattern."
  },
  {
    "pattern_name": "Large Mullet Imitation (White/Tan Baitfish)",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Large+Mullet+Imitation+%28White%2FTan+Baitfish%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Large+Mullet+Imitation+(White/Tan+Baitfish)",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)"
    ],
    "description": "A 15–18 cm (6–7 inch) white or tan baitfish tied on heavy 4/0–5/0 hooks to imitate the finger mullet that Costa Rican and Nicaraguan tarpon crash at the surface. Craft fur, bucktail, or synthetic over a wide hook gap with flash underwing. Confirmed by Pointer Fly Fishing and Tapam Lodge as the primary surface pattern when jungle tarpon are visibly busting mullet schools."
  },
  {
    "pattern_name": "Large Pink Shrimp",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Large+Pink+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Large+Pink+Shrimp",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Nicaragua (Río San Juan)"
    ],
    "description": "Oversized shrimp imitation 12–15 cm in pink/coral on 2/0–4/0 matching the large shrimp species in Nicaragua's Río San Juan system. Tapam Lodge guides cite pink as the top color in clear water. Fished on intermediate lines with strip-pause retrieve; Nicaragua tarpon feed heavily on large shrimp in current-swept Atlantic-outlet channels."
  },
  {
    "pattern_name": "LC Fiddler (Lowcountry Fiddler Crab)",
    "originator": "John H. Holbrook (Beaufort, SC, circa 2007)",
    "pattern_type": "crab",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=LC+Fiddler+%28Lowcountry+Fiddler+Crab%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=LC+Fiddler+(Lowcountry+Fiddler+Crab)",
    "target_species": [
      "redfish"
    ],
    "regions": [
      "South Carolina Lowcountry",
      "Georgia Lowcountry"
    ],
    "description": "EP-fiber fiddler crab imitation designed by John H. Holbrook (Beaufort, SC, circa 2007) specifically for flood-tide tailing redfish on Lowcountry hard-bottom flats. The EP body captures the fiddler's distinct asymmetric claw silhouette. Holbrook's primary spring-to-summer pattern, dead-dropped or barely twitched ahead of tailing reds gorging on flats-edge fiddler crabs."
  },
  {
    "pattern_name": "LC Shrimp (Lowcountry Shrimp)",
    "originator": "John H. Holbrook (Beaufort, SC, circa 2006)",
    "pattern_type": "shrimp",
    "image_url": "https://i.ytimg.com/vi/nir-j6xVLdM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLARAW7ftOKgnbY9a5PkdWt3EfX4Eg",
    "buy_url": "https://www.orvis.com/search?q=LC+Shrimp+%28Lowcountry+Shrimp%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=LC+Shrimp+(Lowcountry+Shrimp)",
    "target_species": [
      "redfish",
      "spotted seatrout"
    ],
    "regions": [
      "South Carolina Lowcountry"
    ],
    "description": "Designed by John H. Holbrook in Beaufort, SC (c. 2006), the Lowcountry Shrimp uses a root-beer bucktail wing over an Estaz chenille body to imitate the grass shrimp abundant in South Carolina marshes during late summer and fall. Fished on an erratic strip-and-pause through spartina grass edges and oyster bar margins for redfish and spotted seatrout."
  },
  {
    "pattern_name": "Lee's Ghost Shrimp",
    "originator": "Dron Lee",
    "pattern_type": "shrimp",
    "image_url": "https://www.saltyflytying.com/cdn/shop/products/bonefish-flies-abaco-preview-7_1024x1024@2x.png?v=1599853504",
    "buy_url": "https://www.orvis.com/search?q=Lee%27s+Ghost+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Lee's+Ghost+Shrimp",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)"
    ],
    "description": "Dron Lee's translucent ghost-shrimp imitation designed specifically for the clear, sight-fishing conditions of Abaco's Marls. Built with sparse, pale synthetic fibers over bead-chain eyes, the fly lands softly and sinks slowly — critical for Abaco's notoriously spooky bonefish. Fished on a dead-slow strip-pause retrieve ahead of tailing or cruising fish; the translucent body vanishes in the water column the way real ghost shrimp do."
  },
  {
    "pattern_name": "Lefty's Deceiver",
    "originator": "Lefty Kreh (late 1950s)",
    "pattern_type": "streamer",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/42/Lefty%27s_Deceiver_01.jpg",
    "buy_url": "https://www.orvis.com/search?q=Lefty%27s+Deceiver",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Lefty's+Deceiver",
    "target_species": [
      "tarpon",
      "barracuda",
      "jacks",
      "jack crevalle",
      "snook",
      "cubera snapper",
      "striped bass",
      "red drum",
      "bluefish",
      "false albacore",
      "speckled sea trout",
      "Spanish mackerel",
      "roosterfish",
      "dorado",
      "sailfish",
      "giant trevally",
      "bluefin trevally",
      "ladyfish",
      "Pacific snook",
      "queenfish",
      "longtail tuna",
      "dogtooth tuna",
      "mangrove jack"
    ],
    "regions": [
      "Andros, Bahamas",
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Florida Keys (Lower & Middle Keys)",
      "Biscayne Bay & Everglades, FL",
      "Ambergris Caye & Turneffe, Belize",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Jardines de la Reina, Cuba",
      "Outer Banks, NC",
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Baja California Sur, Mexico",
      "Hawaii",
      "Costa Rica Pacific Coast",
      "Los Roques, Venezuela",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)",
      "Australia — Exmouth / Ningaloo Reef",
      "Papua New Guinea (Bismarck Archipelago)",
      "Indonesia (Raja Ampat)",
      "Cayman Islands",
      "ABC Islands (Bonaire, Aruba, Curaçao)",
      "Boca Paila & Sian Ka'an, Mexico",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)",
      "Bocas del Toro, Panama",
      "Cuba — Cayo Cruz / Cayo Largo",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Lefty Kreh's late-1950s non-fouling bucktail-and-hackle baitfish pattern — the foundational saltwater fly. Long saddle hackle tails extend the profile while the bucktail collar prevents fouling. Tied from size 2 to 5/0 in dozens of color schemes for every saltwater species from bonefish to sailfish. Strip at any speed; the go-to searching pattern on every saltwater flat and rip."
  },
  {
    "pattern_name": "Longfin Jack Streamer",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Longfin+Jack+Streamer",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Longfin+Jack+Streamer",
    "target_species": [
      "Longfin jack",
      "Jack crevalle",
      "Atlantic tarpon"
    ],
    "regions": [
      "Gabón, West Africa"
    ],
    "description": "Medium baitfish streamer (8–12 cm) in white/olive or tan imitating engraulids that sustain Gabon's jack and tarpon populations. CF Blend or bucktail on 2/0–3/0 with minimal dressing for a slim, fast-sinking profile. Cast into crashing bird schools over the Ndogo lagoon; retrieved fast with short, sharp strips to imitate a fleeing baitfish."
  },
  {
    "pattern_name": "Los Roques Minnow",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://www.fullingmill.com/92515.jpg",
    "buy_url": "https://www.orvis.com/search?q=Los+Roques+Minnow",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Los+Roques+Minnow",
    "target_species": [
      "bonefish",
      "jacks"
    ],
    "regions": [
      "Los Roques, Venezuela"
    ],
    "description": "Destination-specific sardina imitation sold by Fulling Mill for Los Roques bonefish in grey and green, sizes 2 and 6. Mimics the small baitfish that Los Roques bonefish actively hunt in shallow water — an unusual predatory behavior for Caribbean bonefish. Stripped steadily to imitate fleeing sardina through sandy flats."
  },
  {
    "pattern_name": "Los Roques Tarpon Minnow",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://www.fullingmill.co.uk/3041.jpg",
    "buy_url": "https://www.orvis.com/search?q=Los+Roques+Tarpon+Minnow",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Los+Roques+Tarpon+Minnow",
    "target_species": [
      "tarpon",
      "jacks"
    ],
    "regions": [
      "Los Roques, Venezuela"
    ],
    "description": "Larger companion to the Los Roques Minnow, sized 1/0, sold by Fulling Mill in their Los Roques destination fly selection. Imitates the sardina baitfish on which resident tarpon and jacks feed in deeper channels and flats around Gran Roque. Fished with a fast strip in channels and around current edges."
  },
  {
    "pattern_name": "Lowcountry Fiddler Crab (Felt Crab)",
    "originator": "Capt. David Edens (St. Simons Island, GA)",
    "pattern_type": "crab",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Lowcountry+Fiddler+Crab+%28Felt+Crab%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Lowcountry+Fiddler+Crab+(Felt+Crab)",
    "target_species": [
      "redfish"
    ],
    "regions": [
      "Georgia Lowcountry"
    ],
    "description": "Felt-bodied fiddler crab developed by Capt. David Edens (St. Simons Island, GA) for Georgia marsh fishing. The soft felt body absorbs water to sink slowly and lands nearly silently on ultra-shallow flats — critical for spooky flood-tide redfish within inches of the grass edge. Effective on both flood-tide tailers at St. Simons and Jekyll Island and low-tide edge reds."
  },
  {
    "pattern_name": "Magnetic Minnow",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://www.superflies.com/wp-content/uploads/2020/05/gt-slim-superflies_jpg.webp",
    "buy_url": "https://www.superflies.com/?s=Magnetic+Minnow",
    "buy_retailer": "Superflies",
    "library_url": "https://fishfly.ai/library/?q=Magnetic+Minnow",
    "target_species": [
      "giant trevally",
      "bluefin trevally",
      "roosterfish",
      "jack crevalle",
      "queenfish",
      "bohar snapper",
      "golden trevally",
      "Giant trevally",
      "Queenfish",
      "Bluefin trevally"
    ],
    "regions": [
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Baja California Sur, Mexico",
      "Sudan / Nubian Flats (Red Sea)",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)",
      "Madagascar (Nosy Be)",
      "Solomon Islands"
    ],
    "description": "A slim-profile synthetic minnow built with translucent fibers over a weighted shank, designed to be extremely castable into wind. The broad, flat-sided body creates a wide visual profile without bulk. Popular on GT surf opportunities at Seychelles atolls for maximum castability at distance and as a mullet imitation along Baja beaches for roosterfish and jacks."
  },
  {
    "pattern_name": "Mangrove Jack Deceiver",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://jacksonholeflycompany.com/cdn/shop/products/red-white-deceiver-or-jackson-hole-fly-company_grande.jpg?v=1719959090",
    "buy_url": "https://jacksonholeflycompany.com/search?q=Mangrove+Jack+Deceiver",
    "buy_retailer": "Jackson Hole Fly Company",
    "library_url": "https://fishfly.ai/library/?q=Mangrove+Jack+Deceiver",
    "target_species": [
      "Mangrove jack",
      "Spot-tail bass"
    ],
    "regions": [
      "Solomon Islands"
    ],
    "description": "A medium-weight Lefty's Deceiver variant tied in red/orange or white/red on 1/0–3/0, scaled to match the small baitfish that mangrove jack and spot-tail bass ambush in Solomon Islands river systems. The long saddle hackle tail breathes on the pause and folds tight on the strip. Best presented with a splash-down alongside shaded fallen timber and undercuts in the Varea, Kumabusi, and Gevala rivers."
  },
  {
    "pattern_name": "Mantis Shrimp",
    "originator": "",
    "pattern_type": "mantis",
    "image_url": "https://fishtalesflyshop.com/cdn/shop/files/rays_flies_v_mantis_shrimp_bead_chain_light_saltwater_fly_tan.jpg?v=1731269607&width=900",
    "buy_url": "https://www.fishtalesflyshop.com/search?q=Mantis+Shrimp",
    "buy_retailer": "Fish Tales Fly Shop",
    "library_url": "https://fishfly.ai/library/?q=Mantis+Shrimp",
    "target_species": [
      "permit",
      "bonefish"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)"
    ],
    "description": "Imitation of the powerful mantis shrimp, a primary forage on hard-bottom Belize and Yucatan flats. Tied with a segmented dubbed body, articulated claws, and bead-chain eyes. Fish slow and deep; permit tip up and inhale a mantis presented directly ahead of them. Critical for both permit and large bonefish in the Sian Ka'an biosphere."
  },
  {
    "pattern_name": "Marabou Fleeing Crab",
    "originator": "FlyCastaway guides (St Brandon's, c. 2018)",
    "pattern_type": "crab",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Marabou+Fleeing+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Marabou+Fleeing+Crab",
    "target_species": [
      "Indo-Pacific permit",
      "Bonefish",
      "GT"
    ],
    "regions": [
      "Rodrigues, Mauritius"
    ],
    "description": "Marabou-wing crab imitation developed by FlyCastaway guides for St Brandon's Atoll. Named in the official FlyCastaway brochure as a signature pattern. Marabou wings breathe and pulse on each strip, imitating a crab paddling to escape. Tied on #2–#4 in tan, olive, or white; highly effective on large, wary Indo-Pacific permit across ultra-clear white sand flats."
  },
  {
    "pattern_name": "Marsh Creature",
    "originator": "Capt. Conner Bryant (Tidal Waters Guide Service)",
    "pattern_type": "streamer",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Marsh+Creature",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Marsh+Creature",
    "target_species": [
      "redfish"
    ],
    "regions": [
      "South Carolina Lowcountry"
    ],
    "description": "Simple dark-profile streamer of black-and-purple rabbit strip with bead-chain eyes, created by Capt. Conner Bryant (Tidal Waters Guide Service). Designed for summer Lowcountry redfish in stained marsh water where the high-contrast silhouette triggers aggressive strikes in low visibility. Stripped in short erratic pulses along spartina edges and oyster-bar cuts. A low-complexity, high-effectiveness workhorse."
  },
  {
    "pattern_name": "McCrab",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "https://blog.saltyflytying.com/wp-content/uploads/2013/01/IMG_8744.jpg",
    "buy_url": "https://www.orvis.com/search?q=McCrab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=McCrab",
    "target_species": [
      "permit",
      "bonefish"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize",
      "Honduras (Rio Sico / Mosquitia)"
    ],
    "description": "A foam-and-rubber-leg crab pattern with a dense, round profile and articulated legs that undulate on the sink. Listed consistently among permit and bonefish flies by El Pescador lodge for Northern Belize flats. The foam body controls sink rate for shallow turtle-grass presentations; rubber legs provide motion at rest, making the fly convincing when permit circle it before committing. Presented ahead of moving fish and allowed to sink to the bottom."
  },
  {
    "pattern_name": "McVay Gotcha",
    "originator": "Jim McVay (Andros, Bahamas, c. 1980s)",
    "pattern_type": "shrimp",
    "image_url": "https://i0.wp.com/www.finham.com/wp-content/uploads/2023/03/McVay-Gotcha-Pink-scaled-e1686255150567.jpg?fit=501%2C350&ssl=1",
    "buy_url": "https://www.orvis.com/search?q=McVay+Gotcha",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=McVay+Gotcha",
    "target_species": [
      "bonefish",
      "permit",
      "Bonefish"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Jardines de la Reina, Cuba",
      "Christmas Island, Kiribati",
      "Andros, Bahamas",
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Florida Keys (Lower & Middle Keys)",
      "Biscayne Bay & Everglades, FL",
      "Hawaii",
      "Los Roques, Venezuela",
      "Bimini, Bahamas",
      "Turks & Caicos",
      "Cayman Islands",
      "ABC Islands (Bonaire, Aruba, Curaçao)",
      "Boca Paila & Sian Ka'an, Mexico",
      "Honduras (Rio Sico / Mosquitia)",
      "Rodrigues, Mauritius"
    ],
    "description": "Jim McVay's 1980s Bahamian shrimp imitation, a Charlie-variant tied with crystal flash or carpet fiber body and signature pink thread head. Its weighted eyes sink hook-point-up; cast ahead of tailing bonefish and strip with short twitches. The most widely used bonefish pattern across the Bahamas and a standard throughout the Caribbean from the Keys to Cuba and Belize."
  },
  {
    "pattern_name": "Meko Special",
    "originator": "Omeko Glinton",
    "pattern_type": "shrimp",
    "image_url": "https://globalflyfisher.com/sites/default/files/imported_pictures/meko-special.jpg",
    "buy_url": "https://www.orvis.com/search?q=Meko+Special",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Meko+Special",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Bimini, Bahamas",
      "Turks & Caicos"
    ],
    "description": "Created by Grand Bahama guide Omeko Glinton, the Meko Special uses a neutral tan body with a palmered hackle collar that triggers over both light sand and dark marl without switching flies. The versatile profile suits Bimini's mixed flats and Turks & Caicos DIY anglers covering multiple bottom types. Fished with short erratic strips in the 'shot-and-drop' bonefish presentation style."
  },
  {
    "pattern_name": "Merkin Crab (Long Arm)",
    "originator": "Del Brown (Florida Keys, c. 1980s)",
    "pattern_type": "crab",
    "image_url": "https://assets.orvis.com/is/image/orvisprd/29KX009W_?wid=1024&src=is($object$:1-1)&qlt=85&resMode=sharp2&op_usm=1.75,0.3,2,0",
    "buy_url": "https://www.orvis.com/search?q=Merkin+Crab+%28Long+Arm%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Merkin+Crab+(Long+Arm)",
    "target_species": [
      "permit"
    ],
    "regions": [
      "Jardines de la Reina, Cuba"
    ],
    "description": "Del Brown's Merkin — the original Florida Keys permit crab — uses clipped wool or yarn trimmed to a disk shape with rubber-hackle legs and weighted bead eyes. The Long Arm variant extends one or two legs for added movement and visual cue. Allows a slow, controlled sink. Fished dead-drift ahead of tailing permit on sandy and grass flats in Cuba and the Keys."
  },
  {
    "pattern_name": "Milkfish Plankton Fly",
    "originator": "Saltwater Flies Australia (SWFA)",
    "pattern_type": "attractor",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/500x659/products/11874/11435/MilkfishSnackGerbec02_119__80073.1574090227.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Milkfish+Plankton+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Milkfish+Plankton+Fly",
    "target_species": [
      "milkfish"
    ],
    "regions": [
      "Australia — Exmouth / Ningaloo Reef",
      "Australia — Cape York / Gulf of Carpentaria"
    ],
    "description": "Algae-and-plankton imitation by Saltwater Flies Australia for surface-feeding milkfish. Tied on #4–#8 in green/chartreuse with UV-reactive thread and sparse hackle fibers imitating zooplankton. Presented well ahead of a cruising milkfish on Exmouth Gulf or Cape York west coast flats; held stationary or barely twitched in the surface film."
  },
  {
    "pattern_name": "Milkfish Snack",
    "originator": "Umpqua Feather Merchants (tier)",
    "pattern_type": "other",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/1280x1280/products/11874/11435/MilkfishSnackGerbec02_119__80073.1574090227.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Milkfish+Snack",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Milkfish+Snack",
    "target_species": [
      "milkfish"
    ],
    "regions": [
      "Hawaii",
      "Mozambique (Bazaruto Archipelago)"
    ],
    "description": "An algae and plankton imitation distributed by Umpqua Feather Merchants for Hawaii's surface-feeding milkfish (awa). Built with Krystal Flash and sheep's fleece to mimic floating algae mats. Near-neutral buoyancy keeps it in the feeding zone. Fished dead-drift or with minimal movement in harbor and bay feeding areas where awa school at the surface."
  },
  {
    "pattern_name": "Milky Dream",
    "originator": "Arno Matthee (Alphonse Island, Seychelles)",
    "pattern_type": "attractor",
    "image_url": "https://mtyonder.com/cdn/shop/files/FSMilkyDream.png?v=1768601908&width=1080",
    "buy_url": "https://www.orvis.com/search?q=Milky+Dream",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Milky+Dream",
    "target_species": [
      "milkfish",
      "Milkfish"
    ],
    "regions": [
      "Christmas Island, Kiribati",
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Hawaii",
      "Sudan / Nubian Flats (Red Sea)",
      "Oman (Hallaniyat Islands)",
      "Maldives",
      "Rodrigues, Mauritius"
    ],
    "description": "Arno Matthee's milkfish-specific algae imitation, tied in olive, green, and chartreuse with UV flash strands to mimic the copepod-rich algae mats milkfish filter feed on. One of a handful of proven milkfish patterns globally. Fished dead-drift or with the slowest possible strip in feeding lanes. Endorsed by Alphonse Fishing Co. for Seychelles milkfish."
  },
  {
    "pattern_name": "Millhouse Tarpon Shrimp",
    "originator": "Andy Mill",
    "pattern_type": "shrimp",
    "image_url": "https://www.fullingmill.com/w94677xx.jpg",
    "buy_url": "https://www.orvis.com/search?q=Millhouse+Tarpon+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Millhouse+Tarpon+Shrimp",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Florida Keys (Lower & Middle Keys)"
    ],
    "description": "Andy Mill's shrimp-profile tarpon fly, produced commercially by Fulling Mill in tan and olive on a 1/0 hook. Larger, water-moving profile serves as a low-light and early-morning alternative to the Tarpon Toad on Florida Keys flats. Fished with a strip-pause retrieve before tailing or rolling fish."
  },
  {
    "pattern_name": "Millhouse Tarpon Toad",
    "originator": "Andy Mill",
    "pattern_type": "streamer",
    "image_url": "https://redsflyfishing.com/cdn/shop/files/tarpontoad_b6b2f57e-f923-4c37-8e7e-b585818a8008_1224x668.jpg?v=1705868318",
    "buy_url": "https://redsflyfishing.com/search?q=Millhouse+Tarpon+Toad",
    "buy_retailer": "Red's Fly Shop",
    "library_url": "https://fishfly.ai/library/?q=Millhouse+Tarpon+Toad",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Florida Keys (Lower & Middle Keys)",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Andy Mill's tournament-proven Tarpon Toad variant, commercially tied by Fulling Mill on a Gamakatsu SL12s. Features a palmered foam and synthetic toad body that pushes water and breathes on the strip. Favored by the most decorated Gold Cup Tarpon Tournament winner for clear-water Florida Keys flats presentations."
  },
  {
    "pattern_name": "Mushmouth",
    "originator": "Dave Skok",
    "pattern_type": "baitfish",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/1280x1280/products/16416/16399/Mushmouth_Skok_CharWht__16188.1574280026.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Mushmouth",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Mushmouth",
    "target_species": [
      "bluefin tuna",
      "striped bass"
    ],
    "regions": [
      "Outer Banks, NC"
    ],
    "description": "Dave Skok's soft-silicone baitfish creating a translucent, jelly-like silhouette that matches small bay anchovies precisely. No hard body or flash — the subdued profile unlocks lock-jawed false albacore keyed on tiny baitfish. Fish on an intermediate line with a steady two-inch strip. The go-to Cape Cod and Montauk albie fly when fish refuse flashier patterns."
  },
  {
    "pattern_name": "Needlefish",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "https://cdn11.bigcommerce.com/s-2iqsrmv4m0/images/stencil/original/products/483/835/needlefish-aqua-green__72129__03951.1544756061.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Needlefish",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Needlefish",
    "target_species": [
      "barracuda",
      "jack crevalle",
      "cubera snapper"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize",
      "Jardines de la Reina, Cuba",
      "Bocas del Toro, Panama"
    ],
    "description": "A long, slender baitfish imitation in fluorescent green, yellow, or white, tied to replicate the profile of actual needlefish — primary forage for barracuda in Caribbean and Cuban waters. Typically rigged with a short wire trace to prevent bite-offs. Stripped at maximum speed along reef edges and channels; the fast, straight retrieve imitates a fleeing needlefish and triggers the barracuda's reflexive ambush strike."
  },
  {
    "pattern_name": "Norman's Crab",
    "originator": "Aaron Adams (Bonefish & Tarpon Trust scientist)",
    "pattern_type": "crab",
    "image_url": "https://i.vimeocdn.com/video/231636580-08514d4d7b11982c9ce0623f8648d442f6d735c4394661f8cf504b5b91ef4c24-d?f=webp",
    "buy_url": "https://www.orvis.com/search?q=Norman%27s+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Norman's+Crab",
    "target_species": [
      "bonefish",
      "permit"
    ],
    "regions": [
      "Hawaii"
    ],
    "description": "Simple rabbit-fur and Sililegs crab or mantis shrimp imitation developed by Dr. Aaron Adams (Bonefish & Tarpon Trust). Endorsed by Hawaii flats guides for Hawaiian bonefish and permit. Produces subtle leg movement with minimal retrieve, matching the bottom-hugging crabs and shrimp that Hawaiian bonefish forage on."
  },
  {
    "pattern_name": "Nubian Spaghetti",
    "originator": "Robert Pljuscec / Wild Sea Expedition (December 2020, Shambaya Flat, Sudan)",
    "pattern_type": "worm",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Nubian+Spaghetti",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Nubian+Spaghetti",
    "target_species": [
      "yellowmargin triggerfish",
      "titan triggerfish",
      "milkfish"
    ],
    "regions": [
      "Sudan / Nubian Flats (Red Sea)"
    ],
    "description": "Ultra-chenille worm with dumbbell eyes and rabbit-fur tail born on Shambaya Flat, Sudan (December 2020) during a Wild Sea Expedition milkfish session. Originator Robert Pljuscec pivoted after a failed milkfish attempt; on first morning use, the Spaghetti proved immediately deadly on tailing yellowmargin and titan triggerfish. Slow strip across rubble and sand; also attracted milkfish."
  },
  {
    "pattern_name": "NYAP (Not Your Average Popper)",
    "originator": "James Christmas",
    "pattern_type": "popper",
    "image_url": "https://bearsden.com/cdn/shop/files/NYAP_1280x1280_8d29f39d-8bf5-405c-a97b-b75d26c5117e.webp?v=1697131519&width=1080",
    "buy_url": "https://bearsden.com/search?q=NYAP+%28Not+Your+Average+Popper%29",
    "buy_retailer": "Bear's Den",
    "library_url": "https://fishfly.ai/library/?q=NYAP+(Not+Your+Average+Popper)",
    "target_species": [
      "giant trevally",
      "bluefin trevally",
      "golden trevally",
      "roosterfish",
      "jack crevalle",
      "papio jacks",
      "Pacific snook",
      "queenfish",
      "Giant trevally",
      "Bluefin trevally",
      "Queenfish"
    ],
    "regions": [
      "Christmas Island, Kiribati",
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Baja California Sur, Mexico",
      "Hawaii",
      "Costa Rica Pacific Coast",
      "Sudan / Nubian Flats (Red Sea)",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)",
      "Australia — Exmouth / Ningaloo Reef",
      "Australia — Cape York / Gulf of Carpentaria",
      "Papua New Guinea (Bismarck Archipelago)",
      "Indonesia (Raja Ampat)",
      "Maldives",
      "Rodrigues, Mauritius",
      "Madagascar (Nosy Be)",
      "Solomon Islands"
    ],
    "description": "Guide James Christmas's high-impact foam popper engineered specifically for giant trevally on Indo-Pacific atolls. Its domed foam head creates maximum surface disturbance on each strip while remaining aerodynamically castable on large rods. Black is the preferred color for Christmas Island and Seychelles GT. Strip with fast, aggressive pulls along reef edges and flat margins."
  },
  {
    "pattern_name": "Openshaw's Ghost",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://saltwaterfliesaustralia.com/cdn/shop/files/OPENSHAWS_WEBSTORE_grande.jpg?v=1759279365",
    "buy_url": "https://www.orvis.com/search?q=Openshaw%27s+Ghost",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Openshaw's+Ghost",
    "target_species": [
      "giant trevally",
      "queenfish",
      "bluefin trevally"
    ],
    "regions": [
      "Australia — Exmouth / Ningaloo Reef",
      "Australia — Cape York / Gulf of Carpentaria",
      "Indonesia (Raja Ampat)"
    ],
    "description": "A translucent mullet imitation produced by Saltwater Flies Australia with a clear silicone body and pale grey-and-white synthetic wing that becomes nearly invisible when wet — hence 'Ghost.' Named and sold by SWFA, explicitly recommended by FlyLife Magazine guide Brett Wolf for Ningaloo Reef GTs and queenfish. The ghostly wet profile is especially effective in the crystal-clear flats of Raja Ampat."
  },
  {
    "pattern_name": "Palolo Worm",
    "originator": "Jack Gartside",
    "pattern_type": "worm",
    "image_url": "https://www.jackgartside.com/images/flies/tarpon_palolo_worm200h.jpg",
    "buy_url": "https://www.orvis.com/search?q=Palolo+Worm",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Palolo+Worm",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Florida Keys (Lower & Middle Keys)"
    ],
    "description": "Jack Gartside's foam-topped palolo worm imitation tied in red or rust-orange on a 1/0–2/0 hook. Designed to ride just below the surface, matching the annual palolo worm hatch on Lower Florida Keys ocean-side flats where tarpon sip worms at the surface. Fished with a dead-drift or very slow creep."
  },
  {
    "pattern_name": "Paradise Cockroach",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "https://www.tailflyfishing.com/wp-content/uploads/2022/08/IMG_4600-scaled.jpg",
    "buy_url": "https://www.orvis.com/search?q=Paradise+Cockroach",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Paradise+Cockroach",
    "target_species": [
      "tarpon",
      "Atlantic tarpon"
    ],
    "regions": [
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Gabón, West Africa"
    ],
    "description": "A lodge variant of the Cockroach tarpon fly, tied with grizzly and orange saddle hackles over a tan or natural bucktail body on a 1/0–3/0 hook. Designed for baby tarpon in the stained freshwater lakes at Pesca Maya lodge, Ascension Bay. Fished with a slow strip in low-visibility conditions from November through March when tarpon stage in the jungle lagoons."
  },
  {
    "pattern_name": "Pearl Brush Fly",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://www.superflies.com/wp-content/uploads/2024/03/seychelles-gt-flies-giant-trevally-cosmoledo-superflies.jpeg.webp",
    "buy_url": "https://www.superflies.com/?s=Pearl+Brush+Fly",
    "buy_retailer": "Superflies",
    "library_url": "https://fishfly.ai/library/?q=Pearl+Brush+Fly",
    "target_species": [
      "giant trevally",
      "bluefin trevally",
      "queenfish"
    ],
    "regions": [
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Sudan / Nubian Flats (Red Sea)",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)"
    ],
    "description": "Flash-heavy pearl EP-brush GT streamer with dense, reflective synthetic fibers creating an overwhelming flash profile in clear Seychelles water. Two-handed long-strip retrieve through the surf and coral edges. Pearl-and-flash outperforms matte colors when light and tide align on Alphonse and Farquhar. Documented by Superflies as an on/off killer for bluefin and giant trevally."
  },
  {
    "pattern_name": "Pencil Popper",
    "originator": "",
    "pattern_type": "popper",
    "image_url": "https://www.louisianasportsman.com/wp-content/uploads/2019/08/Pencil-Popper-1-678x381.jpg",
    "buy_url": "https://www.orvis.com/search?q=Pencil+Popper",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Pencil+Popper",
    "target_species": [
      "jack crevalle",
      "barracuda"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize"
    ],
    "description": "A slim, cylindrical hard-foam or cork surface popper with a small cupped face, imitating a wounded or fleeing baitfish at the surface. Lighter disturbance than wide-cup poppers — ideal for jack crevalle and barracuda hunting in clearer water off Turneffe's reef edges. Stripped with sharp short pops followed by pauses; the pencil profile creates a subtler splash pattern that doesn't over-spook fish in clear conditions."
  },
  {
    "pattern_name": "Peterson's Spawning Shrimp",
    "originator": "Craig Mathews",
    "pattern_type": "shrimp",
    "image_url": "https://redsflyfishing.com/cdn/shop/products/809E00_1024x679.jpg?v=1661893853",
    "buy_url": "https://redsflyfishing.com/search?q=Peterson%27s+Spawning+Shrimp",
    "buy_retailer": "Red's Fly Shop",
    "library_url": "https://fishfly.ai/library/?q=Peterson's+Spawning+Shrimp",
    "target_species": [
      "bonefish",
      "permit",
      "snook"
    ],
    "regions": [
      "Andros, Bahamas",
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Florida Keys (Lower & Middle Keys)",
      "Bimini, Bahamas",
      "Turks & Caicos",
      "ABC Islands (Bonaire, Aruba, Curaçao)",
      "Boca Paila & Sian Ka'an, Mexico",
      "Bocas del Toro, Panama"
    ],
    "description": "A highly realistic bonefish and permit pattern with a rabbit-fur body and extended knotted-fiber legs that simulate a swimming spawning shrimp. Its naturalistic silhouette and translucent materials fool both pressured bonefish and permit across Bahamas, Keys, and Abaco flats. Fish on a dead sink toward the bottom; originator credit is shared between Craig Mathews and Eric Peterson."
  },
  {
    "pattern_name": "Peyote Palolo",
    "originator": "Drew Chicone",
    "pattern_type": "worm",
    "image_url": "https://cdn.shoplightspeed.com/shops/607904/files/69352669/peyote-palolo-worm.jpg",
    "buy_url": "https://www.orvis.com/search?q=Peyote+Palolo",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Peyote+Palolo",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Florida Keys (Lower & Middle Keys)",
      "Biscayne Bay & Everglades, FL"
    ],
    "description": "Drew Chicone's modern foam palolo worm imitation for Florida Keys tarpon. Creates a visible near-surface wake and skittering action mimicking live worms. Fished year-round on oceanside flats with a two-handed strip retrieve. Also effective in Everglades mangrove channels where tarpon feed opportunistically on worm-like forage."
  },
  {
    "pattern_name": "Pillow Talk",
    "originator": "Wayne Haselau",
    "pattern_type": "shrimp",
    "image_url": "https://flymenfishingcompany.com/cdn/shop/files/FSPillowTalk.png?v=1746713563&width=1080",
    "buy_url": "https://flymenfishingcompany.com/search?q=Pillow+Talk",
    "buy_retailer": "Flymen Fishing Company",
    "library_url": "https://fishfly.ai/library/?q=Pillow+Talk",
    "target_species": [
      "bonefish",
      "Indo-Pacific permit",
      "bluefin trevally",
      "giant trevally",
      "Bonefish",
      "Triggerfish"
    ],
    "regions": [
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Rodrigues, Mauritius"
    ],
    "description": "Alphonse Island guide Wayne Haselau designed this shrimp pattern to land softly and sink slowly over the vast tidal flats of the Seychelles. A puffy EP-fiber or craft-fur body with bead-chain eyes and a splayed fiber tail reads as a translucent shrimp in the water column. Accounts for the majority of bonefish landed at Alphonse; also taken by BFT and permit."
  },
  {
    "pattern_name": "Pink Mini Puff",
    "originator": "",
    "pattern_type": "attractor",
    "image_url": "https://redsflyfishing.com/cdn/shop/products/11852-large_875x700.jpg?v=1693687142",
    "buy_url": "https://redsflyfishing.com/search?q=Pink+Mini+Puff",
    "buy_retailer": "Red's Fly Shop",
    "library_url": "https://fishfly.ai/library/?q=Pink+Mini+Puff",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Andros, Bahamas"
    ],
    "description": "A small, soft-hackle attractor in the Charlie family tied with a pink or pale-pink marabou or craft-fur wing and bead-chain eyes. The puff-style body lands quietly and sinks slowly. Particularly favored on the Andros Marls where bonefish key on pale, sparkly presentations in shallow, clear water. Twitched on the bottom or fished on a slow strip-pause retrieve."
  },
  {
    "pattern_name": "Pink Thing",
    "originator": "Graham White (early 1980s)",
    "pattern_type": "streamer",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Pink+Thing",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Pink+Thing",
    "target_species": [
      "giant trevally",
      "queenfish",
      "golden trevally",
      "bluefin trevally",
      "barramundi",
      "threadfin salmon",
      "mangrove jack",
      "Niugini black bass"
    ],
    "regions": [
      "Australia — Exmouth / Ningaloo Reef",
      "Australia — Cape York / Gulf of Carpentaria",
      "Papua New Guinea (Bismarck Archipelago)"
    ],
    "description": "Australia's most iconic saltwater fly, originated by Darwin tier Graham White in the early 1980s as a barramundi pattern. Pink-and-white saddle hackle over a bucktail underwing on 2/0–4/0 imitates a distressed baitfish. Stripped with long pulls across tidal edges. Multi-species mainstay across northern Australia for barramundi, GT, threadfin salmon, and mangrove jack."
  },
  {
    "pattern_name": "Pink/White Pacific Billfish Streamer",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "http://saltflypro.com/cdn/shop/products/MarlinfliesSailfishpinkwhite.jpg?v=1646152513",
    "buy_url": "https://saltflypro.com/search?q=Pink%2FWhite+Pacific+Billfish+Streamer",
    "buy_retailer": "Salt Fly Pro",
    "library_url": "https://fishfly.ai/library/?q=Pink/White+Pacific+Billfish+Streamer",
    "target_species": [
      "Pacific sailfish",
      "blue marlin",
      "striped marlin"
    ],
    "regions": [
      "Costa Rica Pacific Coast"
    ],
    "description": "Generic category of large 6–10 inch synthetic-material streamers in pink/white — the near-universal color for Pacific billfish. Multiple variants tied by Costa Rican mate-riggers and captains for bait-and-switch teaser programs. Cast to raised Pacific sailfish, blue marlin, and striped marlin after pulling them off the teaser."
  },
  {
    "pattern_name": "Popper (Big Game Crease / Pop Star)",
    "originator": "",
    "pattern_type": "popper",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Popper+%28Big+Game+Crease+%2F+Pop+Star%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Popper+(Big+Game+Crease+/+Pop+Star)",
    "target_species": [
      "Giant trevally",
      "Queenfish",
      "Spanish mackerel"
    ],
    "regions": [
      "Solomon Islands"
    ],
    "description": "Large foam crease-style or hard-foam popper on 3/0–5/0 in blue-and-white or green-and-white for reef-edge GT action. Thrown on a 12-weight to uninhabited offshore island edges in the Solomons, where pristine fishery pressure means aggressive GTs will charge surface disturbance from distance. Fished with a loud, stop-and-go retrieve; also draws queenfish and Spanish mackerel attacks."
  },
  {
    "pattern_name": "Pretorius Semper Squid",
    "originator": "Christian Pretorius",
    "pattern_type": "baitfish",
    "image_url": "https://www.superflies.com/wp-content/uploads/2024/11/PretoriusSemperSquid-Superflies.jpg",
    "buy_url": "https://www.superflies.com/?s=Pretorius+Semper+Squid",
    "buy_retailer": "Superflies",
    "library_url": "https://fishfly.ai/library/?q=Pretorius+Semper+Squid",
    "target_species": [
      "giant trevally",
      "bluefin trevally",
      "dogtooth tuna",
      "queenfish"
    ],
    "regions": [
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Sudan / Nubian Flats (Red Sea)",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)"
    ],
    "description": "Christian Pretorius's Seychelles GT fly built on the Semper platform with oversized 3D eyes and a bulky squid silhouette. Designed for Indian Ocean surf zones where GTs ambush baitfish in churned white water. Cast into the break and strip fast and hard. Superflies documents it as an absolute GT killer when squid dominate the forage."
  },
  {
    "pattern_name": "Puglisi Diver",
    "originator": "Enrico Puglisi",
    "pattern_type": "streamer",
    "image_url": "https://bearsden.com/cdn/shop/products/00FL-DWD-20_jpg.jpg?v=1672338965&width=1080",
    "buy_url": "https://bearsden.com/search?q=Puglisi+Diver",
    "buy_retailer": "Bear's Den",
    "library_url": "https://fishfly.ai/library/?q=Puglisi+Diver",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize"
    ],
    "description": "Enrico Puglisi's EP-fiber diver pattern with a stacked, multi-layer profile that pushes water and creates a diving action on the strip-pause retrieve. Tied in white, black/purple, and black/red for Belize tarpon. The bulky EP-fiber head traps air and displaces water on each strip, creating a V-wake and subsurface pressure wave that triggers tarpon to eat; effective in both lagoon and flat-edge situations."
  },
  {
    "pattern_name": "Puglisi Sardine",
    "originator": "Enrico Puglisi",
    "pattern_type": "baitfish",
    "image_url": "https://www.finandfire.com/cdn/shop/products/EPRoosterFishSardina_5000x.jpg?v=1645923356",
    "buy_url": "https://www.finandfire.com/search?q=Puglisi+Sardine",
    "buy_retailer": "Fin & Fire",
    "library_url": "https://fishfly.ai/library/?q=Puglisi+Sardine",
    "target_species": [
      "roosterfish",
      "dorado",
      "sierra mackerel",
      "yellowfin tuna",
      "queenfish",
      "giant trevally",
      "sailfish"
    ],
    "regions": [
      "Baja California Sur, Mexico",
      "Mozambique (Bazaruto Archipelago)"
    ],
    "description": "Enrico Puglisi's synthetic EP fiber sardine imitation tied in silver, white, and olive to match Pacific sardines schooling along Baja beaches. Its slender hollow-fiber body creates natural gill-and-flank flash on the strip-pause. Cast into corralling bait schools ahead of roosterfish and dorado; strip continuously at medium speed to match a fleeing sardine. Essential for Baja beach-and-panga fishing."
  },
  {
    "pattern_name": "Puglisi Shrimp",
    "originator": "Enrico Puglisi",
    "pattern_type": "shrimp",
    "image_url": "https://b2396269.smushcdn.com/2396269/wp-content/uploads/2020/11/DSC_1791-1024x680.jpg?lossy=0&strip=1&webp=1",
    "buy_url": "https://www.orvis.com/search?q=Puglisi+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Puglisi+Shrimp",
    "target_species": [
      "red drum",
      "speckled sea trout",
      "sheepshead"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre"
    ],
    "description": "Enrico Puglisi's EP-fiber shrimp mimics brown and white shrimp species with layered synthetic fibers, a curved shrimp profile, and bead-chain eyes that orient the hook point up for weedless presentation. Slow-sink, short-strip retrieve over Louisiana marsh grass and Texas Laguna Madre flats. Takes redfish, speckled trout, and sheepshead year-round."
  },
  {
    "pattern_name": "Purple Death",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "https://www.customsaltwaterflies.com/cdn/shop/products/TP001F_1024x1024.JPG?v=1571436934",
    "buy_url": "https://www.customsaltwaterflies.com/search?q=Purple+Death",
    "buy_retailer": "Custom Saltwater Flies",
    "library_url": "https://fishfly.ai/library/?q=Purple+Death",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Jardines de la Reina, Cuba",
      "Nicaragua (Río San Juan)",
      "Honduras (Rio Sico / Mosquitia)"
    ],
    "description": "A high-contrast tarpon streamer in purple and black, using saddle hackles or marabou tied Deceiver-style over a monofilament loop. The dark color combination creates a bold silhouette in Cuba's clear-water conditions, triggering aggressive inspection from large tarpon. Named by Cuban guides and listed by Fishmaster specifically for Jardines de la Reina tarpon and snook."
  },
  {
    "pattern_name": "Purple/Black Pacific Billfish Streamer",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "http://saltflypro.com/cdn/shop/files/00IN-PO-BP-40.jpg?v=1755052222",
    "buy_url": "https://saltflypro.com/search?q=Purple%2FBlack+Pacific+Billfish+Streamer",
    "buy_retailer": "Salt Fly Pro",
    "library_url": "https://fishfly.ai/library/?q=Purple/Black+Pacific+Billfish+Streamer",
    "target_species": [
      "Pacific sailfish",
      "blue marlin"
    ],
    "regions": [
      "Costa Rica Pacific Coast"
    ],
    "description": "Dark-silhouette synthetic streamer in purple/black for Pacific billfish in low-light or overcast conditions. High-contrast profile targets Pacific sailfish and blue marlin when standard pink/white slows. Used in Costa Rica's bait-and-switch offshore program; cast to billfish that have been raised and pulled off a teaser."
  },
  {
    "pattern_name": "Purple/Black Shrimp (Large)",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Purple%2FBlack+Shrimp+%28Large%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Purple/Black+Shrimp+(Large)",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)"
    ],
    "description": "A large 4/0 purple-and-black shrimp on a heavy-wire hook is the benchmark deep-water jungle tarpon fly for Costa Rica's Río Colorado and Nicaragua's Río Indio system. The dark silhouette registers strongly in tannin-stained water at 10–40 ft depth on a sinking line. Christiaan Pretorius documented a 50 lb Tapam Lodge tarpon on the first strip of this exact colour combination."
  },
  {
    "pattern_name": "Queenfish Crease Fly",
    "originator": "",
    "pattern_type": "popper",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/500x659/products/11492/10763/Creasefly_black__09152.1574077662.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Queenfish+Crease+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Queenfish+Crease+Fly",
    "target_species": [
      "Queenfish",
      "Bluefin trevally"
    ],
    "regions": [
      "Madagascar (Nosy Be)"
    ],
    "description": "Folded-foam popper in silver/blue or white on 2/0–4/0 imitating a distressed baitfish. The V-shaped foam body creates an irregular skipping action when stripped sharply. Proven on queenfish schooling over shallow reef edges around Madagascar's Mitsio Islands and on bluefin trevally. Originated by Joe Blados; fished on floating line with aggressive strip-and-pause."
  },
  {
    "pattern_name": "Raghead Crab",
    "originator": "Jan Isley (Yucatán)",
    "pattern_type": "crab",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/1280x1280/products/16175/16206/Rag_Head_Crab_Tan__47072.1574278458.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Raghead+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Raghead+Crab",
    "target_species": [
      "permit",
      "bonefish"
    ],
    "regions": [
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Los Roques, Venezuela",
      "Honduras (Rio Sico / Mosquitia)"
    ],
    "description": "Jan Isley's Yucatan permit crab, named the single most important permit fly by Palometa Club guides at Ascension Bay. Spun and clipped deer-hair or synthetic rag-head body creates a flat crab profile with inverted hook. Drop ahead of a feeding permit, let it sink to the bottom, and wait for the take without stripping."
  },
  {
    "pattern_name": "Ratliff's Fiddlestick Crab",
    "originator": "Ratliff (origin: SE US coastal guides)",
    "pattern_type": "crab",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Ratliff%27s+Fiddlestick+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Ratliff's+Fiddlestick+Crab",
    "target_species": [
      "redfish"
    ],
    "regions": [
      "South Carolina Lowcountry",
      "Georgia Lowcountry"
    ],
    "description": "Custom-tied articulated fiddler crab favored by Southeast US coastal guides for flood-tide redfish. The articulated claw arm gives a bolting, tumbling action as the crab falls — closely mimicking a fiddler crab scurrying across exposed hard sand ahead of the tide. Documented as a top flood-tide pattern at St. Simons and throughout the Georgia and South Carolina marsh coast."
  },
  {
    "pattern_name": "Rattlesnake",
    "originator": "",
    "pattern_type": "attractor",
    "image_url": "https://fatfingeredflytyer.com/wp-content/uploads/2020/08/step-6-final.jpg",
    "buy_url": "https://www.orvis.com/search?q=Rattlesnake",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Rattlesnake",
    "target_species": [
      "red drum",
      "speckled sea trout"
    ],
    "regions": [
      "Louisiana Marsh"
    ],
    "description": "An attractor-style saltwater fly incorporating a glass or plastic rattle chamber in the body, generating audible clicks on each strip. Designed for Louisiana marsh fishing where dingy, low-visibility water makes scent and sound more important than visual profile. The rattle produces low-frequency vibrations that mimic a distressed prey item; effective on red drum and speckled trout in dark, tannin-stained bayous and grass flats."
  },
  {
    "pattern_name": "Rattling Fat Boy",
    "originator": "Saltwater Flies Australia (SWFA)",
    "pattern_type": "baitfish",
    "image_url": "https://saltwaterfliesaustralia.com/cdn/shop/files/FATBOY10CHARTWEB_1800x1800.jpg?v=1723164639",
    "buy_url": "https://www.orvis.com/search?q=Rattling+Fat+Boy",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Rattling+Fat+Boy",
    "target_species": [
      "giant trevally",
      "queenfish",
      "golden trevally"
    ],
    "regions": [
      "Australia — Exmouth / Ningaloo Reef"
    ],
    "description": "Produced by Saltwater Flies Australia in sizes SL12 2/0–6/0, the Rattling Fat Boy incorporates an internal rattle chamber inside a bulky synthetic baitfish body. The sonic vibration combined with a wide profile triggers GT, queenfish, and golden trevally in the turbid water of Australian tropical flats. Available in multiple colour variants including chart/black and white/olive."
  },
  {
    "pattern_name": "Redfish Crack",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "https://cdn.shoplightspeed.com/shops/618341/files/42572424/joshs-redfish-crack-fly.jpg",
    "buy_url": "https://www.orvis.com/search?q=Redfish+Crack",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Redfish+Crack",
    "target_species": [
      "red drum",
      "speckled sea trout",
      "redfish",
      "spotted seatrout",
      "snook"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "South Carolina Lowcountry",
      "Georgia Lowcountry",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "A loud shrimp-attractor pattern known for its bulky front hackle collar — also called the Redfish Cracklin — that pushes water and creates turbulence visible to redfish in stained Louisiana marsh and upper Texas coast flats. Fish slow with a strip-pause in murky water; its high-contrast silhouette and collar wake trigger reaction strikes where visibility is limited."
  },
  {
    "pattern_name": "Redfish Worm",
    "originator": "",
    "pattern_type": "worm",
    "image_url": "https://www.jackgartside.com/images/flies/redfishworms2.jpg",
    "buy_url": "https://www.orvis.com/search?q=Redfish+Worm",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Redfish+Worm",
    "target_species": [
      "red drum",
      "black drum",
      "redfish"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Mosquito Lagoon & Indian River Lagoon, FL"
    ],
    "description": "A long, slender fly imitating polychaete and tube worms that emerge from Gulf Coast marsh sediment. Typically tied with craft fur, marabou, or thin synthetic fibers on a size 2–1/0 hook. Fished near the bottom during spring worm hatches on calm morning tides. Particularly effective for tailing Louisiana redfish and black drum rooting in soft-bottom marsh ponds."
  },
  {
    "pattern_name": "Reef Popper (Coral Reef GT)",
    "originator": "",
    "pattern_type": "popper",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/500x659/products/11793/19607/Saltwater_Popper_RedWht__79991.1585596635.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Reef+Popper+%28Coral+Reef+GT%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Reef+Popper+(Coral+Reef+GT)",
    "target_species": [
      "Giant trevally",
      "Bluefin trevally"
    ],
    "regions": [
      "Madagascar (Nosy Be)"
    ],
    "description": "Compact foam popper on 2/0–4/0 with a cupped face and body under 6 cm—sized for precision delivery into tight coral structures at Nosy Be's Serpent Bank and Grand Entry Bank. GTs hold tight against coral heads requiring slower pop-and-pause presentations than open-flat fishing. Retrieved with sharp 30 cm strips; works bluefin trevally as well."
  },
  {
    "pattern_name": "River Monster (Captain Sullivan's)",
    "originator": "Capt. Jason Sullivan",
    "pattern_type": "streamer",
    "image_url": "https://news.orvis.com/wp-content/uploads/2021/11/sully3.jpg",
    "buy_url": "https://www.orvis.com/search?q=River+Monster+%28Captain+Sullivan%27s%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=River+Monster+(Captain+Sullivan's)",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Biscayne Bay & Everglades, FL"
    ],
    "description": "Captain Jason Sullivan's Everglades tarpon pattern uses black ostrich herl over an EP Foxy Brush body to create a dark, heavily breathing mullet silhouette. Designed specifically for tannin-stained backcountry creek tarpon in Florida Bay where contrast and movement matter more than realism. Documented by Orvis News as a primary tool for resident Everglades tarpon year-round."
  },
  {
    "pattern_name": "Ruoff's Laid-Up Tarpon Fly",
    "originator": "Rick Ruoff",
    "pattern_type": "streamer",
    "image_url": "https://cdn.shoplightspeed.com/shops/607904/files/7920434/laid-up-tarpon-fly-ruoff.jpg",
    "buy_url": "https://www.orvis.com/search?q=Ruoff%27s+Laid-Up+Tarpon+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Ruoff's+Laid-Up+Tarpon+Fly",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Florida Keys (Lower & Middle Keys)"
    ],
    "description": "Natural tan/chartreuse fly with subdued coloration designed by Keys guide Rick Ruoff for finesse presentations to motionless laid-up tarpon. Ruoff's marine biology background informed the low-contrast tones suited to resting fish. Delivered softly on a long leader, dead-drifted or given a single slow strip when the fish reacts."
  },
  {
    "pattern_name": "Sailfish Fly (Tandem Tube)",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://cdn.shopify.com/s/files/1/0022/7298/5154/files/BA1019BE-8399-4BDB-BDBA-547A0070B8EA.jpg?v=1715466673",
    "buy_url": "https://www.orvis.com/search?q=Sailfish+Fly+%28Tandem+Tube%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Sailfish+Fly+(Tandem+Tube)",
    "target_species": [
      "Indo-Pacific sailfish"
    ],
    "regions": [
      "Madagascar (Nosy Be)"
    ],
    "description": "Large pink-and-white tandem tube fly on 6/0, presented to free-swimming or teased Indo-Pacific sailfish. The tube design allows the hook to swing freely, dramatically improving hookup rates on billfish that slash at the fly. Used throughout the Mozambique Channel — especially off Nosy Be, Madagascar — where sailfish numbers peak in season. Flymen Fishing Co. popularized the tandem tube format."
  },
  {
    "pattern_name": "Schminnow",
    "originator": "Norm Zeigler",
    "pattern_type": "baitfish",
    "image_url": "https://baxterhouseflyfishing.com/cdn/shop/files/20240322_122923_1445x.jpg?v=1711128477",
    "buy_url": "https://baxterhouseflyfishing.com/search?q=Schminnow",
    "buy_retailer": "BaxterHouse Fly Fishing",
    "library_url": "https://fishfly.ai/library/?q=Schminnow",
    "target_species": [
      "false albacore",
      "little tunny",
      "Spanish mackerel",
      "snook",
      "spotted seatrout",
      "redfish"
    ],
    "regions": [
      "Outer Banks, NC",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Norm Zeigler's lightweight saltwater baitfish pattern tied with marabou and crystal chenille over a short-shank hook, imitating small silversides or glass minnows. The fly sinks slowly and breathes on a dead drift or micro-strip — critical when false albacore and little tunny at Cape Lookout and the Outer Banks are feeding on suspended 1-inch bait and refusing faster-sinking patterns. Originator is Norm Zeigler of Sanibel."
  },
  {
    "pattern_name": "Seaducer",
    "originator": "Homer Rhodes (1940s)",
    "pattern_type": "streamer",
    "image_url": "https://cdn.shopify.com/s/files/1/1906/0729/products/seaducer-tan-2_1024x1024.jpg?v=1548710526",
    "buy_url": "https://www.orvis.com/search?q=Seaducer",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Seaducer",
    "target_species": [
      "red drum",
      "speckled sea trout",
      "black drum",
      "snook",
      "roosterfish",
      "jack crevalle",
      "tarpon",
      "redfish",
      "spotted seatrout"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Baja California Sur, Mexico",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)",
      "Bocas del Toro, Panama",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Homer Rhodes's 1940s all-hackle streamer tied with long front and rear hackle collars that create a near-neutral buoyancy in the water column. Its pulsing hackle fibers simulate a wounded baitfish or swimming shrimp at slow retrieve speeds. Fish just below the surface film on a floating line with a steady or erratic strip; an enduring design for snook, redfish, and trout in shallow structure."
  },
  {
    "pattern_name": "Semper Fly",
    "originator": "Bob Popovics",
    "pattern_type": "baitfish",
    "image_url": "https://intoflyfishing.com/wp-content/uploads/2020/08/Semper_complete_fly.jpg",
    "buy_url": "https://www.orvis.com/search?q=Semper+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Semper+Fly",
    "target_species": [
      "giant trevally",
      "bluefin trevally",
      "queenfish",
      "dogtooth tuna",
      "Bonefish",
      "Bluefin trevally",
      "Indo-Pacific permit"
    ],
    "regions": [
      "Christmas Island, Kiribati",
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Sudan / Nubian Flats (Red Sea)",
      "Oman (Hallaniyat Islands)",
      "Mozambique (Bazaruto Archipelago)",
      "Papua New Guinea (Bismarck Archipelago)",
      "Indonesia (Raja Ampat)",
      "Maldives",
      "Rodrigues, Mauritius"
    ],
    "description": "Bob Popovics's flowing GT pattern pairs a marabou collar with thin schlappen hackle fibers for a baitfish-squid hybrid that pulses on every pause. Olive-red and black-purple colorways dominate for Seychelles and Christmas Island giant trevally. Retrieved in aggressive long strips along coral drop-offs; the large silhouette and water-pushing action register on GT's lateral line at distance."
  },
  {
    "pattern_name": "Senegal Kob Shrimp",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Senegal+Kob+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Senegal+Kob+Shrimp",
    "target_species": [
      "Senegal kob",
      "Leerfish (garrick)",
      "Jack crevalle"
    ],
    "regions": [
      "Gabón, West Africa"
    ],
    "description": "A weighted tan/olive shrimp tied on 1/0–2/0, designed to target Senegal kob (Pseudotolithus senegalensis) — an estuarine sciaenid that feeds heavily on shrimp in Gabon's lagoon mouths and river channels at Sette Cama. Fished with a slow, twitching retrieve near bottom structure alongside Atlantic tarpon and leerfish. A recommended secondary fly-box addition for West Africa."
  },
  {
    "pattern_name": "Shaughnessy's Nyacca Baitfish",
    "originator": "James Shaughnessy (Beulah / FlyFishMex)",
    "pattern_type": "baitfish",
    "image_url": "https://bearsden.com/cdn/shop/files/nyacca_yellow_1800x1800.jpg?v=1761755807",
    "buy_url": "https://bearsden.com/search?q=Shaughnessy%27s+Nyacca+Baitfish",
    "buy_retailer": "Bear's Den",
    "library_url": "https://fishfly.ai/library/?q=Shaughnessy's+Nyacca+Baitfish",
    "target_species": [
      "roosterfish",
      "dorado",
      "sailfish",
      "yellowfin tuna",
      "Pacific sailfish"
    ],
    "regions": [
      "Baja California Sur, Mexico",
      "Costa Rica Pacific Coast"
    ],
    "description": "Developed by FlyFishMex founder James Shaughnessy for Baja bluewater species, this layered-feather-tail baitfish uses multiple saddle hackle layers over a synthetic body to create a lifelike swimming profile. Tied in sardine, mullet, and needlefish colors on 2/0–4/0 hooks. One of the most trusted East Cape roosterfish and sailfish patterns produced by Montana Fly Company."
  },
  {
    "pattern_name": "Shrimpy (Captain Sullivan's)",
    "originator": "Capt. Jason Sullivan",
    "pattern_type": "shrimp",
    "image_url": "https://news.orvis.com/wp-content/uploads/2021/11/sully1.jpg",
    "buy_url": "https://www.orvis.com/search?q=Shrimpy+%28Captain+Sullivan%27s%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Shrimpy+(Captain+Sullivan's)",
    "target_species": [
      "redfish",
      "snook"
    ],
    "regions": [
      "Biscayne Bay & Everglades, FL"
    ],
    "description": "Capt. Jason Sullivan's Everglades shrimp tied with brown, tan, and orange craft fur for ultra-shallow Florida Bay and Whitewater Bay sight-fishing. Soft landing and neutral sink match tailing redfish and laid-up snook in inches of water. Documented by Orvis News as an Everglades-specific pattern. Strip slowly or dead-drift once in the feeding zone."
  },
  {
    "pattern_name": "Simple Shrimp",
    "originator": "Fish-Bones Fly Fishing (Grand Cayman)",
    "pattern_type": "shrimp",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Simple+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Simple+Shrimp",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Cayman Islands"
    ],
    "description": "Bonefish shrimp developed by Fish-Bones Fly Fishing (Grand Cayman) as the heavier companion to The Usual. Splayed rubber legs, rust/tan dubbed body, and orange tail on #2–#4 imitate a defensive posture on the sandy Cayman flats bottom. Rust with orange tail is the top Cayman tailing-bonefish color; presented and stripped with short, gentle pulls."
  },
  {
    "pattern_name": "Simram",
    "originator": "Rick Simonsen",
    "pattern_type": "shrimp",
    "image_url": "https://www.saltwaterflies.com/simram_bc_eye.jpg",
    "buy_url": "https://www.orvis.com/search?q=Simram",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Simram",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Andros, Bahamas",
      "Bimini, Bahamas"
    ],
    "description": "A bonefish shrimp pattern built with a crosscut rabbit body over a pearlescent shell-back, creating a sculpted, lifelike swimming profile. The rabbit fiber undulates naturally on the sink and strip, imitating a shrimp scooting along the bottom. Most effective in the deeper tidal channels that border Andros's shallow sand flats; fish on a slow strip-pause near the bottom."
  },
  {
    "pattern_name": "Snapper Bunker (Cubera Pattern)",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Snapper+Bunker+%28Cubera+Pattern%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Snapper+Bunker+(Cubera+Pattern)",
    "target_species": [
      "Cubera snapper",
      "Atlantic tarpon"
    ],
    "regions": [
      "Gabón, West Africa"
    ],
    "description": "Large dark olive-and-purple bunker/menhaden-profile fly on 4/0–6/0. Cubera snapper at Gabon's Sette Cama estuary respond to a big, dark, slow-moved profile near mangrove edges and channel drop-offs, especially with a sinking line. The wide, compressed bucktail or EP body pushes water and gives off low-frequency vibration. Also intercepts Atlantic tarpon staging in the same structure."
  },
  {
    "pattern_name": "Snook Slider",
    "originator": "",
    "pattern_type": "slider",
    "image_url": "https://www.saltwaterflies.com/slider_fly_chartreuse_red.jpg",
    "buy_url": "https://www.orvis.com/search?q=Snook+Slider",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Snook+Slider",
    "target_species": [
      "snook",
      "red drum",
      "jack crevalle",
      "Pacific snook",
      "cubera snapper",
      "tarpon",
      "redfish"
    ],
    "regions": [
      "Texas Gulf Coast / Laguna Madre",
      "Baja California Sur, Mexico",
      "Costa Rica Pacific Coast",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)",
      "Bocas del Toro, Panama",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "A cupped or bullet-head deer-hair or foam surface fly that pushes water without hard popping. The hook rides point-up in a weedless configuration for working mangrove tangles and root systems. Used with a slow walk-the-dog surface retrieve. Critical for Lower Laguna snook and the Magdalena Bay mangrove fishery where hard poppers catch too much structure."
  },
  {
    "pattern_name": "Snook-A-Roo",
    "originator": "",
    "pattern_type": "slider",
    "image_url": "https://tfs-spaces.sfo2.digitaloceanspaces.com/theflyshop/uploads/2020/12/Snookaroo_Fly.jpg",
    "buy_url": "https://www.orvis.com/search?q=Snook-A-Roo",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Snook-A-Roo",
    "target_species": [
      "snook",
      "tarpon",
      "redfish"
    ],
    "regions": [
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "A surface slider with a foam or clipped deer-hair head that creates a wide pushing wake without diving underwater. Fished with sharp strips followed by long pauses in mangrove creek tidal channels. The slow-sink wake pattern is one of Pesca Maya's recommended surface presentations for snook in Ascension Bay's backcountry, where snook ambush from structure."
  },
  {
    "pattern_name": "Spam & Eggs",
    "originator": "Coach Duff (guide, Oahu)",
    "pattern_type": "mantis",
    "image_url": "https://i0.wp.com/ssflies.com/wp-content/uploads/2018/11/415.jpg?fit=800%2C532&ssl=1&w=640",
    "buy_url": "https://www.orvis.com/search?q=Spam+%26+Eggs",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Spam+%26+Eggs",
    "target_species": [
      "bonefish",
      "permit",
      "papio jacks"
    ],
    "regions": [
      "Hawaii"
    ],
    "description": "Mantis shrimp imitation developed by Oahu guide Coach Duff specifically for Hawaiian flats where mantis shrimp dominate bonefish diet. Signature spider-like legs radiating from the head create irresistible leg-action. Fished on short hops with brief pauses on sand and rubble flats targeting bonefish, permit, and papio jacks."
  },
  {
    "pattern_name": "Spawning Shrimp",
    "originator": "Eric Peterson",
    "pattern_type": "shrimp",
    "image_url": "https://www.flyfishbonehead.com/wp-content/uploads/2015/06/petersons-spawning-shrimp-flyfishbonehead-fly-tying-videos-and-saltwater-flies.jpg",
    "buy_url": "https://www.orvis.com/search?q=Spawning+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Spawning+Shrimp",
    "target_species": [
      "permit",
      "bonefish",
      "yellowmargin triggerfish",
      "Indo-Pacific permit",
      "red drum",
      "striped bass",
      "titan triggerfish",
      "bluefin trevally"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Christmas Island, Kiribati",
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Outer Banks, NC",
      "Los Roques, Venezuela",
      "Sudan / Nubian Flats (Red Sea)",
      "ABC Islands (Bonaire, Aruba, Curaçao)",
      "Cuba — Cayo Cruz / Cayo Largo"
    ],
    "description": "Eric Peterson's rabbit-fur shrimp with a prominent orange egg sac at the bend, imitating egg-bearing shrimp on the flats. Egg sac flash triggers permit, bonefish, and triggerfish. Palometa Club guides rank it a top Ascension Bay fly — Lee Haskin caught seven permit in one week on his own variant. Fish slowly along grass edges."
  },
  {
    "pattern_name": "Spongebob Threadfin Slider",
    "originator": "Conrad Botes (2015)",
    "pattern_type": "baitfish",
    "image_url": "http://feathersandflouro.files.wordpress.com/2013/12/sbsliders-lres.jpg",
    "buy_url": "https://www.orvis.com/search?q=Spongebob+Threadfin+Slider",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Spongebob+Threadfin+Slider",
    "target_species": [
      "Giant African threadfin",
      "Atlantic tarpon",
      "Jack crevalle"
    ],
    "regions": [
      "Gabón, West Africa"
    ],
    "description": "Conrad Botes' 2015 creation for Sette Cama's giant African threadfin: a large 14–16 cm bucktail-and-schlappen streamer on a slider head tied on 4/0–6/0. The slider head makes it surf current seams without diving. Fished on Di5–Di7 sinking lines through Gabon estuary channels, it also draws Atlantic tarpon and jack crevalle. Featured in The Mission Fly Fishing Magazine tying guide."
  },
  {
    "pattern_name": "Spoon Fly",
    "originator": "",
    "pattern_type": "attractor",
    "image_url": "https://www.saltwatersportsman.com/wp-content/uploads/2021/09/Rainys-Spoon-flies-1024x772.jpg",
    "buy_url": "https://www.orvis.com/search?q=Spoon+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Spoon+Fly",
    "target_species": [
      "redfish",
      "snook",
      "red drum"
    ],
    "regions": [
      "Biscayne Bay & Everglades, FL",
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "South Carolina Lowcountry"
    ],
    "description": "A weedless mylar-wrapped fly tied to mimic the wobbling flash of a metal spoon, with a hook-point-up configuration on a single or double hook. Standard tailing redfish pattern in the Everglades, Louisiana marsh, and Lower Laguna Madre. Fished on a slow strip-pause over grass flats, the mylar body pulses and flutters, producing the low-frequency vibration that draws feeding redfish by lateral-line detection before they see it."
  },
  {
    "pattern_name": "Squimp",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "https://saltwateredge.com/cdn/shop/products/90155_2048x.jpg?v=1675870612",
    "buy_url": "https://saltwateredge.com/search?q=Squimp",
    "buy_retailer": "Saltwater Edge",
    "library_url": "https://fishfly.ai/library/?q=Squimp",
    "target_species": [
      "bonefish",
      "permit"
    ],
    "regions": [
      "Ambergris Caye & Turneffe, Belize",
      "Cuba — Cayo Cruz / Cayo Largo"
    ],
    "description": "A squid-shrimp hybrid attractor pattern tied with rubber legs and a translucent synthetic body in tan, olive, or pink. Its combination of shrimp-like profile and squid-like tentacle appendages triggers bonefish and permit feeding across varied flat types. Fish on a slow sink to the bottom ahead of a feeding fish; listed consistently on El Pescador's Belize flat-fly recommendations."
  },
  {
    "pattern_name": "St. Simons Scampi",
    "originator": "Capt. David Edens (St. Simons Island, GA)",
    "pattern_type": "shrimp",
    "image_url": "https://seaislandflyfishers.org/wp-content/uploads/2021/07/Dave_Edens_Scampi_RedFish_Fly2-1024x683.jpg",
    "buy_url": "https://www.orvis.com/search?q=St.+Simons+Scampi",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=St.+Simons+Scampi",
    "target_species": [
      "redfish",
      "spotted seatrout"
    ],
    "regions": [
      "Georgia Lowcountry"
    ],
    "description": "Shrimp imitation created by Capt. David Edens of Fly Cast Charters (St. Simons Island, GA). Gold-dubbed body, root beer flash tail, gold dumbbell eyes, and gold flash wing on Mustad 34007 size 2. Cited by Sea Island Fly Fishers as a proven pattern for tailing Georgia Lowcountry redfish and spotted seatrout in the Golden Isles salt marshes."
  },
  {
    "pattern_name": "Strip Tease (Sparkplug)",
    "originator": "Dick Brown (attributed)",
    "pattern_type": "shrimp",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Strip+Tease+%28Sparkplug%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Strip+Tease+(Sparkplug)",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Cayman Islands"
    ],
    "description": "Semi-translucent UV-body shrimp with rubber legs and an orange mouth, attributed to Dick Brown, recommended by Fish-Bones Grand Cayman for deep 'white hole' flats on flood tides. The UV-reactive materials glow in depth, and the compact profile sinks quickly to the feeding zone. Particularly effective when Cayman bonefish key on sand fleas and small crabs in deeper channel-adjacent water."
  },
  {
    "pattern_name": "Strong Arm Merkin",
    "originator": "Dave Skok (c. 2019)",
    "pattern_type": "crab",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/1280x1280/products/17088/19735/Strong-Arm-Merkin-Tan__99837.1585753845.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Strong+Arm+Merkin",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Strong+Arm+Merkin",
    "target_species": [
      "permit",
      "redfish",
      "spotted seatrout"
    ],
    "regions": [
      "Florida Keys (Lower & Middle Keys)",
      "Boca Paila & Sian Ka'an, Mexico",
      "Cuba — Cayo Cruz / Cayo Largo",
      "South Carolina Lowcountry",
      "Georgia Lowcountry"
    ],
    "description": "Dave Skok's 2019 Keys innovation replaces the Merkin's traditional hackle legs with a single prominent rubber-band or silicone crab claw — a visual trigger arm that hangs below the crab body as it sinks. Introduced to Key West guide Nathaniel Linville, the pattern took first or second in 8 of 11 Florida Keys permit tournaments after its debut."
  },
  {
    "pattern_name": "Stu Apte Tarpon Fly",
    "originator": "Stu Apte",
    "pattern_type": "streamer",
    "image_url": "https://www.tietheflies.com/fly-tying/recipes/apte-tarpon-fly/images/full/Apte-Tarpon-Fly-TgoeHd7r-1603248770.jpg",
    "buy_url": "https://www.orvis.com/search?q=Stu+Apte+Tarpon+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Stu+Apte+Tarpon+Fly",
    "target_species": [
      "tarpon"
    ],
    "regions": [
      "Florida Keys (Lower & Middle Keys)",
      "Honduras (Rio Sico / Mosquitia)",
      "Cuba — Cayo Cruz / Cayo Largo"
    ],
    "description": "Stu Apte's iconic Keys tarpon fly uses orange and red saddle hackles wound palmered-style over a short shank, creating a compact, dense profile. Featured on a 1991 U.S. postage stamp. The bright orange/red color triggers strikes from migratory tarpon in the clear water of the Lower Keys from April through July. A foundational pattern of the Florida Keys guiding tradition."
  },
  {
    "pattern_name": "Surf Candy",
    "originator": "Bob Popovics",
    "pattern_type": "baitfish",
    "image_url": "https://assets.orvis.com/is/image/orvisprd/1X13089W_?wid=1024&src=is($object$:1-1)&qlt=85&resMode=sharp2&op_usm=1.75,0.3,2,0",
    "buy_url": "https://www.orvis.com/search?q=Surf+Candy",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Surf+Candy",
    "target_species": [
      "false albacore",
      "little tunny",
      "Spanish mackerel",
      "striped bass",
      "sierra mackerel",
      "jack crevalle",
      "ladyfish",
      "yellowfin tuna"
    ],
    "regions": [
      "Outer Banks, NC",
      "Baja California Sur, Mexico"
    ],
    "description": "Bob Popovics's epoxy-body baitfish matching bay anchovies and silversides with a hard-coat durable enough to withstand bluefish teeth. Sparse bucktail and flash under clear epoxy or UV resin create a glassy baitfish head. Fish on intermediate line with a sharp strip-pause through Cape Cod and Montauk rips. The benchmark Northeast silverside imitation for three decades."
  },
  {
    "pattern_name": "Tarpon Bunny",
    "originator": "",
    "pattern_type": "streamer",
    "image_url": "https://www.tietheflies.com/fly-tying/recipes/tarpon-bunny/images/full/Tarpon-Bunny-2.jpg",
    "buy_url": "https://www.orvis.com/search?q=Tarpon+Bunny",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Tarpon+Bunny",
    "target_species": [
      "tarpon",
      "snook"
    ],
    "regions": [
      "Andros, Bahamas",
      "Florida Keys (Lower & Middle Keys)",
      "Ambergris Caye & Turneffe, Belize",
      "Jardines de la Reina, Cuba",
      "Los Roques, Venezuela",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)",
      "Bocas del Toro, Panama",
      "Cuba — Cayo Cruz / Cayo Largo",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "A rabbit-strip tarpon streamer in which a long zonker strip provides continuous pulsing action even when the fly is stationary. Available in white, chartreuse, black/red, olive, and tan for varied light and water conditions. Effective for both rolling migratory tarpon in the Florida Keys and baby tarpon in Andros creek systems, Belize lagoons, and Cuba's flat edges. The material's movement at rest is its key advantage over sparser flies on slow, laid-up fish."
  },
  {
    "pattern_name": "Tarpon Toad",
    "originator": "Gary Merriman",
    "pattern_type": "streamer",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/1280x1280/products/11882/29965/Tarpon-Toad-Char__43731.1720643112.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Tarpon+Toad",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Tarpon+Toad",
    "target_species": [
      "tarpon",
      "snook",
      "red drum",
      "jack crevalle",
      "juvenile tarpon",
      "redfish"
    ],
    "regions": [
      "Florida Keys (Lower & Middle Keys)",
      "Biscayne Bay & Everglades, FL",
      "Ambergris Caye & Turneffe, Belize",
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Jardines de la Reina, Cuba",
      "Texas Gulf Coast / Laguna Madre",
      "Baja California Sur, Mexico",
      "Los Roques, Venezuela",
      "Boca Paila & Sian Ka'an, Mexico",
      "Costa Rica Caribbean (Tortuguero / Río Colorado)",
      "Nicaragua (Río San Juan)",
      "Bocas del Toro, Panama",
      "Cuba — Cayo Cruz / Cayo Largo",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "South Carolina Lowcountry",
      "Tampa Bay & Sanibel, FL"
    ],
    "description": "Gary Merriman's Keys-developed tarpon pattern combining craft fur, rubber legs, and marabou in a wide-profile, neutrally buoyant body that swims forward rather than bobbing. Derived from the Merkin and Tasty Toad lineage, it presents a large silhouette without excessive weight. Swing or strip slowly under feeding tarpon on a floating or clear intermediate line; a top Keys migratory pattern."
  },
  {
    "pattern_name": "The Usual",
    "originator": "Fish-Bones Fly Fishing (Grand Cayman)",
    "pattern_type": "shrimp",
    "image_url": "https://www.fish-bones.com/wp-content/uploads/2018/02/HotUsual-800px.jpg",
    "buy_url": "https://www.orvis.com/search?q=The+Usual",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=The+Usual",
    "target_species": [
      "bonefish"
    ],
    "regions": [
      "Cayman Islands"
    ],
    "description": "Fish-Bones Fly Fishing's signature Cayman bonefish pattern, derived from the Veverka Mantis Shrimp and featured in Dick Brown's Bonefish Fly Patterns. Tied with a tan craft-fur body, rubber legs, and small bead-chain eyes, it matches the mantis shrimp and snapping shrimp of Cayman turtle-grass flats. Fished on a short-twitch retrieve to bonefish rooting in the grass."
  },
  {
    "pattern_name": "Toad",
    "originator": "Tim Borski",
    "pattern_type": "shrimp",
    "image_url": "http://static1.squarespace.com/static/58c4d56b46c3c4e3b22e035c/58c4e1886a4963946ca1a2a5/590d4e00db29d6aee91b5c0e/1774535273304/Texas+Toad+-+Group+3+1500.jpg?format=1500w",
    "buy_url": "https://www.orvis.com/search?q=Toad",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Toad",
    "target_species": [
      "red drum",
      "speckled sea trout",
      "redfish",
      "snook",
      "tarpon",
      "spotted seatrout"
    ],
    "regions": [
      "Louisiana Marsh",
      "Texas Gulf Coast / Laguna Madre",
      "Mosquito Lagoon & Indian River Lagoon, FL",
      "South Carolina Lowcountry",
      "Georgia Lowcountry"
    ],
    "description": "The Texas Toad — also called the Redfish Toad or Louisiana Toad — uses layered craft fur and palmered hackle with rubber legs to create a large, slow-sinking profile that lands with minimal splash. Fished on ultra-shallow Gulf flats with short strips or a slow crawl. An essential sight-fishing pattern for tailing redfish and speckled trout across the entire Gulf Coast."
  },
  {
    "pattern_name": "Turneffe Crab",
    "originator": "",
    "pattern_type": "crab",
    "image_url": "https://www.saltwaterflies.com/turneffe_crab_olive_cream.jpg",
    "buy_url": "https://www.orvis.com/search?q=Turneffe+Crab",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Turneffe+Crab",
    "target_species": [
      "permit",
      "bonefish",
      "yellowmargin triggerfish",
      "titan triggerfish"
    ],
    "regions": [
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)",
      "Sudan / Nubian Flats (Red Sea)",
      "Honduras (Rio Sico / Mosquitia)"
    ],
    "description": "A sparse, flat-profile crab tied in olive-cream or tan with rubber legs and lead or bead-chain eyes. Craig Matthews' design uses minimal materials for a fast-sinking, realistic crab silhouette that lands quietly. Sized #2–#6 for permit on clear-water tailing flats in Belize and Yucatan. The sparse tie lets the rubber legs flutter naturally with almost no retrieve."
  },
  {
    "pattern_name": "Velcro Crab",
    "originator": "Winston Moore",
    "pattern_type": "crab",
    "image_url": "https://www.superflies.com/wp-content/uploads/2022/03/velcro-crab-tan-belly-orange-back-superflies_jpg.webp",
    "buy_url": "https://www.superflies.com/?s=Velcro+Crab",
    "buy_retailer": "Superflies",
    "library_url": "https://fishfly.ai/library/?q=Velcro+Crab",
    "target_species": [
      "permit",
      "bonefish",
      "redfish",
      "spotted seatrout"
    ],
    "regions": [
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Florida Keys (Lower & Middle Keys)",
      "Bimini, Bahamas",
      "South Carolina Lowcountry",
      "Georgia Lowcountry"
    ],
    "description": "Low-profile crab with a Velcro loop body that grips bottom debris, creating a convincing crab resting on the flat. Bead-chain eyes orient the hook up. Recommended by Orvis and Deep Water Cay for Bahamas permit; standard Keys technique is to let it settle on bottom and strip only when a permit tips down to feed."
  },
  {
    "pattern_name": "Veverka Mantis Shrimp",
    "originator": "Bob Veverka",
    "pattern_type": "mantis",
    "image_url": "https://www.saltwaterflies.com/veverkas_mantis.jpg",
    "buy_url": "https://www.orvis.com/search?q=Veverka+Mantis+Shrimp",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Veverka+Mantis+Shrimp",
    "target_species": [
      "bonefish",
      "permit"
    ],
    "regions": [
      "Jardines de la Reina, Cuba",
      "Andros, Bahamas",
      "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)",
      "Hawaii",
      "Los Roques, Venezuela",
      "Turks & Caicos",
      "Cayman Islands",
      "ABC Islands (Bonaire, Aruba, Curaçao)",
      "Cuba — Cayo Cruz / Cayo Largo"
    ],
    "description": "Bob Veverka's soft-landing mantis shrimp imitation, tied with bead-chain eyes (not lead) for a slow, quiet entry that won't spook shallow bonefish. The segmented, mottled body imitates the distinctive profile of mantis shrimp found on Bahamian and Cuban flats. Considered by multiple outfitters the top bonefish fly for Jardines de la Reina; equally effective on Andros and Abaco where fish are accustomed to seeing large shrimp and often refuse smaller patterns."
  },
  {
    "pattern_name": "Wahoo Needlefish",
    "originator": "",
    "pattern_type": "baitfish",
    "image_url": "https://cdn11.bigcommerce.com/s-yjvvzszzfj/images/stencil/500x659/products/16924/16715/ka-cudda-med__18648.1574359633.jpg?c=2",
    "buy_url": "https://www.orvis.com/search?q=Wahoo+Needlefish",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Wahoo+Needlefish",
    "target_species": [
      "Wahoo",
      "King mackerel",
      "Dogtooth tuna"
    ],
    "regions": [
      "Madagascar (Nosy Be)"
    ],
    "description": "Slim needlefish imitation 20–25 cm in white/silver built with EP fibers or mesh-tube body on 5/0–7/0 with wire bite tippet. Fished on 12-wt outfits with fast-sinking lines at Nosy Be's offshore FADs and seamount banks. Retrieved at high speed with fast 60 cm strips. Targets wahoo, king mackerel, and dogtooth tuna in current lines."
  },
  {
    "pattern_name": "Wayne's Milky Magic",
    "originator": "Wayne Haselau",
    "pattern_type": "attractor",
    "image_url": "https://bigtimeflies.com/cdn/shop/files/waynes-milky-magic.jpg?v=1742605664",
    "buy_url": "https://bigtimeflies.com/search?q=Wayne%27s+Milky+Magic",
    "buy_retailer": "BigTime Flies",
    "library_url": "https://fishfly.ai/library/?q=Wayne's+Milky+Magic",
    "target_species": [
      "milkfish"
    ],
    "regions": [
      "Christmas Island, Kiribati",
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)",
      "Sudan / Nubian Flats (Red Sea)",
      "Oman (Hallaniyat Islands)",
      "Australia — Cape York / Gulf of Carpentaria"
    ],
    "description": "Wayne Haselau's Alphonse Island milkfish fly tied with a chenille body that imitates crustacean egg sacs clinging to algae mats. Milkfish filter-feed on these sacs in tidal lagoons; the Milky Magic is dropped into the feeding lane and allowed to drift with the current on a long, light leader. One of the top-producing milkfish patterns across Seychelles and Christmas Island flats."
  },
  {
    "pattern_name": "Weapon of Mass Destruction (WMD)",
    "originator": "Alec Gerbec",
    "pattern_type": "shrimp",
    "image_url": "https://themissionflymag.com/wp-content/uploads/2023/07/WMD-tan-small.jpg",
    "buy_url": "https://www.orvis.com/search?q=Weapon+of+Mass+Destruction+%28WMD%29",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Weapon+of+Mass+Destruction+(WMD)",
    "target_species": [
      "yellowmargin triggerfish",
      "titan triggerfish",
      "Indo-Pacific permit"
    ],
    "regions": [
      "Seychelles (Alphonse, Astove, Cosmoledo, Providence)"
    ],
    "description": "Alec Gerbec's Seychelles shrimp pattern features a thin rubber tail, sparse synthetic fiber body, and bead-chain eyes on a wide-gap hook. Designed to provoke reaction strikes from trigger-sensitive yellowmargin and titan triggerfish on Alphonse and Cosmoledo flats. Fished with a dead-drop presentation followed by tiny twitches — the fly triggers hits while still sinking."
  },
  {
    "pattern_name": "Webster's Shrouser",
    "originator": "",
    "pattern_type": "shrimp",
    "image_url": "",
    "buy_url": "https://www.orvis.com/search?q=Webster%27s+Shrouser",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Webster's+Shrouser",
    "target_species": [
      "bonefish",
      "permit"
    ],
    "regions": [
      "Cuba — Cayo Cruz / Cayo Largo"
    ],
    "description": "Lead-eye shrimp-and-crab hybrid that sinks quickly for deeper mottled-flat presentations, specifically requested by Cayo Largo guide Frankie (All Points Fly Shop) for Cayo Cruz's permit and bonefish. The Shrouser's rubberleg action and mixed shrimp-crab silhouette is versatile enough for both species. Fished with a slow hand-twist retrieve or dead drift on slightly deeper Cuban permit flats."
  },
  {
    "pattern_name": "Whitlock's Sheep Fly",
    "originator": "Dave Whitlock",
    "pattern_type": "streamer",
    "image_url": "https://www.flyfisherman.com/files/2012/09/Sheep.gif",
    "buy_url": "https://www.orvis.com/search?q=Whitlock%27s+Sheep+Fly",
    "buy_retailer": "Orvis",
    "library_url": "https://fishfly.ai/library/?q=Whitlock's+Sheep+Fly",
    "target_species": [
      "snook",
      "tarpon"
    ],
    "regions": [
      "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)"
    ],
    "description": "Dave Whitlock's sheep-hair streamer uses the unique texture of sheep/ram wool to create a densely fibered but water-permeable body that pulses and breathes on the retrieve. The natural oils in the wool give it lifelike action. Used in Ascension Bay for subsurface snook presentations in mangrove channels, typically retrieved with slow, irregular strips along shaded edges."
  }
],
};
