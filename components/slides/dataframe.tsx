"use client";

import { motion } from "motion/react";
import { SlideShell } from "@/components/shell";
import { ROWS } from "@/components/slides/llm";

// Steps: 0 the frame prints · 1 the nudge
export const DATAFRAME_STEPS = 2;

// sample across the seasons, presented in date order
const SHOWN = [0, 15, 29, 43, 1, 16, 30, 44, 2, 17]
  .map((i) => ROWS[i])
  .sort((a, b) => a.date.localeCompare(b.date));
const COLS: { key: keyof (typeof ROWS)[number]; dtype: string; num?: boolean }[] =
  [
    { key: "date", dtype: "str" },
    { key: "temp_max", dtype: "f64", num: true },
    { key: "wind", dtype: "f64", num: true },
    { key: "season", dtype: "str" },
  ];

export function DataframeSlide({ step }: { step: number }) {
  return (
    <SlideShell
      kicker="the data · before any chart"
      title={
        <>
          Seattle weather — <span className="mono text-[0.75em]">df</span>,
          one row per day
        </>
      }
    >
      <div className="flex h-full flex-col items-center justify-center pb-[4vh]">
        <div className="mono overflow-hidden rounded-xl border border-[var(--border)] bg-white text-[clamp(0.75rem,1.5vw,1.05rem)] shadow-[0_14px_36px_rgba(32,38,44,0.12)]">
          <div className="border-b border-[var(--border)] bg-[var(--panel)] px-4 py-2 text-[0.8em] text-[var(--muted)]">
            df.head(10) — shape: ({ROWS.length}, {COLS.length})
          </div>
          <table className="border-collapse">
            <thead>
              <tr>
                {COLS.map((c) => (
                  <th
                    key={c.key}
                    className={`border-b-2 border-[var(--border)] px-6 py-1.5 font-bold ${
                      c.num ? "text-right" : "text-left"
                    }`}
                  >
                    {c.key}
                    <div className="text-[0.7em] font-normal italic text-[var(--muted)]">
                      {c.dtype}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SHOWN.map((r, i) => (
                <motion.tr
                  key={r.date + i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className={i % 2 ? "bg-[#f7fafc]" : "bg-white"}
                >
                  {COLS.map((c) => (
                    <td
                      key={c.key}
                      className={`px-6 py-1 ${
                        c.num ? "text-right" : "text-left"
                      }`}
                    >
                      {String(r[c.key])}
                    </td>
                  ))}
                </motion.tr>
              ))}
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <td
                  colSpan={COLS.length}
                  className="px-6 py-1 text-center text-[var(--muted)]"
                >
                  … {ROWS.length - SHOWN.length} more rows
                </td>
              </motion.tr>
            </tbody>
          </table>
        </div>
        <motion.p
          initial={false}
          animate={step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          className="mt-[3.5vh] max-w-[38em] text-center text-[clamp(1rem,2vw,1.4rem)]"
        >
          Four columns. Fifty-seven days. Now —{" "}
          <em className="text-[var(--accent)]">
            what would you ask it, in English?
          </em>
        </motion.p>
      </div>
    </SlideShell>
  );
}
