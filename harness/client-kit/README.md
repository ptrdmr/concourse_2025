# Northgate Social — menu boards

This folder makes your menu board screens. You talk to the AI, it does the work,
you look at the picture.

**You never have to open a terminal or read any code.** If you want to, nothing
here will break.

## How to use it

Open this folder in Cursor and say what you want, in ordinary words:

> Put the burger up to $19 and take the mushroom melt off the food board.

> Add a brunch board. Same look as the others. Six items, I'll give you the list.

> We're switching the green to a deeper shade — here's the code from our new sign.

The AI knows the rules — how your brand reads, which colours exist, how many
items fit on a screen — because they are written down in `AGENTS.md` and
`BRAND.md`. It will show you the finished screen when it is done.

## Where the finished screens are

In the `out/` folder, as JPEGs. `out/food.jpg` and `out/drinks.jpg` today.

Those are the files you put on the TVs, email to whoever runs the screens, or drop
into your digital signage software. They are regenerated from scratch every time,
so the newest version is always the one in that folder.

## The three things worth knowing

**Say what you want changed, not how.** "Take the cider off" is better than
anything involving the word HTML.

**Eight items is the limit per screen, and six looks better.** This is on purpose.
A menu board is read from across the room by somebody deciding in about four
seconds. If you need more items, ask for a second board — that is free, and it
works far better than smaller writing.

**It checks itself before it finishes.** Every time a board is generated, it is
measured to make sure nothing runs off the edge of the screen, every font loaded,
and every image loaded. If something is wrong the AI is told exactly what, and it
has been instructed not to hand you a broken board. That check is the reason you
can trust what comes out without inspecting it yourself.

## If something looks wrong

Say so, plainly — "the last item is cut off at the bottom" or "that green looks
wrong". Be as vague as you like. The AI can measure the board and find the cause.

## Changing your colours or fonts

They live in `brand.css`, one short file with a comment against every line. Ask
the AI to change it and re-render, and you will see the effect across every board
at once.

## One-time setup on a new computer

Only needed once, and the AI can do it for you:

```bash
npm install
npx playwright install chromium
```
