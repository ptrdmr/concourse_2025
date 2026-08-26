/**
 * Recompresses photos in brand/assets/ in place, so a folder of camera files
 * does not turn into a folder of 40MB monsters.
 *
 *   npm run optimize
 *
 * Photos are kept large enough for print: MAX_DIMENSION is 3000px, which covers
 * a full-width image on an 8.5x11 page at 300dpi with room to spare. Logos in
 * SVG form are left alone, because they are already resolution-independent.
 */
import { readdirSync, statSync, renameSync, existsSync, mkdirSync } from "node:fs"
import { join, extname, basename } from "node:path"
import sharp from "sharp"
import { dirs, rel } from "../lib/config.mjs"

const MAX_DIMENSION = 3000
const JPEG_QUALITY = 86
const MIN_SIZE_BYTES = 400 * 1024

function walk(dir, results = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, results)
    else results.push(full)
  }
  return results
}

async function processFile(file) {
  const before = statSync(file).size
  if (before < MIN_SIZE_BYTES) return null

  const image = sharp(file)
  const meta = await image.metadata()
  const oversized = (meta.width ?? 0) > MAX_DIMENSION || (meta.height ?? 0) > MAX_DIMENSION

  const pipeline = oversized
    ? image.resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    : image

  const ext = extname(file).toLowerCase()
  const temp = `${file}.tmp`

  if (ext === ".png" && meta.hasAlpha) {
    // Transparency is the whole point of this file, so keep it a PNG.
    await pipeline.png({ compressionLevel: 9 }).toFile(temp)
  } else if (ext === ".png") {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(temp)
    const asJpg = file.replace(/\.png$/i, ".jpg")
    renameSync(temp, asJpg)
    return { file, out: asJpg, before, after: statSync(asJpg).size, renamed: true }
  } else if (ext === ".jpg" || ext === ".jpeg") {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(temp)
  } else {
    return null
  }

  renameSync(temp, file)
  return { file, out: file, before, after: statSync(file).size, renamed: false }
}

async function main() {
  if (!existsSync(dirs.assets)) {
    mkdirSync(dirs.assets, { recursive: true })
    console.log(`Created ${rel(dirs.assets)}. Put your logo and photos there.`)
    return
  }

  const files = walk(dirs.assets).filter((file) => /\.(png|jpe?g)$/i.test(file))
  if (!files.length) {
    console.log("No photos to optimize. (SVG files are already resolution-independent and are skipped.)")
    return
  }

  let saved = 0
  const renamed = []

  for (const file of files) {
    const result = await processFile(file)
    if (!result) continue
    saved += result.before - result.after
    if (result.renamed) renamed.push(result)
    console.log(
      `${rel(result.file)}: ${(result.before / 1024 / 1024).toFixed(2)}MB -> ${(result.after / 1024 / 1024).toFixed(2)}MB${result.renamed ? ` (now ${basename(result.out)})` : ""}`,
    )
  }

  console.log(`\nSaved ${(saved / 1024 / 1024).toFixed(2)}MB.`)

  if (renamed.length) {
    console.log("\nA JPEG copy was written for these PNGs, because a photo saved as a PNG is")
    console.log("many times larger for no visible benefit. The originals are untouched.")
    console.log("Point your boards at the new name, check it looks right, then delete the old file:")
    for (const item of renamed) console.log(`  ${basename(item.file)} -> ${basename(item.out)}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
