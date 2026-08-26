/**
 * Builds concept HTML, then renders via Playwright to:
 *   - JPEG at 2550×3300 (8.5×11 @ 300dpi, trim)
 *   - PDF at 8.75×11.25 (with 0.125in bleed)
 *
 * Usage:
 *   node exports/menu-concepts/lib/render.mjs
 *   node exports/menu-concepts/lib/render.mjs --only=marquee
 *   node exports/menu-concepts/lib/render.mjs --marks
 */
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { buildAll } from './build.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outDir = path.join(root, 'out')

const TRIM_IN = { w: 8.5, h: 11 }
const BLEED_IN = 0.125
const DPI = 300
const SCALE = DPI / 96 // 3.125
const CSS_W = Math.round((TRIM_IN.w * 96)) // 816
const CSS_H = Math.round((TRIM_IN.h * 96)) // 1056
const OUT_W = Math.round(TRIM_IN.w * DPI) // 2550
const OUT_H = Math.round(TRIM_IN.h * DPI) // 3300
const PDF_W_IN = TRIM_IN.w + BLEED_IN * 2 // 8.75
const PDF_H_IN = TRIM_IN.h + BLEED_IN * 2 // 11.25
const TV_W = 1920
const TV_H = 1080

function parseArgs(argv) {
  const out = {}
  for (const a of argv) {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/)
    if (m) out[m[1]] = m[2] ?? true
    else out[a] = true
  }
  return out
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const only = typeof args.only === 'string' ? args.only : undefined
  const marks = Boolean(args.marks)

  fs.mkdirSync(outDir, { recursive: true })

  console.log('Building HTML…')
  const built = await buildAll({ only })

  const browser = await chromium.launch({ headless: true })
  const problems = []

  for (const { name, side, kind, outPath, outName } of built) {
    const slug = `${name}-${side}`
    const isTv = kind === 'tv'
    // TV screens are captured at native 1920×1080 (the display's own resolution)
    const vw = isTv ? TV_W : CSS_W
    const vh = isTv ? TV_H : CSS_H
    const page = await browser.newPage({
      viewport: { width: vw, height: vh },
      deviceScaleFactor: isTv ? 1 : SCALE,
    })

    const url = pathToFileURL(outPath).href
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })
    await page.evaluate(async () => {
      await document.fonts.ready
      // Nudge load of families actually used on the page
      const families = new Set()
      for (const el of document.querySelectorAll('body, body *')) {
        const primary = getComputedStyle(el).fontFamily.split(',')[0].replace(/['"]/g, '').trim()
        if (primary) families.add(primary)
      }
      await Promise.all(
        [...families].map((f) => document.fonts.load(`700 16px "${f}"`).catch(() => null)),
      )
      await document.fonts.ready
    })
    await page.waitForTimeout(400)

    // Overflow check: content taller than the .page shell
    const overflow = await page.evaluate(() => {
      const pageEl = document.querySelector('.page')
      if (!pageEl) return { missing: true }
      const scrollH = pageEl.scrollHeight
      const clientH = pageEl.clientHeight
      const scrollW = pageEl.scrollWidth
      const clientW = pageEl.clientWidth
      return {
        missing: false,
        overflowY: scrollH > clientH + 1,
        overflowX: scrollW > clientW + 1,
        scrollH,
        clientH,
        scrollW,
        clientW,
      }
    })

    if (overflow.missing) {
      problems.push(`${slug}: no .page element found`)
    } else if (overflow.overflowY || overflow.overflowX) {
      problems.push(
        `${slug}: content overflows page` +
          (overflow.overflowY ? ` (height ${overflow.scrollH} > ${overflow.clientH})` : '') +
          (overflow.overflowX ? ` (width ${overflow.scrollW} > ${overflow.clientW})` : ''),
      )
    }

    // Font check — warn if a primary family used on the page has no loaded face.
    // Prefer FontFaceSet entries over fonts.check(), which can false-negative
    // for some Google Fonts weights even when the face is active.
    const fontIssues = await page.evaluate(() => {
      const generics = new Set([
        'serif',
        'sans-serif',
        'monospace',
        'cursive',
        'fantasy',
        'system-ui',
        'ui-sans-serif',
        'ui-serif',
        'ui-monospace',
        'emoji',
        'math',
        'fangsong',
      ])
      const used = new Set()
      for (const el of document.querySelectorAll('body, body *')) {
        const primary = getComputedStyle(el).fontFamily.split(',')[0].replace(/['"]/g, '').trim()
        if (primary && !generics.has(primary.toLowerCase())) used.add(primary)
      }
      const loaded = new Set()
      for (const face of document.fonts) {
        if (face.status === 'loaded') loaded.add(face.family.replace(/['"]/g, ''))
      }
      return [...used].filter((f) => !loaded.has(f))
    })
    for (const f of fontIssues) {
      problems.push(`${slug}: font not loaded: ${f}`)
    }

    // Neutralise the screen-preview chrome (body padding / centering / shadow)
    // so the .page sits exactly at (0,0). Without this the clip below captures
    // 30px of body background at the top and cuts the bottom 30px of the page.
    await page.addStyleTag({
      content: `
        body {
          padding: 0 !important;
          margin: 0 !important;
          display: block !important;
          min-height: 0 !important;
          background: transparent !important;
        }
        .page {
          margin: 0 !important;
          box-shadow: none !important;
        }
      `,
    })

    const jpgPath = path.join(outDir, `${slug}.jpg`)
    await page.screenshot({
      path: jpgPath,
      type: 'jpeg',
      quality: 92,
      clip: { x: 0, y: 0, width: vw, height: vh },
    })
    console.log(
      'Wrote',
      path.relative(root, jpgPath),
      isTv ? `(${TV_W}×${TV_H})` : `(${OUT_W}×${OUT_H})`,
    )

    // TV screens are a web deliverable — no print PDF needed
    if (isTv) {
      await page.close()
      continue
    }

    // PDF with bleed: expand page slightly and print
    if (marks) {
      await page.addStyleTag({
        content: `
          .page::after {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            box-shadow:
              inset 0 0 0 0.5px rgba(0,180,255,0.5);
          }
          body::before, body::after {
            content: '';
            position: fixed;
            pointer-events: none;
            z-index: 9999;
          }
        `,
      })
    }

    // Expand body for bleed capture via PDF page size.
    // Concepts with a .bleed-layer (full-bleed art) already paint into the
    // 0.125in margin — don't cover that with a flat colour ring.
    const hasBleedArt = await page.evaluate(() => !!document.querySelector('.page .bleed-layer'))
    const bleedPageCss = hasBleedArt
      ? `.page {
          overflow: visible !important;
          box-shadow: none !important;
          outline: none !important;
        }
        .ch-art-stage {
          overflow: visible !important;
        }`
      : `.page {
          box-shadow: none !important;
          outline: ${BLEED_IN}in solid transparent;
          outline-offset: 0;
        }
        .page {
          box-shadow:
            0 0 0 ${BLEED_IN}in var(--bleed-color, var(--page-bg, #000)) !important;
        }`

    await page.addStyleTag({
      content: `
        @page { size: ${PDF_W_IN}in ${PDF_H_IN}in; margin: 0; }
        html, body {
          width: ${PDF_W_IN * 96}px;
          height: ${PDF_H_IN * 96}px;
          margin: 0;
          padding: 0;
          background: transparent !important;
        }
        body {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          padding: 0 !important;
          min-height: 0 !important;
        }
        ${bleedPageCss}
      `,
    })

    const pdfPath = path.join(outDir, `${slug}.pdf`)
    await page.pdf({
      path: pdfPath,
      width: `${PDF_W_IN}in`,
      height: `${PDF_H_IN}in`,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: false,
    })
    console.log('Wrote', path.relative(root, pdfPath))

    await page.close()
  }

  await browser.close()

  if (problems.length) {
    console.warn('\n⚠ Checks:')
    for (const p of problems) console.warn('  -', p)
  } else {
    console.log('\nAll pages passed overflow & font checks.')
  }

  console.log('Done. Output:', outDir)
  console.log(`(Trim JPEG ${OUT_W}×${OUT_H}; PDF ${PDF_W_IN}×${PDF_H_IN}in with ${BLEED_IN}in bleed)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
