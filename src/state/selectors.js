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
  (curations) => curations.config ?? {
    hoveredCurationIds: [],
    selectedCurationIds: [],
  },
);

export const getCurationIds = createSelector(
  [getCurationApi],
  ({ curationIds }) => curationIds,
);

export const getCurationItems = createSelector(
  [getCurations, getCurationApiConfig, getManifest],
  (curations, { listAll }, { id }) => {
    const curationItems = {};
    let totalSize = 0;
    Object.entries(curations).forEach(([uri, { items, visible }]) => {
      if (visible) {
        curationItems[uri] = [...(
          listAll
            ? items
            : items.filter((item) => item.manifestId === id)
        )];
        totalSize += curationItems[uri].length;
      }
    });
    return { curationItems, totalSize };
  },
);

export const getCurationsOnSelectedCanvases = createSelector(
  [getVisibleCanvasIds, getCurationItems],
  (canvasIds, { curationItems }) => {
    const newItems = {};
    let totalSize = 0;
    Object.entries(curationItems).forEach(([uri, cs]) => {
      const a = cs.filter((c) => canvasIds.includes(c.canvasId));
      if (a.length) {
        newItems[uri] = a;
        totalSize += a.length;
      }
    });
    return {
      curationItems: newItems,
      totalSize,
    };
  },
);

export const getManifestsToBeChecked = createSelector(
  [getCurationApi],
  ({ manifestsToBeChecked }) => manifestsToBeChecked ?? {},
);

export const getHoveredCurationIds = createSelector(
  [getCurationApi],
  ({ hoveredCurationIds }) => hoveredCurationIds ?? [],
);

export const getSelectedCurationIds = createSelector(
  [getCurationApi],
  ({ selectedCurationIds }) => selectedCurationIds ?? [],
);
