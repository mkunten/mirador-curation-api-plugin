function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';
import CanvasCurations from '../plugins/miradorCanvasCurationsPlugin';
import CurationSettings from '../plugins/miradorCurationSettingsPlugin';
var WindowSideBarCurationsPanel = /*#__PURE__*/function (_Component) {
  _inheritsLoose(WindowSideBarCurationsPanel, _Component);
  function WindowSideBarCurationsPanel() {
    var _this;
    _this = _Component.call(this) || this;
    _this.containerRef = React.createRef();
    return _this;
  }
  var _proto = WindowSideBarCurationsPanel.prototype;
  _proto.render = function render() {
    var _this$props = this.props,
      curationIds = _this$props.curationIds,
      curationItems = _this$props.curationItems,
      visibleCanvasIds = _this$props.visibleCanvasIds,
      classes = _this$props.classes,
      id = _this$props.id,
      t = _this$props.t,
      windowId = _this$props.windowId;
    var totalSize = (curationItems !== null && curationItems !== void 0 ? curationItems : []).length;
    return /*#__PURE__*/React.createElement(CompanionWindow, {
      title: t('curations'),
      paperClassName: ns('window-sidebar-curation-panel'),
      windowId: windowId,
      id: id,
      ref: this.containerRef,
      otherRef: this.containerRef,
      titleControls: /*#__PURE__*/React.createElement(CurationSettings, {
        windowId: windowId
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: classes.section
    }, /*#__PURE__*/React.createElement(Typography, {
      component: "p",
      variant: "subtitle2"
    }, curationIds.map(function (curationId) {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: curationId
      }, /*#__PURE__*/React.createElement("a", {
        href: curationId,
        title: curationId,
        target: "_blank",
        "aria-label": t('linkToExternalCuration'),
        className: classes.curationIdLink,
        rel: "noreferrer"
      }, /*#__PURE__*/React.createElement(IconButton, {
        size: "small"
      }, /*#__PURE__*/React.createElement(OpenInNewIcon, null)), ' ', curationId), /*#__PURE__*/React.createElement("br", null));
    }), totalSize === 0 ? t('noCurations') : t('showingNumCurations', {
      number: totalSize
    }))), /*#__PURE__*/React.createElement(CanvasCurations, {
      curationItems: curationItems,
      visibleCanvasIds: visibleCanvasIds,
      containerRef: this.containerRef,
      key: id,
      totalSize: totalSize,
      windowId: windowId
    }));
  };
  return WindowSideBarCurationsPanel;
}(Component);
export { WindowSideBarCurationsPanel as default };
WindowSideBarCurationsPanel.propTypes = process.env.NODE_ENV !== "production" ? {
  curationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  curationItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  visibleCanvasIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired
} : {};
WindowSideBarCurationsPanel.defaultProps = {
  classes: {},
  t: function t(key) {
    return key;
  }
};