"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import CodeBlock, { CodeLine } from "@/components/code-block";
import Scatter from "@/components/scatter";
import { Connector, SlideShell } from "@/components/shell";

// Steps: 0 intro · 1 canvas · 2 dots · 3 axes · 4 labels · 5 title/done · 6 punchline
export const IMPERATIVE_STEPS = 7;

const LINES: CodeLine[] = [
  { text: "import matplotlib.pyplot as plt" },
  { text: "" },
  { text: "fig, ax = plt.subplots()              # a blank window", step: 1 },
  { text: 'ax.scatter(df["temp_max"], df["wind"])  # every dot', step: 2 },
  { text: "ax.set_xlim(0, 40)                    # axis ranges…", step: 3 },
  { text: "ax.set_ylim(0, 12)                    # …by hand", step: 3 },
  { text: 'ax.set_xlabel("Max temperature (°C)") # label by hand', step: 4 },
  { text: 'ax.set_ylabel("Wind (m/s)")', step: 4 },
  { text: 'ax.set_title("Wind vs. Max Temperature")', step: 5 },
  { text: "plt.show()", step: 5 },
];

const CAPTIONS = [
  "the old way: you are the rendering engine’s manager",
  "ask for a blank canvas. Nothing on it yet.",
  "place every dot. You picked the coordinates.",
  "pin the axis ranges yourself. Get them wrong and the chart lies.",
  "label the axes. Yes, manually. Every time.",
  "title it, show it. ~10 lines of how for one chart.",
  "title it, show it. ~10 lines of how for one chart.",
];

export function ImperativeSlide({ step }: { step: number }) {
  // Mounted mid-slide = the presenter stepped backwards into this slide;
  // skip the build animation and show the settled state.
  const settled = useRef(step > 0).current;
  const n = Math.min(step, 5);
  return (
    <SlideShell
      kicker="how it was"
      title={
        <>
          Imperative: <em className="text-[var(--imp)]">every step is yours</em>
        </>
      }
    >
      <div className="flex h-full flex-col gap-[2vh] pb-[5vh]">
        {/* step indicator */}
        <div className="flex items-baseline gap-4">
          <span className="mono whitespace-nowrap text-[clamp(1.1rem,2.2vw,1.6rem)] font-bold uppercase tracking-wide text-[var(--imp)]">
            {n >= 1 ? `Step ${n} / 5` : "Step 0"}
          </span>
          <span className="text-[clamp(0.95rem,1.8vw,1.25rem)] italic text-[var(--muted)]">
            {CAPTIONS[Math.min(step, CAPTIONS.length - 1)]}
          </span>
        </div>

        {/* code | connector | chart — side by side */}
        <div className="grid min-h-0 flex-1 grid-cols-[1.05fr_4vw_1fr] items-center gap-[1vw]">
          <CodeBlock
            lines={LINES}
            step={step}
            accent="var(--imp)"
            label="chart.py — matplotlib"
            fontSize="clamp(0.8rem, 1.55vw, 1.05rem)"
          />
          <Connector show={step >= 1} color="var(--imp)" />
          <div className="flex h-full min-h-0 items-center justify-center">
            <Scatter
              frame={step >= 1}
              dots={step >= 2}
              axes={step >= 3}
              labels={step >= 4}
              title={step >= 5}
              instant={settled}
              width={640}
            />
          </div>
        </div>

      </div>

      {/* step 6: the card pyramid drops in */}
      {step >= 6 && (
        <motion.div
          initial={settled ? false : { opacity: 0, scale: 0.6, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center"
        >
          <div className="rounded-2xl bg-white/95 px-[3vw] py-[3vh] shadow-[0_30px_80px_rgba(32,38,44,0.35)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              initial={settled ? false : { rotate: -3 }}
              animate={{ rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              src="/card-pyramid.png"
              alt="A pyramid built from playing cards"
              className="mx-auto h-[46vh] w-auto"
            />
            <p className="mt-[2vh] text-center text-[clamp(1.1rem,2.2vw,1.6rem)] font-semibold text-[var(--accent)]">
              It’s like building a card pyramid
            </p>
          </div>
        </motion.div>
      )}
    </SlideShell>
  );
}
