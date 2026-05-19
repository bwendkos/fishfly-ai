"""
Build the saltwater fly library webpage from final.json.
Writes a single self-contained HTML file with embedded data.
"""
import json
import html
from pathlib import Path

import os

RESEARCH_DIR = Path("/home/vercel-sandbox/workspace/research")
OUTPUT_FILE = Path(os.environ.get("OUTPUT_FILE", "/home/vercel-sandbox/workspace/fly_library.html"))
SOURCE_FILE = os.environ.get("SOURCE_FILE")  # If set, overrides default source resolution

# Region intro blurbs (brief species/destination context)
REGION_BLURBS = {
    "Andros, Bahamas": "The largest bonefish flats in the world. Wadable hard bottoms, mangrove creeks, and oceanside reefs hold huge bonefish, resident and migratory tarpon, permit, and barracuda.",
    "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)": "Out Island flats fish small to medium-bodied bonefish, often in skinny water and finicky moods. Long Island and Acklins are renowned for trophy bones and selective permit.",
    "Florida Keys (Lower & Middle Keys)": "The original saltwater laboratory. Migratory tarpon push through every spring; world-class permit on the oceanside flats; bonefish, barracuda, and mutton snapper round out the slam.",
    "Biscayne Bay & Everglades, FL": "Backcountry mosaic of mangrove creeks, basins, and coastal flats. Resident tarpon, snook in the rivers, redfish in the Everglades, plus bonefish and permit in Biscayne.",
    "Ambergris Caye & Turneffe, Belize": "The permit capital of the Caribbean. Atoll flats and reef edges produce permit, bonefish, baby and migratory tarpon, snook, and the legendary Grand Slam.",
    "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)": "Costa Maya paradise of clear flats, mangrove channels, and lagoons. Permit in big schools, bonefish, baby tarpon in the back, snook, and barracuda.",
    "Jardines de la Reina, Cuba": "Cuba's protected southern archipelago — pristine flats, untouched mangrove creeks, and offshore reefs. Migratory and resident tarpon, permit, bonefish, snapper, and cubera.",
    "Christmas Island, Kiribati": "Pacific atoll with vast white-sand flats. Massive numbers of bonefish, multiple trevally species (giant, bluefin, golden), triggerfish, milkfish, and wrasse.",
    "Seychelles (Alphonse, Astove, Cosmoledo, Providence)": "The GT mecca. Indian Ocean atolls produce giant trevally, Indo-Pacific permit, multiple triggerfish, milkfish, bumphead parrotfish, and trophy bonefish.",
    "Cape Cod & the Striper Coast (MA / RI / CT)": "The heartland of striped bass fly fishing. Beach, jetty, and boat fishing for stripers, bluefish, and the fall false albacore blitz.",
    "Montauk & Long Island Sound, NY": "Montauk Point — the East End's autumn mecca. Trophy striped bass, bluefish, an explosive false albacore run, and bonito.",
    "Outer Banks, NC": "Sandbars, inlets, and the Pamlico Sound. Winter trophy stripers, the Cape Lookout albie blitz, red drum on the sound flats, and offshore bluefin tuna on fly.",
    "Louisiana Marsh": "The Venice/Delacroix marsh. Bull redfish in skinny water, speckled trout in the cuts, black drum on oyster reefs — sight-fishing in brown-tea backcountry.",
    "Texas Gulf Coast / Laguna Madre": "Hyper-saline Lower Laguna Madre flats. Sight-cast redfish over turtle grass, tailing trout at first light, black drum, and lower-coast snook.",
    "Baja California Sur, Mexico": "From the East Cape to Magdalena Bay. Roosterfish from the beach, jack crevalle, sierra mackerel, dorado, sailfish offshore, and Mag Bay snook in the mangroves.",
    "Hawaii": "From Big Island lava reefs to Oahu's south-shore flats. Oio (bonefish — often 5lb+), ulua (giant trevally), papio (juvenile jacks), milkfish on reef edges, and the islands' distinctive mantis-shrimp-driven prey base.",
    "Costa Rica Pacific Coast": "The Pacific sailfish capital. Los Sueños and Quepos produce more sailfish releases than anywhere on earth — plus Pacific blue and black marlin, dorado, yellowfin tuna, massive roosterfish off the beach, and trophy Pacific snook.",
    "Los Roques, Venezuela": "Caribbean archipelago 90 miles north of Caracas — coral atoll with skinny flats, mangrove cays, and inshore basins. Notable for unusually large bonefish (5–8lb average), abundant permit, and resident and migratory tarpon.",
    # === Caribbean bonefish hubs (Phase species expansion) ===
    "Bimini, Bahamas": "The closest Bahamas island to Florida, 50 miles off Miami. North and South Bimini's deeper-edge flats hold larger-than-average bonefish, plus permit, barracuda, and migratory tarpon.",
    "Turks & Caicos": "Premier Caribbean flats — Providenciales' shallow banks, North and Middle Caicos creeks, and the vast Caicos Bank. Renowned for trophy bonefish (often 5–8lb+), permit, and DIY-friendly access.",
    "Cayman Islands": "Little Cayman has the best flats fishing in the Cayman group — wadable bonefish flats, occasional permit, and barracuda. Smaller bones on average than Bahamas, but plentiful and often spooky.",
    "ABC Islands (Bonaire, Aruba, Curaçao)": "Dutch Caribbean trio with a thriving DIY bonefish scene. Bonaire is the icon — wadable salinas hold large bonefish, with barracuda, jacks, and occasional tarpon rounding out the inshore options.",
    "Boca Paila & Sian Ka'an, Mexico": "South of Tulum in the UNESCO Sian Ka'an Biosphere — distinct from Ascension Bay to the south. Bonefish, permit, baby tarpon in the mangrove backcountry, snook, and barracuda.",
    # === Latin Caribbean tarpon/permit/snook ===
    "Costa Rica Caribbean (Tortuguero / Río Colorado)": "The original jungle-tarpon mecca. Río Colorado, Parismina, and the Tortuguero canals hold migratory and resident tarpon, plus trophy snook in the rivermouths.",
    "Nicaragua (Río San Juan)": "The Río San Juan / Río Indio system — staggering tarpon numbers and lightly pressured snook. Tarpon migrate from Lake Nicaragua to the Caribbean. Boutique, off the lodge circuit.",
    "Honduras (Rio Sico / Mosquitia)": "The Mosquitia coast — Honduras's underexplored north. Permit, tarpon, snook, and bonefish across coastal lagoons and rivermouths. Boutique expedition fishing.",
    "Bocas del Toro, Panama": "Caribbean-side Panama — Bocas del Toro archipelago. Tarpon, permit, snook, jack crevalle, and cubera snapper. Excellent under-the-radar Latin Caribbean destination.",
    "Cuba — Cayo Cruz / Cayo Largo": "Distinct from Jardines de la Reina. Cayo Cruz is famous for trophy bonefish (often 5lb+); Cayo Largo for permit. Both are protected fisheries reached via Avalon Cuba and Tortuga lodges.",
    # === Africa / Middle East GT ===
    "Sudan / Nubian Flats (Red Sea)": "The trigger Mecca. Pristine Red Sea atolls hold yellow margin and titan triggerfish, giant trevally, milkfish, and parrotfish. Operated by African Waters and Tourette Fishing.",
    "Oman (Hallaniyat Islands)": "Expedition-style fishery off Oman's southern coast. Massive GTs, queenfish, milkfish, and Indian Ocean species in a remote saltwater wilderness.",
    "Mozambique (Bazaruto Archipelago)": "African flats + offshore. Bazaruto's clear water holds GT, queenfish, kingfish, sailfish, and the occasional dogtooth tuna in deeper water.",
    # === Australasia GT ===
    "Australia — Exmouth / Ningaloo Reef": "WA's Ningaloo Reef — the most accessible Australian flats fishery. GT, queenfish, longtail tuna, mahi, golden trevally, and Indo-Pacific permit (rare). Beach-launch and skiff fishery.",
    "Australia — Cape York / Gulf of Carpentaria": "Tropical North Australia — Cape York peninsula and the Gulf of Carpentaria. GT, queenfish, threadfin salmon, and barramundi in the rivers. Remote, expedition-grade.",
    "Papua New Guinea (Bismarck Archipelago)": "New Britain and New Ireland — the world's hardest-fighting GTs, plus dogtooth tuna and Niugini black bass. Remote, lodge-only access.",
    "Indonesia (Raja Ampat)": "Raja Ampat archipelago — Indonesia's saltwater jewel. GT, dogtooth tuna, mangrove jack, and queenfish in pristine reef systems.",
    # === Niche / specialty ===
    "Gabón, West Africa": "Sette Cama, Loango, Iguela — the largest tarpon on Earth (regular fish over 250lb). Different subspecies than Caribbean tarpon. Heavyweight tackle and patterns required.",
    "Maldives": "Vast atoll system in the Indian Ocean. Bonefish, GT, milkfish, triggerfish, and dogtooth tuna across hundreds of atolls. Emerging Indo-Pacific destination.",
    "Rodrigues, Mauritius": "Standalone Indian Ocean island east of Mauritius. World-class flats — large bonefish, big GTs, Indo-Pacific permit, and milkfish. Operated by FlyCastaway.",
    "Madagascar (Nosy Be)": "Madagascar's NW coast — GT, queenfish, dogtooth tuna, sailfish, and the occasional tarpon. African Indian Ocean fly fishing in a remote setting.",
    "Solomon Islands": "Lightly pressured Pacific GT fishery. New Georgia Sound and the western Solomons hold GT, dogtooth tuna, mangrove jack, and queenfish.",
    # === SE US redfish/snook ===
    "Mosquito Lagoon & Indian River Lagoon, FL": "The clearest redfish water in North America. Sight-fishing for big schoolies and trophy reds on grass flats; speckled trout and snook in the cuts.",
    "South Carolina Lowcountry": "The ACE Basin and Charleston marshes. Tail fishing for redfish on flooding tides; schools of reds in the creeks at low tide. Drum territory.",
    "Georgia Lowcountry": "Sapelo, St. Simons, Jekyll. Massive marsh tides drain redfish into the creeks. Less pressure than SC, just-as-good reds. Warm-water marsh fishing.",
    "Tampa Bay & Sanibel, FL": "West Florida's snook and tarpon coast. Sanibel's beach tarpon in May/June, Tampa Bay's resident tarpon, and snook in the mangroves and beaches.",
}


def slugify(s: str) -> str:
    """Convert a region name to a URL-safe id."""
    return (
        s.lower()
        .replace(" & ", "-")
        .replace(", ", "-")
        .replace(" / ", "-")
        .replace(" (", "-")
        .replace(")", "")
        .replace(" ", "-")
        .replace("/", "-")
        .replace("--", "-")
        .replace("ó", "o")
        .replace("í", "i")
        .replace("á", "a")
        .replace("é", "e")
        .strip("-")
    )


import urllib.parse
from urllib.parse import urlparse

# Affiliate program config -- replace placeholder IDs once accounts are live.
AFFILIATE_IDS = {
    "orvis": None,        # e.g., "YOUR_ORVIS_AFFILIATE_ID"
    "amazon": None,       # e.g., "YOUR_AMAZON_TAG-20"
    "avantlink": None,    # e.g., "YOUR_AVANTLINK_ID"
}

# Retailer registry -- maps image-source domain(s) to retailer info.
# When an image came from one of these domains, the Buy button routes
# to that retailer's search rather than the Orvis fallback.
#
# search_url uses {q} as the placeholder for the URL-encoded pattern name.
#
# Most independent fly shops are on Shopify -- their search URL pattern
# is /search?q=... -- so the routing is consistent.
RETAILERS = {
    # Orvis (handles assets.orvis.com CDN images)
    "orvis.com": {
        "name": "Orvis",
        "search_url": "https://www.orvis.com/search?q={q}",
    },
    "assets.orvis.com": {
        "name": "Orvis",
        "search_url": "https://www.orvis.com/search?q={q}",
    },
    # Bear's Den
    "bearsden.com": {
        "name": "Bear's Den",
        "search_url": "https://bearsden.com/search?q={q}",
    },
    # Salt Fly Pro
    "saltflypro.com": {
        "name": "Salt Fly Pro",
        "search_url": "https://saltflypro.com/search?q={q}",
    },
    # Trident Fly Fishing
    "tridentflyfishing.com": {
        "name": "Trident Fly Fishing",
        "search_url": "https://www.tridentflyfishing.com/search?q={q}",
    },
    # Fulling Mill: REMOVED from registry -- their search is JS-only,
    # not URL-accessible. The 4 patterns whose images came from fullingmill
    # domains will fall back to Orvis search. Confirmed via browser session.
    # (US + UK domains both use the same JS search.)
    # Yellow Dog Flyfishing
    "yellowdogflyfishing.com": {
        "name": "Yellow Dog Flyfishing",
        "search_url": "https://www.yellowdogflyfishing.com/search?q={q}",
    },
    # Saltwater Edge
    "saltwateredge.com": {
        "name": "Saltwater Edge",
        "search_url": "https://saltwateredge.com/search?q={q}",
    },
    # Red's Fly Shop
    "redsflyfishing.com": {
        "name": "Red's Fly Shop",
        "search_url": "https://redsflyfishing.com/search?q={q}",
    },
    # The Fly Fishers: REMOVED -- search returns generic results page,
    # doesn't reliably surface our specific patterns. 3 affected patterns
    # fall back to Orvis search.
    # Big Y Fly Co
    "bigyflyco.com": {
        "name": "Big Y Fly Co",
        "search_url": "https://bigyflyco.com/search?q={q}",
    },
    # BigTime Flies
    "bigtimeflies.com": {
        "name": "BigTime Flies",
        "search_url": "https://bigtimeflies.com/search?q={q}",
    },
    # Flymen Fishing Company
    "flymenfishingcompany.com": {
        "name": "Flymen Fishing Company",
        "search_url": "https://flymenfishingcompany.com/search?q={q}",
    },
    # The Fly Shop: REMOVED -- no reliable URL-accessible search format.
    # Pattern routing for catalog.theflyshop.com images falls back to Orvis.
    # Custom Saltwater Flies
    "customsaltwaterflies.com": {
        "name": "Custom Saltwater Flies",
        "search_url": "https://www.customsaltwaterflies.com/search?q={q}",
    },
    # Jackson Hole Fly Company
    "jacksonholeflycompany.com": {
        "name": "Jackson Hole Fly Company",
        "search_url": "https://jacksonholeflycompany.com/search?q={q}",
    },
    # FeatherCraft
    "feather-craft.com": {
        "name": "FeatherCraft",
        "search_url": "https://www.feather-craft.com/search?q={q}",
    },
    # Charlie's Fly Box
    "charliesflybox.com": {
        "name": "Charlie's Fly Box",
        "search_url": "https://charliesflybox.com/search?q={q}",
    },
    # Fish Tales Fly Shop
    "fishtalesflyshop.com": {
        "name": "Fish Tales Fly Shop",
        "search_url": "https://www.fishtalesflyshop.com/search?q={q}",
    },
    # Ashland Fly Shop
    "ashlandflyshop.com": {
        "name": "Ashland Fly Shop",
        "search_url": "https://www.ashlandflyshop.com/search?q={q}",
    },
    # BaxterHouse Fly Fishing
    "baxterhouseflyfishing.com": {
        "name": "BaxterHouse Fly Fishing",
        "search_url": "https://baxterhouseflyfishing.com/search?q={q}",
    },
    # Cam Sigler: REMOVED -- no working search URL on his site.
    # The 1 pattern (Cam Sigler Mega Marlin Tube Fly) falls back to Orvis.
    # Alaska Fly Fishing Goods
    "alaskaflyfishinggoods.com": {
        "name": "Alaska Fly Fishing Goods",
        "search_url": "https://alaskaflyfishinggoods.com/?s={q}",  # WordPress
    },
    # Henry Cowen: REMOVED -- no reliable search URL.
    # 1 pattern (Cowen's Magnum Baitfish) falls back to Orvis.
    # Superflies (WordPress, uses /?s= not /search?q=)
    "superflies.com": {
        "name": "Superflies",
        "search_url": "https://www.superflies.com/?s={q}",
    },
    # Fin & Fire
    "finandfire.com": {
        "name": "Fin & Fire",
        "search_url": "https://www.finandfire.com/search?q={q}",
    },
    # Tackle Direct (BigCommerce, uses /search.php?search_query=)
    "tackledirect.com": {
        "name": "Tackle Direct",
        "search_url": "https://www.tackledirect.com/search.php?search_query={q}",
    },
    # Orlando Outfitters
    "orlandooutfitters.com": {
        "name": "Orlando Outfitters",
        "search_url": "https://orlandooutfitters.com/search?q={q}",
    },
    # North 40 Outfitters (WordPress, uses /?s=)
    "north40.com": {
        "name": "North 40 Outfitters",
        "search_url": "https://north40.com/?s={q}",
    },
    # Tie The Flies: REMOVED -- no reliable search URL.
    # 2 patterns (Stu Apte Tarpon Fly, Spawning Shrimp variant) fall back to Orvis.
}

# Domains that look like retailer CDNs but lack identifying info
# (cdn.shopify.com is shared by many shops, cdn11.bigcommerce.com same).
# Editorial/news sources also fall through to Orvis fallback.
# Patterns whose images came from these will route to Orvis search.


def find_retailer(image_url):
    """Return (key, retailer_dict) for the image source domain, or None."""
    if not image_url:
        return None
    try:
        domain = urlparse(image_url).netloc.lower()
    except Exception:
        return None
    if domain.startswith("www."):
        domain = domain[4:]
    if domain in RETAILERS:
        return domain, RETAILERS[domain]
    # Try parent domain (e.g., assets.orvis.com -> orvis.com)
    parts = domain.split(".")
    if len(parts) >= 2:
        parent = ".".join(parts[-2:])
        if parent in RETAILERS:
            return parent, RETAILERS[parent]
    return None

def build_buy_url(pattern_name, image_url=None):
    """Construct the 'Buy this Fly' destination URL + retailer name.

    Returns (url, retailer_name).

    SMART ROUTING:
    1. If the pattern's image came from a known retailer's domain
       (Bear's Den, Trident, Salt Fly Pro, Fulling Mill, Yellow Dog,
       Saltwater Edge, Red's, etc.), the Buy link routes to that
       retailer's search for the pattern name.
    2. Otherwise (CDN-shared shopify URLs, editorial sources, blogs,
       Wikipedia, YouTube), falls back to Orvis search.

    Affiliate tracking: when AFFILIATE_IDS[<retailer>] is set, the URL
    will include the retailer's tracking parameter automatically.
    """
    encoded = urllib.parse.quote_plus(pattern_name)
    match = find_retailer(image_url)
    if match:
        domain_key, retailer = match
        url = retailer["search_url"].format(q=encoded)
        retailer_name = retailer["name"]
    else:
        url = f"https://www.orvis.com/search?q={encoded}"
        retailer_name = "Orvis"

    # Append affiliate tracking when configured for the chosen retailer
    affiliate_key = "orvis" if retailer_name == "Orvis" else None
    # (Future: map specific retailers to their network keys -- avantlink, etc.)
    if affiliate_key and AFFILIATE_IDS.get(affiliate_key):
        sep = "&" if "?" in url else "?"
        url = f"{url}{sep}siteID={urllib.parse.quote(AFFILIATE_IDS[affiliate_key])}"
    return url, retailer_name


def build_cards(data):
    """Flatten patterns into a list of cards (one per region+pattern pair)."""
    cards = []
    for p in data["patterns"]:
        # Prefer image_source_url (the original remote URL) for retailer
        # routing -- the offline build sets image_url to a local path.
        retailer_signal_url = p.get("image_source_url") or p.get("image_url")
        buy_url, buy_retailer = build_buy_url(p["name"], retailer_signal_url)
        for usage in p["regional_usage"]:
            cards.append({
                "pattern_name": p["name"],
                "pattern_type": p.get("pattern_type") or "other",
                "originator": p.get("originator"),
                "description": p.get("description") or "",
                "image_url": p.get("image_url"),
                "buy_url": buy_url,
                "buy_retailer": buy_retailer,
                "region": usage["region"],
                "region_slug": slugify(usage["region"]),
                "target_species": usage.get("target_species", []),
                "iconic_to_region": usage.get("iconic_to_region", False),
                "notes": usage.get("notes", ""),
            })
    return cards


def main():
    # Resolve source file: env override -> v2 -> v1 fallback
    if SOURCE_FILE:
        source = Path(SOURCE_FILE)
    else:
        v2_path = RESEARCH_DIR / "final_v2.json"
        v1_path = RESEARCH_DIR / "final.json"
        source = v2_path if v2_path.exists() else v1_path
    with open(source) as f:
        data = json.load(f)
    print(f"Loaded data from: {source.name}")

    cards = build_cards(data)
    regions = data["regions"]

    # Build slug-augmented region list
    region_data = []
    for r in regions:
        region_data.append({
            "name": r["name"],
            "slug": slugify(r["name"]),
            "primary_species": r.get("primary_species", []),
            "blurb": REGION_BLURBS.get(r["name"], ""),
            "card_count": sum(1 for c in cards if c["region"] == r["name"]),
        })

    # Build species/type vocabularies for filter dropdowns
    all_species = sorted(set(s for c in cards for s in c["target_species"]))
    all_types = sorted(set(c["pattern_type"] for c in cards))

    # Stats
    n_patterns = data["meta"]["unique_patterns"]
    n_cards = data["meta"]["total_cards"]
    n_regions = data["meta"]["regions"]

    # Embed data as JSON in script
    embedded_data = json.dumps({
        "regions": region_data,
        "cards": cards,
        "species": all_species,
        "types": all_types,
    }, ensure_ascii=False)

    html_doc = build_html(embedded_data, n_patterns, n_cards, n_regions, region_data)

    OUTPUT_FILE.write_text(html_doc, encoding="utf-8")
    print(f"Wrote {OUTPUT_FILE}")
    print(f"  unique patterns: {n_patterns}")
    print(f"  total cards: {n_cards}")
    print(f"  regions: {n_regions}")
    print(f"  species in vocab: {len(all_species)}")
    print(f"  types in vocab: {len(all_types)}")
    print(f"  HTML size: {len(html_doc):,} bytes")


def build_html(embedded_data: str, n_patterns: int, n_cards: int, n_regions: int, region_data: list) -> str:
    """Construct the full HTML page."""

    # Pre-render region nav chips (server-side for instant display)
    region_chips = "\n".join(
        f'<a class="region-chip" href="#{r["slug"]}" data-region="{html.escape(r["name"])}">'
        f'<span class="region-chip-name">{html.escape(r["name"])}</span>'
        f'<span class="region-chip-count">{r["card_count"]}</span></a>'
        for r in region_data
    )

    # Pre-render region section anchors with placeholders for cards (filled by JS)
    region_sections = "\n".join(
        f'''<section class="region-section" id="{r["slug"]}" data-region="{html.escape(r["name"])}">
  <div class="region-header">
    <h2 class="region-name">{html.escape(r["name"])}</h2>
    <p class="region-blurb">{html.escape(r["blurb"])}</p>
    <div class="region-meta">
      <span class="region-card-count"><strong>{r["card_count"]}</strong> patterns</span>
      <span class="region-species">{html.escape(" · ".join(r["primary_species"][:8]))}</span>
    </div>
  </div>
  <div class="card-grid" data-region="{html.escape(r["name"])}"></div>
</section>'''
        for r in region_data
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>The Saltwater Fly Library — A Comprehensive Reference by Destination</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
* {{ box-sizing: border-box; margin: 0; padding: 0; }}

:root {{
  --bg: #f7f3ec;
  --bg-alt: #efe9df;
  --card-bg: #ffffff;
  --text: #1a1f2e;
  --text-soft: #4a5568;
  --text-muted: #8b8478;
  --accent: #1e3a5f;
  --accent-soft: #2a4d7a;
  --sand: #c89668;
  --sand-soft: #e8c9a3;
  --rust: #8b3a3a;
  --rule: #d8d2c4;
  --rule-soft: #e8e4dc;
  --shadow-sm: 0 1px 2px rgba(26, 31, 46, 0.04), 0 1px 1px rgba(26, 31, 46, 0.03);
  --shadow-md: 0 4px 12px rgba(26, 31, 46, 0.06), 0 2px 4px rgba(26, 31, 46, 0.04);
}}

html, body {{
  background: var(--bg);
  color: var(--text);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}}

.serif {{ font-family: "Playfair Display", Georgia, serif; }}

a {{ color: inherit; text-decoration: none; }}
a:hover {{ color: var(--accent); }}

/* --- HERO --- */
.hero {{
  padding: 96px 6vw 72px;
  text-align: center;
  border-bottom: 1px solid var(--rule);
  background:
    radial-gradient(ellipse at 30% 0%, rgba(200, 150, 104, 0.08), transparent 60%),
    radial-gradient(ellipse at 70% 100%, rgba(30, 58, 95, 0.06), transparent 60%);
}}
.hero-logo {{
  width: clamp(120px, 14vw, 180px);
  height: auto;
  margin: 0 auto 32px;
  display: block;
}}
.hero-eyebrow {{
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 24px;
}}
.hero-title {{
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(2.2rem, 5.5vw, 4.4rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: var(--text);
  margin-bottom: 20px;
  max-width: 1100px;
  margin-inline: auto;
}}
.hero-title em {{
  font-style: italic;
  color: var(--accent);
  font-weight: 500;
}}
.hero-subtitle {{
  font-family: "Playfair Display", Georgia, serif;
  font-style: italic;
  font-size: clamp(1.05rem, 2vw, 1.4rem);
  color: var(--text-soft);
  max-width: 720px;
  margin-inline: auto;
  margin-bottom: 32px;
}}
.hero-stats {{
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
  padding-top: 24px;
  border-top: 1px solid var(--rule-soft);
  max-width: 720px;
  margin-inline: auto;
}}
.hero-stat {{ text-align: center; }}
.hero-stat-num {{
  font-family: "Playfair Display", Georgia, serif;
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--accent);
  line-height: 1;
}}
.hero-stat-label {{
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 8px;
}}

/* --- FILTERS BAR --- */
.filters {{
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(247, 243, 236, 0.95);
  backdrop-filter: saturate(150%) blur(12px);
  -webkit-backdrop-filter: saturate(150%) blur(12px);
  border-bottom: 1px solid var(--rule);
  padding: 16px 4vw;
}}
.filters-inner {{
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr auto;
  gap: 12px;
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;
}}
.filter-input,
.filter-select {{
  font-family: inherit;
  font-size: 0.92rem;
  padding: 10px 14px;
  background: white;
  border: 1px solid var(--rule);
  border-radius: 6px;
  color: var(--text);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}}
.filter-input:focus,
.filter-select:focus {{
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
}}
.filter-clear {{
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-soft);
  background: none;
  border: 1px solid var(--rule);
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}}
.filter-clear:hover {{
  border-color: var(--accent);
  color: var(--accent);
}}
.filter-result-count {{
  grid-column: 1 / -1;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 4px;
}}

/* --- REGION NAV --- */
.region-nav {{
  background: var(--bg-alt);
  border-bottom: 1px solid var(--rule);
  padding: 14px 4vw;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
}}
.region-nav-inner {{
  display: inline-flex;
  gap: 8px;
  max-width: 1400px;
}}
.region-chip {{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.84rem;
  font-weight: 500;
  background: white;
  border: 1px solid var(--rule);
  color: var(--text-soft);
  transition: all 0.15s;
  flex-shrink: 0;
}}
.region-chip:hover,
.region-chip.active {{
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}}
.region-chip.dimmed {{
  opacity: 0.35;
}}
.region-chip-count {{
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
  color: inherit;
}}
.region-chip:hover .region-chip-count,
.region-chip.active .region-chip-count {{
  background: rgba(255, 255, 255, 0.18);
}}

/* --- REGION SECTIONS --- */
main {{
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 4vw 96px;
}}
.region-section {{
  margin-bottom: 80px;
  scroll-margin-top: 200px;
}}
.region-section.empty {{
  display: none;
}}
.region-header {{
  border-bottom: 1px solid var(--rule);
  padding-bottom: 28px;
  margin-bottom: 36px;
  max-width: 980px;
}}
.region-name {{
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 16px;
  color: var(--text);
}}
.region-name::before {{
  content: "";
  display: inline-block;
  width: 36px;
  height: 2px;
  background: var(--sand);
  margin-right: 18px;
  vertical-align: middle;
  margin-bottom: 10px;
}}
.region-blurb {{
  font-family: "Playfair Display", Georgia, serif;
  font-style: italic;
  font-size: 1.08rem;
  color: var(--text-soft);
  line-height: 1.55;
  margin-bottom: 18px;
  max-width: 720px;
}}
.region-meta {{
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.74rem;
  letter-spacing: 0.06em;
  color: var(--text-muted);
}}
.region-meta strong {{
  color: var(--accent);
  font-weight: 600;
}}
.region-species {{
  font-family: "Inter", sans-serif;
  font-size: 0.84rem;
  letter-spacing: 0;
  font-style: italic;
  color: var(--text-soft);
}}

/* --- CARD GRID --- */
.card-grid {{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}}
.card {{
  background: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}}
.card:hover {{
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}}
.card.hidden {{ display: none; }}
.card-image-wrap {{
  position: relative;
  aspect-ratio: 4 / 3;
  background: var(--bg-alt);
  overflow: hidden;
}}
.card-image-wrap.imageless {{
  background: linear-gradient(180deg, var(--bg-alt) 0%, #e8e1d3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}}
.card-silhouette {{
  width: 78%;
  max-width: 220px;
  height: auto;
  display: block;
}}
.card-guide-badge {{
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--sand);
  color: white;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 3px;
  font-weight: 500;
}}
.card-guide-intro {{
  font-family: "Playfair Display", Georgia, serif;
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.86rem;
  line-height: 1.5;
  margin-bottom: 12px;
  display: block;
}}
.card-image {{
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: var(--bg-alt);
}}
.card-image.error {{
  object-fit: contain;
  padding: 24px;
  opacity: 0.4;
}}
.card-iconic {{
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--rust);
  color: white;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 3px;
  font-weight: 500;
}}
.card-type {{
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--accent);
  font-family: "JetBrains Mono", monospace;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 3px;
  font-weight: 500;
  backdrop-filter: blur(4px);
}}
.card-body {{
  padding: 20px 22px 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}}
.card-name {{
  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.32rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--text);
  margin-bottom: 6px;
}}
.card-originator {{
  font-family: "Playfair Display", Georgia, serif;
  font-style: italic;
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 14px;
}}
.card-description {{
  font-size: 0.91rem;
  line-height: 1.55;
  color: var(--text-soft);
  margin-bottom: 16px;
  flex: 1;
}}
.card-species {{
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 14px;
  border-top: 1px dashed var(--rule);
}}
.card-buy-link {{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.74rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  padding: 10px 14px;
  background: var(--bg);
  border: 1px solid var(--rule);
  border-radius: 4px;
  margin-top: 14px;
  transition: all 0.18s;
  text-decoration: none;
}}
.card-buy-link::after {{
  content: "→";
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  letter-spacing: 0;
  transition: transform 0.18s;
}}
.card-buy-link:hover {{
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}}
.card-buy-link:hover::after {{
  transform: translateX(3px);
}}
.affiliate-disclosure {{
  max-width: 720px;
  margin: 24px auto 0;
  padding: 16px 20px;
  background: var(--bg-alt);
  border: 1px solid var(--rule-soft);
  border-radius: 6px;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--text-soft);
  text-align: center;
}}
.affiliate-disclosure strong {{
  color: var(--text);
  font-weight: 600;
}}
.species-tag {{
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  padding: 3px 8px;
  background: var(--bg);
  color: var(--accent);
  border-radius: 3px;
  letter-spacing: 0.04em;
}}
.species-tag-label {{
  font-family: "JetBrains Mono", monospace;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-right: 4px;
  align-self: center;
}}

/* --- EMPTY STATE --- */
.no-results {{
  text-align: center;
  padding: 80px 4vw;
  display: none;
}}
.no-results.show {{ display: block; }}
.no-results-title {{
  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.6rem;
  margin-bottom: 12px;
  color: var(--text);
}}
.no-results-text {{
  color: var(--text-soft);
  font-size: 0.95rem;
}}

/* --- FOOTER --- */
footer {{
  border-top: 1px solid var(--rule);
  padding: 48px 4vw 64px;
  text-align: center;
  font-size: 0.84rem;
  color: var(--text-muted);
  background: var(--bg-alt);
}}
.footer-title {{
  font-family: "Playfair Display", Georgia, serif;
  font-style: italic;
  font-size: 1.1rem;
  color: var(--text-soft);
  margin-bottom: 8px;
}}
.footer-meta {{
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {{
  .filters-inner {{
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }}
  .filter-input {{ grid-column: 1 / -1; }}
  .filter-clear {{ grid-column: 1 / -1; }}
  .hero {{ padding: 64px 6vw 48px; }}
  .hero-stats {{ gap: 28px; }}
  .region-section {{ margin-bottom: 56px; }}
}}
</style>
</head>
<body>

<!-- HERO -->
<header class="hero">
  <svg class="hero-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="The Saltwater Fly Library logo">
    <circle cx="100" cy="100" r="92" stroke="#c89668" stroke-width="4" fill="none"/>
    <circle cx="100" cy="100" r="74" stroke="#1e3a5f" stroke-width="2.2" fill="none"/>
    <g fill="#c89668">
      <polygon points="100,8 92,30 100,24 108,30"/>
      <polygon points="192,100 170,92 176,100 170,108"/>
      <polygon points="100,192 108,170 100,176 92,170"/>
      <polygon points="8,100 30,108 24,100 30,92"/>
      <polygon points="100,28 96,38 100,35 104,38" transform="rotate(45 100 100)"/>
      <polygon points="100,28 96,38 100,35 104,38" transform="rotate(135 100 100)"/>
      <polygon points="100,28 96,38 100,35 104,38" transform="rotate(225 100 100)"/>
      <polygon points="100,28 96,38 100,35 104,38" transform="rotate(315 100 100)"/>
    </g>
    <text x="100" y="20" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1" font-weight="700" fill="#c89668" text-anchor="middle">N</text>
    <text x="183" y="104" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1" font-weight="700" fill="#c89668" text-anchor="middle">E</text>
    <text x="100" y="195" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1" font-weight="700" fill="#c89668" text-anchor="middle">S</text>
    <text x="17" y="104" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1" font-weight="700" fill="#c89668" text-anchor="middle">W</text>
    <path d="M 40 134 Q 60 126 80 134 T 120 134 T 160 134" stroke="#1e3a5f" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    <g transform="translate(0,-12) translate(106,100) scale(1.2) translate(-106,-100)" stroke="#1e3a5f" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 70 100 a 4.5 4.5 0 1 1 0.1 0" stroke-width="3"/>
      <path d="M 74 100 L 122 100" stroke-width="3.2"/>
      <path d="M 122 100 Q 135 101 137 114 Q 135 126 120 127 Q 107 125 112 112" stroke-width="3.2"/>
      <g stroke-width="1.2"><path d="M 82 86 L 82 114"/><path d="M 85 83 L 85 117"/><path d="M 88 82 L 88 118"/><path d="M 91 83 L 91 117"/><path d="M 94 86 L 94 114"/></g>
      <g stroke-width="1.2" opacity="0.95"><path d="M 94 91 Q 120 86 144 84"/><path d="M 94 95 Q 120 90 146 92"/><path d="M 94 100 Q 120 96 144 102"/><path d="M 94 104 Q 120 100 138 108"/></g>
      <ellipse cx="76" cy="100" rx="3.5" ry="2.2" stroke-width="2"/>
    </g>
  </svg>
  <div class="hero-eyebrow">A Reference Library</div>
  <h1 class="hero-title">The Saltwater <em>Fly</em> Library</h1>
  <p class="hero-subtitle">A comprehensive catalog of saltwater fly patterns, organized by the destinations that made them — from the Bahamas to the Bismarck, the Lowcountry to the Nubian Flats.</p>
  <div class="hero-stats">
    <div class="hero-stat">
      <div class="hero-stat-num">{n_patterns}</div>
      <div class="hero-stat-label">Unique Patterns</div>
    </div>
    <div class="hero-stat">
      <div class="hero-stat-num">{n_regions}</div>
      <div class="hero-stat-label">Destinations</div>
    </div>
    <div class="hero-stat">
      <div class="hero-stat-num">{n_cards}</div>
      <div class="hero-stat-label">Pattern–Region Cards</div>
    </div>
  </div>
</header>

<!-- FILTERS -->
<div class="filters">
  <div class="filters-inner">
    <input id="search" class="filter-input" type="text" placeholder="Search by pattern or species…" autocomplete="off">
    <select id="filter-region" class="filter-select"><option value="">All regions</option></select>
    <select id="filter-species" class="filter-select"><option value="">All species</option></select>
    <select id="filter-type" class="filter-select"><option value="">All pattern types</option></select>
    <button id="filter-clear" class="filter-clear">Clear</button>
    <div id="result-count" class="filter-result-count"></div>
  </div>
</div>

<!-- REGION NAV -->
<nav class="region-nav">
  <div class="region-nav-inner">
    {region_chips}
  </div>
</nav>

<!-- REGION SECTIONS -->
<main>
{region_sections}
<div class="no-results" id="no-results">
  <h2 class="no-results-title">No matching patterns</h2>
  <p class="no-results-text">Try clearing a filter or broadening your search.</p>
</div>
</main>

<footer>
  <div class="affiliate-disclosure">
    <strong>About "Buy this Fly" links:</strong> these currently redirect to retailer search results for verification. Once affiliate program signups complete, these will become tracked affiliate links and we may earn a small commission on qualifying purchases at no additional cost to you.
  </div>
  <div class="footer-title" style="margin-top: 32px;">"Match the bait, mind the tide, mind the wind."</div>
  <div class="footer-meta">{n_patterns} unique patterns · {n_regions} destinations · {n_cards} regional cards</div>
</footer>

<script>
const DATA = {embedded_data};

// --- Render cards into region grids ---
function renderAllCards() {{
  const cardsByRegion = {{}};
  for (const card of DATA.cards) {{
    if (!cardsByRegion[card.region]) cardsByRegion[card.region] = [];
    cardsByRegion[card.region].push(card);
  }}
  for (const region of DATA.regions) {{
    const grid = document.querySelector(`.card-grid[data-region="${{cssEscape(region.name)}}"]`);
    if (!grid) continue;
    const cards = cardsByRegion[region.name] || [];
    grid.innerHTML = cards.map(renderCard).join("");
  }}
}}

function cssEscape(s) {{
  return s.replace(/"/g, '\\\\"');
}}

function escapeHtml(s) {{
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}}

// SVG silhouette used for cards with no public photo (the same Compass logo)
const IMAGELESS_SILHOUETTE = `<svg class="card-silhouette" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Library mark — guide pattern placeholder"><circle cx="100" cy="100" r="92" stroke="#c89668" stroke-width="4" fill="none"/><circle cx="100" cy="100" r="74" stroke="#1e3a5f" stroke-width="2.2" fill="none"/><g fill="#c89668"><polygon points="100,8 92,30 100,24 108,30"/><polygon points="192,100 170,92 176,100 170,108"/><polygon points="100,192 108,170 100,176 92,170"/><polygon points="8,100 30,108 24,100 30,92"/><polygon points="100,28 96,38 100,35 104,38" transform="rotate(45 100 100)"/><polygon points="100,28 96,38 100,35 104,38" transform="rotate(135 100 100)"/><polygon points="100,28 96,38 100,35 104,38" transform="rotate(225 100 100)"/><polygon points="100,28 96,38 100,35 104,38" transform="rotate(315 100 100)"/></g><text x="100" y="20" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1" font-weight="700" fill="#c89668" text-anchor="middle">N</text><text x="183" y="104" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1" font-weight="700" fill="#c89668" text-anchor="middle">E</text><text x="100" y="195" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1" font-weight="700" fill="#c89668" text-anchor="middle">S</text><text x="17" y="104" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1" font-weight="700" fill="#c89668" text-anchor="middle">W</text><path d="M 40 134 Q 60 126 80 134 T 120 134 T 160 134" stroke="#1e3a5f" stroke-width="2.2" stroke-linecap="round" fill="none"/><g transform="translate(0,-12) translate(106,100) scale(1.2) translate(-106,-100)" stroke="#1e3a5f" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M 70 100 a 4.5 4.5 0 1 1 0.1 0" stroke-width="3"/><path d="M 74 100 L 122 100" stroke-width="3.2"/><path d="M 122 100 Q 135 101 137 114 Q 135 126 120 127 Q 107 125 112 112" stroke-width="3.2"/><g stroke-width="1.2"><path d="M 82 86 L 82 114"/><path d="M 85 83 L 85 117"/><path d="M 88 82 L 88 118"/><path d="M 91 83 L 91 117"/><path d="M 94 86 L 94 114"/></g><g stroke-width="1.2" opacity="0.95"><path d="M 94 91 Q 120 86 144 84"/><path d="M 94 95 Q 120 90 146 92"/><path d="M 94 100 Q 120 96 144 102"/><path d="M 94 104 Q 120 100 138 108"/></g><ellipse cx="76" cy="100" rx="3.5" ry="2.2" stroke-width="2"/></g></svg>`;

const IMAGELESS_INTRO = "No public photo of this pattern exists \\u2014 it's tied locally. Ask at the destination and a guide will show you the real thing.";

function renderCard(card) {{
  const isImageless = !card.image_url;
  const iconic = card.iconic_to_region
    ? `<div class="card-iconic">Iconic Here</div>` : "";
  const typeLabel = card.pattern_type
    ? `<div class="card-type">${{escapeHtml(card.pattern_type)}}</div>` : "";
  const species = card.target_species.map(s =>
    `<span class="species-tag">${{escapeHtml(s)}}</span>`
  ).join("");
  const originator = card.originator
    ? `<div class="card-originator">by ${{escapeHtml(card.originator)}}</div>`
    : `<div class="card-originator">Origin unknown</div>`;
  const buyLink = card.buy_url
    ? `<a class="card-buy-link" href="${{escapeHtml(card.buy_url)}}" target="_blank" rel="noopener noreferrer sponsored">Buy this Fly at ${{escapeHtml(card.buy_retailer || 'Orvis')}}</a>`
    : "";

  // Image area: real photo OR silhouette + Guide Pattern badge
  const imageAreaInner = card.image_url
    ? `<img class="card-image" src="${{escapeHtml(card.image_url)}}" alt="${{escapeHtml(card.pattern_name)}}" loading="lazy" onerror="this.classList.add('error');this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 64 64\\'><path fill=\\'%23999\\' d=\\'M32 8a8 8 0 100 16 8 8 0 000-16zm-3 22h6c8 0 12 4 12 12v6H17v-6c0-8 4-12 12-12z\\'/></svg>';">`
    : IMAGELESS_SILHOUETTE;
  const guideBadge = isImageless
    ? `<div class="card-guide-badge">Guide Pattern</div>` : "";
  const imageWrapClass = isImageless ? "card-image-wrap imageless" : "card-image-wrap";

  // Description: prepend the "no photo" intro for imageless cards
  const descriptionInner = isImageless
    ? `<em class="card-guide-intro">${{escapeHtml(IMAGELESS_INTRO)}}</em>${{escapeHtml(card.description)}}`
    : escapeHtml(card.description);

  return `
    <article class="card" data-name="${{escapeHtml(card.pattern_name.toLowerCase())}}" data-originator="${{escapeHtml((card.originator||'').toLowerCase())}}" data-description="${{escapeHtml(card.description.toLowerCase())}}" data-region="${{escapeHtml(card.region)}}" data-species="${{escapeHtml(card.target_species.join('|').toLowerCase())}}" data-type="${{escapeHtml(card.pattern_type)}}">
      <div class="${{imageWrapClass}}">
        ${{imageAreaInner}}
        ${{guideBadge || iconic}}
        ${{typeLabel}}
      </div>
      <div class="card-body">
        <h3 class="card-name">${{escapeHtml(card.pattern_name)}}</h3>
        ${{originator}}
        <p class="card-description">${{descriptionInner}}</p>
        <div class="card-species">
          <span class="species-tag-label">Targets</span>${{species}}
        </div>
        ${{buyLink}}
      </div>
    </article>`;
}}

// --- Populate filter dropdowns ---
function populateFilters() {{
  const region = document.getElementById("filter-region");
  for (const r of DATA.regions) {{
    const o = document.createElement("option");
    o.value = r.name;
    o.textContent = r.name;
    region.appendChild(o);
  }}
  const species = document.getElementById("filter-species");
  for (const s of DATA.species) {{
    const o = document.createElement("option");
    o.value = s;
    o.textContent = s;
    species.appendChild(o);
  }}
  const type = document.getElementById("filter-type");
  for (const t of DATA.types) {{
    const o = document.createElement("option");
    o.value = t;
    o.textContent = t;
    type.appendChild(o);
  }}
}}

// --- Filtering ---
const filters = {{
  search: "",
  region: "",
  species: "",
  type: "",
}};

function applyFilters() {{
  const search = filters.search.trim().toLowerCase();
  const region = filters.region;
  const species = filters.species.toLowerCase();
  const type = filters.type;

  const cards = document.querySelectorAll(".card");
  let visible = 0;
  const visibleByRegion = {{}};

  cards.forEach(card => {{
    const cardRegion = card.dataset.region;
    let show = true;

    if (region && cardRegion !== region) show = false;
    if (show && type && card.dataset.type !== type) show = false;
    if (show && species && !card.dataset.species.includes(species)) show = false;
    if (show && search) {{
      // Search matches pattern name and target species only --
      // originator credits live in the description text.
      const haystack = card.dataset.name + " " + card.dataset.species;
      if (!haystack.includes(search)) show = false;
    }}

    card.classList.toggle("hidden", !show);
    if (show) {{
      visible += 1;
      visibleByRegion[cardRegion] = (visibleByRegion[cardRegion] || 0) + 1;
    }}
  }});

  // Hide region sections with zero visible cards
  document.querySelectorAll(".region-section").forEach(s => {{
    const n = visibleByRegion[s.dataset.region] || 0;
    s.classList.toggle("empty", n === 0);
  }});

  // Dim region chips for empty regions
  document.querySelectorAll(".region-chip").forEach(c => {{
    const n = visibleByRegion[c.dataset.region] || 0;
    c.classList.toggle("dimmed", n === 0);
  }});

  // No results state
  document.getElementById("no-results").classList.toggle("show", visible === 0);

  // Result count
  const total = DATA.cards.length;
  const hasFilter = search || region || species || type;
  document.getElementById("result-count").textContent =
    hasFilter
      ? `Showing ${{visible}} of ${{total}} cards`
      : `${{total}} cards across ${{DATA.regions.length}} destinations`;
}}

// --- Wire up events ---
function bindEvents() {{
  const search = document.getElementById("search");
  let searchTimer;
  search.addEventListener("input", e => {{
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {{
      filters.search = e.target.value;
      applyFilters();
    }}, 120);
  }});
  document.getElementById("filter-region").addEventListener("change", e => {{
    filters.region = e.target.value;
    applyFilters();
  }});
  document.getElementById("filter-species").addEventListener("change", e => {{
    filters.species = e.target.value;
    applyFilters();
  }});
  document.getElementById("filter-type").addEventListener("change", e => {{
    filters.type = e.target.value;
    applyFilters();
  }});
  document.getElementById("filter-clear").addEventListener("click", () => {{
    filters.search = "";
    filters.region = "";
    filters.species = "";
    filters.type = "";
    document.getElementById("search").value = "";
    document.getElementById("filter-region").value = "";
    document.getElementById("filter-species").value = "";
    document.getElementById("filter-type").value = "";
    applyFilters();
  }});
}}

// --- Region nav active highlighting on scroll ---
function bindRegionNavObserver() {{
  const sections = document.querySelectorAll(".region-section");
  const chips = document.querySelectorAll(".region-chip");
  const observer = new IntersectionObserver(entries => {{
    entries.forEach(entry => {{
      if (entry.isIntersecting) {{
        const id = entry.target.id;
        chips.forEach(c => {{
          c.classList.toggle("active", c.getAttribute("href") === "#" + id);
        }});
      }}
    }});
  }}, {{ rootMargin: "-200px 0px -60% 0px", threshold: 0 }});
  sections.forEach(s => observer.observe(s));
}}

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {{
  renderAllCards();
  populateFilters();
  bindEvents();
  bindRegionNavObserver();
  applyFilters();
}});
</script>
</body>
</html>
"""


if __name__ == "__main__":
    main()
