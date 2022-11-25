import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import { getCurrentCanvasWorld } from 'mirador/dist/es/src/state/selectors';
import { getCurationsOnSelectedCanvases, getCurationApiConfig } from '../state/selectors';
import { CurationsOverlay } from '../components/CurationsOverlay';
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    canvasWorld: getCurrentCanvasWorld(state, {
      windowId: windowId
    }),
    curations: getCurationsOnSelectedCanvases(state, {
      windowId: windowId
    }),
    config: getCurationApiConfig(state),
    palette: getCurationApiConfig(state).palette
  };
};
var enhance = compose(withTranslation(), connect(mapStateToProps, null), withPlugins('CurationsOverlay'));
export default {
  component: enhance(CurationsOverlay),
  mode: 'add',
  target: 'OpenSeadragonViewer'
};