import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import * as actions from '../state/actions';
import { getCurationApiConfig } from '../state/selectors';
import { CurationSettings } from '../components/CurationSettings';

const mapStateToProps = (state) => ({
  displayAll: getCurationApiConfig(state).visible,
  listAll: getCurationApiConfig(state).listAll,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurationDisplay: () => {
    dispatch(actions.toggleCurationDisplay());
  },
  toggleCurationListAll: () => {
    dispatch(actions.toggleCurationListAll());
  },
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CurationSettings'),
);

export default enhance(CurationSettings);
