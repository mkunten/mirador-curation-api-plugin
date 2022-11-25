import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import ActionTypes from 'mirador/dist/es/src/state/actions/action-types';
import {
  getConfig, getManifests, getRequestsConfig,
} from 'mirador/dist/es/src/state/selectors';
import * as actions from 'mirador/dist/es/src/state/actions';
import { PluginActionTypes } from './actions';
import * as pluginActions from './actions';
import { getCurations, getManifestsToBeChecked } from './selectors';

const defaultCurationApiConfig = {
  visible: true,
  listAll: true,
  makeLabel: (curation) => {
    const a = [
      `<b>index</b>: ${curation.index || '-'}`,
    ];
    if (curation.region) {
      a.push(`<b>region</b>: <span title="${curation.region}">${curation.region}</span>`);
    }
    if (curation.label) {
      a.push(`<b>label</b>: ${curation.label}`);
    }
    if (curation.description) {
      a.push(`<b>desciption</b>: ${curation.description}`);
    }
    if (curation.metadata) {
      curation.matadata.forEach((m) => {
        a.push(`<b>${m.label}</b>: ${m.value}`);
      });
    }
    return a.join('<br/>');
  },
  palette: {
    hidden: {
      globalAlpha: 0,
    },
    default: {
      strokeStyle: '#FF00FF',
      globalAlpha: 0.5,
    },
    hovered: {
      strokeStyle: '#FF00FF',
      globalAlpha: 1,
    },
    selected: {
      strokeStyle: '#FF00FF',
      globalAlpha: 1,
    },
  },
  // internal variables
  hoveredCurationIds: [],
  selectedCurationIds: [],
};

// init
export function* importCurationApiConfig() {
  const { curationApi } = yield select(getConfig);
  const uris = [...curationApi.curations];
  yield put(pluginActions.initCurationApiConfig({
    config: {
      ...defaultCurationApiConfig,
      ...curationApi,
    },
    curationIds: [],
    curations: {},
    manifestsToBeChecked: {},
  }));
  const curations = yield select(getCurations);
  for (let i = 0; i < uris.length; i += 1) {
    const uri = uris[i];
    if (!curations[uri]) {
      yield put(pluginActions.requestCuration(uri));
    }
  }
}

// fetch
function fetchWrapper(url, options, { success, degraded, failure }) {
  return fetch(url, options)
    .then((response) => response.json()
      .then((json) => {
        if (response.status === 401) {
          return (degraded || success)({ json, response });
        }
        if (response.ok) {
          return success({ json, response });
        }
        return failure({ error: response.statusText, json, response });
      })
      .catch((error) => failure({ error, response })))
    .catch((error) => failure({ error }));
}

function* fetchCurationResource(url, options, { success, degraded, failure }) {
  const {
    preprocessors = [], postprocessors = [],
  } = yield select(getRequestsConfig);

  try {
    const reqOptions = preprocessors
      .reduce((acc, f) => f(url, acc) || acc, options);

    let action = yield call(fetchWrapper, url, reqOptions, {
      degraded, failure, success,
    });
    action = postprocessors.reduce((acc, f) => f(url, acc)
      || acc, action);
    return action;
  } catch (error) {
    return failure({ error });
  }
}

export function* fetchCuration({ uri }) {
  const success = ({ json }) => ({
    dispatch: pluginActions.receiveCuration(uri, json),
    error: null,
  });
  const failure = ({ error }) => ({
    dispatch: pluginActions.receiveCurationFailure(
      uri,
      typeof error === 'object' ? String(error) : error,
      null,
    ),
    error: typeof error === 'object' ? String(error) : error,
  });
  const { dispatch, error } = yield call(fetchCurationResource, uri, {}, { failure, success });
  yield put(dispatch);
  if (error) {
    yield put(actions.addError(error));
  } else {
    yield put(pluginActions.curationResourceUpdated(uri));
  }
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

function* onCurationResourceUpdated({ uri }) {
  const { [uri]: { json } } = yield select(getCurations);
  if (json && json['@context'] && json['@context']
    .includes('http://codh.rois.ac.jp/iiif/curation/1/context.json')) {
    // check manifests
    const manifests = yield select(getManifests);
    const canvasIds = {};
    const map = {};
    Object.values(manifests).forEach((m) => {
      canvasIds[m.id] = [];
      // todo: use `manifesto` to manipulate ranges?
      m.json.sequences.forEach((s) => s.canvases.forEach((c) => {
        canvasIds[m.id].push(c['@id']);
        map[c['@id']] = c.images[0].resource.service['@id'];
      }));
    });
    // curations
    const items = [];
    const curationId = json['@id'];
    const curationLabel = json.label || null;
    // todo: use `manifesto` to manipulate ranges?
    for (let i = 0; i < json.selections.length; i += 1) {
      const s = json.selections[i];
      const common = {
        manifestId: s.within['@id'],
        selectionLabel: s.label || null,
        curationLabel,
      };
      const targetCanvasIds = canvasIds[common.manifestId];
      if (!targetCanvasIds) {
        yield put(pluginActions
          .updateManifestsToBeChecked(common.manifestId, uri));
      }
      if (s.members) {
        s.members.forEach((m, idx) => {
          const canvasIdAndRegion = parseCanvasIdFragment(m['@id']);
          items.push({
            ...canvasIdAndRegion,
            serviceId: map && map[canvasIdAndRegion.canvasId],
            index: targetCanvasIds
              ? targetCanvasIds.indexOf(canvasIdAndRegion.canvasId) + 1
              : '-',
            description: m.description || null,
            metadata: m.metadata || null,
            label: m.label || null,
            ...common,
            id: `${curationId}/${i}/${idx}`,
          });
        });
      } else if (s.canvases) {
        s.canvases.forEach((c, idx) => {
          const canvasIdAndRegion = parseCanvasIdFragment(c);
          items.push({
            ...canvasIdAndRegion,
            serviceId: map && map[canvasIdAndRegion.canvasId],
            index: targetCanvasIds
              ? targetCanvasIds.indexOf(canvasIdAndRegion.canvasId) + 1
              : '-',
            ...common,
            id: `${curationId}/${i}/${idx}`,
          });
        });
      }
    }
    yield put(pluginActions.addCurationItems(uri, items));
  } else {
    // eslint-disable-next-line no-console
    console.error(`${uri} is invalid:`, json);
  }
}

function* onManifestUpdated({ manifestId, manifestJson }) {
  // todo: check curations.manifestsToBeChecked
  const manifestsToBeChecked = yield select(getManifestsToBeChecked);
  if (manifestsToBeChecked[manifestId]) {
    // eslint-disable-next-line no-console
    console.warn(
      'manifests to be checked still exist:',
      manifestsToBeChecked,
      manifestJson,
    );
  }
}

export default function* curationsSaga() {
  yield all([
    takeEvery(ActionTypes.IMPORT_CONFIG, importCurationApiConfig),
    takeEvery(PluginActionTypes.REQUEST_CURATION, fetchCuration),
    takeEvery(
      PluginActionTypes.CURATION_RESOURCE_UPDATED,
      onCurationResourceUpdated,
    ),
    takeEvery(ActionTypes.RECEIVE_MANIFEST, onManifestUpdated),
  ]);
}
