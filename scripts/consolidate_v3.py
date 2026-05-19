"""
Consolidation v3: merge species-focused expansion research into existing 141-pattern library.

Inputs:
- research/final_v2.json (current state — 141 patterns, 16 regions)
- research/expansion_*.json (6 new cluster files)
- research/image_overrides.json (existing manual upgrades)

Output:
- research/final_v2.json (updated in place — new master with all patterns + regions)
- research/new_patterns_to_enrich_v2.json — net-new patterns needing image + description
"""
import glob
import json
import re
from pathlib import Path

RESEARCH_DIR = Path("/home/vercel-sandbox/workspace/research")

# Same alias map as before, plus a few likely new ones
ALIASES = {
    "Avalon Permit Fly": ["Avalon", "Avalon Shrimp"],
    "Borski Slider": ["Borski Bonefish Slider"],
    "Clouser Deep Minnow": ["Clouser Minnow"],
    "Del Brown's Permit Fly (Merkin)": ["Del's Merkin", "Merkin Crab Fly"],
    "Gartside Gurgler": ["Gurgler"],
    "Hollow Fleye": ["Popovics Hollow Fleye"],
    "McVay Gotcha": ["Gotcha"],
    "Needlefish": ["Needle Fish"],
    "Spoon Fly": ["Spoonfly"],
    "Veverka Mantis Shrimp": ["Ververka Mantis Shrimp", "Veverka's Mantis Shrimp"],
    "EP Mullet": ["EP Roosterfish Mullet"],
}


def normalize_name(name: str) -> str:
    n = name.lower().strip()
    n = re.sub(r"\s*\(.*?\)\s*", "", n)
    n = re.sub(r"[\s\-_'`]+", " ", n)
    n = re.sub(r"[^\w\s]", "", n)
    n = re.sub(r"\s+", " ", n).strip()
    n = re.sub(r"^the\s+", "", n)
    return n


def build_canonical_lookup():
    lookup = {}
    for canonical, variants in ALIASES.items():
        for variant in variants:
            lookup[variant] = canonical
            lookup[normalize_name(variant)] = canonical
    return lookup


def main():
    with open(RESEARCH_DIR / "final_v2.json") as f:
        master = json.load(f)
    canon_lookup = build_canonical_lookup()

    def resolve_canonical(name):
        if name in canon_lookup:
            return canon_lookup[name]
        norm = normalize_name(name)
        if norm in canon_lookup:
            return canon_lookup[norm]
        return name

    # Index existing patterns by canonical name
    patterns_by_name = {}
    norm_to_canonical = {}
    for p in master["patterns"]:
        canonical = resolve_canonical(p["name"])
        # patterns_by_name should preserve all existing fields
        existing_record = {
            "name": canonical,
            "originator": p.get("originator"),
            "pattern_type": p.get("pattern_type"),
            "description": p.get("description"),
            "image_url": p.get("image_url"),
            "image_source_url": p.get("image_source_url"),
            "image_source": p.get("image_source"),
            "regional_usage": list(p.get("regional_usage", [])),
            "is_new": False,
        }
        patterns_by_name[canonical] = existing_record
        norm_to_canonical[normalize_name(canonical)] = canonical

    # Track existing regions
    region_names = {r["name"] for r in master["regions"]}
    all_regions = list(master["regions"])

    # Load expansion files
    expansion_files = sorted(glob.glob(str(RESEARCH_DIR / "expansion_*.json")))
    # Skip the original expansion_gaps.json which was already processed in v2
    expansion_files = [f for f in expansion_files if Path(f).name != "expansion_gaps.json"]
    print(f"Loading {len(expansion_files)} expansion files:")
    for f in expansion_files:
        print(f"  - {Path(f).name}")

    # Track which expansion files are NEW (post-v2): only the ones listed below
    NEW_EXPANSION_FILES = {
        "expansion_caribbean_bonefish.json",
        "expansion_latin_caribbean.json",
        "expansion_africa_me.json",
        "expansion_australasia.json",
        "expansion_niche.json",
        "expansion_se_us.json",
    }
    new_expansion_files = [f for f in expansion_files if Path(f).name in NEW_EXPANSION_FILES]
    print(f"\nProcessing {len(new_expansion_files)} new expansion files (skipping pre-v2 ones)")

    for filepath in new_expansion_files:
        with open(filepath) as f:
            cluster = json.load(f)
        print(f"\n=== Processing {Path(filepath).name} ({cluster.get('cluster', 'unknown')}) ===")
        for region_block in cluster.get("regions", []):
            # Subagents inconsistent: some use "name", some use "region"
            r_name = region_block.get("name") or region_block.get("region")
            if not r_name:
                print(f"  WARNING: skipping region block with no name field")
                continue
            if r_name not in region_names:
                all_regions.append({
                    "name": r_name,
                    "primary_species": region_block.get("primary_species", []),
                })
                region_names.add(r_name)
                print(f"  + Registered new region: {r_name}")
            new_p_count = 0
            existing_p_count = 0
            for p in region_block.get("patterns", []):
                # Patterns may also use "name" or "pattern" / "fly_name"
                p_name = p.get("name") or p.get("pattern") or p.get("fly_name")
                if not p_name:
                    continue
                p["name"] = p_name  # normalize for downstream use
                canonical = resolve_canonical(p_name)
                if canonical not in patterns_by_name:
                    norm = normalize_name(canonical)
                    if norm in norm_to_canonical:
                        canonical = norm_to_canonical[norm]
                if canonical not in patterns_by_name:
                    # Net-new pattern
                    patterns_by_name[canonical] = {
                        "name": canonical,
                        "originator": p.get("originator"),
                        "pattern_type": p.get("pattern_type"),
                        "description": None,
                        "image_url": None,
                        "image_source_url": None,
                        "image_source": None,
                        "regional_usage": [],
                        "is_new": True,
                    }
                    norm_to_canonical[normalize_name(canonical)] = canonical
                    new_p_count += 1
                else:
                    existing_p_count += 1

                existing = patterns_by_name[canonical]
                # Fill missing originator / pattern_type
                if not existing.get("originator") and p.get("originator"):
                    existing["originator"] = p["originator"]
                if not existing.get("pattern_type") and p.get("pattern_type"):
                    existing["pattern_type"] = p["pattern_type"]

                # Add or update regional_usage
                same = next((u for u in existing["regional_usage"] if u["region"] == r_name), None)
                if same:
                    species_set = set(same.get("target_species", []) + p.get("target_species", []))
                    same["target_species"] = sorted(species_set)
                    same["iconic_to_region"] = same.get("iconic_to_region", False) or p.get("iconic_to_region", False)
                else:
                    existing["regional_usage"].append({
                        "region": r_name,
                        "target_species": p.get("target_species", []),
                        "iconic_to_region": p.get("iconic_to_region", False),
                        "notes": p.get("notes", ""),
                    })
            print(f"  {r_name}: {new_p_count} net-new + {existing_p_count} existing = {new_p_count + existing_p_count} total")

    # Compute stats
    patterns = sorted(patterns_by_name.values(), key=lambda p: p["name"].lower())
    new_patterns = [p for p in patterns if p.get("is_new")]
    total_cards = sum(len(p["regional_usage"]) for p in patterns)

    print(f"\n=== CONSOLIDATION V3 RESULTS ===")
    print(f"Total regions: {len(all_regions)}")
    print(f"Total unique patterns: {len(patterns)}")
    print(f"  Existing (with image + description): {len(patterns) - len(new_patterns)}")
    print(f"  Net-new (need image + description): {len(new_patterns)}")
    print(f"Total card placements: {total_cards}")

    # Per-region card counts
    from collections import defaultdict
    region_counts = defaultdict(int)
    for p in patterns:
        for u in p["regional_usage"]:
            region_counts[u["region"]] += 1
    print(f"\n=== PATTERNS PER REGION ===")
    for r in all_regions:
        print(f"  {r['name']}: {region_counts.get(r['name'], 0)}")

    print(f"\n=== NEW PATTERNS TO ENRICH ===")
    for p in new_patterns:
        print(f"  - {p['name']:50s} | {p.get('pattern_type','?')}")

    # Write back to final_v2.json (updated state)
    master_out = {
        "meta": {
            "unique_patterns": len(patterns),
            "total_cards": total_cards,
            "regions": len(all_regions),
            "patterns_with_images": sum(1 for p in patterns if p.get("image_url") and not p.get("is_new")),
            "patterns_with_descriptions": sum(1 for p in patterns if p.get("description") and not p.get("is_new")),
        },
        "regions": all_regions,
        "patterns": patterns,
    }
    with open(RESEARCH_DIR / "final_v2.json", "w") as f:
        json.dump(master_out, f, indent=2)
    print(f"\nUpdated {RESEARCH_DIR / 'final_v2.json'}")

    # Slim file for next subagent batch
    new_slim = {
        "patterns": [
            {
                "name": p["name"],
                "originator": p.get("originator"),
                "pattern_type": p.get("pattern_type"),
                "regional_usage": p["regional_usage"],
            }
            for p in new_patterns
        ]
    }
    with open(RESEARCH_DIR / "new_patterns_to_enrich_v2.json", "w") as f:
        json.dump(new_slim, f, indent=2)
    print(f"Wrote {RESEARCH_DIR / 'new_patterns_to_enrich_v2.json'} ({len(new_patterns)} patterns)")


if __name__ == "__main__":
    main()
