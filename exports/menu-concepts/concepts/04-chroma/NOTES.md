# 04 — Chroma

**Idea.** Translate the source artwork's language — overlapping translucent colour
blobs, hairline bubbles, flowing ribbons — into a full-bleed menu. Abstract only;
no face. Menu copy sits on organic cream reading panels so it stays legible.

**Type.** Syne (display) + Outfit (body).

**Tone.** Energetic, artful, warm. Cream ground with saturated multiply-blended
colour fields clustered at the corners so the middle stays calm enough to read.

## Print caveats

- `mix-blend-mode: multiply` is what makes overlaps generate new colours, and
  Chromium rasterises blended regions when printing to PDF. The artwork layer may
  therefore be raster in the PDF; all text stays vector because it sits in a
  separate layer that is never blended.
- Full-bleed means heavy ink coverage. Ask the printer for a proof on the actual
  stock before committing to a run, and expect colour to shift on uncoated paper.
- The reading scrim at 94% alpha is what keeps body copy legible over the art.
  Do not lower it below about 0.90.

## Layers

1. `.ch-art.bleed-layer` — SVG sized to trim + 0.125in bleed, inset −12px
2. `.ch-field` — organic cream scrim (the cleared reading area)
3. `.ch-overlay` — 2–3 blobs at 0.45 opacity that spill over the scrim edge
4. `.ch-content` — masthead, sections, footer (always on top)
