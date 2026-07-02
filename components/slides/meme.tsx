"use client";

import { motion } from "motion/react";
import { SlideShell } from "@/components/shell";

export const MEME_STEPS = 1;

export function MemeSlide() {
  return (
    <SlideShell kicker="intermission">
      <div className="flex h-full flex-col items-center justify-center gap-5">
        <motion.img
          initial={{ opacity: 0, scale: 0.92, rotate: -1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          src="/pie-meme.png"
          alt="The most accurate pie chart ever: sky, sunny side of pyramid, shady side of pyramid"
          className="max-h-[62vh] w-auto rounded-xl border border-[var(--border)] shadow-[0_4px_28px_rgba(32,38,44,0.16)]"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-[clamp(0.9rem,1.6vw,1.2rem)] italic text-[var(--muted)]"
        >
          (hand-drawn, imperatively, by someone who placed every pixel —
          respect)
        </motion.p>
      </div>
    </SlideShell>
  );
}
