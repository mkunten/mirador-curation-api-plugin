import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import ActionTypes from 'mirador/dist/es/src/state/actions/action-types';
import { getRequestsConfig } from 'mirador/dist/es/src/state/selectors';
import {
  PluginActionTypes,
  receiveCuration, receiveCurationFailure,
} from './actions';
import {
  getCurationsApiConfig, getCanvasIdsAndMap, getCurations,
} from './selectors';

function fetchWrapper(url, options, { success, degraded, failure }) {
  return fetch(url, options)
    .then((response) => response.json().then((json) => {
      if (response.status === 401) return (degraded || success)({ json, response });
      if (response.ok) return success({ json, response });
      return failure({ error: response.statusText, json, response });
    }).catch((error) => failure({ error, response })))
    .catch((error) => failure({ error }));
}

function* fetchCurationResource(url, options, { success, degraded, failure }) {
  const { preprocessors = [], postprocessors = [] } = yield select(getRequestsConfig);

  try {
    const reqOptions = preprocessors.reduce((acc, f) => f(url, acc) || acc, options);

    let action = yield call(fetchWrapper, url, reqOptions, {
      degraded, failure, success,
    });
    action = postprocessors.reduce((acc, f) => f(url, acc)
      || acc, action);
    return action;
  } catch (error) { return failure({ error }); }
}

function parseCanvasIdFragment(s) {
  const a = s.split('#xywh=');
  return a[1]
    ? {
      canvasId: a[0],
      region: a[1],
      fragmentSelector: a[1].split(',').map((n) => parseInt(n, 10)),
    }
    : {
      canvasId: a[0],
      region: 'full',
    };
}

function initCurationItems(json, { canvasIds, map }) {
  const curationItems = [];
  const curationId = json['@id'];
  const curationLabel = json.label || null;
  json.selections.forEach((s, idx0) => {
    const common = {
      manifestId: s.within['@id'],
      selectionLabel: s.label || null,
      curationLabel,
    };
    if (s.members) {
      s.members.forEach((m, idx1) => {
        const canvasIdAndRegion = parseCanvasIdFragment(m['@id']);
        const index = canvasIds[common.manifestId]
          .indexOf(canvasIdAndRegion.canvasId) + 1;
        curationItems.push({
          ...canvasIdAndRegion,
          serviceId: map[canvasIdAndRegion.canvasId],
          index,
          description: m.description || null,
          metadata: m.metadata || null,
          label: m.label || null,
          ...common,
          id: `${curationId}/${idx0}/${idx1}`,
        });
      });
    } else if (s.canvases) {
      s.canvases.forEach((c, idx1) => {
        const canvasIdAndRegion = parseCanvasIdFragment(c);
        const index = canvasIds[common.manifestId]
          .indexOf(canvasIdAndRegion.canvasId) + 1;
        curationItems.push({
          ...canvasIdAndRegion,
          serviceId: map[canvasIdAndRegion.canvasId],
          index,
          ...common,
          id: `${curationId}/${idx0}/${idx1}`,
        });
      });
    }
  });
  return curationItems;
}

export function* fetchCuration({ uri }) {
  const canvasIdsAndMap = yield select(getCanvasIdsAndMap);
  const callbacks = {
    failure: ({ error }) => receiveCurationFailure(
      uri,
      typeof error === 'object' ? String(error) : error,
      null,
    ),
    success: ({ json }) => receiveCuration(
      uri,
      json,
      initCurationItems(json, canvasIdsAndMap),
    ),
  };
  const dispatch = yield call(fetchCurationResource, uri, {}, callbacks);
  yield put(dispatch);
}

export function* fetchCurations() {
  const config = yield select(getCurationsApiConfig);
  if (!config.curations) {
    return;
  }
  const uris = config.curations;
  const curations = yield select(getCurations);
  for (let i = 0; i < uris.length; i += 1) {
    const uri = uris[i];
    if (!curations[uri]) {
      yield call(fetchCuration, { uri });
    }
  }
}

export default function* curationsSaga() {
  yield all([
    takeEvery(ActionTypes.SET_CANVAS, fetchCurations),
    takeEvery(PluginActionTypes.REQUEST_CURATION, fetchCurations),
  ]);
}
