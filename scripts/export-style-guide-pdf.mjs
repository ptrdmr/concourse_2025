/**
 * Renders the Fall 2026 happy-hour style guide to a letter PDF.
 *
 * First time on a machine:
 *   pnpm exec playwright install chromium
 *
 * Then:
 *   node scripts/export-style-guide-pdf.mjs
 *
 * Output: exports/style-guide/fall-2026-happy-hour.pdf
 *
 * You can also open the HTML in a browser and Print → Save as PDF.
 * Turn on "Background graphics" or the red rails will vanish.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(
  root,
  "exports",
  "style-guide",
  "fall-2026-happy-hour.html",
);
const outPath = path.join(
  root,
  "exports",
  "style-guide",
  "fall-2026-happy-hour.pdf",
);

async function main() {
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Missing ${htmlPath}`);
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 816, height: 1056 },
  });

  await page.goto(pathToFileURL(htmlPath).href, {
    waitUntil: "networkidle",
    timeout: 60_000,
  });
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: outPath,
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });

  await browser.close();
  console.log("Wrote", path.relative(root, outPath));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
