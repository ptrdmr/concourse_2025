/**
 * Scans a rendered JPEG for rows containing dark text pixels,
 * so "is the bottom empty?" is answered by pixels, not vibes.
 */
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

for (const side of ['front', 'back']) {
  const file = path.join(root, 'out', `04-chroma-${side}.jpg`)
  const img = sharp(file)
  const meta = await img.metadata()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  // Text is near-black ink (#14142B). Count very dark pixels per row.
  const rowInk = new Array(height).fill(0)
  for (let y = 0; y < height; y++) {
    let count = 0
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      const r = data[i], g = data[i + 1], b = data[i + 2]
      if (r < 90 && g < 90 && b < 110) count++
    }
    rowInk[y] = count
  }

  const threshold = Math.max(8, Math.round(width * 0.004))
  const inkRows = rowInk.map((c, y) => (c >= threshold ? y : -1)).filter((y) => y >= 0)
  const lastInk = inkRows.length ? inkRows[inkRows.length - 1] : -1
  const firstInk = inkRows.length ? inkRows[0] : -1

  // Find the largest contiguous run of ink-free rows in the lower 2/3
  let bestStart = -1, bestLen = 0, curStart = -1
  const scanFrom = Math.round(height * 0.25)
  for (let y = scanFrom; y < height; y++) {
    if (rowInk[y] < threshold) {
      if (curStart === -1) curStart = y
      const len = y - curStart + 1
      if (len > bestLen) { bestLen = len; bestStart = curStart }
    } else {
      curStart = -1
    }
  }

  const pct = (v) => ((v / height) * 100).toFixed(1) + '%'
  console.log(`\n===== ${side.toUpperCase()} (${width}x${height}) =====`)
  console.log(`first ink row : ${firstInk} (${pct(firstInk)})`)
  console.log(`last  ink row : ${lastInk} (${pct(lastInk)})`)
  console.log(`tail after last ink: ${height - lastInk}px (${pct(height - lastInk)})`)
  console.log(`largest text-free band below 25%: ${bestLen}px at y=${bestStart}–${bestStart + bestLen} (${pct(bestStart)} → ${pct(bestStart + bestLen)})`)
}
