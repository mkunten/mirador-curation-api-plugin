import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import { getVisibleCanvasIds } from 'mirador/dist/es/src/state/selectors';
import { getCurationIds, getCurationItems } from '../state/selectors';
import { curationsReducer } from '../state/reducers';
import curationsSaga from '../state/sagas';
import WindowSideBarCurationsPanel from '../components/WindowSideBarCurationsPanel';
var mapStateToProps = function mapStateToProps(state, _ref) {
  var manifestId = _ref.manifestId,
    windowId = _ref.windowId;
  return {
    curationIds: getCurationIds(state, {
      windowId: windowId
    }),
    curationItems: getCurationItems(state, {
      manifestId: manifestId,
      windowId: windowId
    }),
    visibleCanvasIds: getVisibleCanvasIds(state, {
      windowId: windowId
    }),
    windowId: windowId
  };
};
var styles = function styles(theme) {
  return {
    section: {
      borderBottom: ".5px solid " + theme.palette.section_divider,
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
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
var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, null), withPlugins('WindowSideBarCurationsPanel'));
export default {
  component: enhance(WindowSideBarCurationsPanel),
  reducers: {
    curations: curationsReducer
  },
  saga: curationsSaga,
  companionWindowKey: 'curations'
};