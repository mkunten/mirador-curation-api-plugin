import { PluginActionTypes } from './actions';

// eslint-disable-next-line default-param-last
export const curationsReducer = (state = {}, action) => {
  // if (action.type.startsWith('mirador-curation-api-plugin')) {
  //   console.debug(action.type, action);
  // } else {
  //   console.debug(action.type, action);
  // }
  switch (action.type) {
    case PluginActionTypes.INIT_CURATION_API_CONFIG: {
      return {
        ...action.curationApiConfig,
      };
    }
    case PluginActionTypes.IMPORT_CURATION_RESOURCE: {
      return {
        ...state,
      };
    }
    case PluginActionTypes.ADD_CURATION_ITEMS: {
      return {
        ...state,
        curationIds: [
          ...state.curationIds.filter((uri) => uri !== action.uri),
          action.uri,
        ],
        curations: {
          ...state.curations,
          [action.uri]: {
            ...state.curations[action.uri],
            items: action.items,
            visible: true,
          },
        },
      };
    }
    case PluginActionTypes.REQUEST_CURATION: {
      return {
        ...state,
        curations: {
          ...state.curations,
          [action.uri]: {
            ...state.curations[action.uri],
            ...action.properties,
            id: action.uri,
            isFetching: true,
          },
        },
      };
    }
    case PluginActionTypes.RECEIVE_CURATION: {
      return {
        ...state,
        curations: {
          ...state.curations,
          [action.uri]: {
            ...state.curations[action.uri],
            error: null,
            id: action.uri,
            isFetching: false,
            json: action.json,
            label: action.json.label && action.json.label,
          },
        },
      };
    }
    case PluginActionTypes.RECEIVE_CURATION_FAILURE: {
      return {
        ...state,
        curations: {
          ...state.curations,
          [action.uri]: {
            error: action.error,
            id: action.uri,
            isFetching: false,
          },
        },
      };
    }
    case PluginActionTypes.UPDATE_MANIFESTS_TO_BE_CHECKED: {
      if (action.uri) {
        return {
          ...state,
          manifestsToBeChecked: {
            ...state.manifestsToBeChecked,
            [action.manifestId]: [
              ...(state.manifestsToBeChecked[action.manifestId] ?? [])
                .filter((m) => m !== action.uri),
              action.uri,
            ],
          },
        };
      }
      const newState = { ...state };
      delete newState.manifestsToBeChecked[action.manifestId];
      return newState;
    }
    case PluginActionTypes.TOGGLE_CURATION_DISPLAY: {
      return {
        ...state,
        config: {
          ...state.config,
          visible: !state.config.visible,
        },
      };
    }
    case PluginActionTypes.TOGGLE_CURATION_LIST_ALL: {
      return {
        ...state,
        config: {
          ...state.config,
          listAll: !state.config.listAll,
        },
      };
    }
    case PluginActionTypes.TOGGLE_CURATION_ITEMS_VISIBLE: {
      return {
        ...state,
        curations: {
          ...state.curations,
          [action.uri]: {
            ...state.curations[action.uri],
            visible: !state.curations[action.uri].visible,
          },
        },
      };
    }
    case PluginActionTypes.HOVER_CURATIONS: {
      return {
        ...state,
        hoveredCurationIds: action.curationIds,
      };
    }
    case PluginActionTypes.SELECT_CURATIONS: {
      return {
        ...state,
        selectedCurationIds: action.curationIds,
      };
    }
    default: {
      return state;
    }
  }
};

export default curationsReducer;
