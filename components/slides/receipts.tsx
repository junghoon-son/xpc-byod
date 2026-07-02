"use client";

import { Punchline, Reveal, SlideShell } from "@/components/shell";

// Steps: 0 screenshot · 1 caption · 2 punchline
export const RECEIPTS_STEPS = 3;

export function ReceiptsSlide({ step }: { step: number }) {
  return (
    <SlideShell
      kicker="receipts"
      title="This slide ordered its own data"
    >
      <div className="grid h-full grid-cols-[1.5fr_1fr] items-start gap-[2.5vw]">
        <div className="overflow-hidden rounded-xl border border-[var(--border)] shadow-[0_2px_20px_rgba(26,25,21,0.14)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/declarative-proof.png"
            alt="Screenshot: asking Claude, mid-build, to download and combine 11 years of EPA criteria-gas daily summaries — in one English sentence"
            className="block max-h-[62vh] w-full object-contain object-top"
          />
        </div>
        <div className="pt-[1vh]">
          <Reveal show={step >= 1}>
            <p className="text-[clamp(0.95rem,1.8vw,1.3rem)] leading-relaxed">
              Mid-build of this very deck, one sentence in English:{" "}
              <em>
                “download the EPA Daily Summary Data, Criteria Gases,
                2015–2025 — save it, extract each, combine it for analysis.”
              </em>
            </p>
            <p className="mt-4 text-[clamp(0.85rem,1.5vw,1.1rem)] italic text-[var(--muted)]">
              44 files · 4 gases · 11 years · 11,098,089 rows → one Parquet,
              fetched and assembled in the background while the slides kept
              building. No scraper written. No schema studied first.
            </p>
          </Reveal>
          <Punchline show={step >= 2}>
            That’s a declarative pipeline. The spec was a sentence.
          </Punchline>
        </div>
      </div>
    </SlideShell>
  );
}
