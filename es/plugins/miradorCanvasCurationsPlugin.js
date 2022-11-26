function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import * as actions from 'mirador/dist/es/src/state/actions';
import { selectCurations as _selectCurations } from '../state/actions';
import { getCurationApiConfig } from '../state/selectors';
import { CanvasCurations } from '../components/CanvasCurations';
var mapStateToProps = function mapStateToProps(state) {
  return _extends({}, getCurationApiConfig(state));
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
  var windowId = _ref.windowId;
  return {
    updateViewerCanvas: function updateViewerCanvas(canvasId) {
      return dispatch(actions.setCanvas(windowId, canvasId));
    },
    selectCurations: function selectCurations(curationIds) {
      return dispatch(_selectCurations(windowId, curationIds));
    }
  };
};
var styles = function styles(theme) {
  return {
    curationItemsItem: {
      '&$hovered': {
        backgroundColor: theme.palette.action.hover
      },
      '&:hover,&:focus': {
        backgroundColor: theme.palette.action.hover
      },
      borderBottom: "0.5px solid " + theme.palette.divider,
      cursor: 'pointer',
      whiteSpace: 'normal'
    },
    menuItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottom: "0.5px solid " + theme.palette.divider
    },
    menuItemOnCanvas: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderRight: "3px solid " + theme.palette.primary.main,
      borderBottom: "0.5px solid " + theme.palette.divider
    },
    image: {
      overflow: 'hidden'
    },
    label: {
      paddingLeft: theme.spacing(2),
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  };
};
var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('CanvasCurations'));
export default enhance(CanvasCurations);