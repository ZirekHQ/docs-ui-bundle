'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { expect } = require('./harness')
const componentLogo = require('../src/helpers/component_logo.js')

const SRC = path.join(__dirname, '../src')
const TEXT = /\.(hbs|css|js|yml|json)$/

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) return ['vendor', 'font'].includes(entry.name) ? [] : walk(path.join(dir, entry.name))
    return [path.join(dir, entry.name)]
  })

describe('branding', () => {
  it('leaves no Hominux text in src/ outside vendored files and fonts', () => {
    const offenders = walk(SRC).filter((file) => TEXT.test(file) && /hominux/i.test(fs.readFileSync(file, 'utf8')))
    expect(offenders).to.eql([])
  })

  it('ships every image the partials and head reference', () => {
    const images = ['zirekhq-logo.png', 'social-preview.png', 'favicon.ico', 'favicon-32.png', 'favicon-180.png']
    images.forEach((name) => expect(fs.existsSync(path.join(SRC, 'img', name)), name).to.equal(true))
  })
})

describe('component_logo', () => {
  const logos = {
    'dengjen-nvda': 'dengjen-nvda-logo.png',
    'nvda-addon-testkit': 'nvda-addon-testkit-logo.png',
    'dengjen-tts': 'dengjen-tts-logo.png',
    'dengjen-tashkeel': 'dengjen-tashkeel-logo.png',
    'dengjen-werger': 'dengjen-werger-logo.png',
    'piper-rs': 'dengjen-piper-rs-logo.png',
  }

  Object.entries(logos).forEach(([name, file]) => {
    it(`maps ${name} to ${file} and the file exists`, () => {
      expect(componentLogo(name)).to.equal(file)
      expect(fs.existsSync(path.join(SRC, 'img', file)), file).to.equal(true)
    })
  })

  it('returns nothing for the home component and for unknown names', () => {
    expect(componentLogo('home')).to.equal(undefined)
    expect(componentLogo('unknown')).to.equal(undefined)
    expect(componentLogo(undefined)).to.equal(undefined)
  })
})
