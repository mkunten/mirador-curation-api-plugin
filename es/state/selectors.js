import { createSelector } from 'reselect';
import { getManifest, getVisibleCanvasIds } from 'mirador/dist/es/src/state/selectors';
import { miradorSlice } from 'mirador/dist/es/src/state/selectors/utils';
export var getCurationApi = function getCurationApi(state) {
  if (miradorSlice(state)) {
    return miradorSlice(state).curations;
  }
  return {};
};
export var getCurations = createSelector([getCurationApi], function (_ref) {
  var curations = _ref.curations;
  return curations !== null && curations !== void 0 ? curations : {};
});
export var getCurationApiConfig = createSelector([getCurationApi], function (curations) {
  return curations.config;
});
export var getCurationIds = createSelector([getCurationApi], function (_ref2) {
  var curationIds = _ref2.curationIds;
  return curationIds !== null && curationIds !== void 0 ? curationIds : [];
});
export var getCurationItems = createSelector([getCurations, getCurationApiConfig, getManifest], function (curations, _ref3, _ref4) {
  var listAll = _ref3.listAll;
  var id = _ref4.id;
  var newItems = {};
  Object.entries(curations).forEach(function (_ref5) {
    var uri = _ref5[0],
      _ref5$ = _ref5[1],
      items = _ref5$.items,
      visible = _ref5$.visible;
    if (visible) {
      newItems[uri] = [].concat(listAll ? items : items.filter(function (item) {
        return item.manifestId === id;
      }));
    }
  });
  return newItems;
});
export var getCurationsOnSelectedCanvases = createSelector([getVisibleCanvasIds, getCurationItems], function (canvasIds, items) {
  var newItems = {};
  Object.entries(items).forEach(function (_ref6) {
    var uri = _ref6[0],
      cs = _ref6[1];
    var a = cs.filter(function (c) {
      return canvasIds.includes(c.canvasId);
    });
    if (a.length) {
      newItems[uri] = a;
    }
  });
  return newItems;
});
export var getManifestsToBeChecked = createSelector([getCurationApi], function (_ref7) {
  var manifestsToBeChecked = _ref7.manifestsToBeChecked;
  return manifestsToBeChecked !== null && manifestsToBeChecked !== void 0 ? manifestsToBeChecked : {};
});