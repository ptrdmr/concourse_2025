/**
 * Broadsheet — newsprint editorial, cream paper, dotted price leaders.
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
  return list.map((b) => `<span class="bs-badge">${esc(b)}</span>`).join('')
}

function itemHtml(item, { justify = true } = {}) {
  const price =
    item.priceM && item.priceL
      ? `<span class="bs-price-dual"><span class="sz">M</span> ${esc(item.priceM)} · <span class="sz">L</span> ${esc(item.priceL)}</span>`
      : item.price
        ? `<span class="bs-price">${esc(item.price)}</span>`
        : ''

  return `
    <article class="bs-item">
      <div class="bs-item-head">
        <span class="bs-name">${esc(item.name)}</span>
        ${badges(item.badges)}
        ${item.serves ? `<span class="bs-serves">*${esc(item.serves)}*</span>` : ''}
        <span class="bs-lead" aria-hidden="true"></span>
        ${price}
      </div>
      ${item.desc ? `<p class="bs-desc"${justify ? '' : ''}>${esc(item.desc)}</p>` : ''}
      ${item.sub ? `<p class="bs-sub">${esc(item.sub)}</p>` : ''}
      ${item.note ? `<p class="bs-note">${esc(item.note)}</p>` : ''}
    </article>`
}

function sectionHtml(section, { shaded = false } = {}) {
  const wrapOpen = shaded || section.shaded ? `<div class="bs-shaded">` : ''
  const wrapClose = shaded || section.shaded ? `</div>` : ''
  return `
    ${wrapOpen}
    <section class="bs-section">
      <h2 class="bs-section-title">${esc(section.title)}</h2>
      ${section.notes ? `<p class="bs-section-note">${esc(section.notes)}</p>` : ''}
      ${(section.items || []).map((it) => itemHtml(it)).join('')}
    </section>
    ${wrapClose}`
}

function mast(menu, side) {
  return `
    <header class="bs-mast">
      <div class="bs-kicker">The Kitchen Gazette · Vol. I</div>
      <div class="bs-brand">${esc(menu.business.name)}</div>
      <div class="bs-tag">${esc(menu.business.tagline)}</div>
    </header>
    <div class="bs-dateline">
      <span>${side === 'front' ? 'Page One' : 'Page Two'}</span>
      <span>${esc(menu.business.address)}</span>
      <span>${esc(menu.business.phone)}</span>
    </div>`
}

function foot(menu) {
  return `
    <footer class="bs-footer">
      <div class="bs-legend">
        ${(menu.legend || [])
          .map(
            (l) =>
              `<div class="bs-legend-item"><span class="bs-badge">${esc(l.badge)}</span> ${esc(l.label)}</div>`,
          )
          .join('')}
      </div>
      <div>Est. 1990 · Anaheim</div>
    </footer>`
}

export function renderPage({ menu, side }) {
  const page = menu[side]
  if (!page) throw new Error(`No menu.${side}`)

  let body = ''

  if (side === 'front') {
    const byId = Object.fromEntries(page.sections.map((s) => [s.id, s]))
    body = `
      <div class="bs-cols-2">
        <div class="bs-col">
          ${sectionHtml(byId.salads)}
          ${sectionHtml(byId['jr-bowlers'])}
        </div>
        <div class="bs-col">
          ${sectionHtml(byId.sandwiches)}
          ${sectionHtml(byId.burgers)}
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

    body = `
      <section class="bs-section">
        <h2 class="bs-section-title">${esc(starters.title)}</h2>
        <div class="bs-starters-grid">
          <div>${left.map((it) => itemHtml(it)).join('')}</div>
          <div>${right.map((it) => itemHtml(it)).join('')}</div>
        </div>
      </section>
      <section class="bs-section">
        <h2 class="bs-section-title">${esc(pizzas.title)}</h2>
        ${pizzas.notes ? `<p class="bs-section-note">${esc(pizzas.notes)}</p>` : ''}
        <div class="bs-pizza">
          <div>
            <div class="bs-subhead">${esc(specs.title)}</div>
            ${(specs.items || []).map((it) => itemHtml(it)).join('')}
          </div>
          <div class="bs-byo">
            <div class="bs-subhead">${esc(byo.title)}</div>
            <div class="bs-byo-base">
              ${(byo.base || [])
                .map(
                  (b) =>
                    `${esc(b.name)} <span class="p">${esc(b.price)}</span> <em style="font-weight:400;color:var(--muted)">${esc(b.note || '')}</em>`,
                )
                .join('<br>')}
            </div>
            ${(byo.toppings || [])
              .map(
                (t) => `
              <div class="bs-byo-cat">
                <div class="bs-byo-cat-title">${esc(t.title)}<span class="each">${esc(t.priceEach)}</span></div>
                <div class="bs-byo-list">${esc(t.list)}</div>
              </div>`,
              )
              .join('')}
          </div>
        </div>
      </section>`
  }

  return `
<div class="page">
  ${mast(menu, side)}
  <div class="bs-body">
    ${body}
  </div>
  ${foot(menu)}
</div>`
}
