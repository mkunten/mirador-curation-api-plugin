import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import { addError } from 'mirador/dist/es/src/state/actions';
import { requestCuration } from '../state/actions';
import CurationResourceImport from '../components/CurationResourceImport';

const mapDispatchToProps = (dispatch) => ({
  addError: () => dispatch(addError()),
  importCurationResource: (uri) => dispatch(requestCuration(uri)),
});

const styles = (theme) => ({
  cancelBtn: {
    color: theme.palette.text.primary,
  },
  textField: {
    width: '100%',
  },
  textInput: {
    fontFamily: 'monospace',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(null, mapDispatchToProps),
  withPlugins('CurationResourceImport'),
);

export default enhance(CurationResourceImport);
