/**
 * Turns every file in boards/ into a finished JPEG in out/.
 *
 *   node render.mjs
 *
 * You should not need to change anything in this file. The one thing you might:
 * SIZES, just below, if a screen in the building is not 1920x1080.
 *
 * Before writing a picture it checks the three things that go wrong in real life:
 * text running off the screen, a font that failed to load, an image that failed
 * to load. Any of those and it says so, by name, and exits with an error.
 */
import fs from "node:fs"
import path from "node:path"
import { pathToFileURL, fileURLToPath } from "node:url"
import { chromium } from "playwright"

/** `scale` is the root font size. Every size in board.css is relative to it, so
    this one number moves all the type together. */
const SIZES = {
  "1080p": { width: 1920, height: 1080, scale: 26 },
  "4k": { width: 3840, height: 2160, scale: 52 },
  portrait: { width: 1080, height: 1920, scale: 22 },
}

const DEFAULT_SIZE = "1080p"
const here = path.dirname(fileURLToPath(import.meta.url))
const boardsDir = path.join(here, "boards")
const outDir = path.join(here, "out")

const warnings = []

async function main() {
  const files = fs
    .readdirSync(boardsDir)
    .filter((file) => file.endsWith(".html"))
    .sort()

  if (!files.length) {
    console.error(`No boards found in ${boardsDir}`)
    process.exit(1)
  }

  fs.mkdirSync(outDir, { recursive: true })
  const browser = await chromium.launch({ headless: true })

  for (const file of files) {
    const slug = file.replace(/\.html$/, "")
    const html = fs.readFileSync(path.join(boardsDir, file), "utf8")

    const declared = /<meta\s+name=["']board:size["']\s+content=["']([^"']+)["']/i.exec(html)?.[1] ?? DEFAULT_SIZE
    const size = SIZES[declared]
    if (!size) {
      fail(slug, `asks for size "${declared}", which does not exist. Choose one of: ${Object.keys(SIZES).join(", ")}`)
      continue
    }

    const page = await browser.newPage({ viewport: { width: size.width, height: size.height } })
    const failedRequests = []
    page.on("requestfailed", (request) => failedRequests.push(request.url()))

    await page.goto(pathToFileURL(path.join(boardsDir, file)).href, { waitUntil: "load", timeout: 60_000 })
    await page.addStyleTag({ content: `html { font-size: ${size.scale}px; } .board { width: ${size.width}px; height: ${size.height}px; }` })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(150)

    for (const problem of await check(page)) fail(slug, problem)
    for (const url of new Set(failedRequests)) fail(slug, `could not load ${url}`)

    const outFile = path.join(outDir, `${slug}.jpg`)
    await page.screenshot({ path: outFile, type: "jpeg", quality: 92, clip: { x: 0, y: 0, ...size } })
    await page.close()

    console.log(`${slug}.jpg  ${size.width}x${size.height}`)
  }

  await browser.close()

  if (warnings.length) {
    console.log(`\n${warnings.length} problem${warnings.length === 1 ? "" : "s"} to fix:`)
    for (const line of warnings) console.log(`  - ${line}`)
    console.log("\nThe pictures were still written, but do not put them on a screen until these are clear.")
    process.exit(1)
  }

  console.log("\nAll boards fit, every font loaded, every image loaded.")
}

function fail(slug, message) {
  warnings.push(`${slug}: ${message}`)
  console.warn(`  ! ${message}`)
}

/** Everything below runs inside the page, where it can measure the real layout. */
function check(page) {
  return page.evaluate(() => {
    const problems = []
    const TOLERANCE = 1.5
    const describe = (el) => {
      const text = (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 34)
      return `<${el.tagName.toLowerCase()}${el.className ? `.${String(el.className).split(" ")[0]}` : ""}>${text ? ` "${text}"` : ""}`
    }
    const inFlow = (el) => {
      const style = getComputedStyle(el)
      return style.position !== "absolute" && style.position !== "fixed" && style.display !== "none"
    }

    const board = document.querySelector(".board")
    if (!board) return ['no element with class="board" — nothing can be measured or sized']

    // Does anything stick out past the edge of the screen? Absolutely positioned
    // things are skipped: running a glow off the edge is a choice, not a mistake.
    const inner = board.querySelector(".safe") ?? board
    const style = getComputedStyle(inner)
    const rect = inner.getBoundingClientRect()
    const limit = {
      left: rect.left + parseFloat(style.paddingLeft),
      right: rect.right - parseFloat(style.paddingRight),
      top: rect.top + parseFloat(style.paddingTop),
      bottom: rect.bottom - parseFloat(style.paddingBottom),
    }

    let worst = null
    const walk = (parent) => {
      for (const child of parent.children) {
        if (!inFlow(child)) continue
        const box = child.getBoundingClientRect()
        const over = Math.max(box.right - limit.right, limit.left - box.left, box.bottom - limit.bottom, limit.top - box.top)
        if (over > TOLERANCE && (!worst || over > worst.over)) worst = { el: describe(child), over }
        walk(child)
      }
    }
    walk(inner)

    if (worst) {
      // Too much content is one problem, not thirty. When the board overflows,
      // every element inside it also reports being squeezed, and a wall of
      // warnings is a wall nobody reads. Report the cause and stop.
      problems.push(
        `${worst.el} runs ${Math.round(worst.over)}px outside the screen. Remove an item, shorten a description, or split this into two boards.`,
      )
    } else {
      // Text wider than the box holding it gets silently chopped off. Only the
      // innermost offenders are reported — a parent is only too narrow because
      // its child is.
      const clipped = []
      for (const el of document.querySelectorAll(".board *")) {
        if (!inFlow(el)) continue
        const over = el.scrollWidth - el.clientWidth
        if (over > TOLERANCE && el.clientWidth > 0 && ![...el.querySelectorAll("*")].some((i) => !inFlow(i))) {
          clipped.push({ el, over })
        }
      }
      clipped
        .filter((c) => !clipped.some((other) => other.el !== c.el && c.el.contains(other.el)))
        .sort((a, b) => b.over - a.over)
        .slice(0, 3)
        .forEach((c) => {
          problems.push(`${describe(c.el)} is ${Math.round(c.over)}px too wide for its box, so the text is being cut off.`)
        })
    }

    // A web font that fails to load does not announce itself. The browser quietly
    // substitutes something else and the board just looks a bit wrong.
    const systemFonts = new Set(["sans-serif", "serif", "monospace", "system-ui", "arial", "helvetica", "georgia"])
    const substituted = new Set()
    for (const el of document.querySelectorAll(".board *")) {
      const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim()
      if (!text) continue
      const css = getComputedStyle(el)
      const family = css.fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, "")
      if (!family || systemFonts.has(family.toLowerCase())) continue
      if (!document.fonts.check(`${css.fontStyle} ${css.fontWeight} 16px "${family}"`, text.slice(0, 200))) {
        substituted.add(family)
      }
    }
    for (const family of substituted) {
      problems.push(`the font "${family}" did not load, so the board is showing a substitute. Check the internet connection.`)
    }

    for (const img of document.querySelectorAll("img")) {
      if (!img.complete || img.naturalWidth === 0) problems.push(`the image "${img.getAttribute("src")}" did not load.`)
    }

    return problems
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
