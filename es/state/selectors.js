function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { createSelector } from 'reselect';
import { getManifest, getManifests, getVisibleCanvasIds } from 'mirador/dist/es/src/state/selectors';
import { miradorSlice } from 'mirador/dist/es/src/state/selectors/utils';
var defaultCurationsApiConfig = {
  visible: true,
  listAll: true,
  makeLabel: function makeLabel(curation) {
    var a = ["<b>index</b>: " + (curation.index || '-')];
    if (curation.region) {
      a.push("<b>region</b>: <span title=\"" + curation.region + "\">" + curation.region + "</span>");
    }
    if (curation.label) {
      a.push("<b>label</b>: " + curation.label);
    }
    if (curation.description) {
      a.push("<b>desciption</b>: " + curation.description);
    }
    if (curation.metadata) {
      curation.matadata.forEach(function (m) {
        a.push("<b>" + m.label + "</b>: " + m.value);
      });
    }
    return a.join('<br/>');
  },
  selectedCurationIds: [] // internal
};

export var getCurations = function getCurations(state) {
  if (miradorSlice(state)) {
    if (!miradorSlice(state).curations.config) {
      var _miradorSlice$config$;
      // should be added through action or saga??
      miradorSlice(state).curations = {
        config: _extends({}, (_miradorSlice$config$ = miradorSlice(state).config.curationsApi) !== null && _miradorSlice$config$ !== void 0 ? _miradorSlice$config$ : {}, defaultCurationsApiConfig)
      };
    }
    return miradorSlice(state).curations;
  }
  return {
    config: defaultCurationsApiConfig
  };
};
export var getCurationsApiConfig = createSelector([getCurations], function (curations) {
  return curations.config;
});
export var getCurationIds = createSelector([getCurationsApiConfig], function (_ref) {
  var curations = _ref.curations;
  return curations !== null && curations !== void 0 ? curations : [];
});
export var getCurationItems = createSelector([getCurationsApiConfig, getCurations, getManifest], function (_ref2, _ref3, _ref4) {
  var listAll = _ref2.listAll;
  var items = _ref3.items;
  var id = _ref4.id;
  return listAll ? items !== null && items !== void 0 ? items : [] : (items !== null && items !== void 0 ? items : []).filter(function (item) {
    return item.manifestId === id;
  });
});
export var getCanvasIdsAndMap = createSelector([getManifests], function (manifests) {
  var canvasIds = {};
  var map = {};
  Object.values(manifests).forEach(function (m) {
    canvasIds[m.id] = [];
    m.json.sequences.forEach(function (s) {
      return s.canvases.forEach(function (c) {
        canvasIds[m.id].push(c['@id']);
        map[c['@id']] = c.images[0].resource.service['@id'];
      });
    });
  });
  return {
    canvasIds: canvasIds,
    map: map
  };
});
export var getCurationsOnSelectedCanvases = createSelector([getVisibleCanvasIds, getCurationItems], function (canvasIds, items) {
  return items.filter(function (item) {
    return canvasIds.includes(item.canvasId);
  });
});