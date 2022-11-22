# mirador-curation-api-plugin

A [Mirador 3](https://projectmirador.org/) plugin to display curation contents on a sidebar.
See also IIIF [Curation API v1.0](http://codh.rois.ac.jp/iiif/curation/).

## Example

```shell
$ yarn add https://github.com/mkunten/mirador-curation-api-plugin.git
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

- only supports, in terms of IIIF Presentation API,
    + mainly version 2.1 (also is Curation API v1.0)
    + rather simple patterns of sequences, canvases, metadata and so on

## Todos

- test...
- `<ScrollTo/>` in the sidebar panel does not work
- to support various patterns of sequences etc.
- to support IIIF Presentation API 3.0?
- to show pins? (e.g., in case of {metadata.type: pin}?)
- to open items belongs to another manifest?
