function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import { getContainerId, getVisibleCanvasIds } from 'mirador/dist/es/src/state/selectors';
import { toggleCurationItemsVisible as _toggleCurationItemsVisible } from '../state/actions';
import { getCurations, getCurationIds, getCurationItems } from '../state/selectors';
import { curationsReducer } from '../state/reducers';
import curationsSaga from '../state/sagas';
import WindowSideBarCurationsPanel from '../components/WindowSideBarCurationsPanel';
var mapStateToProps = function mapStateToProps(state, _ref) {
  var manifestId = _ref.manifestId,
    windowId = _ref.windowId;
  return _extends({
    containerId: getContainerId(state),
    curations: getCurations(state),
    curationIds: getCurationIds(state, {
      windowId: windowId
    })
  }, getCurationItems(state, {
    manifestId: manifestId,
    windowId: windowId
  }), {
    visibleCanvasIds: getVisibleCanvasIds(state, {
      windowId: windowId
    }),
    windowId: windowId
  });
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleCurationItemsVisible: function toggleCurationItemsVisible(uri) {
      dispatch(_toggleCurationItemsVisible(uri));
    }
  };
};
var styles = function styles() {
  return {
    accordionSummary: {
      overflowX: 'hidden'
    },
    center: {
      display: 'flex',
      whiteSpace: 'nowrap',
      alignItems: 'center'
    },
    accordionDetails: {
      flexWrap: 'wrap',
      overflow: 'hidden'
    },
    curationIdLink: {
      display: 'inline-block',
      width: '95%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  };
};
var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('WindowSideBarCurationsPanel'));
export default {
  component: enhance(WindowSideBarCurationsPanel),
  reducers: {
    curations: curationsReducer
  },
  saga: curationsSaga,
  companionWindowKey: 'curations'
};