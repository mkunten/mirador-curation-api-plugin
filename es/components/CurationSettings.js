function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@material-ui/core';

// eslint-disable-next-line react/prefer-stateless-function
export var CurationSettings = /*#__PURE__*/function (_Component) {
  _inheritsLoose(CurationSettings, _Component);
  function CurationSettings() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = CurationSettings.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      displayAll = _this$props.displayAll,
      listAll = _this$props.listAll,
      toggleCurationDisplay = _this$props.toggleCurationDisplay,
      toggleCurationList = _this$props.toggleCurationList,
      t = _this$props.t;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormControlLabel, {
      control: /*#__PURE__*/React.createElement(Switch, {
        checked: displayAll,
        onChange: toggleCurationDisplay
      }),
      label: displayAll ? t('highlightCurations') : t('highlightNoCurations'),
      "aria-label": "highlight switch"
    }), /*#__PURE__*/React.createElement(FormControlLabel, {
      control: /*#__PURE__*/React.createElement(Switch, {
        checked: listAll,
        onChange: toggleCurationList
      }),
      label: listAll ? t('listAll') : t('listOnlyInManifest'),
      "aria-label": "listing switch"
    }));
  };
  return CurationSettings;
}(Component);
CurationSettings.propTypes = process.env.NODE_ENV !== "production" ? {
  displayAll: PropTypes.bool.isRequired,
  listAll: PropTypes.bool.isRequired,
  toggleCurationDisplay: PropTypes.func.isRequired,
  toggleCurationList: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  windowId: PropTypes.string.isRequired
} : {};
export default CurationSettings;