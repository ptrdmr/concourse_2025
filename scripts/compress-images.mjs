// One-off maintenance script: recompresses oversized images in `public/` in place.
// Run with: node scripts/compress-images.mjs
//
// - Resizes any image wider/taller than MAX_DIMENSION down to MAX_DIMENSION (keeps aspect ratio).
// - Re-encodes JPEGs with mozjpeg at JPEG_QUALITY.
// - Converts non-transparent PNGs (photographic content) to JPEG for much smaller file size.
//   When a PNG is converted, the new .jpg file is written and the original .png is removed;
//   any code references must be updated separately (see PNG_TO_JPG_CONVERSIONS below).

import { readdirSync, statSync, unlinkSync, renameSync } from "node:fs"
import { join, extname } from "node:path"
import sharp from "sharp"

const MAX_DIMENSION = 2200
const JPEG_QUALITY = 80
const MIN_SIZE_BYTES = 300 * 1024 // skip files already small

const ROOT = join(process.cwd(), "public")

function walk(dir, results = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, results)
    else results.push(full)
  }
  return results
}

function isImage(file) {
  return /\.(png|jpe?g)$/i.test(file)
}

async function processFile(file) {
  const before = statSync(file).size
  if (before < MIN_SIZE_BYTES) return null

  const image = sharp(file)
  const meta = await image.metadata()
  const needsResize = (meta.width ?? 0) > MAX_DIMENSION || (meta.height ?? 0) > MAX_DIMENSION

  let pipeline = needsResize
    ? image.resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    : image

  const ext = extname(file).toLowerCase()
  const isPng = ext === ".png"
  const convertToJpg = isPng && !meta.hasAlpha

  if (convertToJpg) {
    const jpgPath = file.replace(/\.png$/i, ".jpg")
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(jpgPath + ".tmp")
    renameSync(jpgPath + ".tmp", jpgPath)
    unlinkSync(file)
    const after = statSync(jpgPath).size
    return { file, out: jpgPath, before, after, converted: true }
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    const tmp = file + ".tmp"
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp)
    renameSync(tmp, file)
    const after = statSync(file).size
    return { file, out: file, before, after, converted: false }
  }

  if (ext === ".png") {
    const tmp = file + ".tmp"
    await pipeline.png({ compressionLevel: 9, palette: true }).toFile(tmp)
    renameSync(tmp, file)
    const after = statSync(file).size
    return { file, out: file, before, after, converted: false }
  }

  return null
}

async function main() {
  const files = walk(ROOT).filter(isImage)
  let totalBefore = 0
  let totalAfter = 0
  const conversions = []

  for (const file of files) {
    const result = await processFile(file)
    if (!result) continue
    totalBefore += result.before
    totalAfter += result.after
    if (result.converted) conversions.push({ from: result.file, to: result.out })
    console.log(
      `${result.converted ? "[PNG->JPG] " : ""}${result.file} : ${(result.before / 1024 / 1024).toFixed(2)}MB -> ${(result.after / 1024 / 1024).toFixed(2)}MB`,
    )
  }

  console.log("\n--- Summary ---")
  console.log(`Total before: ${(totalBefore / 1024 / 1024).toFixed(2)}MB`)
  console.log(`Total after:  ${(totalAfter / 1024 / 1024).toFixed(2)}MB`)
  console.log(`Saved:        ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)}MB`)
  if (conversions.length) {
    console.log("\nPNG -> JPG conversions (update code references):")
    for (const c of conversions) console.log(`  ${c.from} -> ${c.to}`)
  }
}

main()
