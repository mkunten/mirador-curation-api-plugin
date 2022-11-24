import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import * as actions from '../state/actions';
import { getCurationApiConfig } from '../state/selectors';
import { CurationSettings } from '../components/CurationSettings';
var mapStateToProps = function mapStateToProps(state) {
  return {
    displayAll: getCurationApiConfig(state).visible,
    listAll: getCurationApiConfig(state).listAll
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleCurationDisplay: function toggleCurationDisplay() {
      dispatch(actions.toggleCurationDisplay());
    },
    toggleCurationListAll: function toggleCurationListAll() {
      dispatch(actions.toggleCurationListAll());
    }
  };
};
var enhance = compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps), withPlugins('CurationSettings'));
export default enhance(CurationSettings);