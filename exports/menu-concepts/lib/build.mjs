/**
 * Builds concept HTML from content/menu.json + each concept's layout.mjs + style.css.
 * Writes to build/{concept}-{side}.html with CSS inlined.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const conceptsDir = path.join(root, 'concepts')
const contentFile = path.join(root, 'content', 'menu.json')
const buildDir = path.join(root, 'build')

export function listConcepts() {
  return fs
    .readdirSync(conceptsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
    .map((d) => d.name)
    .sort()
}

function stripComments(obj) {
  if (Array.isArray(obj)) return obj.map(stripComments)
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith('$')) continue
      out[k] = stripComments(v)
    }
    return out
  }
  return obj
}

export async function buildAll({ only } = {}) {
  fs.mkdirSync(buildDir, { recursive: true })
  const menu = stripComments(JSON.parse(fs.readFileSync(contentFile, 'utf8')))
  const concepts = listConcepts().filter((name) => {
    if (!only) return true
    return name.includes(only) || name.replace(/^\d+-/, '').includes(only)
  })

  if (concepts.length === 0) {
    throw new Error(`No concepts matched --only=${only}`)
  }

  const built = []

  for (const name of concepts) {
    const dir = path.join(conceptsDir, name)
    const layoutPath = path.join(dir, 'layout.mjs')
    const stylePath = path.join(dir, 'style.css')
    if (!fs.existsSync(layoutPath)) {
      console.warn(`Skip (no layout.mjs): ${name}`)
      continue
    }

    const mod = await import(pathToFileURL(layoutPath).href + `?t=${Date.now()}`)
    const css = fs.existsSync(stylePath) ? fs.readFileSync(stylePath, 'utf8') : ''

    const writePage = (side, kind, body) => {
      const title = `${menu.business.name} — ${name} (${side})`
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<style>
${css}
</style>
</head>
<body data-concept="${escapeHtml(name)}" data-side="${side}">
${body}
</body>
</html>
`
      const outName = `${name}-${side}.html`
      const outPath = path.join(buildDir, outName)
      fs.writeFileSync(outPath, html, 'utf8')
      built.push({ name, side, kind, outPath, outName })
      console.log('Built', path.relative(root, outPath))
    }

    for (const side of ['front', 'back']) {
      writePage(side, 'print', mod.renderPage({ menu, side }))
    }

    // Optional 1920×1080 TV screens (mirrors public/front-tv.html + back-tv.html)
    if (typeof mod.renderTvPage === 'function') {
      for (const side of ['front', 'back']) {
        writePage(`${side}-tv`, 'tv', mod.renderTvPage({ menu, side }))
      }
    }
  }

  return built
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// CLI
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = Object.fromEntries(
    process.argv.slice(2).map((a) => {
      const m = a.match(/^--([^=]+)(?:=(.*))?$/)
      return m ? [m[1], m[2] ?? true] : [a, true]
    }),
  )
  buildAll({ only: typeof args.only === 'string' ? args.only : undefined }).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
