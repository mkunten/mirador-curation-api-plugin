import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import { withStyles } from '@material-ui/core/styles';
import {
  getCurationApiConfig,
  getCurationsOnSelectedCanvases,
  getHoveredCurationIds,
} from '../state/selectors';
import {
  CurationTooltipsOverlay,
} from '../components/CurationTooltipsOverlay';

const mapStateToProps = (state, { manifestId, windowId }) => ({
  ...getCurationsOnSelectedCanvases(state, { manifestId, windowId }),
  hoveredCurationIds: getHoveredCurationIds(state),
  makeLabel: getCurationApiConfig(state).makeLabel,
  // palette: getCurationApiConfig(state).palette,
});

const styles = {
  curations: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.8)',
    display: 'inline-block',
    fontSize: '12px',
    zIndex: 100,
  },
  curation: {
    border: '1px solid #CCC',
    padding: '0 1em',
  },
};

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, null),
  withPlugins('CurationTooltipsOverlay'),
);

export default {
  component: enhance(CurationTooltipsOverlay),
  mode: 'add',
  target: 'OpenSeadragonViewer',
};
