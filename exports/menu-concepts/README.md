# Menu Concepts

Original 8.5×11 two-sided menu designs for Concourse Bowl · Bar · Grill.
All concepts read from one shared price list so they can never disagree with each other.

## Concepts

| Folder | Name | Idea |
|---|---|---|
| `concepts/01-departure-board` | Departure Board | Airport departures board — amber on near-black, flush-right price rail |
| `concepts/02-marquee` | Marquee | Bowling-alley signage — oversized type, full-bleed colour panels |
| `concepts/03-broadsheet` | Broadsheet | Newsprint editorial — serif masthead, dotted leaders, cream paper |
| `concepts/04-chroma` | Chroma | Full-bleed organic colour field — multiply blobs, ribbons, bubbles on cream |
| `concepts/05-specimen` | Specimen | Spec-sheet mono minimalism — tracked caps, hairlines, painted swashes. Also ships 1920×1080 TV screens |

## TV screens

A concept can additionally export `renderTvPage` from its `layout.mjs` to
produce 1920×1080 screens matching the content of the live
`public/front-tv.html` and `public/back-tv.html` (which are never touched by
this pipeline). Specimen is the first to do so — its `*-front-tv` / `*-back-tv`
outputs are JPEG-only (no print PDF).

## Edit a price

Change one line in [`content/menu.json`](content/menu.json), then re-render.
That is the only place prices live.

## Build & render

From the repo root (Playwright is already a root dependency):

```bash
# Build HTML + render JPEG (300dpi trim) and PDF (with 0.125in bleed)
node exports/menu-concepts/lib/render.mjs

# One concept only
node exports/menu-concepts/lib/render.mjs --only=marquee

# Include crop marks on the PDF
node exports/menu-concepts/lib/render.mjs --marks
```

Outputs land in `out/`:

- `01-departure-board-front.jpg` / `.pdf`
- `01-departure-board-back.jpg` / `.pdf`
- …and the same for `02-marquee`, `03-broadsheet`, `04-chroma`, and `05-specimen`
- `05-specimen-front-tv.jpg` / `05-specimen-back-tv.jpg` (1920×1080 screens)

Preview the intermediate HTML in a browser from `build/`.

## Diagnostics

Judging "is there dead space?" by eye is unreliable. Two tools answer it with numbers:

```bash
# How far down the page does content actually reach? Any wrapped item headers?
node exports/menu-concepts/lib/_measure.mjs 04-chroma

# Scan the rendered JPEG for the largest text-free horizontal band
node exports/menu-concepts/lib/_inkscan.mjs
```

## Folder layout

```
content/menu.json     single source of truth
lib/build.mjs         menu.json + layout.mjs → build/*.html
lib/render.mjs        Playwright → JPEG + PDF
concepts/*/layout.mjs page structure (plain JS)
concepts/*/style.css  all the design
concepts/*/NOTES.md   design intent for that concept
```
