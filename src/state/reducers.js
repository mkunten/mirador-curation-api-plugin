import { PluginActionTypes } from './actions';

// eslint-disable-next-line default-param-last
export const curationsReducer = (state = {}, action) => {
  switch (action.type) {
    case PluginActionTypes.REQUEST_CURATION:
      return {
        ...state,
        curations: {
          [action.curationUri]: {
            ...state.curations[action.curationUri],
            ...action.properties,
            id: action.curationUri,
            isFetching: true,
          },
        },
      };
    case PluginActionTypes.RECEIVE_CURATION:
      return {
        ...state,
        curations: {
          [action.curationUri]: {
            ...state.curations[action.curationUri],
            error: null,
            id: action.curationUri,
            isFetching: false,
            json: action.curationJson,
          },
        },
        items: [
          ...state.items ?? [],
          ...action.curationItems,
        ],
      };
    case PluginActionTypes.RECEIVE_CURATION_FAILURE:
      return {
        ...state,
        curations: {
          [action.curationUri]: {
            error: action.error,
            id: action.curationUri,
            isFetching: false,
          },
        },
      };
    case PluginActionTypes.TOGGLE_CURATION_DISPLAY:
      return {
        ...state,
        config: {
          ...state.config,
          visible: !state.config.visible,
        },
      };
    case PluginActionTypes.TOGGLE_CURATION_LIST:
      return {
        ...state,
        config: {
          ...state.config,
          listAll: !state.config.listAll,
        },
      };
    case PluginActionTypes.HOVER_CURATIONS:
      return {
        ...state,
        config: {
          ...state.config,
          selectedCurationIds: action.curationIds,
        },
      };
    case PluginActionTypes.INIT_CURATION_API_CONFIG:
      return {
        ...action.curationApiConfig,
      };
    default:
      return state;
  }
};

export default curationsReducer;
