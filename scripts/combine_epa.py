"""Combine the extracted EPA daily-summary CSVs into one Parquet for analysis."""

from pathlib import Path

import polars as pl

ROOT = Path(__file__).resolve().parent.parent
CSV_DIR = ROOT / "data" / "epa" / "csv"
OUT = ROOT / "data" / "epa" / "daily_criteria_gases_2015_2025.parquet"

GASES = {
    "44201": "Ozone",
    "42401": "SO2",
    "42101": "CO",
    "42602": "NO2",
}

files = sorted(CSV_DIR.glob("daily_*.csv"))
if not files:
    raise SystemExit(f"no CSVs found in {CSV_DIR} — run fetch_epa.sh first")

frames = []
for f in files:
    lf = pl.scan_csv(f, infer_schema_length=0)  # read all as strings, cast once below
    frames.append(lf)

combined = (
    pl.concat(frames, how="vertical")
    .with_columns(
        pl.col("Date Local").str.to_date(),
        pl.col("Arithmetic Mean").cast(pl.Float64, strict=False),
        pl.col("1st Max Value").cast(pl.Float64, strict=False),
        pl.col("AQI").cast(pl.Int64, strict=False),
        pl.col("Observation Count").cast(pl.Int64, strict=False),
        pl.col("Observation Percent").cast(pl.Float64, strict=False),
        pl.col("Latitude").cast(pl.Float64, strict=False),
        pl.col("Longitude").cast(pl.Float64, strict=False),
    )
    .with_columns(
        pl.col("Parameter Code")
        .replace_strict(GASES, default="other")
        .alias("gas")
    )
)

combined.sink_parquet(OUT, compression="zstd")

# Quick sanity summary.
df = pl.scan_parquet(OUT)
summary = (
    df.group_by("gas", pl.col("Date Local").dt.year().alias("year"))
    .agg(pl.len().alias("rows"))
    .sort("gas", "year")
    .collect()
)
total = summary["rows"].sum()
print(summary.to_pandas().to_string(index=False))
print(f"\ntotal rows: {total:,}")
print(f"wrote {OUT} ({OUT.stat().st_size / 1e6:.1f} MB)")
