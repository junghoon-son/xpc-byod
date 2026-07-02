// Deterministic pseudo Seattle-weather sample: wind vs. max temperature,
// tagged by quarter. Mirrors the dataset used in the Polars book's
// 07_Data_Visualization.ipynb (vega_datasets seattle_weather).

export type Point = {
  temp: number; // temp_max, °C
  wind: number; // m/s
  quarter: 1 | 2 | 3 | 4;
  outlier?: boolean;
};

// Small seeded LCG so the "random" scatter is identical on every render.
function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rand = lcg(42);

const QUARTER_TEMP: Record<number, [number, number]> = {
  1: [2, 12],
  2: [12, 24],
  3: [22, 36],
  4: [6, 16],
};

export const POINTS: Point[] = [];

for (let q = 1 as 1 | 2 | 3 | 4; q <= 4; q++) {
  const [lo, hi] = QUARTER_TEMP[q];
  for (let i = 0; i < 14; i++) {
    const temp = lo + rand() * (hi - lo);
    // Windier when colder, plus noise.
    const wind = Math.max(0.4, 7.5 - temp * 0.13 + (rand() - 0.5) * 4);
    POINTS.push({
      temp: Math.round(temp * 10) / 10,
      wind: Math.round(wind * 10) / 10,
      quarter: q,
    });
  }
}

// One story-worthy outlier: a cold, violently windy day.
POINTS.push({ temp: 7.2, wind: 11.3, quarter: 4, outlier: true });

export const QUARTER_COLORS: Record<number, string> = {
  1: "#3d7ea6",
  2: "#0e7a5f",
  3: "#d9a03f",
  4: "#b3452f",
};

export const X_MAX = 40; // temp axis
export const Y_MAX = 12; // wind axis
