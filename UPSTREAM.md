# Upstream: hominux/docs-ui-bundle

This bundle is a fork of [hominux/docs-ui-bundle](https://github.com/hominux/docs-ui-bundle), itself a fork of
[spring-io/antora-ui-spring](https://github.com/spring-io/antora-ui-spring). Shared code flows **hominux to
zirek**; a fix found here that touches shared code goes to hominux first, then back.

## What is ours

These stay as they are when syncing:

- **Brand:** the palette in `src/css/vars.css` (`--link-font-color`, navbar, badge, footer tokens), `src/img/*-logo.png`,
  the favicons, `social-preview.png`, `header-content.hbs`, `footer-content.hbs`, `head-meta.hbs`, `component-logo.hbs`
  and `src/helpers/component_logo.js` (the list of components that have a logo).
- **Diagrams:** `mermaid` (`src/css/diagrams.css`, `src/js/vendor/mermaid-init.bundle.js`, its build and test).
- **Layout:** `src/layouts/with_menu.hbs` until the site playbook stops asking for it.
- **Tests:** `brand-test.js`, `contrast-test.js`, `nav-explore-test.js`, `mermaid-test.js`.
- **Policy:** links to ZirekHQ hosts open in the same tab (`src/js/02-on-this-page.js`); `engines` stays at
  `>=22.12.0`; no `Dockerfile` (the build needs a git checkout).

Everything else (`gulp.d/`, `src/js`, `src/helpers`, the other partials and tests, CSS partials) is shared.

## How to sync

```
git remote add hominux https://github.com/hominux/docs-ui-bundle.git   # once
git fetch hominux
git diff <last-synced>..hominux/main --stat
```

Apply each shared file with a three-way merge, base = hominux at the last synced commit, so our edits survive:

```
git show <last-synced>:<file> > base; git show hominux/main:<file> > theirs
git merge-file <file> base theirs
```

Regenerate `package-lock.json` (`npm install --package-lock-only --ignore-scripts`), keep our `mermaid` and brand
dependencies, then run `npm run coverage`, `npx gulp lint`, `npx gulp bundle`. Compare the unpacked bundle with the
previous release (`diff -rq`): fonts and images must be byte-identical.

Last synced with hominux: `4de939b` (#27) plus the toolchain upgrade (zirek #48, hominux #28).
