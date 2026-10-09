# ZirekHQ docs UI bundle (archived)

This repository is archived. The ZirekHQ docs site now builds on
[hominux/docs-ui-bundle](https://github.com/hominux/docs-ui-bundle) and keeps its brand (palette, logos, favicons,
social preview) in [`supplemental-ui/`](https://github.com/ZirekHQ/ZirekHQ.github.io/tree/main/supplemental-ui) of
`ZirekHQ.github.io`, using Antora's `ui.supplemental_files` and the `site.keys` described in the hominux README.

```yaml
ui:
  bundle:
    url: https://github.com/hominux/docs-ui-bundle/releases/download/latest/ui-bundle.zip
  supplemental_files: ./supplemental-ui
```

The last build of this bundle stays available as the `bundle-latest` release asset. Licensed under MPL-2.0.
