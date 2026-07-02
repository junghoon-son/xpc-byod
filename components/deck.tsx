"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TitleSlide, TwoWaysSlide, WhyVizSlide, WHYVIZ_STEPS } from "@/components/slides/intro";
import { RedditSlide, REDDIT_STEPS } from "@/components/slides/reddit";
import { ImperativeSlide, IMPERATIVE_STEPS } from "@/components/slides/imperative";
import { DeclarativeSlide, DECLARATIVE_STEPS } from "@/components/slides/declarative";
import { LlmSlide, LLM_STEPS } from "@/components/slides/llm";
import { DataframeSlide, DATAFRAME_STEPS } from "@/components/slides/dataframe";
import { MemeSlide, MEME_STEPS } from "@/components/slides/meme";
import { LanguagesSlide, LANGUAGES_STEPS } from "@/components/slides/languages";
import { FrostingSlide, FROSTING_STEPS } from "@/components/slides/frosting";
import { WiggleSlide, WIGGLE_STEPS } from "@/components/slides/wiggle";
import { ReceiptsSlide, RECEIPTS_STEPS } from "@/components/slides/receipts";
import { MtaSlide, MTA_STEPS } from "@/components/slides/mta";
import { ColophonSlide, COLOPHON_STEPS } from "@/components/slides/colophon";
import {
  SideBySideSlide,
  SIDEBYSIDE_STEPS,
  DemoSlide,
  DEMO_STEPS,
  TakeawaysSlide,
  TAKEAWAYS_STEPS,
  EndSlide,
} from "@/components/slides/closing";

type SlideDef = {
  id: string;
  steps: number; // total internal steps (>= 1)
  C: React.ComponentType<{ step: number }>;
};

const SLIDES: SlideDef[] = [
  { id: "title", steps: 1, C: TitleSlide },
  { id: "why-viz", steps: WHYVIZ_STEPS, C: WhyVizSlide },
  { id: "reddit", steps: REDDIT_STEPS, C: RedditSlide },
  { id: "two-ways", steps: 3, C: TwoWaysSlide },
  { id: "imperative", steps: IMPERATIVE_STEPS, C: ImperativeSlide },
  { id: "declarative", steps: DECLARATIVE_STEPS, C: DeclarativeSlide },
  { id: "side-by-side", steps: SIDEBYSIDE_STEPS, C: SideBySideSlide },
  { id: "dataframe", steps: DATAFRAME_STEPS, C: DataframeSlide },
  { id: "llm", steps: LLM_STEPS, C: LlmSlide },
  { id: "meme", steps: MEME_STEPS, C: MemeSlide },
  { id: "languages", steps: LANGUAGES_STEPS, C: LanguagesSlide },
  { id: "frosting", steps: FROSTING_STEPS, C: FrostingSlide },
  { id: "wiggle", steps: WIGGLE_STEPS, C: WiggleSlide },
  { id: "receipts", steps: RECEIPTS_STEPS, C: ReceiptsSlide },
  { id: "demo", steps: DEMO_STEPS, C: DemoSlide },
  { id: "mta", steps: MTA_STEPS, C: MtaSlide },
  { id: "takeaways", steps: TAKEAWAYS_STEPS, C: TakeawaysSlide },
  { id: "colophon", steps: COLOPHON_STEPS, C: ColophonSlide },
  { id: "end", steps: 1, C: EndSlide },
];

function parseHash(): [number, number] {
  if (typeof window === "undefined") return [0, 0];
  const m = window.location.hash.match(/^#(\d+)(?:\.(\d+))?/);
  if (!m) return [0, 0];
  const i = Math.min(Math.max(parseInt(m[1], 10), 0), SLIDES.length - 1);
  const s = Math.min(parseInt(m[2] ?? "0", 10), SLIDES[i].steps - 1);
  return [i, s];
}

export default function Deck() {
  const [[slide, step], setPos] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    setPos(parseHash());
    const onHash = () => setPos(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${slide}.${step}`);
  }, [slide, step]);

  const next = useCallback(() => {
    setPos(([i, s]) => {
      if (s < SLIDES[i].steps - 1) return [i, s + 1];
      if (i < SLIDES.length - 1) return [i + 1, 0];
      return [i, s];
    });
  }, []);

  const prev = useCallback(() => {
    setPos(([i, s]) => {
      if (s > 0) return [i, s - 1];
      if (i > 0) return [i - 1, SLIDES[i - 1].steps - 1];
      return [i, s];
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        setPos([0, 0]);
      } else if (e.key === "End") {
        setPos([SLIDES.length - 1, 0]);
      } else if (e.key.toLowerCase() === "f") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const { C, id } = SLIDES[slide];
  const progress =
    (SLIDES.slice(0, slide).reduce((a, s) => a + s.steps, 0) + step + 1) /
    SLIDES.reduce((a, s) => a + s.steps, 0);

  return (
    <main
      className="relative h-screen w-screen cursor-default select-none"
      onClick={next}
      onContextMenu={(e) => {
        e.preventDefault();
        prev();
      }}
    >
      {/* progress hairline */}
      <motion.div
        className="absolute left-0 top-0 z-20 h-[3px] bg-[var(--accent-bright)]"
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.3 }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          className="h-full w-full"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <C step={step} />
        </motion.div>
      </AnimatePresence>

      {/* footer: rule + logo + page number */}
      <div className="absolute bottom-0 left-0 right-0 z-20 mx-[6vw] flex items-center justify-between border-t border-[var(--border)] py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/xpc-logo-mark.png"
          alt="XPC"
          className="h-[30px] w-auto"
        />
        <div className="mono text-xs text-[var(--muted)]">
          {slide + 1} / {SLIDES.length}
        </div>
      </div>
    </main>
  );
}
