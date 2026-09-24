"use client";

import { useEffect, useState } from "react";
import { Punchline, Reveal, SlideShell } from "@/components/shell";
import VegaChart from "@/components/vega-chart";

// Steps: 0 screenshot · 1 caption · 2 punchline · 3 actually analyze it
export const RECEIPTS_STEPS = 4;

const GAS_COLORS = ["#2b93cd", "#c14a33", "#0e7a5f", "#7c5cb8"];

function analysisSpec(rows: unknown[]): Record<string, unknown> {
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: "container",
    height: 300,
    data: { values: rows },
    encoding: {
      x: {
        field: "year",
        type: "ordinal",
        axis: { title: null, labelAngle: 0 },
      },
    },
    layer: [
      {
        mark: { type: "rule", color: "#a8b0b9", strokeDash: [4, 4] },
        encoding: { y: { datum: 100 } },
      },
      {
        mark: { type: "line", point: true, strokeWidth: 2.5 },
        encoding: {
          y: {
            field: "index",
            type: "quantitative",
            title: "national mean · 2015 = 100",
            scale: { zero: false },
          },
          color: {
            field: "gas",
            type: "nominal",
            scale: { domain: ["Ozone", "NO2", "SO2", "CO"], range: GAS_COLORS },
            legend: { title: null, orient: "top" },
          },
          tooltip: [
            { field: "gas" },
            { field: "year" },
            { field: "mean", title: "raw mean" },
            { field: "index", title: "index" },
          ],
        },
      },
    ],
    config: {
      view: { stroke: null },
      font: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    },
  };
}

function LiveAnalysis() {
  const [rows, setRows] = useState<unknown[] | null>(null);
  useEffect(() => {
    fetch("/epa-annual.json")
      .then((r) => r.json())
      .then(setRows)
      .catch(() => setRows([]));
  }, []);
  if (!rows) return null;
  return <VegaChart spec={analysisSpec(rows)} maxScale={1} />;
}

export function ReceiptsSlide({ step }: { step: number }) {
  if (step >= 3) {
    return (
      <SlideShell
        kicker="receipts · so let’s actually analyze it"
        title="11,098,089 rows, one question"
      >
        <div className="grid h-full grid-cols-[7fr_5fr] items-center gap-[2.5vw]">
          <div
            className="h-full min-h-0 rounded-xl border border-[var(--border)] bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <LiveAnalysis />
          </div>
          <div className="space-y-4">
            <p className="text-[clamp(0.95rem,1.8vw,1.3rem)] leading-relaxed">
              “Plot the national mean of each criteria gas by year, indexed to
              2015 — is the air getting cleaner?”
            </p>
            <ul className="space-y-2 text-[clamp(0.85rem,1.6vw,1.15rem)]">
              <li>
                <strong className="text-[#0e7a5f]">SO₂ −44%</strong> · scrubbers
                and coal retirement
              </li>
              <li>
                <strong style={{ color: "#c14a33" }}>NO₂ −16%</strong>,{" "}
                <strong style={{ color: "#7c5cb8" }}>CO −19%</strong> · cleaner
                tailpipes
              </li>
              <li>
                <strong className="text-[#2b93cd]">Ozone +9%</strong> · the
                stubborn one
              </li>
            </ul>
            <p className="mono text-[clamp(0.6rem,1.1vw,0.78rem)] text-[var(--muted)]">
              2015 – Nov 2025 · 44 files → one Parquet → one Altair sentence.
              (2025 partial; ozone is seasonal.)
            </p>
          </div>
        </div>
      </SlideShell>
    );
  }
  return (
    <SlideShell kicker="receipts" title="This slide ordered its own data">
      <div className="grid h-full grid-cols-[1.5fr_1fr] items-start gap-[2.5vw]">
        <div className="overflow-hidden rounded-xl border border-[var(--border)] shadow-[0_2px_20px_rgba(26,25,21,0.14)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/declarative-proof.png"
            alt="Screenshot: asking Claude, mid-build, to download and combine 11 years of EPA criteria-gas daily summaries — in one English sentence"
            className="block max-h-[62vh] w-full object-contain object-top"
          />
        </div>
        <div className="pt-[1vh]">
          <Reveal show={step >= 1}>
            <p className="text-[clamp(0.95rem,1.8vw,1.3rem)] leading-relaxed">
              Mid-build of this very deck, one sentence in English:{" "}
              <em>
                “download the EPA Daily Summary Data, Criteria Gases,
                2015–2025 — save it, extract each, combine it for analysis.”
              </em>
            </p>
            <p className="mt-4 text-[clamp(0.85rem,1.5vw,1.1rem)] italic text-[var(--muted)]">
              44 files · 4 gases · 11 years · 11,098,089 rows → one Parquet,
              fetched and assembled in the background while the slides kept
              building. No scraper written. No schema studied first.
            </p>
          </Reveal>
          <Punchline show={step >= 2}>
            That’s a declarative pipeline. The spec was a sentence.
          </Punchline>
        </div>
      </div>
    </SlideShell>
  );
}
