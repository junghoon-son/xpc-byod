// Screenshot every slide (at its final step) for a quick visual pass.
// Usage: node scripts/screenshot.mjs [baseUrl] [outDir]
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = process.argv[3] ?? "shots";

const POSITIONS = [
  "0.0", "1.2", "2.2", "2.5", "2.6", "3.1", "3.3", "4.1", "5.2",
  "6.2", "7.0", "8.2", "9.2", "10.2", "11.2", "12.1", "13.2", "14.0",
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });

for (const pos of POSITIONS) {
  await page.goto(`${BASE}/#${pos}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `${OUT}/s${pos}.png` });
  console.log("shot", pos);
}

await browser.close();
