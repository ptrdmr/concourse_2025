/**
 * 05 — SPECIMEN
 * Spec-sheet minimalism: tracked mono caps, hairline rules, prices on their
 * own right-aligned line, oceans of white, and two hand-painted colour
 * swashes per page. Exports renderPage (8.5×11 print) and renderTvPage
 * (1920×1080 screens matching public/front-tv.html + back-tv.html content).
 */
import { placedSwash, bowlingBall } from './swash.mjs'

const BLUE = '#5FC6E6'
const YELLOW = '#FFD140'

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const section = (root, id) => root.sections.find((s) => s.id === id)

function badges(item) {
  const tags = [...(item.badges || [])]
  if (item.serves) tags.push(item.serves.toUpperCase())
  if (!tags.length) return ''
  return tags.map((b) => `<span class="sp-b">[${esc(b)}]</span>`).join(' ')
}

/* ───────────────────────── PRINT ───────────────────────── */

function printItem(item) {
  const priceLine = item.priceM
    ? `<span class="sp-ml">M ${esc(item.priceM)} · L ${esc(item.priceL)}</span>`
    : esc(item.price)
  return `<div class="sp-item">
  <div class="sp-row"><span class="sp-item-name">${esc(item.name)} ${badges(item)}</span><span class="sp-item-price">${priceLine}</span></div>
  ${item.descShort ? `<div class="sp-item-desc">${esc(item.descShort)}</div>` : ''}
  ${item.sub && item.sub !== item.descShort ? `<div class="sp-item-sub">${esc(item.sub)}</div>` : ''}
</div>`
}

function printSection(sec, { notes = true } = {}) {
  return `<section class="sp-sec">
  <h2 class="sp-sec-title">${esc(sec.title)}</h2>
  ${notes && sec.notes ? `<p class="sp-sec-notes">${esc(sec.notes)}</p>` : ''}
  <div class="sp-items">${sec.items.map(printItem).join('\n')}</div>
</section>`
}

function aquaCard(title, inner) {
  return `<section class="sp-card">
  <h2 class="sp-sec-title">${esc(title)}</h2>
  ${inner}
</section>`
}

function byoCard(byo) {
  const base = byo.base
    .map(
      (b) => `<div class="sp-item sp-item--byo">
  <div class="sp-row"><span class="sp-item-name">${esc(b.name)} <span class="sp-b">${esc(b.note.toUpperCase())}</span></span><span class="sp-item-price">${esc(b.price)}</span></div>
</div>`,
    )
    .join('\n')
  const tops = byo.toppings
    .map(
      (t) => `<div class="sp-tops">
  <div class="sp-item-name">${esc(t.title)} <span class="sp-b">${esc(t.priceEach.toUpperCase())}</span></div>
  <div class="sp-item-desc">${esc(t.list)}</div>
</div>`,
    )
    .join('\n')
  return aquaCard(byo.title, `${base}\n${tops}`)
}

function masthead(menu) {
  return `<header class="sp-mast">
  <div class="sp-corners"><span>MENU</span><span>ANAHEIM · CA</span></div>
  <h1 class="sp-wordmark">${esc(menu.business.name)}</h1>
  <div class="sp-tagline">${esc(menu.business.tagline.toUpperCase())}</div>
</header>`
}

function footer(menu) {
  const legend = menu.legend
    .map((l) => `<span class="sp-b">[${esc(l.badge)}]</span> ${esc(l.label.toUpperCase())}`)
    .join(' &nbsp; ')
  return `<footer class="sp-footer">
  <div class="sp-footer-left">
    <div class="sp-footer-mark">${esc(menu.business.name)}</div>
    <div class="sp-footer-tag">${esc(menu.business.tagline.toUpperCase())}</div>
  </div>
  <div class="sp-footer-legend">${legend}</div>
  <div class="sp-footer-right">
    <div>${esc(menu.business.phone)}</div>
    <div>${esc(menu.business.address.toUpperCase())}</div>
  </div>
</footer>`
}

export function renderPage({ menu, side }) {
  let swashes, body
  if (side === 'front') {
    const salads = section(menu.front, 'salads')
    const jr = section(menu.front, 'jr-bowlers')
    const sandwiches = section(menu.front, 'sandwiches')
    const burgers = section(menu.front, 'burgers')
    swashes =
      placedSwash({ seed: 11, color: BLUE, opacity: 0.8, style: 'left:47%;top:37%;width:46%;height:6.2%;transform:rotate(-2.5deg)' }) +
      placedSwash({ seed: 23, color: YELLOW, opacity: 0.85, style: 'left:5%;top:74%;width:38%;height:5.4%;transform:rotate(1.8deg)' }) +
      bowlingBall({ style: 'left:6.5%;top:84.5%;width:78px;height:78px;transform:rotate(-14deg)' })
    body = `<div class="sp-cols">
  <div class="sp-col">
    ${printSection(salads)}
    ${aquaCard(jr.title, `<div class="sp-items">${jr.items.map(printItem).join('\n')}</div>`)}
  </div>
  <div class="sp-col">
    ${printSection(sandwiches)}
    ${printSection(burgers)}
  </div>
</div>`
  } else {
    const starters = section(menu.back, 'starters')
    const pizzas = section(menu.back, 'pizzas')
    const spec = pizzas.subsections.find((s) => s.id === 'specialties')
    const byo = pizzas.subsections.find((s) => s.id === 'build-your-own')
    const half = Math.ceil(starters.items.length / 2)
    swashes =
      placedSwash({ seed: 41, color: YELLOW, opacity: 0.85, style: 'left:50%;top:30%;width:44%;height:5.6%;transform:rotate(2deg)' }) +
      placedSwash({ seed: 57, color: BLUE, opacity: 0.8, style: 'left:6%;top:79%;width:40%;height:6%;transform:rotate(-1.5deg)' })
    body = `<section class="sp-sec">
  <h2 class="sp-sec-title">${esc(starters.title)}</h2>
  <div class="sp-cols">
    <div class="sp-col"><div class="sp-items">${starters.items.slice(0, half).map(printItem).join('\n')}</div></div>
    <div class="sp-col"><div class="sp-items">${starters.items.slice(half).map(printItem).join('\n')}</div></div>
  </div>
</section>
<section class="sp-sec sp-sec--pizzas">
  <h2 class="sp-sec-title">${esc(pizzas.title)}</h2>
  <p class="sp-sec-notes">${esc(pizzas.notes)}</p>
  <div class="sp-cols">
    <div class="sp-col">
      <div class="sp-subhead">${esc(spec.title)}</div>
      <div class="sp-items">${spec.items.map(printItem).join('\n')}</div>
    </div>
    <div class="sp-col">${byoCard(byo)}</div>
  </div>
</section>`
  }

  return `<div class="page">
  <div class="sp-swashes">${swashes}</div>
  <div class="sp-content">
    ${masthead(menu)}
    <main class="sp-body">${body}</main>
    ${footer(menu)}
  </div>
</div>`
}

/* ───────────────────────── TV (1920×1080) ───────────────────────── */

function tvItem(item) {
  const priceLine = item.priceM
    ? `M ${esc(item.priceM)} · L ${esc(item.priceL)}`
    : esc(item.price)
  return `<div class="sp-tv-item">
  <div class="sp-tv-row">
    <span class="sp-tv-name">${esc(item.name)} ${badges(item)}</span>
    <span class="sp-tv-price">${priceLine}</span>
  </div>
  ${item.tvSub || item.sub ? `<div class="sp-tv-sub">${esc(item.tvSub || item.sub)}</div>` : ''}
</div>`
}

function tvSection(title, items, { cls = '' } = {}) {
  return `<section class="sp-tv-sec ${cls}">
  <h2 class="sp-tv-title">${esc(title)}</h2>
  <div class="sp-tv-items">${items.map(tvItem).join('\n')}</div>
</section>`
}

function tvCard(title, items) {
  return `<section class="sp-tv-sec sp-tv-card">
  <h2 class="sp-tv-title">${esc(title)}</h2>
  <div class="sp-tv-items">${items.map(tvItem).join('\n')}</div>
</section>`
}

function tvHeader(menu) {
  return `<header class="sp-tv-head">
  <span class="sp-tv-corner">MENU</span>
  <div class="sp-tv-mark">
    <h1 class="sp-wordmark">${esc(menu.business.name)}</h1>
    <div class="sp-tagline">${esc(menu.business.tagline.toUpperCase())}</div>
  </div>
  <span class="sp-tv-corner sp-tv-corner--r">ANAHEIM · CA</span>
</header>`
}

export function renderTvPage({ menu, side }) {
  let swashes, cols
  if (side === 'front') {
    const salads = section(menu.front, 'salads')
    const jr = section(menu.front, 'jr-bowlers')
    const sandwiches = section(menu.front, 'sandwiches')
    const burgers = section(menu.front, 'burgers')
    const sodas = menu.extras.sodas
    swashes =
      placedSwash({ seed: 71, color: BLUE, opacity: 0.75, style: 'left:2.2%;top:13.5%;width:15%;height:5.5%;transform:rotate(-2deg)' }) +
      placedSwash({ seed: 83, color: YELLOW, opacity: 0.8, style: 'left:69.5%;top:13.5%;width:14%;height:5%;transform:rotate(1.5deg)' }) +
      bowlingBall({ style: 'left:2.8%;top:74%;width:150px;height:150px;transform:rotate(-14deg)' })
    cols = `<div class="sp-tv-col">
  ${tvSection(salads.title, salads.items)}
  <div class="sp-tv-blurb"><strong>AVAILABLE DRESSINGS</strong><br>RANCH · ITALIAN · THOUSAND ISLAND · CAESAR · SESAME SOY · BLUE CHEESE</div>
</div>
<div class="sp-tv-col">
  ${tvSection(sandwiches.title, sandwiches.items)}
  ${tvCard(sodas.title, sodas.items)}
</div>
<div class="sp-tv-col">
  ${tvSection(burgers.title, burgers.items)}
  ${tvCard(jr.title, jr.items)}
</div>`
  } else {
    const starters = section(menu.back, 'starters')
    const pizzas = section(menu.back, 'pizzas')
    const spec = pizzas.subsections.find((s) => s.id === 'specialties')
    const byo = pizzas.subsections.find((s) => s.id === 'build-your-own')
    const half = Math.ceil(starters.items.length / 2)
    const byoItems = byo.base.map((b) => ({ name: b.name, price: b.price, sub: b.note, badges: [] }))
    const topsHtml = byo.toppings
      .map(
        (t) => `<div class="sp-tv-tops">
  <div class="sp-tv-tops-head">${esc(t.title.toUpperCase())} <span class="sp-b">${esc(t.priceEach.toUpperCase())}</span></div>
  <div class="sp-tv-tops-list">${esc(t.list)}</div>
</div>`,
      )
      .join('\n')
    swashes =
      placedSwash({ seed: 97, color: YELLOW, opacity: 0.8, style: 'left:2.2%;top:13.5%;width:16%;height:5.5%;transform:rotate(-1.8deg)' }) +
      placedSwash({ seed: 109, color: BLUE, opacity: 0.75, style: 'left:69%;top:13.5%;width:14%;height:5%;transform:rotate(2.2deg)' })
    cols = `<div class="sp-tv-col">
  ${tvSection(starters.title, starters.items.slice(0, half))}
</div>
<div class="sp-tv-col">
  ${tvSection(starters.title + ' (CONT.)', starters.items.slice(half), { cls: 'sp-tv-sec--cont' })}
</div>
<div class="sp-tv-col">
  ${tvSection(pizzas.title, spec.items)}
  <section class="sp-tv-sec sp-tv-card">
    <h2 class="sp-tv-title">${esc(byo.title)}</h2>
    <div class="sp-tv-items">${byoItems.map(tvItem).join('\n')}</div>
    ${topsHtml}
  </section>
</div>`
  }

  return `<div class="page page--tv">
  <div class="sp-swashes">${swashes}</div>
  <div class="sp-content">
    ${tvHeader(menu)}
    <main class="sp-tv-main">${cols}</main>
  </div>
</div>`
}
