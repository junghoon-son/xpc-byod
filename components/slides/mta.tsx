"use client";

import { motion, AnimatePresence } from "motion/react";
import CodeBlock, { CodeLine } from "@/components/code-block";
import { SlideShell } from "@/components/shell";
import VegaChart from "@/components/vega-chart";

// Replays the MTA wait-assessment dashboard from
// data-expressions.com/personal-analysis/mta_fun.html, one spec at a time.
// Each step embeds the actual Vega-Lite spec that notebook cell produced.
export const MTA_STEPS = 7;

const LINES: CodeLine[] = [
  { text: "# 25 rows: name · line · color · rgb · src", step: 0 },
  { text: "picker = alt.Chart(trains).mark_image(", step: 0 },
  { text: '    width=20, height=20', step: 0 },
  { text: ').encode(x="name:N", y="color:N", url="src:N")', step: 0 },
  { text: '    + row=alt.Row("color:N",', step: 1 },
  { text: '        sort=["Red","Green","Purple","Blue","Orange"])', step: 1 },
  { text: "    + .axis(labels=False, ticks=False, grid=False)", step: 2 },
  { text: "", step: 2 },
  { text: 'select = alt.selection_point(fields=["line"])', step: 3 },
  { text: "picker = picker.add_params(select)  # clickable!", step: 3 },
  { text: "", step: 4 },
  { text: 'df = pl.read_csv("MTA_Subway_Wait_Assessment.csv")', step: 4 },
  { text: "lines = alt.Chart(df).mark_line(opacity=0.5).encode(", step: 4 },
  { text: '    x="yearmonth(month):T", y="wait assessment:Q",', step: 4 },
  { text: '    color=alt.condition(select, "line", "lightgray"),', step: 4 },
  { text: '    column="period:N")', step: 4 },
  { text: "scatter = alt.Chart(df).mark_circle().encode(", step: 5 },
  { text: '    x="num_sched_timepoints:Q",', step: 5 },
  { text: '    y="wait assessment:Q", color=..., column=...)', step: 5 },
  { text: "", step: 6 },
  { text: "final = picker | (lines & scatter)", step: 6 },
];

const CAPTIONS = [
  "mark_image — every train logo, plotted like data",
  "facet by color: small multiples for free",
  "declare the axes away — same spec, quieter",
  "one line of selection → click a train",
  "the real data: 5 years of wait assessment",
  "same selection, new view: wait vs. timepoints",
  "compose: picker | (lines & scatter) — linked, live",
];

export function MtaSlide({ step }: { step: number }) {
  return (
    <SlideShell
      kicker="case study · data-expressions.com"
      title={
        <>
          How a real chart grows:{" "}
          <span className="text-[var(--accent)]">the MTA dashboard</span>
        </>
      }
    >
      <div className="grid h-full grid-cols-[5fr_7fr] items-start gap-[2.5vw]">
        <div>
          <CodeBlock
            lines={LINES}
            step={step}
            accent="var(--dec)"
            label="mta_fun.ipynb — Altair, one decision at a time"
            fontSize="clamp(0.62rem, 1.15vw, 0.85rem)"
          />
        </div>
        <div className="flex h-full min-h-0 flex-col">
          <div className="mono mb-2 text-[clamp(0.7rem,1.3vw,0.9rem)] text-[var(--accent)]">
            step {step + 1}/7 — {CAPTIONS[step]}
          </div>
          <div
            className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-[var(--border)] bg-white p-4"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <VegaChart specIndex={step} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
