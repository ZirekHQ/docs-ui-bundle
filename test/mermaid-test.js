'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { expect } = require('./harness')

const root = path.join(__dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

describe('mermaid', () => {
  it('pins mermaid to an exact version', () => {
    expect(JSON.parse(read('package.json')).devDependencies.mermaid).to.match(/^\d+\.\d+\.\d+$/)
  })

  it('loads mermaid before its initialiser, both deferred', () => {
    const footer = read('src/partials/footer-scripts.hbs')
    const lib = footer.indexOf('js/vendor/mermaid.js')
    const init = footer.indexOf('js/vendor/mermaid-init.js')
    expect(lib, 'mermaid.js tag').to.be.above(-1)
    expect(init, 'mermaid-init.js tag').to.be.above(lib)
    expect(footer.slice(footer.lastIndexOf('<script', lib), lib)).to.include('defer')
    expect(footer.slice(footer.lastIndexOf('<script', init), init)).to.include('defer')
  })

  it('picks the dark mermaid theme from the dark-theme class and keeps strict security', () => {
    const init = read('src/js/vendor/mermaid-init.bundle.js')
    expect(init).to.include("classList.contains('dark-theme')")
    expect(init).to.include("securityLevel: 'strict'")
    expect(init).to.include('pre code.language-mermaid')
  })

  it('styles the rendered diagram container', () => {
    expect(read('src/css/site.css')).to.include('@import "diagrams.css";')
    expect(read('src/css/diagrams.css')).to.include('.mermaid svg')
  })

  it('falls back to the enclosing pre, never to the grandparent', () => {
    const init = read('src/js/vendor/mermaid-init.bundle.js')
    expect(init).to.include("code.closest('pre')")
    expect(init).to.not.include('parentNode.parentNode')
  })
})
