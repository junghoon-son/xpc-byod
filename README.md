# Working with Data in the Age of GenAI

A ~10-minute slide deck on how analytics work changed — imperative →
declarative → English — built as a Next.js app with step-through animations,
in XPC branding.

The centerpiece: an animated matplotlib-style chart assembled step by step
(imperative) next to an Altair spec whose chart arrives whole (declarative),
using the same Seattle-weather example as the live demo notebook
(`07_Data_Visualization.ipynb`, ch. 7 of *Python Polars: The Definitive
Guide*).

## Presenting

```bash
npm install
npm run dev
```

| Key | Action |
| --- | --- |
| `→` `↓` `Space` / click | next step (then next slide) |
| `←` `↑` / right-click | previous step |
| `f` | fullscreen |
| `Home` / `End` | first / last slide |

The URL hash tracks position (`#slide.step`), so a refresh — or sharing a
link — lands on the exact build step. Editing the hash jumps directly.

## Slides

1. Title — Working with Data in the Age of GenAI
2. Two ways to ask for a chart
3. **Imperative** — matplotlib, chart assembled step by step
4. **Declarative** — Altair spec, chart arrives whole (+ Grammar of Graphics)
5. Side by side — 8 lines vs. 3 decisions
6. Same shift upstream — hand-rolled ETL vs. dbt
7. **English** — prompt typed into a zsh/cmux terminal, styled chart out
8. Intermission — the most accurate pie chart ever
9. Even "knowing the libraries" stopped being the job (Python → SQL + JS)
10. "That's frosting" — the polish work that became free
11. Wiggle room — under-specify on purpose
12. Receipts — the deck ordered its own data (EPA screenshot)
13. Live demo pointer → `07_Data_Visualization.ipynb`
14. Takeaways
15. End

## Deploying to Vercel

```bash
npx vercel        # preview
npx vercel --prod # production
```

No configuration needed — it's a static Next.js app, no env vars, no APIs.

## Utilities

```bash
# screenshot every slide (at its final step) into ./shots for a visual pass
npm run dev &
node scripts/screenshot.mjs http://localhost:3000
```

## EPA data (for the BYOD demo)

`data/` is gitignored. To rebuild the combined dataset — EPA AQS Daily
Summary, Criteria Gases (Ozone 44201, SO₂ 42401, CO 42101, NO₂ 42602),
2015–2025:

```bash
bash scripts/fetch_epa.sh        # 44 zips from aqs.epa.gov → extract CSVs
python3 scripts/combine_epa.py   # → data/epa/daily_criteria_gases_2015_2025.parquet
```

Result: 11,098,089 rows, ~60 MB Parquet (zstd), with a `gas` column and
typed date/measure columns, ready for Polars:

```python
import polars as pl
df = pl.scan_parquet("data/epa/daily_criteria_gases_2015_2025.parquet")
```
