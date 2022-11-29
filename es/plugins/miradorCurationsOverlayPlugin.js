function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import { getCurrentCanvasWorld } from 'mirador/dist/es/src/state/selectors';
import { hoverCurations as _hoverCurations } from '../state/actions';
import { getCurationsOnSelectedCanvases, getCurationApiConfig, getHoveredCurationIds, getSelectedCurationIds } from '../state/selectors';
import { CurationsOverlay } from '../components/CurationsOverlay';
var mapStateToProps = function mapStateToProps(state, _ref) {
  var manifestId = _ref.manifestId,
    windowId = _ref.windowId;
  return _extends({
    canvasWorld: getCurrentCanvasWorld(state, {
      windowId: windowId
    })
  }, getCurationsOnSelectedCanvases(state, {
    manifestId: manifestId,
    windowId: windowId
  }), {
    hoveredCurationIds: getHoveredCurationIds(state),
    selectedCurationIds: getSelectedCurationIds(state),
    palette: getCurationApiConfig(state).palette,
    visible: getCurationApiConfig(state).visible
  });
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    hoverCurations: function hoverCurations(curationIds) {
      return dispatch(_hoverCurations(windowId, curationIds));
    }
  };
};
var enhance = compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('CurationsOverlay'));
export default {
  component: enhance(CurationsOverlay),
  mode: 'add',
  target: 'OpenSeadragonViewer'
};