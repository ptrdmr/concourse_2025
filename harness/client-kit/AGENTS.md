# Instructions for the AI

This project does one job: **produce Northgate Social's menu board screens as
1920x1080 JPEGs.** Nothing else. If you are asked for something outside that job,
say so plainly and stop.

The person asking will not be reading code. They will describe what they want in
ordinary words. You do the work, then show them the picture.

## Read these first, in this order

1. `BRAND.md` — how this business writes and what it will not say
2. `brand.css` — the only colours and fonts that exist here
3. An existing file in `boards/` — the shape everything follows

Read all three before you change anything, every session. Do not work from memory
of a previous session.

## Rules

These are not preferences.

1. **Never invent a colour.** Only `var(--brand)`, `var(--brand-bright)`,
   `var(--accent)`, `var(--ink)`, `var(--muted)`, `var(--muted-soft)`,
   `var(--bg)`, `var(--bg-alt)`, `var(--rule)`. If a request seems to need a new
   colour, ask instead of inventing one. A one-off colour is how a brand starts
   to fall apart.
2. **Never use a font that is not in `brand.css`.**
3. **Never change a price, a name, or a description unless you were asked to.**
   Not to fix a typo, not to improve the wording, not for consistency. Prices are
   somebody's livelihood and a silent change is worse than a typo. Point it out
   and let them decide.
4. **Never edit `render.mjs`.** If it reports a problem, fix the board, not the
   check.
5. **Eight items per board, maximum.** Six is better. A menu board is read from
   across a room by somebody deciding in four seconds. If they want more items,
   make a second board rather than shrinking the type.
6. **Descriptions stay under about ten words.** Cut adjectives before you cut
   ingredients.
7. **Put new styling in the board's own file.** `board.css` is shared, so a change
   there changes every board. Only edit it if the change genuinely should apply
   everywhere.

## How to do the usual jobs

### Change prices, or add and remove items

Everything that changes lives between the `<!-- ITEMS START -->` and
`<!-- ITEMS END -->` comments in a file in `boards/`. Copy an existing
`<article>` block to add an item; delete one to remove it. Keep the structure
exactly as it is — `item-head`, then `item-name` and `item-price`, then
`item-desc`, then `item-note` if there is an add-on or a dietary note.

### Add a new board

Copy the closest existing file in `boards/` to a new name, change the heading and
the items. The filename becomes the picture's name, so `boards/brunch.html`
produces `out/brunch.jpg`. Lowercase, hyphens, no spaces.

### Change a brand colour or font

Edit `brand.css` only, then re-render everything so they can see the effect
across all the boards at once. Never patch a colour board by board.

## Finishing — do not skip this

Run:

```bash
node render.mjs
```

It must report **no problems**. It checks the three things that go wrong: text
running off the screen, a font that failed to load, an image that failed to load.
Each of those is invisible in the code and obvious on a sixty-inch screen in a
dining room, which is the worst place to discover it.

If it reports a problem, fix it and run again. Do not hand over a board with a
warning against it, and do not explain the warning away — a board that overflows
by 30px is a board with its last item cut in half.

Then show them the finished JPEG inline, so they judge the picture rather than
your description of it. Say what changed in one or two sentences.

## Stop and ask when

- A change would need a colour or font that does not exist yet
- The board would go over eight items
- A price looks wrong, or contradicts another board
- You are asked for something that is not a menu board — a printed menu, a
  poster, a social post. Those are different jobs and this harness is not fitted
  for them. Say so rather than improvising something that will look off-brand.

## First run on a new machine

If `node render.mjs` complains that the browser is missing:

```bash
npm install
npx playwright install chromium
```
