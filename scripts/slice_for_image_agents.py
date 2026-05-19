"""
Slice the 123 unique patterns into 5 buckets for parallel image-sourcing + description writing.
Each bucket gets ~25 patterns. Output: research/slice_1.json ... slice_5.json
"""
import json
from pathlib import Path

RESEARCH_DIR = Path("/home/vercel-sandbox/workspace/research")
N_BUCKETS = 5

with open(RESEARCH_DIR / "master_dedup.json") as f:
    master = json.load(f)

patterns = master["patterns"]
total = len(patterns)
print(f"Slicing {total} patterns into {N_BUCKETS} buckets...")

# Round-robin distribution to balance variety across buckets
buckets = [[] for _ in range(N_BUCKETS)]
for i, p in enumerate(patterns):
    buckets[i % N_BUCKETS].append(p)

for i, bucket in enumerate(buckets, 1):
    out = {
        "slice_id": i,
        "pattern_count": len(bucket),
        "patterns": bucket,
    }
    out_path = RESEARCH_DIR / f"slice_{i}.json"
    with open(out_path, "w") as f:
        json.dump(out, f, indent=2)
    print(f"  slice_{i}.json: {len(bucket)} patterns")
print("Done.")
