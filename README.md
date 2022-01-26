# fedora-docs-ui

Sources of a UI for the new Antora Docs site

## Build and preview the UI

These instructions work on Fedora, using podman.

### Set up your project

Go to your Antora UI project directory. For example:

```
$ git clone https://pagure.io/fedora-docs/fedora-docs-ui.git
$ cd fedora-docs-ui
```

Build the builder image:

```
$ podman build . -t fedora-docs-ui
```

### Finally, preview and build

Build a live preview:

```
$ podman run --rm -p 5252:5252 fedora-docs-ui preview
```

Preview it on [localhost:5252](http://localhost:5252).

If you want to use your UI on an Antora docs site, you need to build a bundle using the following command:

```
$ podman run --rm -v ./build:/antora/build:Z fedora-docs-ui bundle:pack
```

The newly generated bundle will be available in the `build` directory

See the [Antora UI docs](https://docs.antora.org/antora-ui-default/build-preview-ui/) for more info.
