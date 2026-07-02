"use client";

import { motion } from "motion/react";
import { SlideShell } from "@/components/shell";

// A single big Open Graph card — the nostalgia interstitial.
export const REDDIT_STEPS = 1;

const POST_URL =
  "https://www.reddit.com/r/nostalgia/comments/ntb3e3/cleaning_lint_out_of_the_old_computer_mouse/";

export function RedditSlide() {
  return (
    <SlideShell kicker="a quick detour · remember owning every step?">
      <div className="flex h-full items-center justify-center pb-[4vh]">
        <motion.a
          href={POST_URL}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          className="block w-[min(46em,88%)] overflow-hidden rounded-2xl border border-[var(--border)] bg-white no-underline shadow-[0_28px_70px_rgba(32,38,44,0.28)]"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/reddit-mouse.jpg"
            alt="Cleaning lint out of an old ball mouse"
            className="max-h-[52vh] w-full object-cover"
          />
          <div className="px-7 py-5">
            <div className="mb-1 flex items-center gap-2 text-[clamp(0.75rem,1.4vw,0.95rem)] text-[var(--muted)]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff4500] text-[0.7em] font-bold text-white">
                r/
              </span>
              <span className="font-semibold text-[#ff4500]">r/nostalgia</span>
              <span>· reddit.com · u/SchrodingersLastCat</span>
            </div>
            <div className="text-[clamp(1.05rem,2.2vw,1.6rem)] font-bold leading-snug text-[var(--ink)]">
              Cleaning lint out of the old computer mouse. Momentarily holding
              the trackball in one hand, just for the pure pleasure of feeling
              the oddly velvety weight.
            </div>
            <div className="mono mt-2 text-[clamp(0.7rem,1.3vw,0.9rem)] text-[var(--muted)]">
              ▲ 780 upvotes · 💬 47 comments
            </div>
          </div>
        </motion.a>
      </div>
    </SlideShell>
  );
}
