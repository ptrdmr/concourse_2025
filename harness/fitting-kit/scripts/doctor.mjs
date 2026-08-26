/**
 * Checks everything that can be checked without opening a browser, and explains
 * each problem in plain language.
 *
 *   npm run check
 *
 * Run this after editing brand.json or a content file. It is much faster than a
 * full render and it catches the mistakes that actually happen: a typo in a
 * format name, a content file that was renamed, a placeholder pointing at a
 * field that no longer exists.
 */
import fs from "node:fs"
import path from "node:path"
import {
  dirs,
  loadBrand,
  loadFormats,
  loadContent,
  resolveFormat,
  readBoardMeta,
  listBoards,
  HarnessError,
  rel,
} from "../lib/config.mjs"
import { render as renderTemplate } from "../lib/template.mjs"

const problems = []
const notes = []

function problem(where, message) {
  problems.push({ where, message })
}
function note(where, message) {
  notes.push({ where, message })
}

function checkBrand() {
  let brand
  try {
    brand = loadBrand()
  } catch (error) {
    problem("brand/brand.json", error.message)
    return null
  }

  const required = [
    ["business.name", brand.business?.name],
    ["colors.bg", brand.colors?.bg],
    ["colors.ink", brand.colors?.ink],
    ["colors.brand", brand.colors?.brand],
    ["colors.accent", brand.colors?.accent],
  ]
  for (const [field, value] of required) {
    if (!value) problem("brand/brand.json", `"${field}" is missing, and boards rely on it.`)
  }

  for (const [role, definition] of Object.entries(brand.fonts ?? {})) {
    if (role.startsWith("$")) continue
    if (!definition?.stack) {
      problem("brand/brand.json", `font "${role}" has no "stack", so nothing can use it.`)
      continue
    }
    if (!definition.google && !definition.url && !definition.local) {
      note(
        "brand/brand.json",
        `font "${role}" is not loaded from anywhere. That is fine for system fonts like Arial or Georgia, but a custom font needs "google", "url" or "local" or it will silently fall back.`,
      )
    }
  }

  for (const [name, file] of Object.entries(brand.assets ?? {})) {
    if (name.startsWith("$")) continue
    if (!fs.existsSync(path.join(dirs.root, file))) {
      problem("brand/brand.json", `asset "${name}" points at ${file}, which does not exist.`)
    }
  }

  if (brand.business?.name === "Northgate Social") {
    note("brand/brand.json", "still set to the example business. Fill in brand/business.md, then update this file.")
  }

  return brand
}

function describeBoards(brand, formats) {
  const boards = listBoards()
  if (!boards.length) {
    problem("boards/", "there are no boards yet. Create one with: npm run new")
    return []
  }

  const summary = []

  for (const board of boards) {
    const where = `boards/${board.slug}.html`
    const html = fs.readFileSync(board.file, "utf8")
    const meta = readBoardMeta(html)

    const formatNames = (meta.formats ?? meta.format ?? "").split(",").map((n) => n.trim()).filter(Boolean)
    if (!formatNames.length) {
      problem(where, 'no size declared. Add <meta name="flyer:format" content="card-5x7"> to the <head>.')
      continue
    }

    const resolved = []
    for (const name of formatNames) {
      try {
        resolved.push(resolveFormat(name, formats))
      } catch (error) {
        problem(where, error.message)
      }
    }
    if (resolved.length !== formatNames.length) continue

    let content = {}
    if (meta.content) {
      try {
        content = loadContent(meta.content)
      } catch (error) {
        problem(where, error.message)
        continue
      }
    }

    let repeatCount = 1
    if (meta["for-each"]) {
      const list = meta["for-each"].split(".").reduce((value, key) => (value == null ? value : value[key]), { brand, content })
      if (!Array.isArray(list)) {
        problem(where, `repeats over "${meta["for-each"]}" but that is not a list of items.`)
        continue
      }
      if (!list.length) {
        problem(where, `repeats over "${meta["for-each"]}" but the list is empty, so it would produce nothing.`)
        continue
      }
      repeatCount = list.length
    }

    const sampleItem = repeatCount > 1
      ? meta["for-each"].split(".").reduce((value, key) => value[key], { brand, content })[0]
      : null

    try {
      const result = renderTemplate(html, {
        brand,
        content,
        item: sampleItem,
        index: 0,
        format: { name: resolved[0].name, label: resolved[0].label, width: 0, height: 0, dpi: 0, isPrint: false },
        now: { year: "2000", date: "1 January 2000" },
      })
      for (const missing of result.missing) {
        problem(where, `{{ ${missing} }} has no value. Check the spelling, or add the field to ${meta.content ? `content/${meta.content}.json` : "brand/brand.json"}.`)
      }
      for (const detail of result.problems) problem(where, detail)
    } catch (error) {
      problem(where, error.message)
      continue
    }

    const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join("\n")
    const literalColors = [...new Set(styleBlocks.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [])].filter(
      (color) => !/^#fff{1,2}$/i.test(color) && !/^#ffffff$/i.test(color) && !/^#000{1,4}$/i.test(color),
    )
    if (literalColors.length) {
      note(
        where,
        `uses literal colours (${literalColors.join(", ")}). Those will not follow the brand when brand.json changes — prefer var(--brand), var(--accent) and friends.`,
      )
    }

    for (const format of resolved) {
      const outputs = (meta.outputs ? meta.outputs.split(",").map((o) => o.trim()) : format.outputs).filter(Boolean)
      summary.push({
        slug: board.slug,
        format,
        outputs,
        count: repeatCount * outputs.length,
      })
    }
  }

  return summary
}

function main() {
  console.log("Checking the harness...\n")

  const brand = checkBrand()
  let formats = {}
  try {
    formats = loadFormats()
  } catch (error) {
    problem("formats/formats.json", error.message)
  }

  const summary = brand ? describeBoards(brand, formats) : []

  if (summary.length) {
    console.log("Boards found:\n")
    let total = 0
    for (const entry of summary) {
      total += entry.count
      console.log(
        `  ${entry.slug.padEnd(26)} ${entry.format.name.padEnd(24)} ${String(entry.format.pixelWidth).padStart(5)}x${String(entry.format.pixelHeight).padEnd(5)} @ ${entry.format.dpi}dpi  ->  ${entry.count} file${entry.count === 1 ? "" : "s"} (${entry.outputs.join(", ")})`,
      )
    }
    console.log(`\n  ${total} file${total === 1 ? "" : "s"} in total when you run: npm run render`)
  }

  if (notes.length) {
    console.log(`\nWorth knowing (${notes.length}):`)
    for (const item of notes) console.log(`  - ${item.where}: ${item.message}`)
  }

  if (problems.length) {
    console.log(`\nNeeds fixing (${problems.length}):`)
    for (const item of problems) console.log(`  x ${item.where}: ${item.message}`)
    console.log("\nFix these before rendering. Nothing here is unrecoverable.")
    process.exit(1)
  }

  console.log("\nAll good. Render with: npm run render")
}

try {
  main()
} catch (error) {
  console.error(error instanceof HarnessError ? `\n${error.message}\n` : error)
  process.exit(1)
}
