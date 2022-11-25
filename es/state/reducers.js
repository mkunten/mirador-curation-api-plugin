function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { PluginActionTypes } from './actions';

// eslint-disable-next-line default-param-last
export var curationsReducer = function curationsReducer(state, action) {
  if (state === void 0) {
    state = {};
  }
  // if (action.type.startsWith('mirador-curation-api-plugin')) {
  //   console.debug(action.type, action);
  // } else {
  //   console.debug(action.type, action);
  // }
  switch (action.type) {
    case PluginActionTypes.INIT_CURATION_API_CONFIG:
      {
        return _extends({}, action.curationApiConfig);
      }
    case PluginActionTypes.IMPORT_CURATION_RESOURCE:
      {
        return _extends({}, state);
      }
    case PluginActionTypes.ADD_CURATION_ITEMS:
      {
        var _extends2;
        return _extends({}, state, {
          curationIds: [].concat(state.curationIds.filter(function (uri) {
            return uri !== action.uri;
          }), [action.uri]),
          curations: _extends({}, state.curations, (_extends2 = {}, _extends2[action.uri] = _extends({}, state.curations[action.uri], {
            items: action.items,
            visible: true
          }), _extends2))
        });
      }
    case PluginActionTypes.REQUEST_CURATION:
      {
        var _extends3;
        return _extends({}, state, {
          curations: _extends({}, state.curations, (_extends3 = {}, _extends3[action.uri] = _extends({}, state.curations[action.uri], action.properties, {
            id: action.uri,
            isFetching: true
          }), _extends3))
        });
      }
    case PluginActionTypes.RECEIVE_CURATION:
      {
        var _extends4;
        return _extends({}, state, {
          curations: _extends({}, state.curations, (_extends4 = {}, _extends4[action.uri] = _extends({}, state.curations[action.uri], {
            error: null,
            id: action.uri,
            isFetching: false,
            json: action.json,
            label: action.json.label && action.json.label
          }), _extends4))
        });
      }
    case PluginActionTypes.RECEIVE_CURATION_FAILURE:
      {
        var _extends5;
        return _extends({}, state, {
          curations: _extends({}, state.curations, (_extends5 = {}, _extends5[action.uri] = {
            error: action.error,
            id: action.uri,
            isFetching: false
          }, _extends5))
        });
      }
    case PluginActionTypes.UPDATE_MANIFESTS_TO_BE_CHECKED:
      {
        if (action.uri) {
          var _state$manifestsToBeC, _extends6;
          return _extends({}, state, {
            manifestsToBeChecked: _extends({}, state.manifestsToBeChecked, (_extends6 = {}, _extends6[action.manifestId] = [].concat(((_state$manifestsToBeC = state.manifestsToBeChecked[action.manifestId]) !== null && _state$manifestsToBeC !== void 0 ? _state$manifestsToBeC : []).filter(function (m) {
              return m !== action.uri;
            }), [action.uri]), _extends6))
          });
        }
        var newState = _extends({}, state);
        delete newState.manifestsToBeChecked[action.manifestId];
        return newState;
      }
    case PluginActionTypes.TOGGLE_CURATION_DISPLAY:
      {
        return _extends({}, state, {
          config: _extends({}, state.config, {
            visible: !state.config.visible
          })
        });
      }
    case PluginActionTypes.TOGGLE_CURATION_LIST_ALL:
      {
        return _extends({}, state, {
          config: _extends({}, state.config, {
            listAll: !state.config.listAll
          })
        });
      }
    case PluginActionTypes.TOGGLE_CURATION_ITEMS_VISIBLE:
      {
        var _extends7;
        return _extends({}, state, {
          curations: _extends({}, state.curations, (_extends7 = {}, _extends7[action.uri] = _extends({}, state.curations[action.uri], {
            visible: !state.curations[action.uri].visible
          }), _extends7))
        });
      }
    case PluginActionTypes.HOVER_CURATIONS:
      {
        return _extends({}, state, {
          config: _extends({}, state.config, {
            hoveredCurationIds: action.ids
          })
        });
      }
    default:
      {
        return state;
      }
  }
};
export default curationsReducer;