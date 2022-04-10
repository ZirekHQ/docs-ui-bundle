# fedora-docs-ui

Sources of Antora UI for the Fedora Docs site

## How to use it with Antora

Add the following configuration in your Antora playbook:

```yaml
ui:
  bundle:
    url: https://gitlab.com/fedora/docs/docs-website/ui-bundle/-/jobs/artifacts/HEAD/raw/build/ui-bundle.zip?job=bundle-stable
    snapshot: true
```

## Build and preview the UI

These instructions work on Fedora, using podman.

### Set up your project

Go to your Antora UI project directory. For example:

```
$ git clone https://gitlab.com/fedora/docs/docs-website/ui-bundle.git
$ cd ui-bundle
```

Build the builder image:

```
$ podman build . -t fedora-docs-ui
```

### Finally, preview and build

Build a live preview:

```
$ podman run --rm -v $(pwd):/antora:Z -p 5252:5252 fedora-docs-ui preview
```

Preview it on [localhost:5252](http://localhost:5252).  

If you want to use this UI on your own Antora docs site, you'll need to build a bundle using the following command:

```
$ podman run --rm -v $(pwd):/antora:Z fedora-docs-ui bundle
```

The generated archive can be found in `build/ui-bundle.zip`.
