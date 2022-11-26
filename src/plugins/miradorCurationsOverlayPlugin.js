import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import { getCurrentCanvasWorld } from 'mirador/dist/es/src/state/selectors';
import { hoverCurations } from '../state/actions';
import {
  getCurationsOnSelectedCanvases, getCurationApiConfig,
  getHoveredCurationIds, getSelectedCurationIds,
} from '../state/selectors';
import { CurationsOverlay } from '../components/CurationsOverlay';

const mapStateToProps = (state, { windowId }) => ({
  canvasWorld: getCurrentCanvasWorld(state, { windowId }),
  ...getCurationsOnSelectedCanvases(state, { windowId }),
  hoveredCurationIds: getHoveredCurationIds(state),
  selectedCurationIds: getSelectedCurationIds(state),
  palette: getCurationApiConfig(state).palette,
  visible: getCurationApiConfig(state).visible,
});

const mapDispatchToProps = (dispatch, { windowId }) => ({
  hoverCurations: (curationIds) => dispatch(
    hoverCurations(windowId, curationIds),
  ),
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CurationsOverlay'),
);

export default {
  component: enhance(CurationsOverlay),
  mode: 'add',
  target: 'OpenSeadragonViewer',
};
