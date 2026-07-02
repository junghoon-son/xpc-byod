"use client";

import { motion } from "motion/react";
import { Punchline, SlideShell } from "@/components/shell";

// Steps: 0 the parts list · 1 the kicker
export const COLOPHON_STEPS = 2;

const GROUPS: { label: string; items: string[] }[] = [
  {
    label: "this deck",
    items: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Motion",
      "lottie-react",
    ],
  },
  {
    label: "live charts",
    items: ["Vega-Lite", "vega-embed", "hand-drawn SVG (pies, scatter)"],
  },
  {
    label: "the analysis",
    items: ["Python", "Polars", "Altair", "Jupyter", "ggplot2 · R (cameo)"],
  },
  {
    label: "data",
    items: [
      "MTA Subway Wait Assessment 2015–2019 (data.ny.gov)",
      "Seattle weather (vega_datasets)",
    ],
  },
  {
    label: "references",
    items: [
      "Wilkinson — The Grammar of Graphics (1999)",
      "Python Polars: The Definitive Guide, ch. 7",
      "data-expressions.com (junghoon-son/data-expressions)",
      "r/nostalgia",
    ],
  },
  {
    label: "built with",
    items: ["Claude Code — the whole deck, vibecoded", "Playwright — every slide screenshot-verified"],
  },
];

export function ColophonSlide({ step }: { step: number }) {
  return (
    <SlideShell
      kicker="colophon"
      title="What this thing is actually made of"
    >
      <div className="flex h-full flex-col justify-center pb-[4vh]">
        <div className="space-y-[2.2vh]">
          {GROUPS.map((g, gi) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + gi * 0.14 }}
              className="grid grid-cols-[11em_1fr] items-baseline gap-[2vw]"
            >
              <div className="mono text-right text-[clamp(0.7rem,1.3vw,0.95rem)] uppercase tracking-widest text-[var(--accent)]">
                {g.label}
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="mono rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[clamp(0.68rem,1.3vw,0.92rem)] shadow-sm"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <Punchline show={step >= 1}>
          Lines of Python I wrote to build this JavaScript deck: zero. That’s
          the talk.
        </Punchline>
      </div>
    </SlideShell>
  );
}
