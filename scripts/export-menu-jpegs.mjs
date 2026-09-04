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
  { slug: 'front_tv', file: 'front-tv.html', width: 1920, height: 1080 },
  { slug: 'back_tv', file: 'back-tv.html', width: 1920, height: 1080 },
  { slug: 'bottles_cans', file: 'bottles_cans.html', width: 1920, height: 1080 },
  { slug: 'wines', file: 'wines.html', width: 1920, height: 1080 },
  /** 5×7 portrait at 300dpi */
  { slug: 'bottles_wines_5x7', file: 'bottles_wines_5x7.html', width: 1500, height: 2100 },
  { slug: 'happy_hour_fall2026', file: 'happy_hour_fall2026.html', width: 1500, height: 2100 },
  { slug: 'specialty_cocktails_fall2026', file: 'specialty_cocktails_fall2026.html', width: 1500, height: 2100 },
  { slug: 'happy_hour_banner', file: 'happy_hour_banner.html', width: 1920, height: 270 },
  { slug: 'happy_hour_banner_1280', file: 'happy_hour_banner_1280.html', width: 1280, height: 328 },
  { slug: 'summer_monday', file: 'summer_monday.html', width: 1920, height: 270 },
  { slug: 'summer_tue_thu', file: 'summer_tue_thu.html', width: 1920, height: 270 },
  { slug: 'summer_friday', file: 'summer_friday.html', width: 1920, height: 270 },
  { slug: 'summer_saturday', file: 'summer_saturday.html', width: 1920, height: 270 },
  { slug: 'summer_sunday', file: 'summer_sunday.html', width: 1920, height: 270 },
  { slug: 'summer_monday_1280', file: 'summer_monday_1280.html', width: 1280, height: 328 },
  { slug: 'summer_tue_thu_1280', file: 'summer_tue_thu_1280.html', width: 1280, height: 328 },
  { slug: 'summer_friday_1280', file: 'summer_friday_1280.html', width: 1280, height: 328 },
  { slug: 'summer_saturday_1280', file: 'summer_saturday_1280.html', width: 1280, height: 328 },
  { slug: 'summer_sunday_1280', file: 'summer_sunday_1280.html', width: 1280, height: 328 },
  { slug: 'fall_tue_thu', file: 'fall_tue_thu.html', width: 1920, height: 270 },
  { slug: 'fall_friday', file: 'fall_friday.html', width: 1920, height: 270 },
  { slug: 'fall_tue_thu_1280', file: 'fall_tue_thu_1280.html', width: 1280, height: 328 },
  { slug: 'fall_friday_1280', file: 'fall_friday_1280.html', width: 1280, height: 328 },
  { slug: 'fall_flyer_1080', file: 'fall_flyer_1080.html', width: 1920, height: 1080 },
  { slug: 'fall_flyer_480x810', file: 'fall_flyer_480x810.html', width: 480, height: 810 },
  { slug: 'fall_flyer_608x1080', file: 'fall_flyer_608x1080.html', width: 608, height: 1080 },
  { slug: 'fall_layout_a', file: 'fall_layout_a.html', width: 1920, height: 1080 },
  { slug: 'fall_layout_b', file: 'fall_layout_b.html', width: 1920, height: 1080 },
  /** 5×7 portrait at 300dpi — laneside ordering flyer */
  { slug: 'laneside_ordering', file: 'laneside_ordering.html', width: 1500, height: 2100 },
  /** Reservation page mockup — full-page capture (kept out of public/ so it cannot shadow /reservations) */
  { slug: 'reservations', file: 'exports/reservations-mockup.html', fromRoot: true, width: 1280, fullPage: true },
  /** 11×8.5 landscape door sign at 300dpi */
  { slug: 'july4_weekend_hours_sign', file: 'july4_weekend_hours_sign.html', width: 3300, height: 2550 },
  /** 8.5×11 portrait cafe menu at 300dpi (CSS sized in inches; scale up from 96dpi) */
  { slug: 'menu_front', file: 'menu_front.html', width: 2550, height: 3300, scale: 3.125 },
  { slug: 'menu_back', file: 'menu_back.html', width: 2550, height: 3300, scale: 3.125 },
  /** Fall reconfigure drafts — distinct slugs so current menu_front/back.jpgs stay as reference */
  {
    slug: 'menu_front_fall',
    file: 'exports/menu-fall-reconfigure/menu_front.html',
    fromRoot: true,
    width: 2550,
    height: 3300,
    scale: 3.125,
  },
  {
    slug: 'menu_back_fall',
    file: 'exports/menu-fall-reconfigure/menu_back.html',
    fromRoot: true,
    width: 2550,
    height: 3300,
    scale: 3.125,
  },
  {
    slug: 'menu_fall_changelog',
    file: 'exports/menu-fall-reconfigure/changelog.html',
    fromRoot: true,
    width: 2550,
    height: 3300,
    scale: 3.125,
  },
  {
    slug: 'front_tv_fall',
    file: 'exports/menu-fall-reconfigure/front_tv.html',
    fromRoot: true,
    width: 1920,
    height: 1080,
  },
  {
    slug: 'back_tv_fall',
    file: 'exports/menu-fall-reconfigure/back_tv.html',
    fromRoot: true,
    width: 1920,
    height: 1080,
  },
]

async function main() {
  fs.mkdirSync(outDir, { recursive: true })

  const filter = new Set(process.argv.slice(2))
  const menus = filter.size ? MENUS.filter((m) => filter.has(m.slug)) : MENUS

  const browser = await chromium.launch({ headless: true })

  for (const { slug, file, width, height, fullPage, scale, fromRoot } of menus) {
    const htmlPath = fromRoot ? path.join(root, file) : path.join(publicDir, file)
    if (!fs.existsSync(htmlPath)) {
      console.warn('Skip (missing):', htmlPath)
      continue
    }

    // When `scale` is set, the page is laid out in CSS px (e.g. inches at 96dpi)
    // and we render at deviceScaleFactor to reach the target output resolution.
    const useScale = typeof scale === 'number' && scale > 0
    const cssW = useScale ? Math.round(width / scale) : width
    const cssH = useScale ? Math.round(height / scale) : (height || 1080)

    const page = await browser.newPage({
      viewport: { width: cssW, height: cssH },
      deviceScaleFactor: useScale ? scale : 1,
    })

    const url = pathToFileURL(htmlPath).href
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })
    await page.evaluate(() => document.fonts.ready)

    const outFile = path.join(outDir, `${slug}.jpg`)
    const screenshotOpts = { path: outFile, type: 'jpeg', quality: 92 }
    if (fullPage) {
      screenshotOpts.fullPage = true
    } else {
      screenshotOpts.clip = { x: 0, y: 0, width: cssW, height: cssH }
    }
    await page.screenshot(screenshotOpts)

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
