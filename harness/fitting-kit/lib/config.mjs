/**
 * Shared plumbing: where things live, how files are read, and how a format
 * definition turns into real pixels.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

export const dirs = {
  root: ROOT,
  brand: path.join(ROOT, "brand"),
  assets: path.join(ROOT, "brand", "assets"),
  formats: path.join(ROOT, "formats"),
  boards: path.join(ROOT, "boards"),
  content: path.join(ROOT, "content"),
  templates: path.join(ROOT, "templates"),
  build: path.join(ROOT, ".build"),
  out: path.join(ROOT, "out"),
}

/** CSS always treats 1 inch as 96 pixels. Everything else is derived from that. */
export const CSS_DPI = 96

export class HarnessError extends Error {}

export function rel(file) {
  return path.relative(ROOT, file).split(path.sep).join("/")
}

export function readJson(file, label = rel(file)) {
  let raw
  try {
    raw = fs.readFileSync(file, "utf8")
  } catch {
    throw new HarnessError(`Cannot find ${label}. Expected it at ${rel(file)}`)
  }
  try {
    return JSON.parse(stripBom(raw))
  } catch (error) {
    throw new HarnessError(
      `${label} is not valid JSON, so nothing can be rendered until it is fixed.\n` +
        `  ${error.message}\n` +
        `  The usual cause is a missing comma, a trailing comma before a closing brace, or a smart quote.`,
    )
  }
}

function stripBom(text) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
}

/** Keys beginning with `$` are notes for humans and never data. */
export function withoutComments(object) {
  return Object.fromEntries(Object.entries(object).filter(([key]) => !key.startsWith("$")))
}

export function loadBrand() {
  const brand = readJson(path.join(dirs.brand, "brand.json"), "brand/brand.json")
  return withoutComments(brand)
}

export function loadFormats() {
  const formats = readJson(path.join(dirs.formats, "formats.json"), "formats/formats.json")
  return withoutComments(formats)
}

export function loadContent(name) {
  const file = name.endsWith(".json") ? path.join(dirs.content, name) : path.join(dirs.content, `${name}.json`)
  return withoutComments(readJson(file, `content/${path.basename(file)}`))
}

export function toCssPx(value, unit) {
  switch (unit) {
    case "px":
      return value
    case "in":
      return value * CSS_DPI
    case "mm":
      return (value * CSS_DPI) / 25.4
    case "cm":
      return (value * CSS_DPI * 10) / 25.4
    default:
      throw new HarnessError(`Unknown unit "${unit}". Use px, in, mm or cm.`)
  }
}

const VALID_OUTPUTS = new Set(["jpeg", "png", "pdf"])

/**
 * Turns a catalog entry into everything the renderer and the CSS need to know.
 * Bleed is added to the canvas on all four sides, so a 5x7 card with 0.125in
 * bleed renders 5.25x7.25 and the print shop trims back to 5x7.
 */
export function resolveFormat(name, formats) {
  const entry = formats[name]
  if (!entry) {
    const known = Object.keys(formats).sort().join(", ")
    throw new HarnessError(`Unknown format "${name}".\n  Formats available: ${known}\n  Add new ones to formats/formats.json.`)
  }

  const unit = entry.unit ?? "px"
  const dpi = entry.dpi ?? CSS_DPI
  if (!(dpi > 0)) throw new HarnessError(`Format "${name}" has an invalid dpi.`)
  if (!(entry.width > 0) || !(entry.height > 0)) {
    throw new HarnessError(`Format "${name}" needs a positive width and height.`)
  }

  const bleed = unit === "px" ? 0 : (entry.bleed ?? 0)
  const safe = unit === "px" ? (entry.safe ?? 0) : (entry.safe ?? 0)

  const pageW = toCssPx(entry.width, unit)
  const pageH = toCssPx(entry.height, unit)
  const bleedPx = toCssPx(bleed, unit)
  const safePx = toCssPx(safe, unit)

  const cssW = Math.round(pageW + bleedPx * 2)
  const cssH = Math.round(pageH + bleedPx * 2)
  const scaleFactor = dpi / CSS_DPI

  const outputs = (entry.outputs ?? ["jpeg"]).map((o) => String(o).toLowerCase())
  for (const output of outputs) {
    if (!VALID_OUTPUTS.has(output)) {
      throw new HarnessError(`Format "${name}" asks for output "${output}". Only jpeg, png and pdf are supported.`)
    }
  }

  return {
    name,
    label: entry.label ?? name,
    unit,
    dpi,
    pageW,
    pageH,
    bleedPx,
    safePx,
    cssW,
    cssH,
    scaleFactor,
    fontScale: entry.scale ?? 16,
    outputs,
    fullPage: Boolean(entry.fullPage),
    pixelWidth: Math.round(cssW * scaleFactor),
    pixelHeight: Math.round(cssH * scaleFactor),
  }
}

/**
 * Boards describe themselves with <meta name="flyer:*"> tags, so adding a board
 * is a matter of dropping a file into boards/ — there is no separate list to
 * keep in sync.
 */
export function readBoardMeta(html) {
  const meta = {}
  const pattern = /<meta\s+[^>]*name=["']flyer:([a-z-]+)["'][^>]*>/gi
  let match
  while ((match = pattern.exec(html)) !== null) {
    const contentMatch = /content=["']([^"']*)["']/i.exec(match[0])
    if (contentMatch) meta[match[1].toLowerCase()] = contentMatch[1].trim()
  }
  return meta
}

export function listBoards() {
  if (!fs.existsSync(dirs.boards)) return []
  return fs
    .readdirSync(dirs.boards)
    .filter((file) => file.endsWith(".html") && !file.startsWith("_"))
    .sort()
    .map((file) => ({ slug: file.replace(/\.html$/, ""), file: path.join(dirs.boards, file) }))
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function parseArgs(argv) {
  const args = { _: [] }
  for (const token of argv) {
    if (token.startsWith("--")) {
      const [key, value] = token.slice(2).split("=")
      args[key] = value === undefined ? true : value
    } else {
      args._.push(token)
    }
  }
  return args
}
