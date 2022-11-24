import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {
  DialogActions,
  TextField,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScrollIndicatedDialogContent from 'mirador/dist/es/src/containers/ScrollIndicatedDialogContent';

export default class CurationResourceImport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      configImportValue: '',
      error: true,
    };

    this.handleImportConfig = this.handleImportConfig.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      configImportValue: event.target.value,
      error: !event.target.validity.valid,
    });
    event.preventDefault();
  }

  handleImportConfig() {
    const { handleClose, importCurationResource } = this.props;
    const { configImportValue } = this.state;

    try {
      importCurationResource(configImportValue);
      handleClose();
    } catch (ex) {
      const { addError } = this.props;
      addError(ex.toString());
    }
  }

  render() {
    const {
      classes, handleClose, open, t,
    } = this.props;
    const { error } = this.state;

    return (
      <Dialog
        aria-labelledby="curation-resource-import-title"
        id="curation-resource-import"
        onClose={handleClose}
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="curation-resource-import-title" disableTypography>
          <Typography variant="h2">{t('curationResourceImport')}</Typography>
        </DialogTitle>
        <ScrollIndicatedDialogContent>
          <TextField
            className={classes.textField}
            fullWidth
            id="curation-resource-import-input"
            label={t('curationResourceImportLabel')}
            type="url"
            required
            onChange={this.handleChange}
            minRows="1"
            variant="filled"
            inputProps={{
              autoFocus: 'autofocus',
              className: classes.textInput,
            }}
            error={error}
            helperText={error && t('curationResourceImportError')}
          />
        </ScrollIndicatedDialogContent>
        <DialogActions>
          <Button className={classes.cancelBtn} onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleImportConfig}
            disabled={error}
          >
            {t('import')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CurationResourceImport.propTypes = {
  addError: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  handleClose: PropTypes.func.isRequired,
  importCurationResource: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  t: PropTypes.func,
};

CurationResourceImport.defaultProps = {
  classes: {},
  t: (key) => key,
};
