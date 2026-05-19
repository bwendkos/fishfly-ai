"""
Export final_v2.json as a CSV with one row per region-pattern card.

Columns:
- pattern_name
- originator
- pattern_type
- description
- region
- target_species (semicolon-delimited)
- iconic_to_region (true/false)
- regional_notes
- image_url
- image_source
"""
import csv
import json
from pathlib import Path

RESEARCH_DIR = Path("/home/vercel-sandbox/workspace/research")
OUT = Path("/home/vercel-sandbox/workspace/saltwater_fly_library.csv")


def main():
    with open(RESEARCH_DIR / "final_v2.json") as f:
        data = json.load(f)

    rows = []
    for p in data["patterns"]:
        for u in p["regional_usage"]:
            rows.append({
                "pattern_name": p["name"],
                "originator": p.get("originator") or "",
                "pattern_type": p.get("pattern_type") or "",
                "description": p.get("description") or "",
                "region": u["region"],
                "target_species": "; ".join(u.get("target_species", [])),
                "iconic_to_region": str(bool(u.get("iconic_to_region", False))).lower(),
                "regional_notes": u.get("notes", ""),
                "image_url": p.get("image_url") or "",
                "image_source": p.get("image_source") or "",
            })

    # Sort by region, then pattern name for readability
    rows.sort(key=lambda r: (r["region"], r["pattern_name"].lower()))

    fieldnames = [
        "pattern_name",
        "originator",
        "pattern_type",
        "description",
        "region",
        "target_species",
        "iconic_to_region",
        "regional_notes",
        "image_url",
        "image_source",
    ]

    with open(OUT, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)

    print(f"Wrote {OUT}")
    print(f"  rows: {len(rows)}")
    print(f"  columns: {len(fieldnames)}")
    # File size
    size = OUT.stat().st_size
    print(f"  file size: {size:,} bytes ({size / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
