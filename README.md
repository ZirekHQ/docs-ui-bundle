# fedora-docs-ui

Sources of a UI for the new Antora Docs site

## Build and preview the UI

### Set up this builder

Copy the `antora-ui-builder` to `~/bin/`:

```
$ cp antora-ui-builder ~/bin/
```

### Set up your project

Go to your Antora UI project directory. For example:

```
$ git clone https://pagure.io/fedora-docs/fedora-docs-ui.git
$ antora-ui-test
```

Install the project dependencies:

```
$ antora-ui-builder yarn install
```

You also need to make a slight change to the configuration of your project so it works in a container. Open the `gulpfile.js` and add one new line `host: "0.0.0.0",` right below `port: 5252,` as shown below:

```
...
gulp.task('preview', ['build:preview'], () =>
  preview(previewSiteDestDir, {
    port: 5252,
    host: "0.0.0.0",
    livereload: process.env.LIVERELOAD === 'true',
    watch: {
      src: [srcDir, previewSiteSrcDir],
      onChange: () => gulp.start('build:preview'),
    },
  })
)
...
```

### Finally, preview and build

Build a live preview:

```
$ antora-ui-builder gulp preview
```

Preview it on [localhost:5252](http://localhost:5252).

If you want to use your UI on an Antora docs site, you need to build a bundle using the following command:

```
$ antora-ui-builder gulp pack
```

See the [Antora UI docs](https://docs.antora.org/antora-ui-default/build-preview-ui/) for more info.
