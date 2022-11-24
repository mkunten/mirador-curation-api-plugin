import { createSelector } from 'reselect';
import {
  getManifest,
  getVisibleCanvasIds,
} from 'mirador/dist/es/src/state/selectors';
import { miradorSlice } from 'mirador/dist/es/src/state/selectors/utils';

export const getCurationApi = (state) => {
  if (miradorSlice(state)) {
    return miradorSlice(state).curations ?? {};
  }
  return {};
};

export const getCurations = createSelector(
  [getCurationApi],
  ({ curations }) => curations ?? {},
);

export const getCurationApiConfig = createSelector(
  [getCurationApi],
  (curations) => curations.config,
);

export const getCurationIds = createSelector(
  [getCurationApi],
  ({ curationIds }) => curationIds,
);

export const getCurationItems = createSelector(
  [getCurations, getCurationApiConfig, getManifest],
  (curations, { listAll }, { id }) => {
    const newItems = {};
    Object.entries(curations).forEach(([uri, { items, visible }]) => {
      if (visible) {
        newItems[uri] = [...(
          listAll
            ? items
            : items.filter((item) => item.manifestId === id)
        )];
      }
    });
    return newItems;
  },
);

export const getCurationsOnSelectedCanvases = createSelector(
  [getVisibleCanvasIds, getCurationItems],
  (canvasIds, items) => {
    const newItems = {};
    Object.entries(items).forEach(([uri, cs]) => {
      const a = cs.filter((c) => canvasIds.includes(c.canvasId));
      if (a.length) {
        newItems[uri] = a;
      }
    });
    return newItems;
  },
);

export const getManifestsToBeChecked = createSelector(
  [getCurationApi],
  ({ manifestsToBeChecked }) => manifestsToBeChecked ?? {},
);
