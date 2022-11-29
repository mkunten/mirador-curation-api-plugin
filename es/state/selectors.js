import { createSelector } from 'reselect';
import { getManifest, getVisibleCanvasIds } from 'mirador/dist/es/src/state/selectors';
import { miradorSlice } from 'mirador/dist/es/src/state/selectors/utils';
export var getCurationApi = function getCurationApi(state) {
  if (miradorSlice(state)) {
    var _miradorSlice$curatio;
    return (_miradorSlice$curatio = miradorSlice(state).curations) !== null && _miradorSlice$curatio !== void 0 ? _miradorSlice$curatio : {};
  }
  return {};
};
export var getCurations = createSelector([getCurationApi], function (_ref) {
  var curations = _ref.curations;
  return curations !== null && curations !== void 0 ? curations : {};
});
export var getCurationApiConfig = createSelector([getCurationApi], function (curations) {
  var _curations$config;
  return (_curations$config = curations.config) !== null && _curations$config !== void 0 ? _curations$config : {
    hoveredCurationIds: [],
    selectedCurationIds: []
  };
});
export var getCurationIds = createSelector([getCurationApi], function (_ref2) {
  var curationIds = _ref2.curationIds;
  return curationIds;
});
export var getCurationItems = createSelector([getCurations, getCurationApiConfig, getManifest], function (curations, _ref3, manifest) {
  var listAll = _ref3.listAll;
  var id = manifest.id || '';
  var curationItems = {};
  var totalSize = 0;
  Object.entries(curations).forEach(function (_ref4) {
    var uri = _ref4[0],
      _ref4$ = _ref4[1],
      items = _ref4$.items,
      visible = _ref4$.visible;
    if (visible) {
      curationItems[uri] = [].concat(listAll ? items : items.filter(function (item) {
        return item.manifestId === id;
      }));
      totalSize += curationItems[uri].length;
    }
  });
  return {
    curationItems: curationItems,
    totalSize: totalSize
  };
});
export var getCurationsOnSelectedCanvases = createSelector([getVisibleCanvasIds, getCurationItems], function (canvasIds, _ref5) {
  var curationItems = _ref5.curationItems;
  var newItems = {};
  var totalSize = 0;
  Object.entries(curationItems).forEach(function (_ref6) {
    var uri = _ref6[0],
      cs = _ref6[1];
    var a = cs.filter(function (c) {
      return canvasIds.includes(c.canvasId);
    });
    if (a.length) {
      newItems[uri] = a;
      totalSize += a.length;
    }
  });
  return {
    curationItems: newItems,
    totalSize: totalSize
  };
});
export var getManifestsToBeChecked = createSelector([getCurationApi], function (_ref7) {
  var manifestsToBeChecked = _ref7.manifestsToBeChecked;
  return manifestsToBeChecked !== null && manifestsToBeChecked !== void 0 ? manifestsToBeChecked : {};
});
export var getHoveredCurationIds = createSelector([getCurationApi], function (_ref8) {
  var hoveredCurationIds = _ref8.hoveredCurationIds;
  return hoveredCurationIds !== null && hoveredCurationIds !== void 0 ? hoveredCurationIds : [];
});
export var getSelectedCurationIds = createSelector([getCurationApi], function (_ref9) {
  var selectedCurationIds = _ref9.selectedCurationIds;
  return selectedCurationIds !== null && selectedCurationIds !== void 0 ? selectedCurationIds : [];
});