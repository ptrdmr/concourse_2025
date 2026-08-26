# 05 — Specimen

Spec-sheet minimalism, after the Hüngry Beast juice-bar reference: everything
set in Space Mono caps with wide tracking, hairline rules between items,
oceans of paper white, and two hand-painted colour swashes per page
(sky blue + marigold) that sit *behind* the type like highlighter strokes.

## Design language

- **One typeface** — Space Mono 400/700 does every job. Hierarchy comes from
  weight, size, and letter-spacing, not from mixing fonts.
- **Tracked wordmark** — `CONCOURSE` at 0.36em tracking with matching
  `text-indent` so the tracking doesn't push it off-centre.
- **Bracket badges** — `[NEW] [GF] [SPICY]` as plain muted mono text instead
  of coloured pills. `serves` values fold in the same way (`[FEEDS 4-6]`).
- **Aqua cards** — Jr. Bowlers, Build Your Own, and Sodas sit on the pale
  mint of the reference's to-go card (`#DEEAE5`).
- **Swashes** — `swash.mjs` generates deterministic (seeded) SVG brush
  strokes: two overlapping noisy closed paths per swash read as one
  hand-painted mark with uneven pigment. Positions are fixed percentages in
  `layout.mjs`, kept inside the trim margins so print needs no bleed art.

## Two deliverables from one layout module

- `renderPage` — 8.5×11 two-sided print sheet (JPEG + bleed PDF like the
  other concepts). Front items breathe (10px padding); the denser back
  tightens to 5px via `body[data-side='back']` overrides.
- `renderTvPage` — 1920×1080 screens mirroring the live `public/front-tv.html`
  and `public/back-tv.html` content splits:
  - **front-tv**: Salads (+dressings blurb) / Sandwiches (+Sodas card) /
    Burgers (+Jr. Bowlers card) — names and prices only.
  - **back-tv**: Starters split over two columns / Pizzas + Build Your Own.

TV data that print doesn't carry (Sodas box, "Cup of Soup · $6") lives in
`content/menu.json` under `extras` and `tvSub` so the price list stays a
single source of truth.

Nothing here touches `public/` — the live TV pages are unchanged.
