/**
 * Chroma — full-bleed organic colour field with cream reading panels.
 */
import { artworkSvg, overlaySvg, chipPath, PALETTE } from './artwork.mjs'

const SECTION_COLOR = {
  salads: PALETTE.teal,
  'jr-bowlers': PALETTE.gold,
  sandwiches: PALETTE.cobalt,
  burgers: PALETTE.magenta,
  starters: PALETTE.violet,
  pizzas: PALETTE.orange,
  'build-your-own': PALETTE.orange,
  specialties: PALETTE.orange,
}

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function badges(list = []) {
  if (!list?.length) return ''
  return list
    .map((b) => {
      const cls =
        b === 'NEW'
          ? 'ch-badge ch-badge--new'
          : b === 'SPICY'
            ? 'ch-badge ch-badge--spicy'
            : b === 'VG'
              ? 'ch-badge ch-badge--vg'
              : b === 'GF'
                ? 'ch-badge ch-badge--gf'
                : 'ch-badge'
      return `<span class="${cls}">${esc(b)}</span>`
    })
    .join('')
}

function sectionHeader(title, sectionId) {
  const color = SECTION_COLOR[sectionId] || PALETTE.ink
  const seed =
    sectionId === 'salads'
      ? 1
      : sectionId === 'jr-bowlers'
        ? 2
        : sectionId === 'sandwiches'
          ? 3
          : sectionId === 'burgers'
            ? 4
            : sectionId === 'starters'
              ? 5
              : sectionId === 'pizzas'
                ? 6
                : 7
  const d = chipPath(seed)
  return `
    <div class="ch-section-head" style="--sec:${color}">
      <svg class="ch-chip" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d="${d}" fill="${color}"/>
      </svg>
      <h2 class="ch-section-title">${esc(title)}</h2>
      <span class="ch-section-rule" aria-hidden="true"></span>
    </div>`
}

function itemHtml(item, { short = false, color } = {}) {
  const price =
    item.priceM && item.priceL
      ? `<span class="ch-price-dual"><span class="sz">M</span> ${esc(item.priceM)} · <span class="sz">L</span> ${esc(item.priceL)}</span>`
      : item.price
        ? `<span class="ch-price">${esc(item.price)}</span>`
        : ''

  const descText = short ? item.descShort : item.desc
  const desc =
    descText && String(descText).trim()
      ? `<p class="ch-desc">${esc(descText)}</p>`
      : ''

  const style = color ? ` style="--sec:${color}"` : ''

  return `
    <article class="ch-item"${style}>
      <div class="ch-item-head">
        <span class="ch-name">${esc(item.name)}</span>
        ${badges(item.badges)}
        ${item.serves ? `<span class="ch-serves">*${esc(item.serves)}*</span>` : ''}
        ${price}
      </div>
      ${desc}
      ${item.sub ? `<p class="ch-sub">${esc(item.sub)}</p>` : ''}
      ${!short && item.note ? `<p class="ch-note">${esc(item.note)}</p>` : ''}
    </article>`
}

function sectionBlock(section, { short = false, tinted = false, tintAlpha = 0.16, grow = false } = {}) {
  const color = SECTION_COLOR[section.id] || PALETTE.ink
  const growCls = grow ? ' ch-section--grow' : ''
  const tintGrow = grow ? ' ch-tint--grow' : ''
  const wrapOpen = tinted
    ? `<div class="ch-tint${tintGrow}" style="--tint:${color}; --tint-a:${tintAlpha}">`
    : ''
  const wrapClose = tinted ? `</div>` : ''
  return `
    ${wrapOpen}
    <section class="ch-section${growCls}">
      ${sectionHeader(section.title, section.id)}
      ${section.notes ? `<p class="ch-section-note">${esc(section.notes)}</p>` : ''}
      <div class="ch-items">
        ${(section.items || []).map((it) => itemHtml(it, { short, color })).join('')}
      </div>
    </section>
    ${wrapClose}`
}

function mast(menu, side) {
  return `
    <header class="ch-mast">
      <div class="ch-mast-left">
        <div class="ch-brand">${esc(menu.business.name)}</div>
        <div class="ch-tag">
          <span class="ch-dots" aria-hidden="true">
            <i style="background:${PALETTE.teal}"></i>
            <i style="background:${PALETTE.magenta}"></i>
            <i style="background:${PALETTE.gold}"></i>
          </span>
          ${esc(menu.business.tagline)}
        </div>
      </div>
      <div class="ch-mast-right">
        <div class="ch-meta">${esc(menu.business.phone)}</div>
        <div class="ch-meta">${esc(menu.business.address)}</div>
      </div>
    </header>`
}

function foot(menu) {
  return `
    <footer class="ch-footer">
      <div class="ch-legend">
        ${(menu.legend || [])
          .map(
            (l) =>
              `<div class="ch-legend-item">${badges([l.badge])} <span>${esc(l.label)}</span></div>`,
          )
          .join('')}
      </div>
      <div class="ch-footer-phone">${esc(menu.business.phone)}</div>
    </footer>`
}

export function renderPage({ menu, side }) {
  const page = menu[side]
  if (!page) throw new Error(`No menu.${side}`)

  let body = ''

  if (side === 'front') {
    const byId = Object.fromEntries(page.sections.map((s) => [s.id, s]))
    body = `
      <div class="ch-cols ch-cols--fill">
        <div class="ch-col">
          ${sectionBlock(byId.salads, { grow: true })}
          ${sectionBlock(byId['jr-bowlers'], { tinted: true, tintAlpha: 0.16, grow: true })}
        </div>
        <div class="ch-col">
          ${sectionBlock(byId.sandwiches, { grow: true })}
          ${sectionBlock(byId.burgers, { grow: true })}
        </div>
      </div>`
  } else {
    const starters = page.sections.find((s) => s.id === 'starters')
    const pizzas = page.sections.find((s) => s.id === 'pizzas')
    const specs = pizzas?.subsections?.find((s) => s.id === 'specialties')
    const byo = pizzas?.subsections?.find((s) => s.id === 'build-your-own')
    const half = Math.ceil((starters.items || []).length / 2)
    const left = (starters.items || []).slice(0, half)
    const right = (starters.items || []).slice(half)
    const starterColor = SECTION_COLOR.starters
    const pizzaColor = SECTION_COLOR.pizzas

    body = `
      <section class="ch-section ch-section--grow">
        ${sectionHeader(starters.title, 'starters')}
        <div class="ch-cols ch-cols--tight ch-cols--fill">
          <div class="ch-col ch-items">${left.map((it) => itemHtml(it, { short: true, color: starterColor })).join('')}</div>
          <div class="ch-col ch-items">${right.map((it) => itemHtml(it, { short: true, color: starterColor })).join('')}</div>
        </div>
      </section>
      <section class="ch-section ch-section--pizzas ch-section--grow-sm">
        ${sectionHeader(pizzas.title, 'pizzas')}
        ${pizzas.notes ? `<p class="ch-section-note">${esc(pizzas.notes)}</p>` : ''}
        <div class="ch-pizza">
          <div class="ch-items">
            <div class="ch-subhead" style="--sec:${pizzaColor}">${esc(specs.title)}</div>
            ${(specs.items || []).map((it) => itemHtml(it, { short: true, color: pizzaColor })).join('')}
          </div>
          <div class="ch-tint ch-byo" style="--tint:${pizzaColor}; --tint-a:0.14">
            <div class="ch-subhead" style="--sec:${pizzaColor}">${esc(byo.title)}</div>
            <div class="ch-byo-base">
              ${(byo.base || [])
                .map(
                  (b) =>
                    `${esc(b.name)} <span class="ch-price">${esc(b.price)}</span> <span class="ch-byo-note">${esc(b.note || '')}</span>`,
                )
                .join('<br>')}
            </div>
            ${(byo.toppings || [])
              .map(
                (t) => `
              <div class="ch-byo-cat">
                <div class="ch-byo-cat-title">${esc(t.title)} <span class="each">${esc(t.priceEach)}</span></div>
                <div class="ch-byo-list">${esc(t.list)}</div>
              </div>`,
              )
              .join('')}
          </div>
        </div>
      </section>`
  }

  return `
<div class="page" data-side="${side}">
  <div class="ch-art-stage" aria-hidden="true">
    <div class="ch-art bleed-layer">
      ${artworkSvg({ side })}
    </div>
    <div class="ch-overlay">
      ${overlaySvg({ side })}
    </div>
  </div>
  <div class="ch-field" aria-hidden="true"></div>
  <div class="ch-content">
    ${mast(menu, side)}
    <div class="ch-body">
      ${body}
    </div>
    ${foot(menu)}
  </div>
</div>`
}
