"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import CodeBlock, { CodeLine } from "@/components/code-block";
import Scatter from "@/components/scatter";
import { Punchline, Reveal, SlideShell } from "@/components/shell";

// Steps: 0 spec · 1 chart pops · 2 ggplot2 twin · 3 punchline · 4 the book
export const DECLARATIVE_STEPS = 5;

const LINES: CodeLine[] = [
  { text: "alt.Chart(df).mark_circle().encode(" },
  { text: '    x="temp_max",' },
  { text: '    y="wind",' },
  { text: ")" },
];

const GGPLOT_LINES: CodeLine[] = [
  { text: "ggplot(df, aes(x = temp_max, y = wind)) +" },
  { text: "  geom_point()" },
];

export function DeclarativeSlide({ step }: { step: number }) {
  const settled = useRef(step > 0).current;
  return (
    <SlideShell
      kicker="how it became"
      title={
        <>
          Declarative:{" "}
          <em className="text-[var(--dec)]">say what, not how</em>
        </>
      }
    >
      <div className="grid h-full grid-cols-2 items-center gap-[3vw] pb-[4vh]">
        <div>
          <div className="mb-2 flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/altair.png" alt="Altair" className="h-8 w-auto" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/python.png" alt="Python" className="h-7 w-auto" />
            <span className="mono text-xs uppercase tracking-widest text-[var(--muted)]">
              Altair · Python
            </span>
          </div>
          <motion.div
            className="rounded-xl"
            animate={{
              boxShadow:
                step === 0
                  ? [
                      "0 0 0 0px rgba(14,122,95,0)",
                      "0 0 0 8px rgba(14,122,95,0.22)",
                      "0 0 0 0px rgba(14,122,95,0)",
                    ]
                  : "0 0 0 0px rgba(14,122,95,0)",
            }}
            transition={
              step === 0
                ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          >
            <CodeBlock
              lines={LINES}
              accent="var(--dec)"
              label="chart.py — Altair (from the Polars book, ch. 7)"
              fontSize="clamp(0.85rem, 1.8vw, 1.15rem)"
            />
          </motion.div>
          <Reveal show={step >= 2} className="mt-5">
            <div className="mb-2 flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/ggplot2.png" alt="ggplot2" className="h-8 w-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/r.png" alt="R" className="h-6 w-auto" />
              <span className="mono text-xs uppercase tracking-widest text-[var(--muted)]">
                ggplot2 · R
              </span>
              <span className="mono ml-2 text-xs text-[var(--dec)]">
                ≡ same grammar
              </span>
            </div>
            <CodeBlock
              lines={GGPLOT_LINES}
              accent="var(--dec)"
              label="chart.R — ggplot2"
              labelColor="#43c79d"
              fontSize="clamp(0.8rem, 1.6vw, 1.05rem)"
            />
          </Reveal>
          <Punchline show={step >= 3}>
            GenAI lets you <em>declare what you want</em> — in English.
          </Punchline>
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-[3vh]">
          {step >= 1 ? (
            <motion.div
              className="rounded-xl"
              animate={{
                boxShadow: [
                  "0 0 0 0px rgba(58,164,220,0)",
                  "0 0 0 10px rgba(58,164,220,0.2)",
                  "0 0 0 0px rgba(58,164,220,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Scatter
                frame
                dots
                axes
                labels
                pop
                instant={settled}
                width={560}
              />
            </motion.div>
          ) : (
            <div className="flex h-[60%] w-full items-center justify-center rounded-xl border border-dashed border-[var(--border)] text-[var(--muted)] italic">
              press → and watch it arrive whole
            </div>
          )}
          {step >= 4 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 16 }}
              className="max-w-[30em] text-center text-[clamp(0.85rem,1.5vw,1.1rem)] italic text-[var(--muted)]"
            >
              And it’s not a 2020s idea — Wilkinson’s{" "}
              <em>Grammar of Graphics</em> (1999) begat ggplot2, Vega-Lite, and
              Altair. Charts have been specs for 25 years.
            </motion.p>
          )}
        </div>
      </div>
    </SlideShell>
  );
}
