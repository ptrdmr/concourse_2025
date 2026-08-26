/**
 * Painterly highlight swashes for the Specimen concept — the blue/yellow
 * brush strokes from the reference. Deterministic (seeded) so every render
 * is identical.
 */

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * One irregular horizontal brush stroke as a closed path.
 * Wavy spine, noisy thickness, blobby rounded ends.
 */
function strokePath(rng, w, h) {
  const N = 8
  const top = []
  const bot = []
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const x = t * w
    const spine =
      h * 0.5 +
      (rng() - 0.5) * h * 0.18 +
      Math.sin(t * Math.PI * 1.4 + rng() * 2) * h * 0.07
    // Thickness swells in the middle and tapers unevenly at the ends
    const swell = 0.22 + 0.26 * Math.sin(Math.PI * Math.min(1, t * 1.1 + 0.02))
    const th = h * (swell + (rng() - 0.5) * 0.1)
    top.push({ x, y: spine - th })
    bot.push({ x, y: spine + th })
  }

  const f = (n) => n.toFixed(1)
  let d = `M ${f(top[0].x)} ${f(top[0].y)}`
  for (let i = 1; i < top.length - 1; i++) {
    const mx = (top[i].x + top[i + 1].x) / 2
    const my = (top[i].y + top[i + 1].y) / 2
    d += ` Q ${f(top[i].x)} ${f(top[i].y)} ${f(mx)} ${f(my)}`
  }
  const tEnd = top[top.length - 1]
  const bEnd = bot[bot.length - 1]
  // Rounded right end
  d += ` Q ${f(w + h * 0.35)} ${f((tEnd.y + bEnd.y) / 2)} ${f(bEnd.x)} ${f(bEnd.y)}`
  for (let i = bot.length - 2; i > 0; i--) {
    const mx = (bot[i].x + bot[i - 1].x) / 2
    const my = (bot[i].y + bot[i - 1].y) / 2
    d += ` Q ${f(bot[i].x)} ${f(bot[i].y)} ${f(mx)} ${f(my)}`
  }
  // Rounded left end
  d += ` Q ${f(-h * 0.35)} ${f((top[0].y + bot[0].y) / 2)} ${f(top[0].x)} ${f(top[0].y)}`
  d += ' Z'
  return d
}

/**
 * A swash = two overlapping strokes of the same colour, slightly offset,
 * which reads as one hand-painted mark with uneven pigment.
 */
export function swashSvg({ seed = 1, w = 300, h = 60, color = '#62C4E4', opacity = 0.85 }) {
  const rng = mulberry32(seed)
  const d1 = strokePath(rng, w, h * 0.92)
  const d2 = strokePath(rng, w * 0.9, h * 0.72)
  const dx = (rng() * 0.08 + 0.03) * w
  const dy = (rng() - 0.5) * h * 0.25 + h * 0.12
  return `<svg class="sp-swash" viewBox="${-h * 0.4} 0 ${w + h * 0.8} ${h}" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="${d1}" fill="${color}" fill-opacity="${opacity * 0.75}"/>
<g transform="translate(${dx.toFixed(1)} ${dy.toFixed(1)})"><path d="${d2}" fill="${color}" fill-opacity="${opacity * 0.6}"/></g>
</svg>`
}

/**
 * Positioned swash for absolute placement inside a .sp-swashes layer.
 * `style` is raw CSS (left/top/width/height/transform).
 */
export function placedSwash({ seed, color, opacity, style }) {
  return `<div class="sp-swash-wrap" style="${style}">${swashSvg({ seed, w: 300, h: 60, color, opacity })}</div>`
}

/**
 * Minimal line-art bowling ball — a hairline circle with three finger holes,
 * drawn like a technical spec illustration so it sits quietly in the
 * mono aesthetic. Placed via the same .sp-swashes layer (behind content).
 */
export function bowlingBall({ style, opacity = 0.32 }) {
  return `<div class="sp-ball-wrap" style="${style}">
<svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<g stroke="#141414" stroke-opacity="${opacity}" fill="none" stroke-width="1.6">
  <circle cx="50" cy="50" r="46"/>
  <circle cx="42" cy="34" r="5.5"/>
  <circle cx="58" cy="30" r="5.5"/>
  <circle cx="53" cy="46" r="6.5"/>
</g>
</svg>
</div>`
}
