# Your business

**This is the only file you have to fill in.** Everything else in this folder is
machinery. Work through it in plain English, guess where you have to, and leave
the notes in place — they are there to help whoever picks this up next.

When you are done, hand this file to your AI agent and say:

> Read brand/business.md and update brand/brand.json to match it.

The agent turns your answers into the settings the designs read from. You should
never need to open a `.json` file yourself, though nothing bad happens if you do.

---

## 1. Who you are

**Business name**
<!-- Exactly as it should appear in print, including any "&" or punctuation. -->

> Northgate Social

**Short name** — for tight spaces like a banner or a business card

> Northgate

**Tagline** — six words at most. What you are, not how great you are.

> Coffee · Kitchen · Cocktails

**What you actually sell**, in a sentence or two. This helps the agent choose the
right words and the right kind of design.

> A neighbourhood café that turns into a cocktail bar after five. Counter service
> during the day, table service at night.

---

## 2. How to reach you

Only fill in what you want printed. Leave the rest blank.

| | |
| --- | --- |
| **Phone** | (555) 014-2200 |
| **Website** | northgatesocial.example |
| **Online ordering link** | order.northgatesocial.example |
| **Street address** | 418 North Gate Road |
| **City, state, postal** | Riverbend, OR 97005 |
| **Instagram** | @northgatesocial |
| **Facebook** | /northgatesocial |
| **Anything else** | |

---

## 3. How you sound

**Tone.** Describe it the way you would describe a person.

> Warm, plainspoken, a little proud. Never salesy, never cute.

**Words and things to avoid.** Be specific — this is the most useful answer on
the whole page.

> No exclamation marks. Never the word "delicious". No emoji on printed pieces.

**Headings in capitals, or normal sentence case?**

> Capitals for headings, sentence case for descriptions.

---

## 4. Your colours

You need at least four. If you only know one, say so and ask the agent to build a
palette around it — that works fine.

Copy the codes from your existing signage, website, or logo file. If you have no
idea, take a photo of your sign and ask the agent to pull the colours out of it.

| Role | What it is used for | Yours |
| --- | --- | --- |
| **Brand** | Headings, bars, the colour people associate with you | `#1F6F5C` |
| **Brand bright** | A lighter version, for section titles on dark backgrounds | `#2FA183` |
| **Accent** | Prices, badges, the thing your eye should land on | `#E8B84B` |
| **Background** | The dark background of screens and boards | `#121614` |
| **Ink** | Text on that dark background, usually white | `#FFFFFF` |
| **Paper** | The background of printed menus, white or cream | `#FBF8F1` |
| **Paper ink** | Text on paper, near-black rather than pure black | `#1A1E1C` |

> **Why near-black and not pure black?** On a printed page, pure black text looks
> heavy and can smear slightly. Almost every printed menu you have admired used
> something a shade off black.

---

## 5. Your fonts

Three roles. The same font can play more than one.

| Role | Used for | Yours |
| --- | --- | --- |
| **Display** | Item names, headings, anything short and loud | Barlow Condensed |
| **Body** | Descriptions and paragraphs | Barlow |
| **Accent** | Taglines and flourishes, often italic | Libre Baskerville |
| **Title** | Big feature words like "Happy Hour" — optional | Alfa Slab One |

**Where do these fonts come from?** Tick one:

- [x] I do not know / pick something that suits us — **use Google Fonts, they are free and licensed for anything**
- [ ] We have a brand font and I have the files (`.woff2`, `.otf` or `.ttf`)
- [ ] We pay for a font subscription (Adobe Fonts, Monotype, etc.)

> **Read this if you pay for fonts.** A font subscription usually licenses the
> font *to you*, for *your* use. That is not the same as being allowed to hand the
> font file to a print shop, put it in a public code repository, or pass it to
> another business. Google Fonts has none of those restrictions, which is why it
> is the default here. If you are unsure, use a Google font and keep the paid one
> for work your designer does.

---

## 6. Your logo

Put your files in `brand/assets/` and read the short note in there. In brief: two
versions, one for dark backgrounds and one for light, and **SVG if you possibly
can** because it stays sharp at any size.

- [ ] I have an SVG (best)
- [ ] I have a large PNG
- [ ] I have neither — expect the agent to set your name in type instead, which
      is a perfectly respectable way to run a business

---

## 7. The small print

These lines appear at the bottom of pieces automatically, so you write them once.

**Allergen notice.** Ask your local health authority what is required — this
varies by state and country and is worth getting right.

> Items may contain nuts, dairy, gluten or shellfish. Tell your server about any allergy.

**Price disclaimer**

> Prices subject to change. Specials not valid on holidays.

**Anything else you are required to display** (licence numbers, health grade,
gratuity policy, deposit terms)

>

---

## 8. Printing

Answer these once, by asking whoever prints for you. If you only ever print in
the back office, skip the section.

**Does your printer want bleed?** (Artwork running past the cut line, so trimming
never leaves a white sliver.) Almost always yes for anything professionally cut.

> Yes, 0.125 inch

**What files do they want?** Most want PDF.

> PDF

**Do they need CMYK?** Many shops now prefer to convert from RGB in-house, which
is what this harness produces. Ask, and write the answer here.

> They convert in-house from RGB

**Smallest text size they will print cleanly** — usually 6 to 7 point

> 7 point

---

## 9. What do you actually need made?

List the pieces. Do not worry about sizes; the agent will suggest them.

- [ ] Menu for the wall or a TV screen
- [ ] Printed menu for tables
- [ ] Happy hour or specials card
- [ ] Daily specials banner
- [ ] Door sign for hours or a holiday closure
- [ ] Social media post
- [ ] Poster for an event
- [ ] Something else:

---

## 10. Anything the machine should know

Quirks, constraints, things that have gone wrong before. This is the box that
saves the most time later.

> Our patio is seasonal, so anything mentioning it needs a date on it.
> The Tuesday special changes weekly and is never printed — screen only.
