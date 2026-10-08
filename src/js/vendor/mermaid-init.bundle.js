;(function () {
  'use strict'

  var blocks = [].slice.call(document.querySelectorAll('pre code.language-mermaid'))
  if (!blocks.length || !window.mermaid) return

  var isDark = document.documentElement.classList.contains('dark-theme')
  window.mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
    securityLevel: 'strict',
  })

  blocks.forEach(function (code, idx) {
    var wrapper = code.closest('.listingblock') || code.closest('pre')
    var div = document.createElement('div')
    div.className = 'mermaid'
    div.id = 'mermaid-diagram-' + idx
    div.textContent = code.textContent
    wrapper.parentNode.replaceChild(div, wrapper)
  })

  window.mermaid.run({ querySelector: '.mermaid' })
})()
