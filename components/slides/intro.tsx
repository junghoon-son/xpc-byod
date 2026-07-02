"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import Scatter from "@/components/scatter";
import { Reveal, SlideShell } from "@/components/shell";
import TITLE_LOTTIE from "@/lib/title-lottie";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

/* ── Slide 1: Title ─────────────────────────────────────────────── */

export function TitleSlide() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-[6vw] text-center">
      {/* breathing bar chart, Lottie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="pointer-events-none absolute bottom-[13vh] w-[min(24rem,40vw)]"
      >
        <Lottie animationData={TITLE_LOTTIE} loop autoplay />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[clamp(2.6rem,6.5vw,5.6rem)] font-bold leading-[1.08]"
      >
        Working with Data
        <br />
        in the Age of <span className="text-[var(--accent)]">GenAI</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-[4vh] text-[clamp(1.2rem,2.6vw,2rem)] font-semibold"
      >
        a parallel from data visualization:{" "}
        <motion.span
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 140 }}
          className="inline-block text-[var(--dec)]"
        >
          Declarative
        </motion.span>{" "}
        <motion.em
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 240 }}
          className="inline-block text-[0.8em] text-[var(--muted)]"
        >
          vs.
        </motion.em>{" "}
        <motion.span
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.05, type: "spring", stiffness: 140 }}
          className="inline-block text-[var(--imp)]"
        >
          Imperative
        </motion.span>
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.9 }}
        className="mono absolute bottom-[9vh] text-sm text-[var(--muted)]"
      >
        → to advance
      </motion.p>
    </div>
  );
}

/* ── Slide 2: Why I care (subsection) ───────────────────────────── */

export const WHYVIZ_STEPS = 3;

export function WhyVizSlide({ step }: { step: number }) {
  return (
    <div className="flex h-full items-center gap-[4vw] px-[6vw]">
      <div className="min-w-0 flex-1">
        <Reveal show={step >= 0}>
          <p className="whitespace-nowrap text-[clamp(1.4rem,2.9vw,2.3rem)] font-bold leading-[1.35]">
            I love information display.
            <br />I love data visualizations.
          </p>
        </Reveal>
        <Reveal show={step >= 1}>
          <p className="mt-[4vh] whitespace-nowrap text-[clamp(0.95rem,1.9vw,1.5rem)] leading-relaxed text-[var(--muted)]">
            I see parallels with the{" "}
            <span className="font-semibold text-[var(--accent)]">
              “grammar of graphics”
            </span>
            <br />
            and the modern transition to{" "}
            <span className="font-semibold text-[var(--ink)]">
              LLM-based vibecoding
            </span>
            .
          </p>
        </Reveal>
        <Reveal show={step >= 2}>
          <p className="mt-[1.5vh] whitespace-nowrap text-[clamp(0.95rem,1.9vw,1.5rem)] leading-relaxed">
            A way to <em className="text-[var(--dec)]">“express”</em> what I
            understand about data.
          </p>
        </Reveal>
      </div>
      <Reveal
        show={step >= 1}
        className="flex flex-1 items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gog-cover.jpg"
          alt="The Grammar of Graphics, Second Edition — Leland Wilkinson"
          className="max-h-[62vh] w-auto rounded-md border border-[var(--border)] shadow-[0_20px_50px_rgba(32,38,44,0.25)]"
        />
      </Reveal>
    </div>
  );
}

/* ── Slide 3: Two ways to ask ───────────────────────────────────── */

const IMESSAGE_BLUE = "#0a84ff";
const IMESSAGE_GRAY = "#e9e9eb";

function Bubble({
  children,
  show,
  delay = 0,
  from = "me",
}: {
  children: React.ReactNode;
  show: boolean;
  delay?: number;
  from?: "me" | "them";
}) {
  const me = from === "me";
  return (
    <motion.div
      initial={false}
      animate={
        show
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.6, y: 12 }
      }
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
        delay: show ? delay : 0,
      }}
      style={{
        background: me ? IMESSAGE_BLUE : IMESSAGE_GRAY,
        transformOrigin: me ? "bottom right" : "bottom left",
      }}
      className={`max-w-[85%] rounded-2xl px-3.5 py-1.5 text-[clamp(0.8rem,1.5vw,1.05rem)] leading-snug ${
        me
          ? "self-end rounded-br-[5px] text-white"
          : "self-start rounded-bl-[5px] text-[#111]"
      }`}
    >
      {children}
    </motion.div>
  );
}

/* Classic AIM on Windows XP: blue title bar, beige chrome, Times messages. */
const AIM_CHROME_FONT = 'Tahoma, "Segoe UI", Arial, sans-serif';
const AIM_MSG_FONT = '"Times New Roman", Times, serif';

function AimMessage({
  show,
  delay,
  children,
}: {
  show: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={show ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.15, delay: show ? delay : 0 }}
      className="text-[clamp(0.85rem,1.55vw,1.1rem)] leading-snug text-black"
      style={{ fontFamily: AIM_MSG_FONT }}
    >
      <span className="font-bold text-[#d40000]">
        xX_jung_Xx{" "}
        <span className="text-[0.75em] font-normal text-[#7a7a7a]">
          (4:12 PM)
        </span>
        :
      </span>{" "}
      {children}
    </motion.div>
  );
}

function AimWindow({
  children,
  draft,
}: {
  children: React.ReactNode;
  draft?: string;
}) {
  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-t-md border border-[#0842a0] bg-[#ece9d8] shadow-[0_18px_40px_rgba(32,38,44,0.25)]"
      style={{ fontFamily: AIM_CHROME_FONT }}
    >
      {/* XP title bar */}
      <div
        className="flex items-center justify-between px-2 py-1"
        style={{
          background:
            "linear-gradient(180deg,#0a6cf1 0%,#3f97ff 10%,#1c7bf5 45%,#0d63d9 92%,#0a55c0 100%)",
        }}
      >
        <span
          className="flex items-center gap-1.5 text-[0.78rem] font-bold text-white"
          style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.55)" }}
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#ffd21f] text-[0.6rem]">
            🏃
          </span>
          matplotlib — Instant Message
        </span>
        <span className="flex gap-[3px]">
          {["–", "□", "✕"].map((c, i) => (
            <span
              key={c}
              className={`flex h-4 w-4 items-center justify-center rounded-[3px] border border-white/70 text-[0.6rem] font-bold text-white ${
                i === 2 ? "bg-[#e0654a]" : "bg-[#2e77e5]"
              }`}
            >
              {c}
            </span>
          ))}
        </span>
      </div>
      {/* menu bar */}
      <div className="border-b border-[#aca899] px-2 py-0.5 text-[0.68rem] text-black">
        <span className="mr-3">File</span>
        <span className="mr-3">Edit</span>
        <span className="mr-3">Insert</span>
        <span>People</span>
      </div>
      {/* message area */}
      <div className="mx-1.5 mt-1.5 flex min-h-0 flex-1 flex-col justify-end gap-1.5 border border-[#7f9db9] bg-white px-2.5 py-2">
        {children}
      </div>
      {/* formatting bar */}
      <div className="mx-1.5 mt-1 flex items-center gap-2 border border-[#aca899] bg-[#f4f2e8] px-2 py-0.5 text-[0.68rem] text-black">
        <span style={{ fontFamily: AIM_MSG_FONT }}>Times New Roman</span>
        <span className="text-[#7a7a7a]">▾</span>
        <span className="font-bold">B</span>
        <span className="italic">I</span>
        <span className="underline">U</span>
        <span>🙂</span>
      </div>
      {/* input box */}
      <div className="mx-1.5 my-1.5 flex items-end justify-between gap-2">
        <div
          className="min-h-[2.4em] flex-1 border border-[#7f9db9] bg-white px-2 py-1 text-[0.8rem] text-black"
          style={{ fontFamily: AIM_MSG_FONT }}
        >
          {draft}
          <span className="blink">|</span>
        </div>
        <span
          className="rounded-[3px] border border-[#003c74] bg-gradient-to-b from-[#fefefe] to-[#d8d4c8] px-3 py-1 text-[0.72rem] font-bold text-black"
          style={{ boxShadow: "inset 0 0 0 1px #fff" }}
        >
          Send
        </span>
      </div>
    </div>
  );
}

/* A macOS Messages window: traffic lights, contact header, chat, input bar. */
function MessagesWindow({
  contact,
  avatar,
  children,
  draft,
}: {
  contact: string;
  avatar: string;
  children: React.ReactNode;
  draft?: string;
}) {
  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-[#d5d5d8] bg-white shadow-[0_18px_40px_rgba(32,38,44,0.18)]"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* title bar */}
      <div className="relative flex items-center border-b border-[#e3e3e6] bg-[#f6f6f8] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d8dce1] text-[0.75rem]">
            {avatar}
          </span>
          <span className="text-[0.8rem] font-semibold text-[#3c3c40]">
            {contact}
          </span>
        </div>
      </div>
      {/* chat area */}
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 px-3 pb-3">
        <div className="mono pt-3 text-center text-[0.6rem] uppercase tracking-wide text-[#98989d]">
          Today 9:41 AM
        </div>
        {children}
      </div>
      {/* input bar */}
      <div className="border-t border-[#ececef] bg-white px-3 py-2">
        <div className="flex items-center justify-between rounded-full border border-[#d9d9de] px-3.5 py-1 text-[0.8rem]">
          {draft ? (
            <span className="truncate text-[#111]">
              {draft}
              <span className="blink">|</span>
            </span>
          ) : (
            <span className="text-[#b0b0b5]">iMessage</span>
          )}
          <span className="ml-2 text-[#b0b0b5]">🎤</span>
        </div>
      </div>
    </div>
  );
}

/* Pokémon-card style label that slams in over one half of the slide. */
function EraCard({
  show,
  title,
  sub,
  color,
  tilt,
  delay = 0,
}: {
  show: boolean;
  title: string;
  sub: string;
  color: string;
  tilt: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={false}
      animate={
        show
          ? { opacity: 1, scale: 1, rotate: tilt, y: 0 }
          : { opacity: 0, scale: 0.25, rotate: tilt * 4, y: 40 }
      }
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 15,
        delay: show ? delay : 0,
      }}
      className="rounded-2xl bg-gradient-to-br from-[#f5c542] via-[#fdf6d8] to-[#c9a227] p-[6px] shadow-[0_30px_70px_rgba(20,24,28,0.5)]"
    >
      <div className="rounded-xl bg-white px-[2.5vw] py-[3vh] text-center">
        <div
          className="text-[clamp(1.4rem,2.9vw,2.4rem)] font-bold leading-tight"
          style={{ color }}
        >
          {title}
        </div>
        <div className="mono mt-2 text-[clamp(0.65rem,1.2vw,0.85rem)] uppercase tracking-[0.25em] text-[var(--muted)]">
          {sub}
        </div>
      </div>
    </motion.div>
  );
}

/* Fixed sparkle field so the glints don't jump between renders. */
const SPARKLES = [
  [8, 12], [22, 6], [38, 18], [55, 9], [72, 14], [88, 8],
  [12, 38], [30, 52], [50, 44], [68, 58], [86, 40],
  [18, 74], [42, 82], [60, 70], [80, 86], [92, 66],
].map(([x, y], i) => ({ x, y, delay: (i * 0.37) % 2.2, size: 0.6 + ((i * 7) % 5) / 6 }));

/* The Declarative half evolves into a sparkly holographic Pokémon card. */
function HoloCard({ show, delay = 0 }: { show: boolean; delay?: number }) {
  return (
    <motion.div
      initial={false}
      animate={
        show
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.2, y: 60 }
      }
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 16,
        delay: show ? delay : 0,
      }}
      style={{ perspective: 900 }}
    >
      {/* continuous 3D holo wobble */}
      <motion.div
        animate={
          show
            ? {
                rotateY: [-10, 10, -10],
                rotateX: [5, -5, 5],
              }
            : {}
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[clamp(240px,19vw,300px)] rounded-2xl bg-gradient-to-br from-[#f8d347] via-[#fff7cf] to-[#c9a227] p-[10px] shadow-[0_35px_80px_rgba(20,24,28,0.55)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative overflow-hidden rounded-xl bg-[#f7f1dc] px-3 pb-3 pt-2">
          {/* header */}
          <div
            className="flex items-baseline justify-between"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <span className="text-[1.05rem] font-bold italic text-[#1a1a1a]">
              Declarative
            </span>
            <span className="text-[0.85rem] font-bold text-[#c02020]">
              HP 200 <span className="text-[0.8em]">⚡</span>
            </span>
          </div>
          {/* art window: holo gradient + the chart as the creature */}
          <div className="relative mt-1 overflow-hidden rounded border-[3px] border-[#c9a227]">
            <motion.div
              animate={show ? { filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] } : {}}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg,#ffb6f5 0%,#b78cff 22%,#7cc9ff 45%,#8dffd9 68%,#fff59c 88%,#ffb6f5 100%)",
              }}
            />
            <div className="relative">
              <Scatter frame={false} dots axes instant width={250} />
            </div>
          </div>
          <div
            className="mt-1 text-center text-[0.6rem] italic text-[#5a4a1a]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Stage 2 · Evolves from Imperative
          </div>
          {/* moves */}
          <div className="mt-1.5 space-y-1.5" style={{ fontFamily: "Georgia, serif" }}>
            <div className="flex items-baseline justify-between border-t border-[#d8cfa8] pt-1.5">
              <span className="text-[0.78rem] font-bold">🟢 Declare Intent</span>
              <span className="text-[0.85rem] font-bold">90</span>
            </div>
            <p className="text-[0.62rem] leading-snug text-[#3a3a3a]">
              Say what you want. The engine owns every step.
            </p>
            <div className="flex items-baseline justify-between border-t border-[#d8cfa8] pt-1.5">
              <span className="text-[0.78rem] font-bold">✨ Vibecode</span>
              <span className="text-[0.85rem] font-bold">200</span>
            </div>
            <p className="text-[0.62rem] leading-snug text-[#3a3a3a]">
              Ask in English. Flip a coin — either way, the chart arrives whole.
            </p>
          </div>
          {/* holo sheen sweeping across the card */}
          <motion.div
            animate={show ? { backgroundPosition: ["0% 0%", "200% 200%"] } : {}}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,120,220,0.5) 42%, rgba(120,220,255,0.55) 50%, rgba(160,255,190,0.45) 58%, transparent 70%)",
              backgroundSize: "250% 250%",
              mixBlendMode: "color-dodge",
            }}
          />
          {/* sparkles */}
          {SPARKLES.map((s, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute text-white"
              animate={show ? { opacity: [0, 1, 0], scale: [0.4, 1.15, 0.4] } : { opacity: 0 }}
              transition={{ duration: 1.9, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                fontSize: `${s.size}rem`,
                textShadow: "0 0 6px rgba(255,255,255,0.95), 0 0 14px rgba(255,220,120,0.8)",
              }}
            >
              ✦
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TwoWaysSlide({ step }: { step: number }) {
  return (
    <SlideShell kicker="the core idea" title="Two ways to ask for a chart">
      <div className="relative h-full">
      {/* white flash on the reveal */}
      <motion.div
        initial={false}
        animate={step >= 2 ? { opacity: [0, 0.9, 0] } : { opacity: 0 }}
        transition={step >= 2 ? { duration: 0.55, times: [0, 0.2, 1] } : {}}
        className="pointer-events-none absolute inset-[-6vw] z-20 bg-white"
      />
      <motion.div
        initial={false}
        animate={{
          filter: step >= 2 ? "grayscale(1) brightness(0.55)" : "none",
        }}
        transition={{ duration: 0.6 }}
        className="grid h-full grid-cols-2 items-stretch gap-[3vw] pb-[3vh]">
        <Reveal show={step >= 0} className="flex h-full min-h-0 flex-col">
          <div className="mb-1 text-[clamp(1.5rem,3vw,2.4rem)] font-bold text-[var(--imp)]">
            Imperative
          </div>
          <div className="mono mb-3 text-[clamp(0.7rem,1.3vw,0.9rem)] uppercase tracking-widest text-[var(--muted)]">
            “do these steps”
          </div>
          <AimWindow draft='ax.set_ylabel("Wind (m/s'>
            <AimMessage show={step >= 0} delay={0.2}>
              Open a blank window.
            </AimMessage>
            <AimMessage show={step >= 0} delay={0.7}>
              Draw a dot at (34, 210). Draw a dot at (81, 177). …
            </AimMessage>
            <AimMessage show={step >= 0} delay={1.2}>
              Now draw two lines for the axes. Write <em>temperature</em> under
              the bottom one.
            </AimMessage>
            <AimMessage show={step >= 0} delay={1.7}>
              Label the X axis “Max temperature (°C)”.
            </AimMessage>
          </AimWindow>
          <p className="mt-3 text-[clamp(0.8rem,1.4vw,1rem)] italic text-[var(--muted)]">
            You own every step, the order, and every detail you forgot.
          </p>
        </Reveal>
        <Reveal show={step >= 1} className="flex h-full min-h-0 flex-col">
          <div className="mb-1 text-[clamp(1.5rem,3vw,2.4rem)] font-bold text-[var(--dec)]">
            Declarative
          </div>
          <div className="mono mb-3 text-[clamp(0.7rem,1.3vw,0.9rem)] uppercase tracking-widest text-[var(--muted)]">
            “here’s what I want”
          </div>
          <MessagesWindow contact="Altair" avatar="📊">
            <Bubble show={step >= 1} delay={0.4}>
              Scatter plot. Temperature on X, wind on Y.
            </Bubble>
            <motion.div
              initial={false}
              animate={step >= 1 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: step >= 1 ? 0.9 : 0 }}
              className="self-end pr-1 text-[0.65rem] font-medium text-[#98989d]"
            >
              Delivered
            </motion.div>
            <Bubble show={step >= 1} delay={1.4} from="them">
              <div className="py-1">
                <Scatter frame dots axes labels width={230} instant />
              </div>
            </Bubble>
          </MessagesWindow>
          <p className="mt-3 text-[clamp(0.8rem,1.4vw,1rem)] italic text-[var(--muted)]">
            The engine owns the steps. You own the intent.
          </p>
        </Reveal>
      </motion.div>

      {/* era cards slam in over each half */}
      {step >= 2 && (
        <div className="absolute inset-0 z-30 grid grid-cols-2 items-center gap-[3vw]">
          <div className="flex justify-center">
            <EraCard
              show={step >= 2}
              delay={0.15}
              title="Old-school data analysis"
              sub="basic · you type every step"
              color="var(--imp)"
              tilt={-4}
            />
          </div>
          <div className="flex justify-center">
            <HoloCard show={step >= 2} delay={0.45} />
          </div>
        </div>
      )}
      </div>
    </SlideShell>
  );
}
