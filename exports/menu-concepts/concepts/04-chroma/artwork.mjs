/**
 * Deterministic SVG artwork for Concept 04 — Chroma.
 * No Math.random() — seeded mulberry32 only.
 */

export const PALETTE = {
  cream: '#EFEDE0',
  ink: '#14142B',
  brownDeep: '#5E3210',
  brownWarm: '#9C5F1C',
  gold: '#EBB63C',
  pale: '#F6E7A9',
  orange: '#EE7B25',
  coral: '#E8434E',
  magenta: '#DE1B7C',
  violet: '#7C3FA3',
  lavender: '#BBA9DE',
  cobalt: '#1C2C74',
  blue: '#2A6CD4',
  teal: '#14A199',
  mint: '#86D2B6',
}

function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function blobPath(cx, cy, r, rand, points = 7, wobble = 0.38) {
  const pts = []
  const phase = rand() * Math.PI * 2
  for (let i = 0; i < points; i++) {
    const a = phase + (i / points) * Math.PI * 2
    const rr = r * (1 - wobble / 2 + rand() * wobble)
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.92])
  }
  const n = pts.length
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    d +=
      ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)},` +
      `${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)},` +
      `${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d + 'Z'
}

const FRONT_CLUSTERS = [
  {
    cx: 660,
    cy: 120,
    r: 210,
    count: 9,
    colors: [PALETTE.gold, PALETTE.orange, PALETTE.coral, PALETTE.magenta, PALETTE.violet, PALETTE.blue],
  },
  {
    cx: 820,
    cy: 560,
    r: 190,
    count: 7,
    colors: [PALETTE.cobalt, PALETTE.blue, PALETTE.teal, PALETTE.violet, PALETTE.lavender],
  },
  {
    cx: 90,
    cy: 980,
    r: 230,
    count: 8,
    colors: [PALETTE.teal, PALETTE.mint, PALETTE.gold, PALETTE.orange, PALETTE.brownWarm],
  },
  {
    cx: 60,
    cy: 90,
    r: 120,
    count: 6,
    colors: [PALETTE.lavender, PALETTE.violet, PALETTE.cobalt, PALETTE.pale],
  },
]

const BACK_CLUSTERS = [
  {
    cx: 170,
    cy: 110,
    r: 220,
    count: 9,
    colors: [PALETTE.violet, PALETTE.magenta, PALETTE.coral, PALETTE.orange, PALETTE.gold, PALETTE.blue],
  },
  {
    cx: 20,
    cy: 620,
    r: 190,
    count: 7,
    colors: [PALETTE.teal, PALETTE.mint, PALETTE.cobalt, PALETTE.blue, PALETTE.lavender],
  },
  {
    cx: 760,
    cy: 990,
    r: 230,
    count: 8,
    colors: [PALETTE.orange, PALETTE.gold, PALETTE.coral, PALETTE.brownWarm, PALETTE.magenta],
  },
  {
    cx: 790,
    cy: 80,
    r: 120,
    count: 6,
    colors: [PALETTE.pale, PALETTE.lavender, PALETTE.blue, PALETTE.teal],
  },
]

function emitBlobs(clusters, rand) {
  const parts = []
  parts.push('<g style="mix-blend-mode:multiply">')
  for (const cluster of clusters) {
    for (let i = 0; i < cluster.count; i++) {
      const ang = rand() * Math.PI * 2
      const dist = rand() * cluster.r * 0.55
      const bx = cluster.cx + Math.cos(ang) * dist
      const by = cluster.cy + Math.sin(ang) * dist
      const br = cluster.r * (0.35 + rand() * 0.5)
      const color = cluster.colors[i % cluster.colors.length]
      const d = blobPath(bx, by, br, rand, 6 + Math.floor(rand() * 3), 0.42 + rand() * 0.18)
      parts.push(`<path d="${d}" fill="${color}" fill-opacity="0.82"/>`)
    }
  }
  parts.push('</g>')
  return parts.join('\n')
}

function emitRibbons(side, rand) {
  const n = 7 // fixed count — the hair gesture must read clearly
  const colors = [
    PALETTE.magenta,
    PALETTE.gold,
    PALETTE.blue,
    PALETTE.teal,
    PALETTE.coral,
    PALETTE.violet,
    PALETTE.orange,
  ]
  const parts = ['<g style="mix-blend-mode:multiply" fill="none" stroke-linecap="round">']

  // Hand-tuned ribbon anchors (jittered by seed) so they sweep like hair, not noise
  const templates =
    side === 'front'
      ? [
          { x0: 860, y0: 40, x1: 620, y1: 20, x2: 380, y2: 180, x3: 120, y3: 40 },
          { x0: 880, y0: 160, x1: 640, y1: 220, x2: 420, y2: 90, x3: -20, y3: 200 },
          { x0: 900, y0: 320, x1: 700, y1: 480, x2: 520, y2: 280, x3: 280, y3: 520 },
          { x0: 820, y0: -20, x1: 780, y1: 300, x2: 760, y2: 640, x3: 840, y3: 1100 },
          { x0: -30, y0: 900, x1: 180, y1: 820, x2: 80, y2: 1040, x3: 260, y3: 1100 },
          { x0: 900, y0: 700, x1: 640, y1: 900, x2: 400, y2: 780, x3: 100, y3: 1050 },
          { x0: 200, y0: -30, x1: 80, y1: 160, x2: -40, y2: 320, x3: 60, y3: 480 },
        ]
      : [
          { x0: -40, y0: 50, x1: 200, y1: 10, x2: 420, y2: 160, x3: 700, y3: 30 },
          { x0: -60, y0: 180, x1: 220, y1: 240, x2: 400, y2: 80, x3: 860, y3: 220 },
          { x0: -40, y0: 360, x1: 160, y1: 500, x2: 320, y2: 300, x3: 560, y3: 540 },
          { x0: 40, y0: -20, x1: 80, y1: 320, x2: 60, y2: 660, x3: -20, y3: 1100 },
          { x0: 880, y0: 920, x1: 680, y1: 800, x2: 780, y2: 1040, x3: 560, y3: 1100 },
          { x0: -40, y0: 720, x1: 220, y1: 900, x2: 440, y2: 780, x3: 760, y3: 1060 },
          { x0: 640, y0: -30, x1: 780, y1: 140, x2: 880, y2: 300, x3: 760, y3: 460 },
        ]

  for (let i = 0; i < n; i++) {
    const t = templates[i]
    const j = 28
    const x0 = t.x0 + (rand() - 0.5) * j
    const y0 = t.y0 + (rand() - 0.5) * j
    const x1 = t.x1 + (rand() - 0.5) * j
    const y1 = t.y1 + (rand() - 0.5) * j
    const x2 = t.x2 + (rand() - 0.5) * j
    const y2 = t.y2 + (rand() - 0.5) * j
    const x3 = t.x3 + (rand() - 0.5) * j
    const y3 = t.y3 + (rand() - 0.5) * j
    const color = colors[i % colors.length]
    const sw = (12 + rand() * 16).toFixed(1)
    parts.push(
      `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} C${x1.toFixed(1)} ${y1.toFixed(1)},${x2.toFixed(1)} ${y2.toFixed(1)},${x3.toFixed(1)} ${y3.toFixed(1)}" stroke="${color}" stroke-width="${sw}" stroke-opacity="0.75"/>`,
    )
  }
  parts.push('</g>')
  return parts.join('\n')
}

function emitBubbles(clusters, rand) {
  const n = 40 + Math.floor(rand() * 16) // 40–55
  const parts = ['<g>']
  const filledBudget = 6 + Math.floor(rand() * 3) // 6–8
  let filled = 0

  for (let i = 0; i < n; i++) {
    // Bias toward clusters (~70%), rest scatter calm middle
    let cx, cy
    if (rand() < 0.7) {
      const c = clusters[Math.floor(rand() * clusters.length)]
      const ang = rand() * Math.PI * 2
      const dist = rand() * c.r * 0.85
      cx = c.cx + Math.cos(ang) * dist
      cy = c.cy + Math.sin(ang) * dist
    } else {
      cx = 180 + rand() * 480
      cy = 280 + rand() * 520
    }

    const r = 4 + rand() * 50
    const concentric = rand() < 0.33 ? (rand() < 0.45 ? 3 : 2) : 1

    if (filled < filledBudget && rand() < 0.18) {
      const fill = rand() < 0.5 ? PALETTE.pale : PALETTE.lavender
      parts.push(
        `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}" fill-opacity="0.5"/>`,
      )
      filled++
      continue
    }

    for (let k = 0; k < concentric; k++) {
      const rr = r * (1 - k * 0.28)
      if (rr < 3) continue
      const sw = (0.6 + rand() * 0.7).toFixed(2)
      // Lower opacity in calm middle
      const inMiddle = cx > 220 && cx < 620 && cy > 300 && cy < 780
      const op = (inMiddle ? 0.35 + rand() * 0.12 : 0.4 + rand() * 0.2).toFixed(2)
      parts.push(
        `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rr.toFixed(1)}" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-opacity="${op}"/>`,
      )
    }
  }
  parts.push('</g>')
  return parts.join('\n')
}

/** Small overlay blobs that sit above the reading scrim */
export function overlaySvg({ side }) {
  const seed = side === 'front' ? 0xa11ce : 0x0be71a
  const rand = mulberry32(seed)
  const specs =
    side === 'front'
      ? [
          { cx: 780, cy: 200, r: 70, color: PALETTE.gold },
          { cx: 40, cy: 920, r: 85, color: PALETTE.teal },
          { cx: 800, cy: 880, r: 55, color: PALETTE.magenta },
        ]
      : [
          { cx: 60, cy: 180, r: 75, color: PALETTE.violet },
          { cx: 800, cy: 940, r: 80, color: PALETTE.orange },
          { cx: 50, cy: 700, r: 50, color: PALETTE.mint },
        ]

  const parts = [
    '<svg class="ch-overlay-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 1080" width="840" height="1080" aria-hidden="true">',
    '<g style="mix-blend-mode:multiply">',
  ]
  for (const s of specs) {
    const d = blobPath(s.cx, s.cy, s.r, rand, 6, 0.35)
    parts.push(`<path d="${d}" fill="${s.color}" fill-opacity="0.45"/>`)
  }
  parts.push('</g></svg>')
  return parts.join('\n')
}

/** Mini organic chip path for section headers (~16x16 viewBox) */
export function chipPath(colorSeed = 0) {
  const rand = mulberry32(0xc01f00 + colorSeed)
  return blobPath(8, 8, 7.2, rand, 6, 0.4)
}

export function artworkSvg({ side }) {
  const seed = side === 'front' ? 0xc0ffee : 0xbeef01
  const rand = mulberry32(seed)
  const clusters = side === 'front' ? FRONT_CLUSTERS : BACK_CLUSTERS

  return [
    `<svg class="ch-art-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 1080" width="840" height="1080" aria-hidden="true">`,
    `<rect width="840" height="1080" fill="${PALETTE.cream}"/>`,
    emitBlobs(clusters, rand),
    emitRibbons(side, rand),
    emitBubbles(clusters, rand),
    `</svg>`,
  ].join('\n')
}
