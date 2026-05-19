"""
Finalize v3: take final_v2.json + v3_slice_*_results.json and produce final_v3.json
with all patterns having image + description.

After this, build_page.py will pick up final_v2.json (which we'll overwrite with v3).
"""
import json
from pathlib import Path

RESEARCH_DIR = Path("/home/vercel-sandbox/workspace/research")


def main():
    with open(RESEARCH_DIR / "final_v2.json") as f:
        master = json.load(f)

    # Load 3 slice results
    enriched = {}
    for slice_name in ["v3_slice_1_results.json", "v3_slice_2_results.json", "v3_slice_3_results.json"]:
        path = RESEARCH_DIR / slice_name
        if not path.exists():
            print(f"WARNING: missing {slice_name}")
            continue
        with open(path) as f:
            data = json.load(f)
        for p in data.get("patterns", []):
            enriched[p["name"]] = p

    print(f"Loaded {len(enriched)} enriched pattern results")

    # Apply enrichment to net-new patterns
    no_image = []
    no_description = []
    enriched_count = 0
    not_matched = []
    for p in master["patterns"]:
        if not p.get("is_new"):
            continue
        e = enriched.get(p["name"])
        if not e:
            not_matched.append(p["name"])
            continue
        p["description"] = e.get("description")
        p["image_url"] = e.get("image_url")
        p["image_source"] = e.get("image_source")
        if not p["image_url"]:
            no_image.append(p["name"])
        if not p["description"]:
            no_description.append(p["name"])
        enriched_count += 1

    print(f"\n=== ENRICHMENT APPLIED ===")
    print(f"Patterns enriched: {enriched_count}")
    print(f"No image: {len(no_image)}")
    print(f"No description: {len(no_description)}")
    if not_matched:
        print(f"\nPatterns missing from slice results (NAME MISMATCH):")
        for n in not_matched:
            print(f"  - {n}")
    if no_image:
        print(f"\nPatterns missing images:")
        for n in no_image:
            print(f"  - {n}")

    # Strip is_new flag and any helper fields
    for p in master["patterns"]:
        p.pop("is_new", None)
        p.pop("_source", None)

    # Recompute meta
    master["meta"] = {
        "unique_patterns": len(master["patterns"]),
        "total_cards": sum(len(p["regional_usage"]) for p in master["patterns"]),
        "regions": len(master["regions"]),
        "patterns_with_images": sum(1 for p in master["patterns"] if p.get("image_url")),
        "patterns_with_descriptions": sum(1 for p in master["patterns"] if p.get("description")),
    }

    print(f"\n=== FINAL META ===")
    print(json.dumps(master["meta"], indent=2))

    with open(RESEARCH_DIR / "final_v2.json", "w") as f:
        json.dump(master, f, indent=2)
    print(f"\nUpdated {RESEARCH_DIR / 'final_v2.json'}")


if __name__ == "__main__":
    main()
