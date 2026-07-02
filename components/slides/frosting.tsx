"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Punchline, SlideShell } from "@/components/shell";

// Steps: 0 tickets pile up · 1 all auto-resolved · 2 punchline
export const FROSTING_STEPS = 3;

const CHORES = [
  { id: "VIZ-101", text: "Pick a palette that isn’t offensive", label: "design" },
  { id: "VIZ-102", text: "Un-overlap the legend. Again.", label: "polish" },
  { id: "VIZ-103", text: "Axis labels, units, thousands separators", label: "polish" },
  { id: "VIZ-104", text: "Re-export at 2× for the deck", label: "chore" },
  { id: "VIZ-105", text: "Make the notebook presentable", label: "chore" },
  { id: "VIZ-106", text: "Format the SQL before anyone sees it", label: "chore" },
];

const LABEL_COLORS: Record<string, string> = {
  design: "#b07aa1",
  polish: "#e8a33d",
  chore: "#8a95a0",
};

function StatusIcon({ done }: { done: boolean }) {
  return done ? (
    <svg viewBox="0 0 14 14" className="h-4 w-4 shrink-0">
      <circle cx="7" cy="7" r="7" fill="#5e6ad2" />
      <path
        d="M4 7.2 L6.2 9.4 L10 5"
        stroke="#fff"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 14 14" className="h-4 w-4 shrink-0">
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="#a8b0b9"
        strokeWidth="1.6"
        strokeDasharray="2.5 2"
      />
    </svg>
  );
}

function Ticket({
  chore,
  i,
  done,
  settled,
}: {
  chore: (typeof CHORES)[number];
  i: number;
  done: boolean;
  settled: boolean;
}) {
  const tilt = (i % 2 ? 1 : -1) * (0.3 + (i % 3) * 0.35);
  return (
    <motion.div
      initial={settled ? false : { opacity: 0, y: -70, rotate: 0 }}
      animate={{ opacity: done ? 0.72 : 1, y: 0, rotate: tilt }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 24,
        delay: settled ? 0 : 0.2 + i * 0.22,
      }}
      className="-mt-1.5 flex items-center gap-3 rounded-lg border border-[#e0e4e9] bg-white px-4 py-2.5 shadow-[0_3px_10px_rgba(32,38,44,0.1)]"
    >
      <StatusIcon done={done} />
      <span className="mono shrink-0 text-[0.72em] text-[#8a95a0]">
        {chore.id}
      </span>
      <span className="relative min-w-0 flex-1 truncate">
        {chore.text}
        <motion.span
          initial={false}
          animate={{ width: done ? "100%" : "0%" }}
          transition={{ delay: done ? i * 0.15 : 0, duration: 0.3 }}
          className="absolute left-0 top-1/2 h-[2px] bg-[var(--imp)]"
        />
      </span>
      <motion.span
        initial={false}
        animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.6 }}
        transition={{ delay: done ? i * 0.15 + 0.15 : 0 }}
        className="mono shrink-0 rounded-full border border-[var(--dec)] px-2 py-0.5 text-[0.55em] uppercase tracking-wider text-[var(--dec)]"
      >
        auto
      </motion.span>
      <span className="flex shrink-0 items-center gap-1.5">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: LABEL_COLORS[chore.label] }}
        />
        <span className="mono text-[0.65em] text-[#8a95a0]">
          {chore.label}
        </span>
      </span>
      <span
        className={`mono flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.6em] font-bold ${
          done ? "bg-[#e6e9f5] text-[#5e6ad2]" : "bg-[#eef1f4] text-[#5f6b76]"
        }`}
      >
        {done ? "AI" : "JS"}
      </span>
    </motion.div>
  );
}

export function FrostingSlide({ step }: { step: number }) {
  const settled = useRef(step > 0).current;
  return (
    <SlideShell
      kicker="the work that disappeared"
      title={
        <>
          “That’s <em className="text-[var(--accent)]">frosting</em>” — and
          frosting is now free
        </>
      }
    >
      <div className="mx-auto flex h-full max-w-[48em] flex-col justify-center pb-[6vh] text-[clamp(0.95rem,1.9vw,1.35rem)]">
        <div className="mono mb-3 flex items-center justify-between text-[clamp(0.65rem,1.2vw,0.85rem)] uppercase tracking-widest text-[var(--muted)]">
          <span>backlog · every chart, every time</span>
          <motion.span
            initial={false}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="text-[var(--dec)]"
          >
            6 closed · assignee changed
          </motion.span>
        </div>
        <div>
          {CHORES.map((c, i) => (
            <Ticket
              key={c.id}
              chore={c}
              i={i}
              done={step >= 1}
              settled={settled}
            />
          ))}
        </div>
        <Punchline show={step >= 2}>
          The frosting became free. The cake — the question, the data, the
          judgment — is still yours to bake.
        </Punchline>
      </div>
    </SlideShell>
  );
}
