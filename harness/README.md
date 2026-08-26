# Harnesses

A harness is a small folder that keeps an AI on the rails while it does one
repetitive, branded job — and produces a file the business can actually use.

Not a chatbot. Not a design tool. A fitted jig.

```
harness/
  client-kit/     what you sell and hand over — small, boring, custom
  fitting-kit/    your workshop for building one quickly — never ships
```

## Why anyone pays for this

Any business owner can ask an AI to make them a menu board. What they get back is
a different design every time, in colours nobody approved, with a font they do not
own, and no way to know whether the last item is cut off the bottom of the screen.
They get a picture, once. They do not get a process.

A harness sells the three things that are missing:

**The rules are written down.** Their colours, their fonts, their tone, the legal
lines they are required to display, the words they refuse to use. The AI reads
those before it does anything, every session. Nothing drifts, and a change to the
brand happens in one file rather than across twenty pictures.

**The output is checked before they see it.** Text running off the edge of a
screen, a web font that silently fell back to Arial, an image that failed to load
— all invisible in the code, all obvious on a sixty-inch screen in a dining room.
The harness measures the real rendered layout and refuses to call a broken board
finished. This is the part that turns "the AI made me a picture" into something an
owner can trust without checking.

**It is repeatable by the least technical person in the building.** Prices change
on a Tuesday. They say "put the burger up to $19", and two minutes later the new
screen is in the folder. No terminal, no design software, no waiting on a
designer, no version of the file called `menu_FINAL_v3_USE_THIS.jpg`.

## What a harness is made of

Four parts. Everything else is decoration.

| Part | In `client-kit/` | What it does |
| --- | --- | --- |
| The brand contract | `brand.css`, `BRAND.md` | The only colours, fonts and words that exist. One file to change, everything follows. |
| The artifact | `boards/*.html` | The thing that gets regenerated. Plain HTML, so the AI edits it directly and a human can read it. |
| The rules | `AGENTS.md` | What the AI must never do, how to do the usual jobs, and when to stop and ask. **This is the actual product.** |
| The guardrail | `render.mjs` | Produces the file, and measures it before handing it over. |

Roughly 200 lines of machinery and three pages of writing. It should be readable
end to end in five minutes, because a thing nobody understands is a thing nobody
maintains.

## Fitting one for a new client

1. **Find the repetitive job.** Not "their marketing" — one job. Menu boards.
   Daily specials banner. Open house flyer. Weekly class schedule. If they make
   the same kind of file more than once a month, it is a candidate.
2. **Take the brand.** Colours, fonts, logo, tone, the lines they are legally
   required to show. `fitting-kit/brand/business.md` is the questionnaire for
   this — it doubles as a decent first sales conversation.
3. **Pick the size.** `fitting-kit/formats/formats.json` has the common ones with
   the print details worked out. Copy the one or two they need. Do not give them
   eighteen sizes they will never use.
4. **Adapt a layout.** `fitting-kit/boards/` has working examples for screens,
   banners, table cards, printed menus, door signs and social posts. Take the
   nearest one and fit it to their brand.
5. **Write their `AGENTS.md`.** This is the work. The generic parts carry over;
   the valuable parts do not. The limits that matter are specific to them: how
   many items fit on their screens, which prices must agree with which, what they
   are legally required to print, the thing that went wrong last time.
6. **Prove it.** Generate everything, look at every file, and get the check to
   report clean. Then break it on purpose — add three items too many — and confirm
   the check catches it. That demonstration is what closes the sale.

## What makes a good candidate job

- It happens again and again, with the same shape and different words
- The output is a file: an image, a PDF, a page
- Brand consistency actually matters to them
- Correct and incorrect can be measured, not just felt
- Today it is somebody's chore, or a designer's invoice

## What makes a bad one

- One-offs, and anything needing genuine art direction
- Jobs where the requirements change every time
- Anything where being wrong is dangerous rather than embarrassing — dosages,
  legal notices, safety instructions. A harness will happily generate a confident,
  well-branded, wrong answer.
- Work that needs a licensed font you cannot legally hand over

## The fitting kit

`fitting-kit/` is the general version: a catalog of sizes with print bleed worked
out, a small templating engine for data-driven pieces, six example layouts, a
validator, and an image optimiser. About 3,400 lines.

It is deliberately more than any single client needs. Its job is to let you fit a
client kit in an afternoon by picking from it — not to be delivered. When a client
asks "what is all this?", the answer should be four files and a page of rules, not
a framework.
