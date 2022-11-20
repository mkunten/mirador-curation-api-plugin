import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import {
  getVisibleCanvasIds,
} from 'mirador/dist/es/src/state/selectors';
import {
  getCurationIds, getCurationItems,
} from '../state/selectors';
import { curationsReducer } from '../state/reducers';
import curationsSaga from '../state/sagas';
import WindowSideBarCurationsPanel from '../components/WindowSideBarCurationsPanel';

const mapStateToProps = (state, { manifestId, windowId }) => ({
  curationIds: getCurationIds(state, { windowId }),
  curationItems: getCurationItems(state, { manifestId, windowId }),
  visibleCanvasIds: getVisibleCanvasIds(state, { windowId }),
  windowId,
});

const styles = (theme) => ({
  section: {
    borderBottom: `.5px solid ${theme.palette.section_divider}`,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
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
  connect(mapStateToProps, null),
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
