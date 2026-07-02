#!/bin/bash
# Download EPA AQS Daily Summary Data — Criteria Gases, 2015-2025.
# Ozone 44201, SO2 42401, CO 42101, NO2 42602.
set -u
BASE="https://aqs.epa.gov/aqsweb/airdata"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ZIPS="$ROOT/data/epa/zips"
CSVS="$ROOT/data/epa/csv"
mkdir -p "$ZIPS" "$CSVS"

fail=0
for code in 44201 42401 42101 42602; do
  for y in $(seq 2015 2025); do
    f="daily_${code}_${y}.zip"
    if [ -s "$ZIPS/$f" ]; then
      echo "skip  $f (already downloaded)"
    else
      echo "fetch $f"
      if ! curl -sS -f --retry 3 --retry-delay 5 -o "$ZIPS/$f" "$BASE/$f"; then
        echo "FAILED $f" >&2
        rm -f "$ZIPS/$f"
        fail=1
        continue
      fi
      sleep 1 # be polite to aqs.epa.gov
    fi
    unzip -oq "$ZIPS/$f" -d "$CSVS" && echo "ok    $f"
  done
done

echo "---"
ls "$CSVS" | wc -l | xargs echo "csv files extracted:"
exit $fail
