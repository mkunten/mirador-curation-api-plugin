import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from 'mirador/dist/es/src/extend/withPlugins';
import { addError as _addError } from 'mirador/dist/es/src/state/actions';
import { requestCuration } from '../state/actions';
import CurationResourceImport from '../components/CurationResourceImport';
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addError: function addError() {
      return dispatch(_addError());
    },
    importCurationResource: function importCurationResource(uri) {
      return dispatch(requestCuration(uri));
    }
  };
};
var styles = function styles(theme) {
  return {
    cancelBtn: {
      color: theme.palette.text.primary
    },
    textField: {
      width: '100%'
    },
    textInput: {
      fontFamily: 'monospace'
    }
  };
};
var enhance = compose(withTranslation(), withStyles(styles), connect(null, mapDispatchToProps), withPlugins('CurationResourceImport'));
export default enhance(CurationResourceImport);