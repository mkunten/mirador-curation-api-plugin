import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import * as actions from '../state/actions';
import { getCurationsApiConfig } from '../state/selectors';
import { CurationSettings } from '../components/CurationSettings';
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    displayAll: getCurationsApiConfig(state, windowId).visible,
    listAll: getCurationsApiConfig(state, windowId).listAll
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    toggleCurationDisplay: function toggleCurationDisplay() {
      dispatch(actions.toggleCurationDisplay(windowId));
    },
    toggleCurationList: function toggleCurationList() {
      dispatch(actions.toggleCurationList(windowId));
    }
  };
};
var enhance = compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('CurationSettings'));
export default enhance(CurationSettings);