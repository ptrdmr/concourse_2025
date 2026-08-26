/**
 * Departure Board — airport departures aesthetic.
 * Single scanning column (front), split dense lists (back starters).
 */

const GATE = {
  salads: 'A01',
  'jr-bowlers': 'A02',
  sandwiches: 'B01',
  burgers: 'B02',
  starters: 'C01',
  pizzas: 'D01',
}

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function badges(list = []) {
  if (!list.length) return ''
  return `<span class="db-badges">${list
    .map((b) => {
      const cls =
        b === 'NEW' ? 'db-badge db-badge--new' : b === 'SPICY' ? 'db-badge db-badge--spicy' : 'db-badge'
      return `<span class="${cls}">${esc(b)}</span>`
    })
    .join('')}</span>`
}

function itemRow(item, index, { compact = false } = {}) {
  const n = String(index + 1).padStart(2, '0')
  const price =
    item.priceM && item.priceL
      ? `<div class="db-price-dual"><span class="sz">M</span>${esc(item.priceM)}<br><span class="sz">L</span>${esc(item.priceL)}</div>`
      : item.price
        ? `<div class="db-price">${esc(item.price)}</div>`
        : `<div class="db-price"></div>`

  const desc = compact
    ? item.descShort
      ? `<div class="db-desc">${esc(item.descShort)}</div>`
      : ''
    : item.desc
      ? `<div class="db-desc">${esc(item.desc)}</div>`
      : ''

  return `
    <div class="db-row">
      <div class="db-idx">${n}</div>
      <div class="db-name-block">
        <div class="db-name">${esc(item.name)}${badges(item.badges)}${item.serves ? `<span class="db-serves">*${esc(item.serves)}*</span>` : ''}</div>
        ${desc}
        ${item.sub ? `<div class="db-sub">${esc(item.sub)}</div>` : ''}
        ${!compact && item.note ? `<div class="db-note">${esc(item.note)}</div>` : ''}
      </div>
      ${price}
    </div>`
}

function sectionBlock(section, { compact = false, split = false } = {}) {
  const gate = GATE[section.id] || '—'
  const note = section.notes
    ? `<div class="db-gate-note">${esc(section.notes)}</div>`
    : ''

  let body = ''
  if (section.subsections) {
    // pizzas
    const specs = section.subsections.find((s) => s.id === 'specialties')
    const byo = section.subsections.find((s) => s.id === 'build-your-own')
    const specRows = (specs?.items || []).map((it, i) => itemRow(it, i, { compact: true })).join('')
    const byoHtml = byo
      ? `<div class="db-byo">
          <div class="db-byo-title">${esc(byo.title)}</div>
          <div class="db-byo-base">${(byo.base || [])
            .map((b) => `${esc(b.name)} <span class="p">${esc(b.price)}</span> <span style="color:var(--soft)">${esc(b.note || '')}</span>`)
            .join('<br>')}</div>
          ${(byo.toppings || [])
            .map(
              (t) => `<div class="db-byo-cat">
              <div class="db-byo-cat-title">${esc(t.title)}<span class="each">${esc(t.priceEach)}</span></div>
              <div class="db-byo-list">${esc(t.list)}</div>
            </div>`,
            )
            .join('')}
        </div>`
      : ''
    body = `<div class="db-pizza"><div>${specRows}</div>${byoHtml}</div>`
  } else {
    const rows = (section.items || []).map((it, i) => itemRow(it, i, { compact })).join('')
    body = split ? `<div class="db-split">${rows}</div>` : rows
  }

  return `
    <section class="db-section">
      <div class="db-gate">
        <span class="db-gate-code">${esc(gate)}</span>
        <span class="db-gate-title">${esc(section.title)}</span>
        ${note}
      </div>
      ${body}
    </section>`
}

function header(menu, side) {
  return `
    <header class="db-header">
      <div>
        <div class="db-brand">${esc(menu.business.name)}</div>
        <div class="db-tagline">${esc(menu.business.tagline)}</div>
      </div>
      <div class="db-board-label">${side === 'front' ? 'Kitchen · Board A' : 'Kitchen · Board B'}</div>
      <div class="db-meta">
        <strong>NOW SERVING</strong>
        ${esc(menu.business.phone)}<br>
        ${esc(menu.business.address)}
      </div>
    </header>
    <div class="db-colhead">
      <div>#</div>
      <div>Flight / Item</div>
      <div class="r">Fare</div>
    </div>`
}

function footer(menu) {
  return `
    <footer class="db-footer">
      <div class="db-legend">
        ${(menu.legend || [])
          .map(
            (l) =>
              `<div class="db-legend-item"><span class="db-badge${l.badge === 'NEW' ? ' db-badge--new' : l.badge === 'SPICY' ? ' db-badge--spicy' : ''}">${esc(l.badge)}</span> ${esc(l.label)}</div>`,
          )
          .join('')}
      </div>
      <div>Prices subject to change</div>
    </footer>`
}

export function renderPage({ menu, side }) {
  const page = menu[side]
  if (!page) throw new Error(`No menu.${side} in content`)

  const sections = page.sections || []
  let body = ''

  if (side === 'front') {
    // Two-rail layout: left salads+jr, right sandwiches+burgers — still reads as a board
    const left = sections.filter((s) => s.id === 'salads' || s.id === 'jr-bowlers')
    const right = sections.filter((s) => s.id === 'sandwiches' || s.id === 'burgers')
    body = `
      <div class="db-split" style="flex:1; align-content:start;">
        <div>${left.map((s) => sectionBlock(s, { compact: false })).join('')}</div>
        <div>${right.map((s) => sectionBlock(s, { compact: false })).join('')}</div>
      </div>`
  } else {
    body = sections
      .map((s) =>
        sectionBlock(s, {
          compact: s.id === 'starters',
          split: s.id === 'starters',
        }),
      )
      .join('')
  }

  return `
<div class="page">
  ${header(menu, side)}
  <div class="db-body">
    ${body}
  </div>
  ${footer(menu)}
</div>`
}
