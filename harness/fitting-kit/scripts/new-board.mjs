/**
 * Creates a new board from boards/_starter.html.
 *
 *   npm run new -- --name="Fall Dinner Menu" --format=print-letter-portrait --content=food-menu
 *
 * --name     what you call it; also becomes the filename
 * --format   a key from formats/formats.json (run with no arguments to list them)
 * --content  a file in content/, without the .json (optional)
 */
import fs from "node:fs"
import path from "node:path"
import { dirs, loadFormats, parseArgs, slugify, HarnessError, rel } from "../lib/config.mjs"

const args = parseArgs(process.argv.slice(2))
const formats = loadFormats()

function listFormats() {
  console.log("\nAvailable formats:\n")
  const width = Math.max(...Object.keys(formats).map((key) => key.length))
  for (const [key, entry] of Object.entries(formats)) {
    const size = `${entry.width}x${entry.height}${entry.unit === "px" ? "px" : entry.unit}`
    console.log(`  ${key.padEnd(width)}  ${size.padEnd(12)} ${entry.label ?? ""}`)
  }
  console.log("\nAdd your own by editing formats/formats.json.\n")
}

function main() {
  if (!args.name || !args.format) {
    console.log('Usage: npm run new -- --name="Fall Dinner Menu" --format=print-letter-portrait --content=food-menu')
    listFormats()
    process.exit(args.name || args.format ? 1 : 0)
  }

  const name = String(args.name)
  const format = String(args.format)

  if (!formats[format]) {
    console.error(`\nThere is no format called "${format}".`)
    listFormats()
    process.exit(1)
  }

  const contentName = args.content ? String(args.content).replace(/\.json$/, "") : ""
  if (contentName && !fs.existsSync(path.join(dirs.content, `${contentName}.json`))) {
    const available = fs
      .readdirSync(dirs.content)
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(/\.json$/, ""))
    throw new HarnessError(
      `There is no content file called "${contentName}".\n  Files in content/: ${available.join(", ") || "(none yet)"}`,
    )
  }

  const slug = slugify(name)
  const target = path.join(dirs.boards, `${slug}.html`)
  if (fs.existsSync(target)) {
    throw new HarnessError(`boards/${slug}.html already exists. Pick a different name, or edit that file.`)
  }

  const starter = fs.readFileSync(path.join(dirs.boards, "_starter.html"), "utf8")
  const html = starter
    .replace(/__TITLE__/g, name)
    .replace(/__FORMAT__/g, format)
    .replace(/<meta name="flyer:content" content="__CONTENT__">\n/, contentName ? `<meta name="flyer:content" content="${contentName}">\n` : "")
    .replace(/__CONTENT__/g, contentName)

  fs.writeFileSync(target, html, "utf8")

  console.log(`\nCreated ${rel(target)}`)
  console.log(`  Size:    ${formats[format].label ?? format}`)
  if (contentName) console.log(`  Content: content/${contentName}.json`)
  console.log(`\nNext: open it, lay out the design, then run\n  npm run render -- --only=${slug}\n`)
}

try {
  main()
} catch (error) {
  console.error(error instanceof HarnessError ? `\n${error.message}\n` : error)
  process.exit(1)
}
