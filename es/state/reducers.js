function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { PluginActionTypes } from './actions';

// eslint-disable-next-line default-param-last
export var curationsReducer = function curationsReducer(state, action) {
  var _extends2, _state$items, _extends3, _extends4;
  if (state === void 0) {
    state = {};
  }
  switch (action.type) {
    case PluginActionTypes.REQUEST_CURATION:
      return _extends({}, state, (_extends2 = {}, _extends2[action.curationUri] = _extends({}, state[action.curationUri], action.properties, {
        id: action.curationUri,
        isFetching: true
      }), _extends2));
    case PluginActionTypes.RECEIVE_CURATION:
      return _extends({}, state, (_extends3 = {}, _extends3[action.curationUri] = _extends({}, state[action.curationUri], {
        error: null,
        id: action.curationUri,
        isFetching: false,
        json: action.curationJson
      }), _extends3.items = [].concat((_state$items = state.items) !== null && _state$items !== void 0 ? _state$items : [], action.curationItems), _extends3));
    case PluginActionTypes.RECEIVE_CURATION_FAILURE:
      return _extends({}, state, (_extends4 = {}, _extends4[action.curationUri] = {
        error: action.error,
        id: action.curationUri,
        isFetching: false
      }, _extends4));
    case PluginActionTypes.TOGGLE_CURATION_DISPLAY:
      return _extends({}, state, {
        config: _extends({}, state.config, {
          visible: !state.config.visible
        })
      });
    case PluginActionTypes.TOGGLE_CURATION_LIST:
      return _extends({}, state, {
        config: _extends({}, state.config, {
          listAll: !state.config.listAll
        })
      });
    case PluginActionTypes.HOVER_CURATIONS:
      return _extends({}, state, {
        config: _extends({}, state.config, {
          selectedCurationIds: action.curationIds
        })
      });
    default:
      return state;
  }
};
export default curationsReducer;