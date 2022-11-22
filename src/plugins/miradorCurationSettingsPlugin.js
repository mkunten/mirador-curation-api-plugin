import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import * as actions from '../state/actions';
import { getCurationApiConfig } from '../state/selectors';
import { CurationSettings } from '../components/CurationSettings';

const mapStateToProps = (state, { windowId }) => ({
  displayAll: getCurationApiConfig(state, windowId).visible,
  listAll: getCurationApiConfig(state, windowId).listAll,
});

const mapDispatchToProps = (dispatch, { windowId }) => ({
  toggleCurationDisplay: () => {
    dispatch(actions.toggleCurationDisplay(windowId));
  },
  toggleCurationList: () => {
    dispatch(actions.toggleCurationList(windowId));
  },
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CurationSettings'),
);

export default enhance(CurationSettings);
