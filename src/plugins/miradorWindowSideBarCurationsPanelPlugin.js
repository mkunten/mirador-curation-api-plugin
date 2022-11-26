import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import {
  getContainerId, getVisibleCanvasIds,
} from 'mirador/dist/es/src/state/selectors';
import { toggleCurationItemsVisible } from '../state/actions';
import {
  getCurations, getCurationIds, getCurationItems,
} from '../state/selectors';
import { curationsReducer } from '../state/reducers';
import curationsSaga from '../state/sagas';
import WindowSideBarCurationsPanel from '../components/WindowSideBarCurationsPanel';

const mapStateToProps = (state, { manifestId, windowId }) => ({
  containerId: getContainerId(state),
  curations: getCurations(state),
  curationIds: getCurationIds(state, { windowId }),
  ...getCurationItems(state, { manifestId, windowId }),
  visibleCanvasIds: getVisibleCanvasIds(state, { windowId }),
  windowId,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurationItemsVisible: (uri) => {
    dispatch(toggleCurationItemsVisible(uri));
  },
});

const styles = () => ({
  accordionSummary: {
    overflowX: 'hidden',
  },
  center: {
    display: 'flex',
    whiteSpace: 'nowrap',
    alignItems: 'center',
  },
  accordionDetails: {
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  curationIdLink: {
    display: 'inline-block',
    width: '95%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarCurationsPanel'),
);

export default {
  component: enhance(WindowSideBarCurationsPanel),
  reducers: {
    curations: curationsReducer,
  },
  saga: curationsSaga,
  companionWindowKey: 'curations',
};
