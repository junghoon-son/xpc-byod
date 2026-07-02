"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export type CodeLine = {
  text: string;
  step?: number; // step at which this line becomes the active one
};

/* Lightweight Python-ish syntax highlighting (One Dark-ish palette). */
const TOKEN_RE =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(#.*$)|\b(import|from|as|def|return|lambda|True|False|None|and|or|not|if|else|for|in|while|class|with)\b|\b(\d+(?:\.\d+)?)\b|([A-Za-z_][A-Za-z0-9_]*)(?=\()/g;

const TOKEN_STYLES: Record<string, React.CSSProperties> = {
  str: { color: "#98d982" },
  com: { color: "#8b95a5", fontStyle: "italic" },
  kw: { color: "#cf9bf5" },
  num: { color: "#f0a45d" },
  fn: { color: "#6fc0ff" },
};

/* Types the line out character by character, then switches to the
   highlighted rendering. `delay` staggers lines typed in the same step. */
function TypedLine({ text, delay }: { text: string; delay: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(interval);
      }, 16);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay]);
  if (n >= text.length) return <Highlight text={text} />;
  return (
    <>
      {text.slice(0, n)}
      <span className="blink">▌</span>
    </>
  );
}

function Highlight({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const kind = m[1] ? "str" : m[2] ? "com" : m[3] ? "kw" : m[4] ? "num" : "fn";
    out.push(
      <span key={m.index} style={TOKEN_STYLES[kind]}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

type Props = {
  lines: CodeLine[];
  step?: number;
  accent?: string; // highlight color for the active line
  label?: string; // little filename/badge on top
  labelColor?: string;
  fontSize?: string;
  dimFuture?: boolean; // hide lines whose step is still ahead
  typewriter?: boolean; // type out the lines that just became active
};

export default function CodeBlock({
  lines,
  step = Infinity,
  accent = "var(--accent)",
  label,
  labelColor = "#8f8b7e",
  fontSize = "clamp(0.7rem, 1.5vw, 0.95rem)",
  dimFuture = true,
  typewriter = false,
}: Props) {
  // stagger typing when several lines share the active step
  let typeDelay = 0;
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--code-border)] bg-[var(--code-bg)] shadow-[0_2px_16px_rgba(26,25,21,0.12)]">
      {label && (
        <div
          className="mono border-b border-[#26251f] px-4 py-2 text-xs"
          style={{ color: labelColor }}
        >
          {label}
        </div>
      )}
      <pre
        className="mono px-0 py-3 leading-relaxed text-[var(--code-ink)]"
        style={{ fontSize }}
      >
        {lines.map((l, i) => {
          const active = l.step !== undefined && l.step === step;
          const future = dimFuture && l.step !== undefined && l.step > step;
          const typed = typewriter && active && l.text;
          const delay = typeDelay;
          if (typed) typeDelay += l.text.length * 16 + 150;
          return (
            <motion.div
              key={i}
              animate={{
                opacity: future ? 0.16 : active ? 1 : 0.72,
                backgroundColor: active
                  ? "rgba(58,164,220,0.14)"
                  : "rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.25 }}
              className="px-4"
              style={{
                borderLeft: active
                  ? `3px solid ${accent}`
                  : "3px solid transparent",
                whiteSpace: "pre",
              }}
            >
              {typed ? (
                <TypedLine key={`t${step}`} text={l.text} delay={delay} />
              ) : l.text ? (
                <Highlight text={l.text} />
              ) : (
                " "
              )}
            </motion.div>
          );
        })}
      </pre>
    </div>
  );
}
