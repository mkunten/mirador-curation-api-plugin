import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import * as actions from 'mirador/dist/es/src/state/actions';
import { hoverCurations } from '../state/actions';
import { getCurationApiConfig } from '../state/selectors';
import { CanvasCurations } from '../components/CanvasCurations';

const mapStateToProps = (state) => {
  if (state) {
    return {
      ...getCurationApiConfig(state),
    };
  }
  return null;
};

const mapDispatchToProps = (dispatch, { windowId }) => ({
  updateViewerCanvas: (canvasId) => dispatch(
    actions.setCanvas(windowId, canvasId),
  ),
  hoverCuration: (curationIds) => dispatch(
    hoverCurations(windowId, curationIds),
  ),
});

const styles = (theme) => ({
  curationItemsItem: {
    '&$hovered': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover,&:focus': {
      backgroundColor: theme.palette.action.hover,
    },
    borderBottom: `0.5px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    whiteSpace: 'normal',
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: `0.5px solid ${theme.palette.divider}`,
  },
  menuItemOnCanvas: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRight: `3px solid ${theme.palette.primary.main}`,
    borderBottom: `0.5px solid ${theme.palette.divider}`,
  },
  image: {
    overflow: 'hidden',
  },
  label: {
    paddingLeft: theme.spacing(2),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CanvasCurations'),
);

export default enhance(CanvasCurations);
