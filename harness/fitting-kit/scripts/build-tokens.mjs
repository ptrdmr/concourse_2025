/**
 * Turns brand/brand.json into templates/tokens.css.
 *
 * This is the file that makes one brand change ripple through every board: each
 * colour and font becomes a CSS variable, and every board is written to use the
 * variables rather than literal colours.
 *
 * Runs automatically as part of `npm run render`. Run it on its own with:
 *   npm run tokens
 */
import fs from "node:fs"
import path from "node:path"
import { dirs, loadBrand, HarnessError, rel, withoutComments } from "../lib/config.mjs"

function kebab(key) {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

function fontImports(fonts) {
  const families = []
  const faces = []

  for (const [role, definition] of Object.entries(withoutComments(fonts ?? {}))) {
    if (!definition || typeof definition !== "object") continue
    if (definition.google) families.push(`family=${definition.google}`)
    if (definition.url) faces.push(`@import url("${definition.url}"); /* ${role} */`)
    for (const face of definition.local ?? []) {
      if (!face.file) continue
      faces.push(
        [
          `@font-face { /* ${role} */`,
          `  font-family: ${JSON.stringify(face.family ?? role)};`,
          `  src: url("../${face.file}") format(${JSON.stringify(face.format ?? formatFromExtension(face.file))});`,
          `  font-weight: ${face.weight ?? "400"};`,
          `  font-style: ${face.style ?? "normal"};`,
          `  font-display: block;`,
          `}`,
        ].join("\n"),
      )
    }
  }

  const lines = []
  if (families.length) {
    lines.push(`@import url("https://fonts.googleapis.com/css2?${families.join("&")}&display=swap");`)
  }
  lines.push(...faces)
  return lines
}

function formatFromExtension(file) {
  const ext = path.extname(file).toLowerCase()
  if (ext === ".woff2") return "woff2"
  if (ext === ".woff") return "woff"
  if (ext === ".otf") return "opentype"
  return "truetype"
}

export function buildTokens({ quiet = false } = {}) {
  const brand = loadBrand()

  if (!brand.colors || !Object.keys(brand.colors).length) {
    throw new HarnessError("brand/brand.json has no colors. Add at least bg, ink, brand and accent.")
  }

  const imports = fontImports(brand.fonts)
  const vars = []

  for (const [key, value] of Object.entries(withoutComments(brand.colors))) {
    vars.push(`  --${kebab(key)}: ${value};`)
  }

  vars.push("")
  for (const [role, definition] of Object.entries(withoutComments(brand.fonts ?? {}))) {
    if (definition && typeof definition === "object" && definition.stack) {
      vars.push(`  --font-${kebab(role)}: ${definition.stack};`)
    }
  }

  const css = [
    "/* GENERATED FILE — do not edit.",
    " * Source: brand/brand.json     Rebuild: npm run tokens",
    " * Change a colour or font there and every board picks it up.",
    " */",
    ...imports,
    "",
    ":root {",
    ...vars,
    "}",
    "",
  ].join("\n")

  fs.mkdirSync(dirs.templates, { recursive: true })
  const target = path.join(dirs.templates, "tokens.css")
  fs.writeFileSync(target, css, "utf8")
  if (!quiet) console.log(`Wrote ${rel(target)} (${Object.keys(brand.colors).length} colours)`)
  return target
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("build-tokens.mjs")) {
  try {
    buildTokens()
  } catch (error) {
    console.error(error instanceof HarnessError ? `\n${error.message}\n` : error)
    process.exit(1)
  }
}
