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
export var getCurationItems = createSelector([getCurations, getCurationApiConfig, getManifest], function (curations, _ref3, _ref4) {
  var listAll = _ref3.listAll;
  var id = _ref4.id;
  var curationItems = {};
  var totalSize = 0;
  Object.entries(curations).forEach(function (_ref5) {
    var uri = _ref5[0],
      _ref5$ = _ref5[1],
      items = _ref5$.items,
      visible = _ref5$.visible;
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
export var getCurationsOnSelectedCanvases = createSelector([getVisibleCanvasIds, getCurationItems], function (canvasIds, _ref6) {
  var curationItems = _ref6.curationItems;
  var newItems = {};
  var totalSize = 0;
  Object.entries(curationItems).forEach(function (_ref7) {
    var uri = _ref7[0],
      cs = _ref7[1];
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
export var getManifestsToBeChecked = createSelector([getCurationApi], function (_ref8) {
  var manifestsToBeChecked = _ref8.manifestsToBeChecked;
  return manifestsToBeChecked !== null && manifestsToBeChecked !== void 0 ? manifestsToBeChecked : {};
});
export var getHoveredCurationIds = createSelector([getCurationApi], function (_ref9) {
  var hoveredCurationIds = _ref9.hoveredCurationIds;
  return hoveredCurationIds !== null && hoveredCurationIds !== void 0 ? hoveredCurationIds : [];
});
export var getSelectedCurationIds = createSelector([getCurationApi], function (_ref10) {
  var selectedCurationIds = _ref10.selectedCurationIds;
  return selectedCurationIds !== null && selectedCurationIds !== void 0 ? selectedCurationIds : [];
});