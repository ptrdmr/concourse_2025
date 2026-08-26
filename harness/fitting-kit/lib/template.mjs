/**
 * A very small, dependency-free template language for boards.
 *
 * Anything a board needs from brand.json or a content file goes in double braces:
 *
 *   {{ brand.business.name }}          escaped value
 *   {{{ content.footerHtml }}}         raw value, use only for trusted markup
 *   {{#each content.items}}...{{/each}}    loop; inside, use {{ this.name }}
 *   {{#if this.price}}...{{else}}...{{/if}}
 *   {{#unless this.soldOut}}...{{/unless}}
 *   {{ @index }} {{ @number }} {{ @first }} {{ @last }}   inside a loop
 *   {{! a comment that renders nothing }}
 *
 * Lookup walks outward from the innermost loop to the top-level context, so
 * `{{ brand.colors.accent }}` works anywhere.
 *
 * An empty array counts as false, which makes `{{#if content.specials}}` do the
 * sensible thing when a list has nothing in it.
 */

const TAG = /\{\{\{\s*([^{}]+?)\s*\}\}\}|\{\{\s*([^{}]+?)\s*\}\}/g
const BLOCKS = new Set(["each", "if", "unless"])

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function branch(node) {
  return node.inAlt ? node.alt : node.children
}

export function parse(source) {
  const root = { type: "root", children: [], alt: null, inAlt: false }
  const stack = [root]
  let cursor = 0
  let match

  TAG.lastIndex = 0
  while ((match = TAG.exec(source)) !== null) {
    const top = stack[stack.length - 1]
    if (match.index > cursor) {
      branch(top).push({ type: "text", value: source.slice(cursor, match.index) })
    }
    cursor = match.index + match[0].length

    if (match[1] !== undefined) {
      branch(top).push({ type: "raw", path: match[1].trim() })
      continue
    }

    const expr = match[2].trim()

    if (expr.startsWith("!")) continue

    if (expr.startsWith("#")) {
      const [keyword, ...rest] = expr.slice(1).split(/\s+/)
      if (!BLOCKS.has(keyword)) {
        throw new Error(`Unknown block {{#${keyword}}}. Use each, if or unless.`)
      }
      const path = rest.join(" ").trim()
      if (!path) throw new Error(`{{#${keyword}}} needs something to look up, e.g. {{#${keyword} content.items}}`)
      const node = { type: keyword, path, children: [], alt: [], inAlt: false }
      branch(top).push(node)
      stack.push(node)
      continue
    }

    if (expr === "else") {
      if (top.type === "root") throw new Error("{{else}} found outside of an {{#if}} or {{#unless}} block")
      if (top.type === "each") throw new Error("{{else}} is not supported inside {{#each}}; use {{#if}} around the loop")
      top.inAlt = true
      continue
    }

    if (expr.startsWith("/")) {
      const keyword = expr.slice(1).trim()
      if (stack.length === 1) throw new Error(`Found {{/${keyword}}} with no matching {{#${keyword}}}`)
      const node = stack.pop()
      if (node.type !== keyword) {
        throw new Error(`{{/${keyword}}} closes the wrong block — {{#${node.type}}} is still open`)
      }
      continue
    }

    branch(top).push({ type: "value", path: expr })
  }

  const top = stack[stack.length - 1]
  if (cursor < source.length) {
    branch(top).push({ type: "text", value: source.slice(cursor) })
  }
  if (stack.length > 1) {
    throw new Error(`{{#${top.type} ${top.path}}} was never closed with {{/${top.type}}}`)
  }
  return root
}

function getIn(value, parts) {
  let current = value
  for (const part of parts) {
    if (current === null || current === undefined) return undefined
    current = current[part]
  }
  return current
}

function resolve(path, frames) {
  const innermost = frames[frames.length - 1]

  if (path === "." || path === "this") return innermost.value

  if (path.startsWith("@")) {
    for (let i = frames.length - 1; i >= 0; i -= 1) {
      const extras = frames[i].extras
      if (extras && path in extras) return extras[path]
    }
    return undefined
  }

  const parts = path.split(".").filter(Boolean)
  if (parts[0] === "this") return getIn(innermost.value, parts.slice(1))

  for (let i = frames.length - 1; i >= 0; i -= 1) {
    const found = getIn(frames[i].value, parts)
    if (found !== undefined) return found
  }
  return undefined
}

function isTruthy(value) {
  if (Array.isArray(value)) return value.length > 0
  return Boolean(value)
}

function stringify(value, path, report) {
  if (value === null || value === undefined) {
    report.missing.add(path)
    return ""
  }
  if (typeof value === "object") {
    report.problems.push(
      `{{ ${path} }} points at a ${Array.isArray(value) ? "list" : "group of values"}, not text. Did you mean to loop over it with {{#each ${path}}}?`,
    )
    return ""
  }
  return String(value)
}

function run(nodes, frames, out, report) {
  for (const node of nodes) {
    switch (node.type) {
      case "text":
        out.push(node.value)
        break
      case "value":
        out.push(escapeHtml(stringify(resolve(node.path, frames), node.path, report)))
        break
      case "raw":
        out.push(stringify(resolve(node.path, frames), node.path, report))
        break
      case "if":
      case "unless": {
        const value = resolve(node.path, frames)
        const truthy = node.type === "if" ? isTruthy(value) : !isTruthy(value)
        run(truthy ? node.children : node.alt, frames, out, report)
        break
      }
      case "each": {
        const value = resolve(node.path, frames)
        if (value === undefined || value === null) {
          report.missing.add(node.path)
          break
        }
        const list = Array.isArray(value) ? value : Object.values(value)
        list.forEach((entry, index) => {
          frames.push({
            value: entry,
            extras: {
              "@index": index,
              "@number": index + 1,
              "@first": index === 0,
              "@last": index === list.length - 1,
            },
          })
          run(node.children, frames, out, report)
          frames.pop()
        })
        break
      }
      default:
        break
    }
  }
}

/**
 * @returns {{ html: string, missing: string[], problems: string[] }}
 */
export function render(source, context) {
  const ast = parse(source)
  const out = []
  const report = { missing: new Set(), problems: [] }
  run(ast.children, [{ value: context, extras: null }], out, report)
  return { html: out.join(""), missing: [...report.missing], problems: report.problems }
}
