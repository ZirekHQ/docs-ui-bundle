'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { expect } = require('./harness')

const css = fs.readFileSync(path.join(__dirname, '../src/css/vars.css'), 'utf8')

const block = (selector) => {
  const open = css.indexOf('{', css.indexOf(selector))
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    if (css[i] === '}' && --depth === 0) return css.slice(open + 1, i)
  }
  throw new Error(`unterminated block for ${selector}`)
}

const declaration = (line) => {
  const colon = line.indexOf(':')
  const end = line.indexOf(';', colon)
  return [line.slice(2, colon), line.slice(colon + 1, end).trim()]
}

const declarations = (body) =>
  Object.fromEntries(
    body
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('--') && line.includes(';'))
      .map(declaration)
  )

const light = declarations(block(':root {'))
const dark = { ...light, ...declarations(block('html.dark-theme {')) }

const NAMED = { white: '#ffffff', black: '#000000' }

const resolve = (theme, value, depth = 0) => {
  const ref = /^var\(--([\w-]+)\)$/.exec(value)
  if (!ref) return value
  if (depth > 6) throw new Error(`var cycle at ${value}`)
  return resolve(theme, theme[ref[1]], depth + 1)
}

const hex = (theme, name) => {
  const resolved = resolve(theme, theme[name])
  const value = NAMED[resolved] || resolved
  const short = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(value)
  const full = short ? `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}` : value
  expect(full, `${name} must resolve to a hex colour`).to.match(/^#[0-9a-f]{6}$/i)
  return full.toLowerCase()
}

const channel = (color, i) => {
  const c = Number.parseInt(color.slice(1 + i * 2, 3 + i * 2), 16) / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}
const luminance = (color) => 0.2126 * channel(color, 0) + 0.7152 * channel(color, 1) + 0.0722 * channel(color, 2)
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const PAIRS = [
  ['body-font-color', 'body-background-color'],
  ['body-font-light-color', 'body-background-color'],
  ['link-font-color', 'body-background-color'],
  ['link-font-color', 'panel-background-color'],
  ['link_hover-font-color', 'body-background-color'],
  ['toc-active-font-color', 'selected-background-color'],
  ['badge-font-color', 'badge-background'],
  ['navbar-font-color', 'navbar-background'],
  ['navbar-menu-font-color', 'navbar-menu-background'],
  ['footer-gray-text-color', 'footer-background'],
]

describe('colour tokens', () => {
  Object.entries({ light, dark }).forEach(([themeName, theme]) => {
    PAIRS.forEach(([fg, bg]) => {
      it(`${themeName}: ${fg} on ${bg} is at least 4.5:1`, () => {
        expect(ratio(hex(theme, fg), hex(theme, bg)), `${fg} on ${bg}`).to.be.at.least(4.5)
      })
    })
  })

  it('uses the Zirek link and navbar colours', () => {
    expect(hex(light, 'link-font-color')).to.equal('#006a85')
    expect(hex(dark, 'link-font-color')).to.equal('#00d2ff')
    expect(hex(light, 'navbar-background')).to.equal('#0b0f19')
  })
})
