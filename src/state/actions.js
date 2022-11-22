export const PluginActionTypes = {
  REQUEST_CURATION: 'mirador-curation-api-plugin/REQUEST_CURATION',
  RECEIVE_CURATION: 'mirador-curation-api-plugin/RECEIVE_CURATION',
  RECEIVE_CURATION_FAILURE: 'mirador-curation-api-plugin/RECEIVE_CURATION_FAILURE',
  FETCH_CURATION: 'mirador-curation-api-plugin/FETCH_CURATION',
  TOGGLE_CURATION_DISPLAY: 'mirador-curation-api-plugin/TOGGLE_CURATION_DISPLAY',
  TOGGLE_CURATION_LIST: 'mirador-curation-api-plugin/TOGGLE_CURATION_LIST',
  HOVER_CURATIONS: 'mirador-curation-api-plugin/HOVER_CURATIONS',
  INIT_CURATION_API_CONFIG: 'mirador-curation-api-pluin/INIT_CURATION_API_CONFIG',
};

export function requestCuration(curationUri, properties) {
  return {
    curationUri,
    properties,
    type: PluginActionTypes.REQUEST_CURATION,
  };
}

export function receiveCuration(curationUri, curationJson, curationItems) {
  return {
    curationUri,
    curationJson,
    curationItems,
    type: PluginActionTypes.RECEIVE_CURATION,
  };
}

export function receiveCurationFailure(curationUri, error) {
  return {
    error,
    curationUri,
    type: PluginActionTypes.RECEIVE_CURATION_FAILURE,
  };
}

export function fetchCuration(curationUri, properties) {
  return requestCuration(curationUri, {
    ...properties,
    isFetching: true,
  });
}

export function toggleCurationDisplay() {
  return {
    type: PluginActionTypes.TOGGLE_CURATION_DISPLAY,
  };
}

export function toggleCurationList() {
  return {
    type: PluginActionTypes.TOGGLE_CURATION_LIST,
  };
}

export function hoverCurations(windowId, curationIds) {
  return {
    curationIds,
    type: PluginActionTypes.HOVER_CURATIONS,
  };
}

export function initCurationApiConfig(curationApiConfig) {
  return {
    curationApiConfig,
    type: PluginActionTypes.INIT_CURATION_API_CONFIG,
  };
}
