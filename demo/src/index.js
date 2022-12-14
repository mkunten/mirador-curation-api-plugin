import mirador from 'mirador';
import miradorCurationApiPlugins from '../../src';

const config = {
  id: 'demo',
  windows: [{
    loadedManifest: 'https://kotenseki.nijl.ac.jp/biblio/100260054/manifest',
    canvasIndex: 13,
  }],
  window: {
    defaultSideBarPanel: 'curations',
    sideBarOpenByDefault: true,
  },
  curationApi: { // default values
    visible: true, // default: true
    listAll: true, // default: true; if false, list only curations belonging to the present manifest file.
    curations: [ // curation resources
      'https://mp.ex.nii.ac.jp/api/curation/json/1bc036ce-87be-4d94-b7cd-4a51cb390b95',
      'https://mp.ex.nii.ac.jp/api/curation/json/aeaed895-5954-4630-b098-05e711effce8',
    ],
    // makeLabel: (curation) => { // function to create a label
    //   const a = [
    //     `<b>index</b>: ${curation.index || '-'}`,
    //   ];
    //   if (curation.region) {
    //     a.push(`<b>region</b>: <span title="${curation.region}">${curation.region}</span>`);
    //   }
    //   if (curation.label) {
    //     a.push(`<b>label</b>: ${curation.label}`);
    //   }
    //   if (curation.description) {
    //     a.push(`<b>desciption</b>: ${curation.description}`);
    //   }
    //   if (curation.metadata) {
    //     curation.matadata.forEach((m) => {
    //       a.push(`<b>${m.label}</b>: ${m.value}`);
    //     });
    //   }
    //   return a.join('<br/>');
    // },
    // palette: {
    //   "hidden": { // `Highlight curations` off
    //     "globalAlpha": 0,
    //   } ,
    //   "default": { // `Highlight curations` on
    //     "strokeStyle": "#FF00FF",
    //     "globalAlpha": 0.5,
    //   },
    //   "hovered": { // on a rect being hovered
    //     "strokeStyle": "#FF00FF",
    //     "globalAlpha": 1,
    //   },
    //   "selected": { // on a listed item being hovered
    //     "strokeStyle": "#FF00FF",
    //     "globalAlpha": 1,
    //   },
    // },
  },
};

window.m3 = mirador.viewer(
  config,
  [
    ...miradorCurationApiPlugins,
  ],
);
