"use client";

import { useEffect, useRef, useState } from "react";

// Loads the extracted Vega-Lite step specs + datasets once, then embeds
// whichever step is active. Specs come straight from the published
// notebook (mta_fun.html); datasets are injected client-side so each
// spec file stays small.

type Loaded = {
  specs: Record<string, unknown>[];
  datasets: Record<string, unknown[]>;
};

let cache: Promise<Loaded> | null = null;

function load(): Promise<Loaded> {
  if (!cache) {
    cache = Promise.all([
      fetch("/mta/specs.json").then((r) => r.json()),
      fetch("/mta/trains.json").then((r) => r.json()),
      fetch("/mta/wait.json").then((r) => r.json()),
    ]).then(([specs, trains, wait]) => ({
      specs,
      datasets: {
        "data-d3105286bcccbefdc15a140652b11999": trains,
        "data-ceeb53a9c0d3361a127d31cb55306698": wait,
      },
    }));
  }
  return cache;
}

export default function VegaChart({
  specIndex = 0,
  spec: directSpec,
  maxScale = 1.8,
  className,
}: {
  specIndex?: number;
  spec?: Record<string, unknown>; // render this spec directly (skips /mta assets)
  maxScale?: number; // cap when scaling up to fill the container
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let dead = false;
    let fin: (() => void) | undefined;
    const specPromise = directSpec
      ? Promise.resolve(directSpec)
      : load().then(({ specs, datasets }) => ({ ...specs[specIndex], datasets }));
    Promise.all([specPromise, import("vega-embed")]).then(
      ([loaded, { default: embed }]) => {
        if (dead || !ref.current) return;
        const spec = loaded as Parameters<typeof embed>[1];
        embed(ref.current, spec, {
          actions: false,
          renderer: "svg",
        }).then((res) => {
          if (dead) {
            res.finalize();
            return;
          }
          fin = () => res.finalize();
          // scale the rendered SVG (crisply, it's vector) to fill the box
          const el = ref.current;
          const box = boxRef.current;
          if (el && box) {
            const w = el.offsetWidth;
            const h = el.offsetHeight;
            if (w > 0 && h > 0) {
              setScale(
                Math.min(box.clientWidth / w, box.clientHeight / h, maxScale)
              );
            }
          }
        });
      }
    );
    return () => {
      dead = true;
      fin?.();
    };
  }, [specIndex, directSpec, maxScale]);

  return (
    <div
      ref={boxRef}
      className={`flex h-full w-full items-center justify-center ${className ?? ""}`}
    >
      <div style={{ transform: `scale(${scale})` }}>
        <div ref={ref} />
      </div>
    </div>
  );
}
