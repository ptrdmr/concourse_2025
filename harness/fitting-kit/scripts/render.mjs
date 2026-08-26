/**
 * Renders every board in boards/ to finished artwork in out/.
 *
 *   npm run render                        everything
 *   npm run render -- --only=happy-hour   just boards whose name contains that
 *   npm run render -- --outputs=pdf       override the file types
 *   npm run render -- --guides            draw trim and safe-area guides on print sizes
 *   npm run render -- --quality=95        JPEG quality, 1-100
 *
 * Before writing a file it checks the things that actually go wrong in practice:
 * content spilling off the page, images that failed to load, and fonts that
 * silently fell back to Arial. Those are reported as warnings with the board
 * name, and the run finishes with a non-zero exit code if any appeared.
 */
import fs from "node:fs"
import path from "node:path"
import { chromium } from "playwright"
import { pathToFileURL } from "node:url"
import {
  dirs,
  loadBrand,
  loadFormats,
  loadContent,
  resolveFormat,
  readBoardMeta,
  listBoards,
  parseArgs,
  HarnessError,
  rel,
  slugify,
} from "../lib/config.mjs"
import { render as renderTemplate } from "../lib/template.mjs"
import { buildTokens } from "./build-tokens.mjs"

const args = parseArgs(process.argv.slice(2))
const JPEG_QUALITY = Number(args.quality ?? 92)
const SHOW_GUIDES = Boolean(args.guides)

const warnings = []
function warn(board, message) {
  warnings.push(`${board}: ${message}`)
  console.warn(`  ! ${message}`)
}

/** Injected into every board so the CSS knows the real page geometry. */
function pageStyle(format, fontScale) {
  const pdfW = (format.cssW / 96).toFixed(4)
  const pdfH = (format.cssH / 96).toFixed(4)
  return `<style id="flyer-page">
  @page { size: ${pdfW}in ${pdfH}in; margin: 0; }
  :root {
    --page-w: ${format.pageW}px;
    --page-h: ${format.pageH}px;
    --bleed: ${format.bleedPx}px;
    --safe: ${format.safePx}px;
    --dpi: ${format.dpi};
  }
  html { font-size: ${fontScale}px; }
  html, body { margin: 0; padding: 0; background: #000; }
</style>`
}

const GUIDE_STYLE = `<style id="flyer-guides">
  .board::after {
    content: '';
    position: absolute;
    inset: var(--bleed);
    outline: 1px dashed rgba(255, 0, 128, 0.9);
    z-index: 999;
    pointer-events: none;
  }
  .board::before {
    content: '';
    position: absolute;
    inset: calc(var(--bleed) + var(--safe));
    outline: 1px dashed rgba(0, 200, 255, 0.7);
    z-index: 999;
    pointer-events: none;
  }
</style>`

function injectHead(html, injection) {
  if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, (tag) => `${tag}\n${injection}`)
  if (/<html[^>]*>/i.test(html)) return html.replace(/<html[^>]*>/i, (tag) => `${tag}\n<head>\n${injection}\n</head>`)
  return `${injection}\n${html}`
}

function boardTasks(board, html, meta, formats, brand) {
  const formatNames = (meta.formats ?? meta.format ?? "")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)

  if (!formatNames.length) {
    throw new HarnessError(
      `boards/${board.slug}.html does not say what size it is.\n` +
        `  Add this to its <head>:  <meta name="flyer:format" content="card-5x7">`,
    )
  }

  const content = meta.content ? loadContent(meta.content) : {}
  const outputs = (args.outputs ? String(args.outputs) : meta.outputs || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)

  const repeatPath = meta["for-each"]
  let iterations = [{ suffix: "", item: null, index: 0 }]

  if (repeatPath) {
    const list = repeatPath.split(".").reduce((value, key) => (value == null ? value : value[key]), { brand, content })
    if (!Array.isArray(list)) {
      throw new HarnessError(
        `boards/${board.slug}.html repeats over "${repeatPath}" but that is not a list.\n` +
          `  Expected an array in ${meta.content ? `content/${meta.content}.json` : "the content file"}.`,
      )
    }
    if (!list.length) {
      throw new HarnessError(`boards/${board.slug}.html repeats over "${repeatPath}" but the list is empty.`)
    }
    iterations = list.map((item, index) => ({
      suffix: `-${slugify(item?.slug ?? item?.name ?? item?.title ?? String(index + 1))}`,
      item,
      index,
    }))
  }

  const tasks = []
  for (const formatName of formatNames) {
    const format = resolveFormat(formatName, formats)
    const fontScale = Number(meta.scale ?? format.fontScale)
    for (const iteration of iterations) {
      tasks.push({
        board,
        html,
        meta,
        format,
        fontScale,
        content,
        item: iteration.item,
        index: iteration.index,
        outputs: outputs.length ? outputs : format.outputs,
        outSlug: `${board.slug}${iteration.suffix}${formatNames.length > 1 ? `--${formatName}` : ""}`,
      })
    }
  }
  return tasks
}

async function inspectPage(page, format) {
  return page.evaluate((scaleFactor) => {
    const describe = (el) => {
      const classes = [...el.classList].slice(0, 2).map((c) => `.${c}`).join("")
      const text = (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 40)
      return `<${el.tagName.toLowerCase()}${classes}>${text ? ` "${text}"` : ""}`
    }

    /**
     * Does anything spill out of the space it was given?
     *
     * Absolutely positioned elements are skipped, because deliberately running
     * a glow or a colour band past the edge is a design decision, not a mistake.
     * Everything in normal flow is measured against its container's content box,
     * so on a print size, drifting into the safe margin counts as a spill.
     */
    const overflow = []
    const TOLERANCE = 1.5
    const inFlow = (el) => {
      const style = getComputedStyle(el)
      return style.position !== "absolute" && style.position !== "fixed" && style.display !== "none"
    }

    for (const container of document.querySelectorAll(".board, .safe, [data-fit]")) {
      const style = getComputedStyle(container)
      const rect = container.getBoundingClientRect()
      const box = {
        left: rect.left + parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft),
        right: rect.right - parseFloat(style.borderRightWidth) - parseFloat(style.paddingRight),
        top: rect.top + parseFloat(style.borderTopWidth) + parseFloat(style.paddingTop),
        bottom: rect.bottom - parseFloat(style.borderBottomWidth) - parseFloat(style.paddingBottom),
      }

      let worst = null
      const walk = (parent) => {
        for (const child of parent.children) {
          if (!inFlow(child)) continue
          const childRect = child.getBoundingClientRect()
          const overX = Math.max(childRect.right - box.right, box.left - childRect.left)
          const overY = Math.max(childRect.bottom - box.bottom, box.top - childRect.top)
          const worse = Math.max(overX, overY)
          if (worse > TOLERANCE && (!worst || worse > Math.max(worst.overX, worst.overY))) {
            worst = { el: describe(child), overX, overY }
          }
          walk(child)
        }
      }
      walk(container)

      if (worst) overflow.push({ container: describe(container), ...worst })
    }

    /**
     * Separately: text wider than the box holding it. This is the one that gets
     * silently clipped, because the box itself stays put and only the words get
     * cut off — a longer day name in a fixed-width panel, for instance.
     *
     * Only horizontal, deliberately. A tight line-height makes every heading
     * report a few pixels of vertical overflow that nobody can see, and warnings
     * nobody acts on are worse than no warnings.
     */
    const found = []
    if (!overflow.length) {
      // Skipped entirely when something already overflows its container: every
      // element inside an overflowing box also reports being squeezed, and one
      // real problem reported thirty times is a problem nobody reads.
      for (const el of document.querySelectorAll("body *")) {
        if (!inFlow(el)) continue
        const over = el.scrollWidth - el.clientWidth
        if (over > TOLERANCE && el.clientWidth > 0) {
          const hasAbsolute = [...el.querySelectorAll("*")].some((inner) => !inFlow(inner))
          if (!hasAbsolute) found.push({ el, over })
        }
      }
    }
    // A parent is only too narrow because its child is, so report the innermost.
    const clipped = found
      .filter((candidate) => !found.some((other) => other.el !== candidate.el && candidate.el.contains(other.el)))
      .sort((a, b) => b.over - a.over)
      .slice(0, 3)
      .map((candidate) => ({ el: describe(candidate.el), over: candidate.over }))

    const generic = new Set([
      "sans-serif", "serif", "monospace", "cursive", "fantasy", "system-ui", "ui-sans-serif",
      "ui-serif", "ui-monospace", "-apple-system", "blinkmacsystemfont", "arial", "helvetica",
      "helvetica neue", "georgia", "times new roman", "courier new", "arial narrow", "verdana",
      "tahoma", "segoe ui", "inherit", "initial",
    ])
    /**
     * Did every font actually arrive? A missing web font does not fail loudly —
     * the browser quietly substitutes something else and the artwork looks
     * subtly wrong. The check has to use the real weight, style and text of each
     * element, because a font can have its bold loaded and its regular missing.
     */
    const missingFonts = new Set()
    for (const el of document.querySelectorAll("body *")) {
      const text = [...el.childNodes]
        .filter((node) => node.nodeType === 3)
        .map((node) => node.textContent)
        .join("")
        .trim()
      if (!text) continue

      const style = getComputedStyle(el)
      const family = style.fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, "")
      if (!family || generic.has(family.toLowerCase())) continue

      const shorthand = `${style.fontStyle} ${style.fontWeight} 16px "${family}"`
      if (!document.fonts.check(shorthand, text.slice(0, 200))) missingFonts.add(family)
    }

    const brokenImages = []
    const lowResImages = []
    for (const img of document.querySelectorAll("img")) {
      const src = img.getAttribute("src") || "(no src)"
      if (!img.complete || img.naturalWidth === 0) {
        brokenImages.push(src)
        continue
      }
      // Vector art scales for free; only bitmaps can run out of pixels.
      if (/\.svg(\?|$)/i.test(src)) continue
      const displayedWidth = img.getBoundingClientRect().width
      const needed = Math.round(displayedWidth * scaleFactor)
      if (needed > 0 && img.naturalWidth < needed * 0.9) {
        lowResImages.push({ src, have: img.naturalWidth, needed })
      }
    }

    const boardCount = document.querySelectorAll(".board").length

    return { overflow, clipped, missingFonts: [...missingFonts], brokenImages, lowResImages, boardCount }
  }, format.scaleFactor)
}

async function main() {
  buildTokens({ quiet: true })

  const brand = loadBrand()
  const formats = loadFormats()

  let boards = listBoards()
  if (!boards.length) throw new HarnessError(`No boards found in ${rel(dirs.boards)}. Create one with: npm run new`)
  if (args.only) {
    const needle = String(args.only).toLowerCase()
    boards = boards.filter((board) => board.slug.toLowerCase().includes(needle))
    if (!boards.length) throw new HarnessError(`No board name contains "${args.only}".`)
  }

  fs.mkdirSync(dirs.build, { recursive: true })
  fs.mkdirSync(dirs.out, { recursive: true })

  const baseHref = `${pathToFileURL(dirs.boards).href}/`
  const browser = await chromium.launch({ headless: true })
  const written = []

  try {
    for (const board of boards) {
      const source = fs.readFileSync(board.file, "utf8")
      const meta = readBoardMeta(source)
      const tasks = boardTasks(board, source, meta, formats, brand)

      for (const task of tasks) {
        const { format } = task
        console.log(
          `${task.outSlug}  ${format.label}  ${format.pixelWidth}x${format.pixelHeight}px @ ${format.dpi}dpi  [${task.outputs.join(", ")}]`,
        )

        const result = renderTemplate(task.html, {
          brand,
          content: task.content,
          item: task.item,
          index: task.index,
          format: {
            name: format.name,
            label: format.label,
            width: format.pixelWidth,
            height: format.pixelHeight,
            dpi: format.dpi,
            isPrint: format.unit !== "px",
          },
          now: {
            year: String(new Date().getFullYear()),
            date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          },
        })

        for (const missing of result.missing) {
          warn(task.outSlug, `{{ ${missing} }} has no value, so it printed as nothing.`)
        }
        for (const problem of result.problems) warn(task.outSlug, problem)

        let html = injectHead(result.html, `<base href="${baseHref}">`)
        html = injectHead(html, pageStyle(format, task.fontScale))
        if (SHOW_GUIDES && format.bleedPx > 0) html = injectHead(html, GUIDE_STYLE)

        const workFile = path.join(dirs.build, `${task.outSlug}.html`)
        fs.writeFileSync(workFile, html, "utf8")

        const page = await browser.newPage({
          viewport: { width: format.cssW, height: format.cssH },
          deviceScaleFactor: format.scaleFactor,
        })

        const failed = []
        page.on("requestfailed", (request) => failed.push(request.url()))
        page.on("response", (response) => {
          if (response.status() >= 400) failed.push(`${response.url()} (HTTP ${response.status()})`)
        })
        page.on("pageerror", (error) => warn(task.outSlug, `JavaScript error on the page: ${error.message}`))

        await page.goto(pathToFileURL(workFile).href, { waitUntil: "load", timeout: 60_000 })
        await page.evaluate(() => document.fonts.ready)
        await page.waitForTimeout(200)

        const checks = await inspectPage(page, format)

        if (checks.boardCount === 0) {
          warn(task.outSlug, 'no element with class="board" was found, so the page geometry is not being applied.')
        }
        for (const spill of checks.overflow) {
          const parts = []
          if (spill.overX > 1.5) parts.push(`${Math.round(spill.overX)}px too wide`)
          if (spill.overY > 1.5) parts.push(`${Math.round(spill.overY)}px too tall`)
          warn(
            task.outSlug,
            `${spill.el} does not fit inside ${spill.container} — ${parts.join(" and ")}. ` +
              `Shorten the copy, or lower this board's flyer:scale.`,
          )
        }
        for (const clip of checks.clipped) {
          warn(task.outSlug, `${clip.el} is ${Math.round(clip.over)}px wider than its box, so the text is being cut off.`)
        }
        for (const family of checks.missingFonts) {
          warn(task.outSlug, `the font "${family}" did not load and something else was substituted.`)
        }
        for (const image of checks.brokenImages) warn(task.outSlug, `the image "${image}" did not load.`)
        for (const image of checks.lowResImages) {
          warn(
            task.outSlug,
            `"${image.src}" is only ${image.have}px wide but needs about ${image.needed}px at this size, so it will look soft.`,
          )
        }
        for (const url of [...new Set(failed)]) {
          warn(task.outSlug, `failed to fetch ${url.startsWith("file:") ? rel(new URL(url).pathname.slice(1)) : url}`)
        }

        const transparent = task.meta.transparent === "true"

        for (const output of task.outputs) {
          if (output === "jpeg" || output === "png") {
            const file = path.join(dirs.out, `${task.outSlug}.${output === "jpeg" ? "jpg" : "png"}`)
            const options = { path: file, type: output }
            if (output === "jpeg") options.quality = JPEG_QUALITY
            if (output === "png" && transparent) options.omitBackground = true
            if (format.fullPage) options.fullPage = true
            else options.clip = { x: 0, y: 0, width: format.cssW, height: format.cssH }
            await page.screenshot(options)
            written.push({ file, task, output })
          }

          if (output === "pdf") {
            const file = path.join(dirs.out, `${task.outSlug}.pdf`)
            await page.emulateMedia({ media: "screen" })
            await page.pdf({
              path: file,
              width: `${(format.cssW / 96).toFixed(4)}in`,
              height: `${(format.cssH / 96).toFixed(4)}in`,
              printBackground: true,
              pageRanges: "1",
              margin: { top: 0, right: 0, bottom: 0, left: 0 },
            })
            written.push({ file, task, output })
          }
        }

        await page.close()
      }
    }
  } finally {
    await browser.close()
  }

  writeContactSheet(written)

  console.log(`\nWrote ${written.length} file${written.length === 1 ? "" : "s"} to ${rel(dirs.out)}`)
  console.log(`Review them all at once: ${rel(path.join(dirs.out, "index.html"))}`)

  if (warnings.length) {
    console.log(`\n${warnings.length} warning${warnings.length === 1 ? "" : "s"} — the files were written, but check these:`)
    for (const message of warnings) console.log(`  - ${message}`)
    process.exitCode = 1
  } else {
    console.log("\nNo warnings. Nothing overflowed, every font loaded, every image resolved.")
  }
}

/** A plain gallery page so a human can eyeball every piece before it goes to print. */
function writeContactSheet(written) {
  const cards = written
    .map(({ file, task, output }) => {
      const name = path.basename(file)
      const preview =
        output === "pdf"
          ? `<div class="pdf">PDF<span>${task.format.pageW / 96}in x ${task.format.pageH / 96}in</span></div>`
          : `<img src="./${name}" alt="${name}" loading="lazy">`
      return `<figure>
      <a href="./${name}">${preview}</a>
      <figcaption><strong>${name}</strong><span>${task.format.label} — ${task.format.pixelWidth}x${task.format.pixelHeight} @ ${task.format.dpi}dpi</span></figcaption>
    </figure>`
    })
    .join("\n    ")

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Rendered artwork</title>
<style>
  body { margin: 0; padding: 32px; background: #14171a; color: #fff; font: 15px/1.5 system-ui, sans-serif; }
  h1 { font-size: 20px; font-weight: 600; margin: 0 0 4px; }
  p.sub { margin: 0 0 28px; color: rgba(255,255,255,0.6); }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
  figure { margin: 0; background: #1d2126; border-radius: 10px; overflow: hidden; }
  img { display: block; width: 100%; height: auto; background: repeating-conic-gradient(#2a2f35 0% 25%, #23272c 0% 50%) 50%/20px 20px; }
  .pdf { display: grid; place-content: center; aspect-ratio: 4/3; background: #2a2f35; font: 600 22px/1.2 system-ui; letter-spacing: .08em; gap: 6px; text-align: center; }
  .pdf span { display: block; font: 400 13px system-ui; color: rgba(255,255,255,0.6); letter-spacing: 0; }
  figcaption { padding: 12px 14px 14px; display: grid; gap: 3px; }
  figcaption span { color: rgba(255,255,255,0.55); font-size: 13px; }
  a { color: inherit; text-decoration: none; }
</style>
</head>
<body>
  <h1>Rendered artwork</h1>
  <p class="sub">${written.length} file${written.length === 1 ? "" : "s"} — generated ${new Date().toLocaleString()}</p>
  <div class="grid">
    ${cards}
  </div>
</body>
</html>
`
  fs.writeFileSync(path.join(dirs.out, "index.html"), html, "utf8")
}

main().catch((error) => {
  console.error(error instanceof HarnessError ? `\n${error.message}\n` : error)
  process.exit(1)
})
