"use client";

import { motion } from "motion/react";
import { Punchline, Reveal, SlideShell } from "@/components/shell";

// Steps: 0 confession + “then” pie · 1 “now” pie (new things take 80%) · 2 punchline
export const LANGUAGES_STEPS = 3;

// share of "my craft", summing to 100
const LANGS = [
  { name: "Python", then: 75, now: 3, color: "#3776ab" },
  { name: "SQL", then: 20, now: 10, color: "#0e7a5f" },
  { name: "JavaScript", then: 5, now: 7, color: "#e8a33d" },
  { name: "new things", then: 0, now: 80, color: "#7c5cb8" },
];

const TAU = Math.PI * 2;

function slicePath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const x0 = cx + r * Math.sin(a0);
  const y0 = cy - r * Math.cos(a0);
  const x1 = cx + r * Math.sin(a1);
  const y1 = cy - r * Math.cos(a1);
  return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
}

function Pie({
  values,
  show,
  explode, // name of the slice to pull out for emphasis
  size = 240,
}: {
  values: "then" | "now";
  show: boolean;
  explode?: string;
  size?: number;
}) {
  const R = 100;
  const C = 110;
  let acc = 0;
  return (
    <svg viewBox="0 0 220 220" style={{ width: size, maxWidth: "100%" }}>
      {LANGS.map((l, i) => {
        const share = l[values] / 100;
        const a0 = acc * TAU;
        const a1 = (acc + share) * TAU;
        acc += share;
        if (share === 0) return null;
        const mid = (a0 + a1) / 2;
        const out = explode === l.name ? 7 : 0;
        const dx = out * Math.sin(mid);
        const dy = -out * Math.cos(mid);
        const lr = share > 0.12 ? R * 0.58 : R * 0.82;
        return (
          <motion.g
            key={l.name}
            initial={false}
            animate={
              show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 18,
              delay: show ? 0.15 + i * 0.18 : 0,
            }}
            style={{ transformOrigin: "110px 110px" }}
          >
            <path
              d={slicePath(C + dx, C + dy, R, a0, a1)}
              fill={l.color}
              stroke="#fff"
              strokeWidth={2}
            />
            {l[values] >= 6 && (
              <text
                x={C + dx + lr * Math.sin(mid)}
                y={C + dy - lr * Math.cos(mid) + 5}
                textAnchor="middle"
                fill="#fff"
                fontSize={l[values] >= 15 ? 17 : 13}
                fontWeight={700}
                style={{ paintOrder: "stroke" }}
                stroke="rgba(0,0,0,0.25)"
                strokeWidth={l[values] < 15 ? 2.5 : 0}
              >
                {l[values]}%
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}

export function LanguagesSlide({ step }: { step: number }) {
  return (
    <SlideShell
      kicker="a confession"
      title="Even “knowing the libraries” stopped being the job"
    >
      <div className="flex h-full flex-col pb-[3vh]">
        {/* the pies are the show */}
        <div className="flex min-h-0 flex-1 items-center justify-center gap-[6vw]">
          <div className="flex flex-col items-center">
            <div className="mono mb-3 text-[clamp(0.8rem,1.6vw,1.1rem)] uppercase tracking-widest text-[var(--muted)]">
              “my craft” · most of my career
            </div>
            <Pie values="then" show={step >= 0} size={340} />
          </div>
          <Reveal show={step >= 1} className="flex flex-col items-center">
            <div className="mono mb-3 text-[clamp(0.8rem,1.6vw,1.1rem)] uppercase tracking-widest text-[var(--accent)]">
              “my craft” · now
            </div>
            <Pie values="now" show={step >= 1} explode="new things" size={340} />
          </Reveal>
        </div>

        {/* legend + python callout */}
        <div className="flex items-center justify-center gap-[3vw]">
          <div className="flex items-center gap-5">
            {LANGS.map((l) => (
              <span key={l.name} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{ background: l.color }}
                />
                <span className="mono text-[clamp(0.75rem,1.4vw,1rem)]">
                  {l.name}
                </span>
              </span>
            ))}
          </div>
          <Reveal show={step >= 1} delay={0.8}>
            <p className="rounded-lg bg-[var(--panel)] px-4 py-1.5 text-[clamp(0.9rem,1.7vw,1.2rem)]">
              Trying new things:{" "}
              <strong className="text-[#7c5cb8]">0% → 80%</strong> of my time{" "}
              <span className="text-[var(--muted)]">▲</span>
            </p>
          </Reveal>
        </div>

        {/* the story, one line at a time, at the bottom */}
        <div className="mt-[2.5vh] text-center">
          <Reveal show={step >= 0}>
            <p className="text-[clamp(0.95rem,1.9vw,1.3rem)] leading-relaxed">
              I’ve been a Python worker my whole career — the API fluency{" "}
              <em>was</em> the craft.
              {step >= 1 && (
                <span>
                  {" "}
                  Now <strong>80% is trying something new</strong> — iterating,
                  looping — and everything I used to ship got squished into the
                  other 20%.{" "}
                  <span className="mono text-[0.8em] text-[var(--muted)]">
                    (this deck is JavaScript.)
                  </span>
                </span>
              )}
            </p>
          </Reveal>
          <Punchline show={step >= 2}>
            The moat was knowing the library. The moat now is knowing what to
            ask for.
          </Punchline>
        </div>
      </div>
    </SlideShell>
  );
}
