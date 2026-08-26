# Where your files go

Drop your logo and photos in this folder. Keep the filenames listed in
`brand/brand.json` under `assets`, or update that file to match your names.

## Logo

Two versions, because a logo that reads on a dark menu board disappears on white paper:

| File               | Used on                                     |
| ------------------ | ------------------------------------------- |
| `logo-on-dark.svg` | Dark boards, screens, chalkboard-style menus |
| `logo-on-light.svg`| Printed paper menus, white or cream backgrounds |

**SVG is strongly preferred.** An SVG logo stays sharp at any size, from a
business card to an 18x24 poster. A PNG will look soft when printed large. If all
you have is a PNG, use one at least 1200px wide and expect it to be soft on big
print jobs — ask your designer for the vector file.

The two files here now are placeholders so the examples render. Replace them.

## Photos

Any photo you drop in here can be used as a background or an inset image.
Reference it from a board like this:

```html
<img src="../brand/assets/patio.jpg" alt="">
```

Before you use a photo, run `npm run optimize`. It resizes anything enormous and
recompresses it, which keeps this folder from ballooning to hundreds of megabytes.

**Print needs bigger photos than screens do.** A photo that fills half of an
8.5x11 page at 300dpi needs to be about 1300px wide. The renderer warns you if a
photo is too small for the size you are printing it at.

## A word on rights

Only put files in here that you own or have a licence to use. That includes
stock photography, and it includes fonts if you self-host them. A print shop can
refuse a job over it, and it is the kind of thing that surfaces years later.
