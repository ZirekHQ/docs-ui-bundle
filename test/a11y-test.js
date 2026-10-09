'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { expect } = require('./harness')

const root = path.join(__dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

describe('accessibility', () => {
  it('labels every unlabelled nav landmark so landmarks are unique', () => {
    expect(read('src/partials/header-content.hbs')).to.include('<nav class="navbar" aria-label="Main">')
    expect(read('src/partials/nav.hbs')).to.include('<nav class="nav-menu" aria-label="Documentation">')
    expect(read('src/partials/pagination.hbs')).to.include('<nav class="pagination" aria-label="Pagination">')
  })

  it('titles the on-this-page menu with an h2 so the heading order does not skip a level', () => {
    expect(read('src/js/02-on-this-page.js')).to.include("createElement('h2')")
    expect(read('src/css/toc.css')).to.include('.toc .toc-menu h2')
  })

  it('underlines inline links in running text', () => {
    expect(read('src/css/doc.css')).to.match(/\.doc p a,[^{]*\{\s*text-decoration: underline;/)
  })
})

describe('collapsed sidebar', () => {
  it('only lets the menu panel overflow at desktop widths so the mobile drawer keeps scrolling', () => {
    const css = read('src/css/nav.css')
    expect(css).to.not.match(/^body\.nav-sm \.nav-panel-menu \{/m)
    const scoped = /@media screen and \(min-width: 1024px\) \{\s*body\.nav-sm \.nav-panel-menu \{\s*overflow: visible;/
    expect(css).to.match(scoped)
  })
})

describe('partial includes', () => {
  it('leaves no partial references that the bundle does not ship', () => {
    const partials = fs.readdirSync(path.join(__dirname, '../src/partials'))
    const shipped = new Set(partials.map((file) => file.replace(/\.hbs$/, '')))
    partials.forEach((file) => {
      const used = [...read(`src/partials/${file}`).matchAll(/\{\{>\s*([\w-]+)/g)].map((match) => match[1])
      used.forEach((name) => expect(shipped.has(name), `${file} includes missing partial ${name}`).is.true())
    })
  })
})
