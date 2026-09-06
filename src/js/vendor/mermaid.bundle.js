;(function () {
  'use strict'

  var mermaid = require('mermaid')

  var blocks = [].slice.call(document.querySelectorAll('pre code.language-mermaid'))
  if (!blocks.length) return

  var isDark = document.documentElement.classList.contains('dark')
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
    securityLevel: 'strict',
  })

  blocks.forEach(function (code, idx) {
    var wrapper = code.closest('.listingblock') || code.parentNode.parentNode
    var div = document.createElement('div')
    div.className = 'mermaid'
    div.id = 'mermaid-diagram-' + idx
    div.textContent = code.textContent
    wrapper.parentNode.replaceChild(div, wrapper)
  })

  // mermaid.init() only reliably renders when given a selector string (its
  // documented default) -- an explicit array of DOM nodes resolves the
  // returned promise without an error, but silently renders nothing.
  mermaid.init(undefined, '.mermaid')
})()
