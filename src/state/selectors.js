import { createSelector } from 'reselect';
import {
  getManifest,
  getManifests,
  getVisibleCanvasIds,
} from 'mirador/dist/es/src/state/selectors';
import { miradorSlice } from 'mirador/dist/es/src/state/selectors/utils';

const defaultCurationsApiConfig = {
  visible: true,
  listAll: true,
  makeLabel: (curation) => {
    const a = [
      `<b>index</b>: ${curation.index || '-'}`,
    ];
    if (curation.region) {
      a.push(`<b>region</b>: <span title="${curation.region}">${curation.region}</span>`);
    }
    if (curation.label) {
      a.push(`<b>label</b>: ${curation.label}`);
    }
    if (curation.description) {
      a.push(`<b>desciption</b>: ${curation.description}`);
    }
    if (curation.metadata) {
      curation.matadata.forEach((m) => {
        a.push(`<b>${m.label}</b>: ${m.value}`);
      });
    }
    return a.join('<br/>');
  },
  selectedCurationIds: [], // internal
};

export const getCurations = (state) => {
  if (miradorSlice(state)) {
    if (!miradorSlice(state).curations.config) {
      // should be added through action or saga??
      miradorSlice(state).curations = {
        config: {
          ...(miradorSlice(state).config.curationsApi ?? {}),
          ...defaultCurationsApiConfig,
        },
      };
    }
    return miradorSlice(state).curations;
  }
  return { config: defaultCurationsApiConfig };
};

export const getCurationsApiConfig = createSelector(
  [getCurations],
  (curations) => curations.config,
);

export const getCurationIds = createSelector(
  [getCurationsApiConfig],
  ({ curations }) => curations ?? [],
);

export const getCurationItems = createSelector(
  [getCurationsApiConfig, getCurations, getManifest],
  ({ listAll }, { items }, { id }) => (listAll
    ? (items ?? []) : (items ?? []).filter(
      (item) => item.manifestId === id,
    )),
);

export const getCanvasIdsAndMap = createSelector(
  [getManifests],
  (manifests) => {
    const canvasIds = {};
    const map = {};
    Object.values(manifests).forEach((m) => {
      canvasIds[m.id] = [];
      m.json.sequences.forEach((s) => s.canvases.forEach((c) => {
        canvasIds[m.id].push(c['@id']);
        map[c['@id']] = c.images[0].resource.service['@id'];
      }));
    });
    return { canvasIds, map };
  },
);

export const getCurationsOnSelectedCanvases = createSelector(
  [getVisibleCanvasIds, getCurationItems],
  (canvasIds, items) => items.filter(
    (item) => canvasIds.includes(item.canvasId),
  ),
);
