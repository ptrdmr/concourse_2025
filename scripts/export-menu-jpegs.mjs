/**
 * Renders static menu HTML from /public as JPEGs.
 * Most boards are 1920×1080; portrait menus (e.g. 5×7 @ 300dpi) set width/height per entry.
 * Run: pnpm exec playwright install chromium  (first time only)
 *      node scripts/export-menu-jpegs.mjs
 */
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')
const outDir = path.join(root, 'exports', 'menu-jpegs')

const MENUS = [
  { slug: 'draft_1', file: 'draft_1.html', width: 1920, height: 1080 },
  { slug: 'draft_2', file: 'draft_2.html', width: 1920, height: 1080 },
  { slug: 'bottles_cans', file: 'bottles_cans.html', width: 1920, height: 1080 },
  { slug: 'wines', file: 'wines.html', width: 1920, height: 1080 },
  /** 5×7 in portrait at 300dpi */
  { slug: 'bottles_wines_5x7', file: 'bottles_wines_5x7.html', width: 1500, height: 2100 },
]

async function main() {
  fs.mkdirSync(outDir, { recursive: true })

  const browser = await chromium.launch({ headless: true })

  for (const { slug, file, width, height } of MENUS) {
    const htmlPath = path.join(publicDir, file)
    if (!fs.existsSync(htmlPath)) {
      console.warn('Skip (missing):', htmlPath)
      continue
    }

    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
    })

    const url = pathToFileURL(htmlPath).href
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })

    const outFile = path.join(outDir, `${slug}.jpg`)
    await page.screenshot({
      path: outFile,
      type: 'jpeg',
      quality: 92,
      clip: { x: 0, y: 0, width, height },
    })

    await page.close()
    console.log('Wrote', path.relative(root, outFile))
  }

  await browser.close()
  console.log('Done. Output:', outDir)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
