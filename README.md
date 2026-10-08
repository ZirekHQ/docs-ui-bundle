# ZirekHQ docs UI bundle

Antora UI bundle for the ZirekHQ documentation site (https://zirekhq.github.io/).

It is a fork of the [hominux docs UI](https://github.com/hominux/docs-ui-bundle), which is itself a fork of
[antora-ui-spring](https://github.com/spring-io/antora-ui-spring), rebranded with the ZirekHQ name, logo and colours.

Use the latest build in an Antora playbook:

```yaml
ui:
  bundle:
    url: https://github.com/ZirekHQ/docs-ui-bundle/releases/download/bundle-latest/ui-bundle.zip
    snapshot: true
```

Build it with `npm ci && npx gulp bundle`; the result is `build/ui-bundle.zip`. `npm test` runs the helper, branding and
contrast tests.

Licensed under MPL-2.0.
