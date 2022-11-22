import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import {
  getCurrentCanvasWorld,
  getTheme,
} from 'mirador/dist/es/src/state/selectors';
import {
  getCurationsOnSelectedCanvases,
  getCurationApiConfig,
} from '../state/selectors';
import { CurationsOverlay } from '../components/CurationsOverlay';

const mapStateToProps = (state, { windowId }) => ({
  canvasWorld: getCurrentCanvasWorld(state, { windowId }),
  curations: getCurationsOnSelectedCanvases(state, { windowId }),
  config: getCurationApiConfig(state, { windowId }),
  palette: getTheme(state).palette,
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
  withPlugins('CurationsOverlay'),
);

export default {
  component: enhance(CurationsOverlay),
  mode: 'add',
  target: 'OpenSeadragonViewer',
};
