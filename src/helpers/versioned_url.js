'use strict'

module.exports = function versionedUrl (siteUrl, versionSegment, url) {
  const base = siteUrl ?? ''
  if (!url) {
    // occurs with stock pages like 404.html
    return url
  } else if (!versionSegment || url.includes(`/${versionSegment}/`)) {
    return `${base}${url}`
  } else {
    return `${base}/${versionSegment}${url}`
  }
}
