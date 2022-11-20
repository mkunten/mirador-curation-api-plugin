function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
export var PluginActionTypes = {
  REQUEST_CURATION: 'mirador-curation-api-plugin/REQUEST_CURATION',
  RECEIVE_CURATION: 'mirador-curation-api-plugin/RECEIVE_CURATION',
  RECEIVE_CURATION_FAILURE: 'mirador-curation-api-plugin/RECEIVE_CURATION_FAILURE',
  FETCH_CURATION: 'mirador-curation-api-plugin/FETCH_CURATION',
  TOGGLE_CURATION_DISPLAY: 'mirador-curation-api-plugin/TOGGLE_CURATION_DISPLAY',
  TOGGLE_CURATION_LIST: 'mirador-curation-api-plugin/TOGGLE_CURATION_LIST',
  HOVER_CURATIONS: 'mirador-curation-api-plugin/HOVER_CURATIONS'
};
export function requestCuration(curationUri, properties) {
  return {
    curationUri: curationUri,
    properties: properties,
    type: PluginActionTypes.REQUEST_CURATION
  };
}
export function receiveCuration(curationUri, curationJson, curationItems) {
  return {
    curationUri: curationUri,
    curationJson: curationJson,
    curationItems: curationItems,
    type: PluginActionTypes.RECEIVE_CURATION
  };
}
export function receiveCurationFailure(curationUri, error) {
  return {
    error: error,
    curationUri: curationUri,
    type: PluginActionTypes.RECEIVE_CURATION_FAILURE
  };
}
export function fetchCuration(curationUri, properties) {
  return requestCuration(curationUri, _extends({}, properties, {
    isFetching: true
  }));
}
export function toggleCurationDisplay() {
  return {
    type: PluginActionTypes.TOGGLE_CURATION_DISPLAY
  };
}
export function toggleCurationList() {
  return {
    type: PluginActionTypes.TOGGLE_CURATION_LIST
  };
}
export function hoverCurations(windowId, curationIds) {
  return {
    curationIds: curationIds,
    type: PluginActionTypes.HOVER_CURATIONS
  };
}