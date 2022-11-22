import { createSelector } from 'reselect';
import {
  getManifest,
  getManifests,
  getVisibleCanvasIds,
} from 'mirador/dist/es/src/state/selectors';
import { miradorSlice } from 'mirador/dist/es/src/state/selectors/utils';

export const getCurations = (state) => {
  if (miradorSlice(state)) {
    return miradorSlice(state).curations;
  }
  return {};
};

export const getCurationApiConfig = createSelector(
  [getCurations],
  (curations) => curations.config,
);

export const getCurationIds = createSelector(
  [getCurationApiConfig],
  ({ curations }) => curations ?? [],
);

export const getCurationItems = createSelector(
  [getCurationApiConfig, getCurations, getManifest],
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
