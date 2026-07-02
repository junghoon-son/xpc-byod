"use client";

import { motion } from "motion/react";
import { POINTS, QUARTER_COLORS, X_MAX, Y_MAX } from "@/lib/data";

type Props = {
  frame?: boolean; // the blank canvas / figure window
  dots?: boolean;
  axes?: boolean; // axis lines + ticks
  labels?: boolean; // axis titles
  title?: boolean;
  colored?: boolean; // color by quarter
  legend?: boolean;
  annotate?: boolean; // call out the outlier
  pop?: boolean; // everything springs in at once (declarative reveal)
  instant?: boolean; // mount directly in final state (backwards navigation)
  width?: number;
};

const W = 560;
const H = 380;
const M = { l: 58, r: 18, t: 46, b: 52 };

const sx = (t: number) => M.l + (t / X_MAX) * (W - M.l - M.r);
const sy = (w: number) => H - M.b - (w / Y_MAX) * (H - M.t - M.b);

const AXIS = "#8a95a0";
const TICKS_X = [0, 10, 20, 30, 40];
const TICKS_Y = [0, 3, 6, 9, 12];

export default function Scatter({
  frame = true,
  dots = false,
  axes = false,
  labels = false,
  title = false,
  colored = false,
  legend = false,
  annotate = false,
  pop = false,
  instant = false,
  width = 560,
}: Props) {
  const outlier = POINTS.find((p) => p.outlier)!;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width, maxWidth: "100%", maxHeight: "100%" }}
      role="img"
      aria-label="Scatter plot of wind versus max temperature"
    >
      {frame && (
        <motion.rect
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          x={1}
          y={1}
          width={W - 2}
          height={H - 2}
          rx={10}
          fill="#ffffff"
          stroke="var(--border)"
        />
      )}

      {axes && (
        <motion.g
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          stroke={AXIS}
          strokeWidth={1.2}
        >
          <line x1={M.l} y1={H - M.b} x2={W - M.r} y2={H - M.b} />
          <line x1={M.l} y1={M.t} x2={M.l} y2={H - M.b} />
          {TICKS_X.map((t) => (
            <g key={`tx${t}`}>
              <line x1={sx(t)} y1={H - M.b} x2={sx(t)} y2={H - M.b + 5} />
              <text
                x={sx(t)}
                y={H - M.b + 18}
                fill={AXIS}
                fontSize={11}
                textAnchor="middle"
                stroke="none"
              >
                {t}
              </text>
            </g>
          ))}
          {TICKS_Y.map((t) => (
            <g key={`ty${t}`}>
              <line x1={M.l - 5} y1={sy(t)} x2={M.l} y2={sy(t)} />
              <text
                x={M.l - 10}
                y={sy(t) + 4}
                fill={AXIS}
                fontSize={11}
                textAnchor="end"
                stroke="none"
              >
                {t}
              </text>
            </g>
          ))}
        </motion.g>
      )}

      {labels && (
        <motion.g
          initial={instant ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          fill="var(--muted)"
          fontSize={13}
        >
          <text x={(M.l + W - M.r) / 2} y={H - 12} textAnchor="middle">
            Max temperature (°C)
          </text>
          <text
            x={16}
            y={(M.t + H - M.b) / 2}
            textAnchor="middle"
            transform={`rotate(-90 16 ${(M.t + H - M.b) / 2})`}
          >
            Wind (m/s)
          </text>
        </motion.g>
      )}

      {title && (
        <motion.text
          initial={instant ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          x={M.l}
          y={28}
          fill="var(--ink)"
          fontSize={16}
          fontWeight={600}
        >
          Wind vs. Max Temperature
        </motion.text>
      )}

      {dots &&
        POINTS.map((p, i) => (
          <motion.circle
            key={i}
            initial={instant ? false : pop ? { opacity: 0, scale: 0 } : { opacity: 0 }}
            animate={{ opacity: 0.92, scale: 1 }}
            transition={
              instant
                ? { duration: 0 }
                : pop
                  ? { type: "spring", stiffness: 220, damping: 18, delay: 0.15 }
                  : { delay: i * 0.012, duration: 0.25 }
            }
            cx={sx(p.temp)}
            cy={sy(p.wind)}
            r={p.outlier ? 6.5 : 5}
            fill={colored ? QUARTER_COLORS[p.quarter] : "#1697e2"}
          />
        ))}

      {legend && (
        <motion.g
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: instant ? 0 : 0.3 }}
          fontSize={11}
        >
          {["Winter", "Spring", "Summer", "Fall"].map((s, i) => (
            <g key={s} transform={`translate(${W - 238 + i * 56}, ${M.t + 6})`}>
              <circle r={4} fill={QUARTER_COLORS[i + 1]} />
              <text x={7} y={4} fill="var(--muted)">
                {s}
              </text>
            </g>
          ))}
        </motion.g>
      )}

      {annotate && (
        <motion.g
          initial={instant ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: instant ? 0 : 0.5, type: "spring", stiffness: 200 }}
        >
          <circle
            cx={sx(outlier.temp)}
            cy={sy(outlier.wind)}
            r={11}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
          <text
            x={sx(outlier.temp) + 18}
            y={sy(outlier.wind) - 8}
            fill="var(--accent)"
            fontSize={12}
            fontStyle="italic"
          >
            windstorm? worth a look ↗
          </text>
        </motion.g>
      )}
    </svg>
  );
}
