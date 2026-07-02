"use client";

import { motion } from "motion/react";
import CodeBlock from "@/components/code-block";
import { Punchline, Reveal, SlideShell } from "@/components/shell";

/* ── Slide: Side-by-side recap before the demo ──────────────────── */

export const SIDEBYSIDE_STEPS = 2;

const MPL = [
  { text: "fig, ax = plt.subplots()" },
  { text: 'ax.scatter(df["temp_max"], df["wind"])' },
  { text: "ax.set_xlim(0, 40)" },
  { text: "ax.set_ylim(0, 12)" },
  { text: 'ax.set_xlabel("Max temperature (°C)")' },
  { text: 'ax.set_ylabel("Wind (m/s)")' },
  { text: 'ax.set_title("Wind vs. Max Temperature")' },
  { text: "plt.show()" },
];

const ALT = [
  { text: "alt.Chart(df).mark_circle().encode(" },
  { text: '    x="temp_max",' },
  { text: '    y="wind",' },
  { text: ")" },
];

/* Clean macOS window chrome: traffic lights + centered tab-style title. */
function MacCodeWindow({
  title,
  accent,
  note,
  children,
}: {
  title: string;
  accent: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#d5d5d8] bg-white shadow-[0_14px_36px_rgba(32,38,44,0.16)]">
      <div className="relative flex items-center border-b border-[#e3e3e6] bg-[#f6f6f8] px-3 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 text-[clamp(0.75rem,1.5vw,1rem)] font-semibold">
          <span style={{ color: accent }}>{title}</span>
        </span>
        <span className="mono ml-auto text-[0.65rem] text-[var(--muted)]">
          {note}
        </span>
      </div>
      {children}
    </div>
  );
}

export function SideBySideSlide({ step }: { step: number }) {
  return (
    <SlideShell kicker="same chart" title="The difference isn’t line count">
      <div className="grid grid-cols-2 items-start gap-[3vw]">
        <MacCodeWindow
          title="Imperative — matplotlib"
          accent="var(--imp)"
          note="8 lines, every one on you"
        >
          <CodeBlock lines={MPL} accent="var(--imp)" />
        </MacCodeWindow>
        <div>
          <MacCodeWindow
            title="Declarative — Altair"
            accent="var(--dec)"
            note="3 decisions you made"
          >
            <CodeBlock
              lines={ALT}
              accent="var(--dec)"
              fontSize="clamp(0.8rem, 1.6vw, 1.05rem)"
            />
          </MacCodeWindow>
          <Reveal show={step >= 1} className="mt-5">
            <p className="text-[clamp(1.05rem,2.1vw,1.5rem)] font-semibold text-[var(--dec)]">
              Administrative overhead is minimized.
            </p>
          </Reveal>
        </div>
      </div>
    </SlideShell>
  );
}

/* ── Slide: Live demo pointer ───────────────────────────────────── */

export const DEMO_STEPS = 2;

const POLARS_ONE_LINER = [
  { text: "# one line of EDA, straight off a Polars frame" },
  { text: 'plot_df.plot.line(x="date", y="temp_max")' },
];

export function DemoSlide({ step }: { step: number }) {
  return (
    <SlideShell
      kicker="live · bring your own data"
      title={
        <>
          Demo: <span className="mono text-[0.8em]">07_Data_Visualization.ipynb</span>
        </>
      }
    >
      <div className="max-w-[46em]">
        <p className="text-[clamp(1rem,2vw,1.4rem)] leading-relaxed">
          Chapter 7 of <em>Python Polars: The Definitive Guide</em> — the same
          Seattle weather data you’ve been looking at, for real this time.
        </p>
        <div className="mt-6">
          <CodeBlock
            lines={POLARS_ONE_LINER}
            label="polars → altair, zero ceremony"
            fontSize="clamp(0.85rem, 1.8vw, 1.15rem)"
          />
        </div>
        <Reveal show={step >= 1} className="mt-6">
          <ul className="space-y-3 text-[clamp(0.95rem,1.8vw,1.3rem)] text-[var(--muted)]">
            <li>
              → watch how much <em>how</em> never gets written
            </li>
            <li>
              → then we’ll hand the same frame to Claude and only say{" "}
              <em>what</em>
            </li>
          </ul>
        </Reveal>
      </div>
    </SlideShell>
  );
}

/* ── Slide: Takeaways ───────────────────────────────────────────── */

export const TAKEAWAYS_STEPS = 3;

const POINTS = [
  {
    n: "01",
    text: "The interface keeps rising: pixels → specs → English. Each rung trades control of the how for speed to the what.",
  },
  {
    n: "02",
    text: "Polish is free now. Judgment isn’t. Spend the reclaimed hours on the question, not the legend.",
  },
  {
    n: "03",
    text: "Under-specify on purpose. The wiggle room is where the model teaches you something back.",
  },
];

export function TakeawaysSlide({ step }: { step: number }) {
  return (
    <SlideShell kicker="takeaways" title="Declare the outcome. Interrogate the how.">
      <div className="max-w-[44em] space-y-[3.5vh] pt-[2vh]">
        {POINTS.map((p, i) => (
          <Reveal key={p.n} show={step >= i}>
            <div className="flex items-baseline gap-6">
              <span className="mono text-[clamp(0.9rem,1.8vw,1.2rem)] text-[var(--accent)]">
                {p.n}
              </span>
              <p className="text-[clamp(1.05rem,2.1vw,1.5rem)] leading-relaxed">
                {p.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
}

/* ── Slide: End ─────────────────────────────────────────────────── */

export function EndSlide() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-[8vw] text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mono mb-5 text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          BYOD
        </div>
        <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-tight">
          Don’t tell computers <em className="text-[var(--imp)]">how</em>.
          <br />
          Ask them to <em className="text-[var(--dec)]">do it for you</em>.
        </h1>
        <p className="mt-8 text-[clamp(1rem,2vw,1.35rem)] italic text-[var(--muted)]">
          bring your own data — questions welcome, bonus points if they’re
          under-specified
        </p>
      </motion.div>
    </div>
  );
}
