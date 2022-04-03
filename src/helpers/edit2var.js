'use strict'

module.exports = (edit_url, type) => {
  if (!edit_url || !type) return false
  if (edit_url.includes("://github.com/")) {
    if (type == "issue") return edit_url.replace(/\/edit\/(\w+)\/(.*)$/, "/issues/new?title=[$1] Doc issue in file $2")
    if (type == "history") return edit_url.replace(/\/edit\//, "/commits/")
  // edit: https://github.com/coreos/fedora-coreos-docs/edit/main/modules/ROOT/pages/index.adoc
  // issue: https://github.com/coreos/fedora-coreos-docs/issues/new
  // history: https://github.com/coreos/fedora-coreos-docs/commits/main/modules/ROOT/pages/index.adoc
  }
  if (edit_url.includes("://pagure.io/")) {
    if (type == "issue") return edit_url.replace(/\/blob\/(\w+)\/f\/(.*)$/, "/new_issue?title=[$1] Doc issue in file $2")
    if (type == "history") {
      let m = edit_url.match(/(.*)\/blob\/(\w+)\/f\/(.*)$/)
      return `${m[1]}/history/${m[3]}?identifier=${m[2]}`
    }
  // edit: https://pagure.io/fedora-docs/documentation-contributors-guide/blob/master/f/modules/ROOT/pages/index.adoc
  // issue: https://pagure.io/fedora-docs/documentation-contributors-guide/new_issue
  // history: https://pagure.io/fedora-docs/documentation-contributors-guide/history/modules/ROOT/pages/index.adoc?identifier=master
  }
  if (edit_url.includes("://gitlab.com/")) {
    if (type == "issue") return edit_url.replace(/\/edit\/(\w+)\/(.*)$/, "/issues/new?title=[$1] Doc issue in file $2")
    if (type == "history") return edit_url.replace(/\/edit\//, "/commits/")
  // edit: https://gitlab.com/fedora/websites-apps/fedora-bootstrap/-/edit/main/bootstrap.html
  // issue: https://gitlab.com/fedora/websites-apps/fedora-bootstrap/-/issues/new
  // history: https://gitlab.com/fedora/websites-apps/fedora-bootstrap/-/commits/main/bootstrap.html
  }

  return false
}

