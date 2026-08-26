/**
 * Layout diagnostics for a concept: how far content reaches, and whether
 * any item header has wrapped onto a second line.
 * Usage: node exports/menu-concepts/lib/_measure.mjs [concept-slug]
 */
import { chromium } from 'playwright'
import { pathToFileURL, fileURLToPath } from 'url'
import path from 'path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const slug = process.argv[2] || '04-chroma'
const browser = await chromium.launch({ headless: true })

for (const side of ['front', 'back']) {
  const file = path.join(root, 'build', `${slug}-${side}.html`)
  const page = await browser.newPage({ viewport: { width: 816, height: 1056 } })
  await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  const m = await page.evaluate(() => {
    const pageEl = document.querySelector('.page')
    const pageTop = pageEl.getBoundingClientRect().top
    const rel = (el) => {
      if (!el) return null
      const b = el.getBoundingClientRect()
      return { top: Math.round(b.top - pageTop), bottom: Math.round(b.bottom - pageTop) }
    }

    // Lowest piece of real content on the page
    let lowest = 0
    let lowestName = ''
    for (const el of document.querySelectorAll('.ch-item, .ch-byo-cat, .ch-byo-base, .ch-footer')) {
      const b = rel(el)
      if (b && b.bottom > lowest) {
        lowest = b.bottom
        lowestName = el.className
      }
    }

    // Item headers that wrapped to more than one line
    const wrapped = []
    for (const h of document.querySelectorAll('.ch-item-head')) {
      const name = h.querySelector('.ch-name')
      if (!name) continue
      const lineH = parseFloat(getComputedStyle(name).lineHeight) || 14
      if (h.getBoundingClientRect().height > lineH * 1.6) {
        wrapped.push(name.textContent.trim())
      }
    }

    return {
      field: rel(document.querySelector('.ch-field')),
      lowest,
      lowestName,
      wrapped,
      pageH: pageEl.clientHeight,
    }
  })

  console.log(`\n===== ${slug} ${side.toUpperCase()} =====`)
  console.log(`panel bottom      : ${m.field.bottom}`)
  console.log(`lowest content    : ${m.lowest}  (${m.lowestName})`)
  console.log(`unused below panel: ${m.field.bottom - m.lowest}px`)
  console.log(`wrapped headers   : ${m.wrapped.length ? m.wrapped.join(' | ') : 'none'}`)

  await page.close()
}

await browser.close()
