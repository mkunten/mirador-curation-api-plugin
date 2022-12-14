# mirador-curation-api-plugin

A [Mirador 3](https://projectmirador.org/) plugin to show curations based on IIIF [Curation API v1.0](http://codh.rois.ac.jp/iiif/curation/).

## Demo

https://mkunten.github.io/mirador-curation-api-plugin/

## Example

```shell
$ yarn add https://github.com/mkunten/mirador-curation-api-plugin
```

```javascipt
import mirador from 'mirador';
import miradorCurationApiPlugins from 'mirador-curation-api-plugin';

const config = {
  id: 'demo',
  windows: [{
    /* windows settings */
  }],
  window: {
    /* window settings */
    // defaultSideBarPanel: 'curations', 
    // sideBarOpenByDefault: true,
  },
  curationApi: {
    /* plugin settings */
    /* see demo/src/index.js */
  },
};

mirador.viewer(
  config,
  [
    ...miradorCurationApiPlugins,
  ],
);
```

## Limitations

- only supports rather simple patterns of sequences, canvases, metadata and so on

## Todos

- test...
- `<ScrollTo/>` in the sidebar panel does not work
- to use [IIIF-Commons/manifesto](https://github.com/IIIF-Commons/manifesto)?
- to show pins? (e.g., in case of {metadata.type: pin}?)
- to load manifests not being loaded yet
