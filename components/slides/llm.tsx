"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import CodeBlock, { CodeLine } from "@/components/code-block";
import VegaChart from "@/components/vega-chart";
import { POINTS, QUARTER_COLORS } from "@/lib/data";
import { SlideShell } from "@/components/shell";

// Steps: 0 prompt types, terminal alone · then the terminal slides to the
// bottom-left and the generated Altair spec types itself out, the live chart
// growing with it: 1 bare x/y · 2 +color · 3 +tooltip (hover it — it's real)
// · 4 +properties · 5 +title · 6 +annotate
export const LLM_STEPS = 7;

const PROMPT_TEXT =
  "plot wind against max temperature from the seattle weather data. color by season and call out anything odd.";

/* ── the data, shaped like the real seattle_weather frame ────────── */

const SEASONS: Record<number, string> = {
  1: "Winter",
  2: "Spring",
  3: "Summer",
  4: "Fall",
};
const SEASON_MONTH: Record<number, number> = { 1: 1, 2: 4, 3: 7, 4: 10 };

export const ROWS = POINTS.map((p, i) => ({
  date: `2015-${String(SEASON_MONTH[p.quarter] + (i % 3)).padStart(2, "0")}-${String(1 + ((i * 7) % 27)).padStart(2, "0")}`,
  temp_max: p.temp,
  wind: p.wind,
  season: SEASONS[p.quarter],
  outlier: !!p.outlier,
}));

/* ── one Vega-Lite spec per build stage ──────────────────────────── */

function specFor(stage: number): Record<string, unknown> {
  const encoding: Record<string, unknown> = {
    x: {
      field: "temp_max",
      type: "quantitative",
      scale: { domain: [0, 40] },
      title: stage >= 5 ? "Max temperature (°C)" : "temp_max",
    },
    y: {
      field: "wind",
      type: "quantitative",
      scale: { domain: [0, 12] },
      title: stage >= 5 ? "Wind (m/s)" : "wind",
    },
  };
  if (stage >= 2)
    encoding.color = {
      field: "season",
      type: "nominal",
      scale: {
        domain: ["Winter", "Spring", "Summer", "Fall"],
        range: [1, 2, 3, 4].map((q) => QUARTER_COLORS[q]),
      },
      legend: { orient: "top-right", title: null },
    };
  if (stage >= 3)
    encoding.tooltip = [
      { field: "date", type: "nominal" },
      { field: "temp_max", type: "quantitative" },
      { field: "wind", type: "quantitative" },
      { field: "season", type: "nominal" },
    ];

  const points = {
    mark: { type: "circle", size: 90, opacity: 0.85 },
    encoding,
  };

  const spec: Record<string, unknown> = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { values: ROWS },
    width: stage >= 4 ? 500 : 320,
    height: stage >= 4 ? 350 : 240,
  };
  if (stage >= 5) spec.title = "Wind vs. Max Temperature";

  if (stage >= 6) {
    const xy = { x: encoding.x, y: encoding.y };
    spec.layer = [
      points,
      {
        mark: {
          type: "point",
          shape: "circle",
          size: 500,
          filled: false,
          stroke: "#2b93cd",
          strokeDash: [3, 3],
          strokeWidth: 1.8,
        },
        encoding: xy,
        transform: [{ filter: "datum.outlier" }],
      },
      {
        mark: {
          type: "text",
          text: "windstorm? worth a look ↗",
          align: "left",
          dx: 18,
          dy: -12,
          fontStyle: "italic",
          fontSize: 13,
          color: "#2b93cd",
        },
        encoding: xy,
        transform: [{ filter: "datum.outlier" }],
      },
    ];
  } else {
    Object.assign(spec, points);
  }
  return spec;
}

/* ── the spec, typed out line by line ────────────────────────────── */

const SPEC_LINES: CodeLine[] = [
  { text: "chart = alt.Chart(df).mark_circle(size=90).encode(", step: 1 },
  { text: '    x="temp_max:Q", y="wind:Q",', step: 1 },
  { text: '    color="season:N",', step: 2 },
  { text: '    tooltip=["date", "temp_max", "wind", "season"],', step: 3 },
  { text: ")", step: 1 },
  { text: "chart = chart.properties(width=500, height=350)", step: 4 },
  { text: 'chart = chart.title("Wind vs. Max Temperature")', step: 5 },
  { text: 'chart += annotate(outlier, "windstorm? worth a look ↗")', step: 6 },
];

const CAPTIONS = [
  "",
  "barebones — just x and y",
  "+ color by season",
  "+ tooltip · hover the dots, it’s live",
  "+ .properties(width, height)",
  "+ title",
  "+ annotate the outlier",
];

// Type the prompt like a human at a keyboard; render instantly when `done`.
function Typewriter({ text, done }: { text: string; done: boolean }) {
  const [n, setN] = useState(done ? text.length : 0);
  useEffect(() => {
    if (done) {
      setN(text.length);
      return;
    }
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(interval);
      }, 24);
    }, 500);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, done]);
  return <>{text.slice(0, n)}</>;
}

// A zsh session in a dark terminal window (cmux-style chrome).
function Terminal({ done }: { done: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#2a2f37] bg-[#15181d] shadow-[0_10px_36px_rgba(15,20,26,0.4)]">
      {/* window chrome */}
      <div className="relative flex items-center border-b border-[#23272e] bg-[#1b1f25] px-4 py-2.5">
        <span className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="mono absolute left-1/2 -translate-x-1/2 text-xs text-[#6b7683]">
          cmux — xpc-byod
        </span>
      </div>
      {/* session */}
      <div className="mono px-5 py-4 text-[clamp(0.72rem,1.45vw,0.95rem)] leading-relaxed">
        <div>
          <span className="text-[#28c840]">➜</span>{" "}
          <span className="text-[#56b6c2]">xpc-byod</span>{" "}
          <span className="text-[#aab2bc]">claude</span>
        </div>
        <div className="mt-3 rounded-lg border border-[#3a414b] px-3 py-2.5 text-[#e6e9ed]">
          <span className="text-[#6b7683]">&gt;</span>{" "}
          <Typewriter text={PROMPT_TEXT} done={done} />
          <span className="blink text-[#e6e9ed]">▌</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[0.85em]">
          <span className="text-[#56b6c2]">⏵⏵ auto mode on · 1 shell</span>
          <span className="text-[#d19a66]">ultracode</span>
        </div>
      </div>
    </div>
  );
}

export function LlmSlide({ step }: { step: number }) {
  const settled = useRef(step > 0).current;
  const stage = Math.min(step, 6);
  const spec = useMemo(() => specFor(stage), [stage]);
  return (
    <SlideShell
      kicker="how it is now"
      title={
        <>
          Plain language:{" "}
          <em className="text-[var(--accent)]">
            the most declarative interface yet
          </em>
        </>
      }
    >
      <div className="flex h-full items-center gap-[3vw] pb-[3vh]">
        {/* left column: the spec types itself in, prompt window below */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className={
            step >= 1
              ? "flex h-full w-[44%] shrink-0 flex-col justify-between gap-[2vh]"
              : "mx-auto w-[58%]"
          }
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          >
            <Terminal done={settled || step >= 1} />
          </motion.div>
          {step >= 1 && (
            <motion.div
              initial={settled ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: settled ? 0 : 0.3 }}
            >
              <CodeBlock
                lines={SPEC_LINES}
                step={step}
                accent="var(--accent)"
                label="chart.py — generated, spec by spec"
                fontSize="clamp(0.68rem, 1.3vw, 0.92rem)"
                typewriter={!settled}
              />
            </motion.div>
          )}
        </motion.div>

        {/* right column: the chart grows with the spec */}
        {step >= 1 && (
          <motion.div
            initial={settled ? false : { opacity: 0, x: 80, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 170,
              damping: 22,
              delay: settled ? 0 : 0.9,
            }}
            className="flex h-full min-w-0 flex-1 flex-col"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="mono mb-2 text-[clamp(0.7rem,1.3vw,0.9rem)] uppercase tracking-widest text-[var(--accent)]">
              {CAPTIONS[stage]}
            </div>
            <div className="min-h-0 flex-1">
              <VegaChart spec={spec} maxScale={1.4} />
            </div>
          </motion.div>
        )}
      </div>
    </SlideShell>
  );
}
