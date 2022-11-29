function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import { withStyles } from '@material-ui/core/styles';
import { getCurationApiConfig, getCurationsOnSelectedCanvases, getHoveredCurationIds } from '../state/selectors';
import { CurationTooltipsOverlay } from '../components/CurationTooltipsOverlay';
var mapStateToProps = function mapStateToProps(state, _ref) {
  var manifestId = _ref.manifestId,
    windowId = _ref.windowId;
  return _extends({}, getCurationsOnSelectedCanvases(state, {
    manifestId: manifestId,
    windowId: windowId
  }), {
    hoveredCurationIds: getHoveredCurationIds(state),
    makeLabel: getCurationApiConfig(state).makeLabel
    // palette: getCurationApiConfig(state).palette,
  });
};

var styles = {
  curations: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.8)',
    display: 'inline-block',
    fontSize: '12px',
    zIndex: 100
  },
  curation: {
    border: '1px solid #CCC',
    padding: '0 1em'
  }
};
var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, null), withPlugins('CurationTooltipsOverlay'));
export default {
  component: enhance(CurationTooltipsOverlay),
  mode: 'add',
  target: 'OpenSeadragonViewer'
};