/* eslint-env mocha */
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

  it('ships the with_menu layout that component pages request', () => {
    expect(read('src/layouts/with_menu.hbs')).to.equal(read('src/layouts/default.hbs'))
  })
})
