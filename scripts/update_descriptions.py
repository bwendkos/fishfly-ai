"""
Apply 7 description rewrites to weave originator into the description text,
plus fix Veverka's misspelled originator field.
"""
import json
from pathlib import Path

RESEARCH_DIR = Path("/home/vercel-sandbox/workspace/research")

UPDATES = {
    "Andino Deceiver": {
        "description": (
            "Bob Popovics and Jimmy Andino's large streamer with a distinctive "
            "muddler-style diving/pushing head and long feather tail, originally "
            "tied in Argentina to imitate river dorado baitfish. Crossed over to "
            "saltwater as a Baja roosterfish and jack crevalle pattern. Fast, "
            "erratic strips make the bulky head push water and create turbulence "
            "mimicking panicked baitfish."
        ),
    },
    "Bonefish Bitters": {
        "description": (
            "Craig Mathews' 1980s crab-shrimp hybrid with a low-riding, wide-bodied "
            "profile, rubber legs, and bead-chain eyes that keep the hook point "
            "riding up. Tied in tan, olive, and pink to match Caribbean flats forage. "
            "Sinks slowly into grass and can be twitched in place for tailing bonefish. "
            "Also effective on permit."
        ),
    },
    "Crystal Popper": {
        "description": (
            "Bob Popovics' hard-bodied cupped-face popper with a clear translucent "
            "body and crystal flash collar, producing a loud surface disruption on "
            "the strip. Used in Ascension Bay's back lagoons for snook, juvenile "
            "tarpon, and jack crevalle. Fast, aggressive strips with short pauses "
            "trigger savage surface strikes from predators hunting shallow mangrove "
            "systems."
        ),
    },
    "Flexo Crab": {
        "description": (
            "The InTheRiffle team's soft-body crab built around expandable mesh "
            "tubing (flexo mesh) over a weighted core, producing a realistic "
            "carapace that collapses and re-inflates on the sink. The top triggerfish "
            "pattern at Christmas Island and the Seychelles; also used for permit at "
            "Jardines de la Reina. Presented to feeding fish and allowed to free-sink, "
            "triggering inspection-and-eat responses."
        ),
    },
    "Kwan": {
        "description": (
            "Steve Farrar's hybrid shrimp-crab tied with craft fur and palmered "
            "hackle that lands with an ultra-soft splash ideal for spooky fish. "
            "Extremely slow sink rate suits the ultra-shallow Laguna Madre and "
            "Louisiana duck ponds. Present to tailing redfish and let it settle; "
            "hackle fibers flutter naturally without stripping. The defining Lower "
            "Laguna Madre sight-fishing pattern."
        ),
    },
    "Milkfish Snack": {
        "description": (
            "An algae and plankton imitation distributed by Umpqua Feather Merchants "
            "for Hawaii's surface-feeding milkfish (awa). Built with Krystal Flash "
            "and sheep's fleece to mimic floating algae mats. Near-neutral buoyancy "
            "keeps it in the feeding zone. Fished dead-drift or with minimal movement "
            "in harbor and bay feeding areas where awa school at the surface."
        ),
    },
    "Milky Dream": {
        "description": (
            "Arno Matthee's milkfish-specific algae imitation, tied in olive, green, "
            "and chartreuse with UV flash strands to mimic the copepod-rich algae mats "
            "milkfish filter feed on. One of a handful of proven milkfish patterns "
            "globally. Fished dead-drift or with the slowest possible strip in feeding "
            "lanes. Endorsed by Alphonse Fishing Co. for Seychelles milkfish."
        ),
    },
    # Fix the originator field (description already mentions Bob Veverka)
    "Veverka Mantis Shrimp": {
        "originator": "Bob Veverka",
    },
}


def main():
    with open(RESEARCH_DIR / "final_v2.json") as f:
        data = json.load(f)

    applied = []
    for p in data["patterns"]:
        upd = UPDATES.get(p["name"])
        if not upd:
            continue
        for field, value in upd.items():
            old = p.get(field, "")
            p[field] = value
            applied.append(f"  {p['name']:30s} | {field}: updated")

    with open(RESEARCH_DIR / "final_v2.json", "w") as f:
        json.dump(data, f, indent=2)

    print(f"Applied {len(applied)} field updates:")
    for line in applied:
        print(line)

    # Re-audit to confirm
    print("\n--- Re-audit ---")
    import re
    def name_tokens(originator):
        if not originator:
            return []
        s = re.sub(r"\([^)]*\)", "", originator).strip()
        s = re.sub(r"[,;]", " ", s)
        s = re.sub(r"\s+", " ", s).strip()
        parts = [p.strip() for p in s.split("/") if p.strip()]
        tokens = []
        for p in parts:
            words = p.split()
            if len(words) >= 2:
                tokens.append(words[-1])
            tokens.append(p)
        if "Puglisi" in originator:
            tokens.append("EP")
        return tokens

    missing = []
    for p in data["patterns"]:
        orig = p.get("originator")
        desc = p.get("description", "")
        if not orig:
            continue
        tokens = name_tokens(orig)
        if not any(t.lower() in desc.lower() for t in tokens):
            missing.append(p["name"])
    print(f"Patterns with originator missing from description: {len(missing)}")
    for n in missing:
        print(f"  - {n}")


if __name__ == "__main__":
    main()
