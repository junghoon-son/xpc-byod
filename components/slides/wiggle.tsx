"use client";

import { Punchline, Reveal, SlideShell } from "@/components/shell";

// Steps: 0 over-specified · 1 goal-level · 2 punchline · 3 wobble footnote
export const WIGGLE_STEPS = 4;

export function WiggleSlide({ step }: { step: number }) {
  return (
    <SlideShell
      kicker="prompting like it's declarative"
      title="Leave wiggle room — it’s where the learning is"
    >
      <div className="grid grid-cols-2 gap-[3vw]">
        <Reveal show={step >= 0}>
          <div className="h-full rounded-xl border border-[#e5cfc7] bg-[#faf1ec] p-[1.8vw]">
            <div className="mono mb-3 text-xs uppercase tracking-widest text-[var(--imp)]">
              over-specified (imperative prompting)
            </div>
            <p className="mono text-[clamp(0.72rem,1.35vw,0.95rem)] leading-relaxed text-[#5a4a44]">
              “Use Altair. mark_circle, size 60, opacity 0.5, color #4C78A8.
              Width 640, height 380. Font 12pt. X axis 0–40 with ticks every
              10. Legend top-right. Do not add a title…”
            </p>
            <p className="mt-4 text-[clamp(0.85rem,1.5vw,1.1rem)] italic text-[var(--muted)]">
              You get exactly what you already knew. Nothing more.
            </p>
          </div>
        </Reveal>
        <Reveal show={step >= 1}>
          <div className="h-full rounded-xl border border-[#c8ddd5] bg-[#eef5f1] p-[1.8vw]">
            <div className="mono mb-3 text-xs uppercase tracking-widest text-[var(--dec)]">
              goal-level (declarative prompting)
            </div>
            <p className="text-[clamp(0.95rem,1.9vw,1.35rem)] leading-relaxed">
              “Is wind related to temperature here? Pick whatever chart makes
              it clearest.”
            </p>
            <p className="mt-4 text-[clamp(0.85rem,1.5vw,1.1rem)] italic text-[var(--muted)]">
              Now the model’s choices — a chart type you didn’t know, an
              encoding you’d never tried — become <strong>your</strong> new
              defaults.
            </p>
          </div>
        </Reveal>
      </div>
      <Punchline show={step >= 2}>
        You can’t be surprised by output you fully specified. No surprise, no
        development.
      </Punchline>
      <Reveal show={step >= 3} delay={0.15} className="mt-[3vh]">
        <div className="flex items-start gap-4 rounded-xl border border-[#d9cbe6] bg-[#f6f1fb] px-5 py-4">
          <div className="mono mt-0.5 shrink-0 rounded-md bg-[#7c5cb8] px-2 py-1 text-[0.6em] font-bold uppercase tracking-widest text-white">
            word of advice
          </div>
          <div className="min-w-0">
            <p className="text-[clamp(0.9rem,1.7vw,1.2rem)] leading-relaxed">
              Nature figured this out first. Crick’s{" "}
              <strong className="text-[#7c5cb8]">Wobble Hypothesis</strong>: the
              slack at the third codon position is a{" "}
              <em>feature</em> — it lets one tRNA read several codons. The
              wiggle room <em>is</em> the capability.
            </p>
            <p className="mono mt-2 text-[clamp(0.6rem,1.1vw,0.78rem)] text-[var(--muted)]">
              Agris et&nbsp;al., “Celebrating wobble decoding: Half a century
              and still much is new.” RNA Biology (2018) · PMID&nbsp;28812932
            </p>
          </div>
        </div>
      </Reveal>
    </SlideShell>
  );
}
