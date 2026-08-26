/**
 * Marquee — oversized type, full-bleed colour panels, short copy only.
 */

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function badges(list = []) {
  if (!list?.length) return ''
  return list.map((b) => `<span class="mq-badge">${esc(b)}</span>`).join('')
}

function itemHtml(item) {
  const price =
    item.priceM && item.priceL
      ? `<span class="mq-price-dual"><span class="sz">M</span>${esc(item.priceM)} · <span class="sz">L</span>${esc(item.priceL)}</span>`
      : item.price
        ? `<span class="mq-price">${esc(item.price)}</span>`
        : ''

  // Marquee rule: descShort or nothing — never truncate mid-sentence
  const desc =
    item.descShort && item.descShort.trim()
      ? `<div class="mq-desc">${esc(item.descShort)}</div>`
      : ''

  return `
    <div class="mq-item">
      <div class="mq-row">
        <span class="mq-name">${esc(item.name)}</span>
        ${badges(item.badges)}
        ${price}
      </div>
      ${desc}
      ${item.sub ? `<div class="mq-sub">${esc(item.sub)}</div>` : ''}
    </div>`
}

function panel(section, areaClass, { shortNote = true } = {}) {
  const note = section.notes
    ? `<div class="mq-panel-note">${esc(shortNote ? section.notes : section.notes)}</div>`
    : ''
  return `
    <section class="mq-panel mq-panel--${areaClass}">
      <div class="mq-panel-title">${esc(section.title)}</div>
      ${note}
      <div class="mq-items">
        ${(section.items || []).map(itemHtml).join('')}
      </div>
    </section>`
}

function byoPanel(byo) {
  return `
    <section class="mq-panel mq-panel--byo">
      <div class="mq-panel-title">${esc(byo.title)}</div>
      <div class="mq-byo-base">
        ${(byo.base || [])
          .map((b) => `${esc(b.name)} <span class="p">${esc(b.price)}</span>`)
          .join('<br>')}
      </div>
      ${(byo.toppings || [])
        .map(
          (t) => `
        <div class="mq-byo-cat">
          <div class="mq-byo-cat-title">${esc(t.title)}<span class="each">${esc(t.priceEach)}</span></div>
          <div class="mq-byo-list">${esc(t.list)}</div>
        </div>`,
        )
        .join('')}
    </section>`
}

function mast(menu, side) {
  return `
    <header class="mq-mast">
      <div class="mq-brand">${esc(menu.business.name)}</div>
      <div class="mq-tag">${esc(menu.business.tagline)}</div>
      <div class="mq-side">${side === 'front' ? 'Side A' : 'Side B'}</div>
    </header>`
}

function foot(menu) {
  return `
    <footer class="mq-footer">
      <div class="mq-legend">
        ${(menu.legend || [])
          .map(
            (l) =>
              `<div class="mq-legend-item"><span class="mq-badge">${esc(l.badge)}</span> ${esc(l.label)}</div>`,
          )
          .join('')}
      </div>
      <div>${esc(menu.business.phone)}</div>
    </footer>`
}

export function renderPage({ menu, side }) {
  const page = menu[side]
  if (!page) throw new Error(`No menu.${side}`)

  let grid = ''

  if (side === 'front') {
    const byId = Object.fromEntries(page.sections.map((s) => [s.id, s]))
    grid = `
      <div class="mq-grid mq-grid--front">
        ${panel(byId.salads, 'salads')}
        ${panel(byId['jr-bowlers'], 'jr')}
        ${panel(byId.sandwiches, 'sandwiches')}
        ${panel(byId.burgers, 'burgers')}
      </div>`
  } else {
    const starters = page.sections.find((s) => s.id === 'starters')
    const pizzas = page.sections.find((s) => s.id === 'pizzas')
    const specs = pizzas?.subsections?.find((s) => s.id === 'specialties')
    const byo = pizzas?.subsections?.find((s) => s.id === 'build-your-own')
    grid = `
      <div class="mq-grid mq-grid--back">
        ${panel({ ...starters, notes: null }, 'starters')}
        <section class="mq-panel mq-panel--pizzas">
          <div class="mq-panel-title">${esc(pizzas.title)}</div>
          <div class="mq-panel-note">${esc(pizzas.notes)}</div>
          <div class="mq-items">
            ${(specs?.items || []).map(itemHtml).join('')}
          </div>
        </section>
        ${byoPanel(byo)}
      </div>`
  }

  return `
<div class="page">
  ${mast(menu, side)}
  ${grid}
  ${foot(menu)}
</div>`
}
