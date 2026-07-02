"use client";

import { motion } from "motion/react";

export function SlideShell({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col px-[6vw] py-[5vh]">
      {kicker && (
        <div className="mono mb-2 text-[clamp(0.7rem,1.4vw,0.9rem)] uppercase tracking-[0.2em] text-[var(--accent)]">
          {kicker}
        </div>
      )}
      {title && (
        <h2 className="mb-[3vh] text-[clamp(1.6rem,3.6vw,3rem)] font-bold leading-tight">
          {title}
        </h2>
      )}
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

export function Reveal({
  show,
  children,
  delay = 0,
  className,
}: {
  show: boolean;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 14 }}
      transition={{ duration: 0.35, delay: show ? delay : 0 }}
      className={className}
      style={{ pointerEvents: show ? "auto" : "none" }}
    >
      {children}
    </motion.div>
  );
}

/* Animated code → chart connector: dashed line + arrowhead, gently pulsing. */
export function Connector({
  show,
  color = "var(--accent)",
}: {
  show: boolean;
  color?: string;
}) {
  return (
    <div className="flex h-full items-center justify-center">
      <motion.svg
        width="100%"
        height="26"
        viewBox="0 0 64 26"
        preserveAspectRatio="none"
        initial={false}
        animate={{ opacity: show ? [0.35, 1, 0.35] : 0 }}
        transition={
          show ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : {}
        }
      >
        <line
          x1={2}
          y1={13}
          x2={48}
          y2={13}
          stroke={color}
          strokeWidth={2.5}
          strokeDasharray="7 6"
        />
        <path d="M46 5 L62 13 L46 21 Z" fill={color} />
      </motion.svg>
    </div>
  );
}

export function Punchline({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal show={show}>
      <p className="mt-[3vh] text-[clamp(1.1rem,2.2vw,1.6rem)] font-semibold text-[var(--accent)]">
        {children}
      </p>
    </Reveal>
  );
}
