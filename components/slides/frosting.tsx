"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Punchline, Reveal, SlideShell } from "@/components/shell";

// Steps: 0 post-its pile up · 1 all auto-resolved · 2 punchline
export const FROSTING_STEPS = 3;

const CHORES = [
  { id: "VIZ-101", text: "Pick a palette that isn’t offensive", label: "design" },
  { id: "VIZ-102", text: "Un-overlap the legend. Again.", label: "polish" },
  { id: "VIZ-103", text: "Axis labels, units, thousands separators", label: "polish" },
  { id: "VIZ-104", text: "Re-export at 2× for the deck", label: "chore" },
  { id: "VIZ-105", text: "Make the notebook presentable", label: "chore" },
  { id: "VIZ-106", text: "Format the SQL before anyone sees it", label: "chore" },
];

// classic 3M colorways: pink for design, canary yellow for polish, blue for chores
const NOTE_COLORS: Record<string, { bg: string; strip: string }> = {
  design: { bg: "#ffd6e7", strip: "#f3b6cd" },
  polish: { bg: "#fff8a6", strip: "#efe07c" },
  chore: { bg: "#cde9ff", strip: "#a9cfee" },
};

const MARKER_FONT =
  '"Marker Felt", "Segoe Print", "Comic Sans MS", cursive';

function PostIt({
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
  const tilt = (i % 2 ? 1 : -1) * (1.1 + (i % 3) * 0.9);
  const c = NOTE_COLORS[chore.label];
  return (
    <motion.div
      initial={settled ? false : { opacity: 0, y: -90, rotate: 0 }}
      animate={{ opacity: done ? 0.75 : 1, y: 0, rotate: tilt }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 24,
        delay: settled ? 0 : 0.2 + i * 0.18,
      }}
      className="relative flex h-[clamp(110px,21vh,210px)] flex-col p-[1em] pt-[1.2em]"
      style={{
        background: `linear-gradient(180deg, ${c.strip} 0, ${c.bg} 1.1em)`,
        boxShadow:
          "0 1px 2px rgba(32,38,44,0.12), 0 10px 18px rgba(32,38,44,0.18)",
      }}
    >
      <div className="mono flex items-center justify-between text-[0.55em] uppercase tracking-wider text-[rgba(32,38,44,0.45)]">
        <span>{chore.id}</span>
        <span>{chore.label}</span>
      </div>
      <p
        className="relative mt-[0.5em] min-h-0 flex-1 text-[clamp(0.85rem,1.7vw,1.2rem)] leading-snug text-[#2b3238]"
        style={{ fontFamily: MARKER_FONT }}
      >
        {chore.text}
        <motion.span
          initial={false}
          animate={{ width: done ? "100%" : "0%" }}
          transition={{ delay: done ? i * 0.15 : 0, duration: 0.3 }}
          className="absolute left-0 top-[45%] h-[3px] rounded-full bg-[var(--imp)]"
        />
      </p>
      <div
        className="flex items-end justify-between text-[0.8em] text-[rgba(32,38,44,0.6)]"
        style={{ fontFamily: MARKER_FONT }}
      >
        <span>{done ? "— AI" : "— you"}</span>
        <motion.span
          initial={false}
          animate={{
            opacity: done ? 1 : 0,
            scale: done ? 1 : 0.6,
            rotate: done ? -8 : 0,
          }}
          transition={{ delay: done ? i * 0.15 + 0.15 : 0 }}
          className="mono rounded border-2 border-[var(--dec)] px-1.5 py-0.5 text-[0.6em] font-bold uppercase tracking-wider text-[var(--dec)]"
        >
          auto ✓
        </motion.span>
      </div>
      {/* curled bottom-right corner */}
      <span
        className="absolute bottom-0 right-0 h-[1.1em] w-[1.1em]"
        style={{
          background: `linear-gradient(315deg, var(--bg, #fff) 48%, rgba(32,38,44,0.14) 50%, ${c.strip} 54%)`,
        }}
      />
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
          “That’s <em className="text-[var(--accent)]">IC</em>ing on the cake”
          — and it’s generally “free”
          <span className="align-super text-[0.5em] text-[var(--muted)]">
            *
          </span>
        </>
      }
    >
      <div className="mx-auto flex h-full max-w-[48em] flex-col justify-center pb-[6vh] text-[clamp(0.95rem,1.9vw,1.35rem)]">
        <div className="mono mb-4 flex items-center justify-between text-[clamp(0.65rem,1.2vw,0.85rem)] uppercase tracking-widest text-[var(--muted)]">
          <span>the sticky-note wall · every chart, every time</span>
          <motion.span
            initial={false}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="text-[var(--dec)]"
          >
            all 6 peeled off · assignee: the model
          </motion.span>
        </div>
        <div className="grid grid-cols-3 gap-[1.5vw]">
          {CHORES.map((c, i) => (
            <PostIt
              key={c.id}
              chore={c}
              i={i}
              done={step >= 1}
              settled={settled}
            />
          ))}
        </div>
        <Punchline show={step >= 2}>
          The icing became free. The cake — the question, the data, the
          judgment — is still yours to bake.
        </Punchline>
        <Reveal show={step >= 2} delay={0.5}>
          <p className="mono mt-3 text-[0.6em] text-[var(--muted)]">
            * “free”: tokenized, of course — and VC-subsidized. thanks,
            Anthropic.
          </p>
        </Reveal>
      </div>
    </SlideShell>
  );
}
