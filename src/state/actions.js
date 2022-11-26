export const PluginActionTypes = {
  INIT_CURATION_API_CONFIG: 'mirador-curation-api-pluin/INIT_CURATION_API_CONFIG',
  ADD_CURATION_ITEMS: 'mirador-curation-api-plugin/ADD_CURATION_ITEMS',
  REQUEST_CURATION: 'mirador-curation-api-plugin/REQUEST_CURATION',
  RECEIVE_CURATION: 'mirador-curation-api-plugin/RECEIVE_CURATION',
  RECEIVE_CURATION_FAILURE: 'mirador-curation-api-plugin/RECEIVE_CURATION_FAILURE',
  CURATION_RESOURCE_UPDATED: 'mirador-curation-api-plugin/CURATION_RESOURCE_UPDATED',
  UPDATE_MANIFESTS_TO_BE_CHECKED: 'mirador-curation-api/UPDATE_MANIFESTS_TO_BE_CHECKED',
  TOGGLE_CURATION_DISPLAY: 'mirador-curation-api-plugin/TOGGLE_CURATION_DISPLAY',
  TOGGLE_CURATION_LIST_ALL: 'mirador-curation-api-plugin/TOGGLE_CURATION_LIST_ALL',
  TOGGLE_CURATION_ITEMS_VISIBLE: 'mirador-curation-api-plugin/TOGGLE_CURATION_ITEMS_VISIBLE',
  HOVER_CURATIONS: 'mirador-curation-api-plugin/HOVER_CURATIONS',
  SELECT_CURATIONS: 'mirador-curation-api-plugin/SELECT_CURATIONS',
};

export function initCurationApiConfig(curationApiConfig) {
  return {
    curationApiConfig,
    type: PluginActionTypes.INIT_CURATION_API_CONFIG,
  };
}

export function addCurationItems(uri, items) {
  return {
    uri,
    items,
    type: PluginActionTypes.ADD_CURATION_ITEMS,
  };
}

export function requestCuration(uri) {
  return {
    uri,
    type: PluginActionTypes.REQUEST_CURATION,
  };
}

export function receiveCuration(uri, json) {
  return {
    uri,
    json,
    type: PluginActionTypes.RECEIVE_CURATION,
  };
}

export function receiveCurationFailure(uri, error) {
  return {
    error,
    uri,
    type: PluginActionTypes.RECEIVE_CURATION_FAILURE,
  };
}

export function curationResourceUpdated(uri) {
  return {
    uri,
    type: PluginActionTypes.CURATION_RESOURCE_UPDATED,
  };
}

export function updateManifestsToBeChecked(manifestId, uri) {
  return {
    manifestId,
    uri,
    type: PluginActionTypes.UPDATE_MANIFESTS_TO_BE_CHECKED,
  };
}

export function toggleCurationDisplay() {
  return {
    type: PluginActionTypes.TOGGLE_CURATION_DISPLAY,
  };
}

export function toggleCurationListAll() {
  return {
    type: PluginActionTypes.TOGGLE_CURATION_LIST_ALL,
  };
}

export function toggleCurationItemsVisible(uri) {
  return {
    uri,
    type: PluginActionTypes.TOGGLE_CURATION_ITEMS_VISIBLE,
  };
}

export function hoverCurations(windowId, curationIds) {
  return {
    curationIds,
    type: PluginActionTypes.HOVER_CURATIONS,
  };
}

export function selectCurations(windowId, curationIds) {
  return {
    curationIds,
    type: PluginActionTypes.SELECT_CURATIONS,
  };
}
