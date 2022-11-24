function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { DialogActions, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScrollIndicatedDialogContent from 'mirador/dist/es/src/containers/ScrollIndicatedDialogContent';
var CurationResourceImport = /*#__PURE__*/function (_Component) {
  _inheritsLoose(CurationResourceImport, _Component);
  function CurationResourceImport(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.state = {
      configImportValue: '',
      error: true
    };
    _this.handleImportConfig = _this.handleImportConfig.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = CurationResourceImport.prototype;
  _proto.handleChange = function handleChange(event) {
    this.setState({
      configImportValue: event.target.value,
      error: !event.target.validity.valid
    });
    event.preventDefault();
  };
  _proto.handleImportConfig = function handleImportConfig() {
    var _this$props = this.props,
      handleClose = _this$props.handleClose,
      importCurationResource = _this$props.importCurationResource;
    var configImportValue = this.state.configImportValue;
    try {
      importCurationResource(configImportValue);
      handleClose();
    } catch (ex) {
      var addError = this.props.addError;
      addError(ex.toString());
    }
  };
  _proto.render = function render() {
    var _this$props2 = this.props,
      classes = _this$props2.classes,
      handleClose = _this$props2.handleClose,
      open = _this$props2.open,
      t = _this$props2.t;
    var error = this.state.error;
    return /*#__PURE__*/React.createElement(Dialog, {
      "aria-labelledby": "curation-resource-import-title",
      id: "curation-resource-import",
      onClose: handleClose,
      open: open,
      fullWidth: true,
      maxWidth: "sm"
    }, /*#__PURE__*/React.createElement(DialogTitle, {
      id: "curation-resource-import-title",
      disableTypography: true
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "h2"
    }, t('curationResourceImport'))), /*#__PURE__*/React.createElement(ScrollIndicatedDialogContent, null, /*#__PURE__*/React.createElement(TextField, {
      className: classes.textField,
      fullWidth: true,
      id: "curation-resource-import-input",
      label: t('curationResourceImportLabel'),
      type: "url",
      required: true,
      onChange: this.handleChange,
      minRows: "1",
      variant: "filled",
      inputProps: {
        autoFocus: 'autofocus',
        className: classes.textInput
      },
      error: error,
      helperText: error && t('curationResourceImportError')
    })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
      className: classes.cancelBtn,
      onClick: handleClose
    }, t('cancel')), /*#__PURE__*/React.createElement(Button, {
      color: "primary",
      variant: "contained",
      onClick: this.handleImportConfig,
      disabled: error
    }, t('import'))));
  };
  return CurationResourceImport;
}(Component);
export { CurationResourceImport as default };
CurationResourceImport.propTypes = process.env.NODE_ENV !== "production" ? {
  addError: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  handleClose: PropTypes.func.isRequired,
  importCurationResource: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  t: PropTypes.func
} : {};
CurationResourceImport.defaultProps = {
  classes: {},
  t: function t(key) {
    return key;
  }
};