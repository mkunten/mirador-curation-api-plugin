function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';
import CanvasCurations from '../plugins/miradorCanvasCurationsPlugin';
import CurationSettings from '../plugins/miradorCurationSettingsPlugin';
import CurationResourceImport from '../plugins/miradorCurationResourceImportPlugin';
var WindowSideBarCurationsPanel = /*#__PURE__*/function (_Component) {
  _inheritsLoose(WindowSideBarCurationsPanel, _Component);
  function WindowSideBarCurationsPanel() {
    var _this;
    _this = _Component.call(this) || this;
    _this.state = {
      dialog: false
    };
    _this.handleDialogClick = _this.handleDialogClick.bind(_assertThisInitialized(_this));
    _this.handleDialogClose = _this.handleDialogClose.bind(_assertThisInitialized(_this));
    _this.containerRef = React.createRef();
    return _this;
  }
  var _proto = WindowSideBarCurationsPanel.prototype;
  _proto.handleDialogClick = function handleDialogClick(event) {
    var obj = {
      dialog: true
    };
    this.setState(obj);
    event.preventDefault();
    event.stopPropagation();
  };
  _proto.handleDialogClose = function handleDialogClose() {
    var _this2 = this;
    return function () {
      var obj = {
        dialog: false
      };
      _this2.setState(obj);
    };
  };
  _proto.render = function render() {
    var _this$props = this.props,
      curations = _this$props.curations,
      curationIds = _this$props.curationIds,
      curationItems = _this$props.curationItems,
      totalSize = _this$props.totalSize,
      visibleCanvasIds = _this$props.visibleCanvasIds,
      classes = _this$props.classes,
      id = _this$props.id,
      t = _this$props.t,
      windowId = _this$props.windowId,
      containerId = _this$props.containerId,
      toggleCurationItemsVisible = _this$props.toggleCurationItemsVisible;
    var container = document.querySelector("#" + containerId + " ." + ns('viewer'));
    var containerRef = this.containerRef;
    var dialog = this.state.dialog;
    return /*#__PURE__*/React.createElement(CompanionWindow, {
      title: t('curations'),
      paperClassName: ns('window-sidebar-curation-panel'),
      windowId: windowId,
      id: id,
      ref: containerRef,
      otherRef: containerRef,
      titleControls: /*#__PURE__*/React.createElement(CurationSettings, {
        windowId: windowId
      })
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Typography, {
      component: "div",
      variant: "subtitle2"
    }, /*#__PURE__*/React.createElement(Accordion, {
      square: true
    }, /*#__PURE__*/React.createElement(AccordionSummary, {
      expandIcon: /*#__PURE__*/React.createElement(ExpandMoreIcon, null),
      "aria-controls": "panel-content",
      id: "panel-header",
      className: classes.accordionSummary
    }, /*#__PURE__*/React.createElement(IconButton, {
      size: "small",
      "aria-label": t('curationResourceImport'),
      title: t('curationResourceImport'),
      onClick: this.handleDialogClick
    }, /*#__PURE__*/React.createElement(AddToQueueIcon, null)), /*#__PURE__*/React.createElement("span", {
      className: classes.center
    }, totalSize === 0 ? t('noCurations') : t('showingNumCurations', {
      number: totalSize
    }))), /*#__PURE__*/React.createElement(AccordionDetails, {
      className: classes.accordionDetails
    }, curationIds.map(function (curationId) {
      var _curations$curationId;
      return /*#__PURE__*/React.createElement("div", {
        key: curationId
      }, /*#__PURE__*/React.createElement(FormControlLabel, {
        control: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Switch, {
          checked: curations[curationId].visible,
          onChange: function onChange() {
            return toggleCurationItemsVisible(curationId);
          }
        }), /*#__PURE__*/React.createElement("a", {
          href: curationId,
          title: curationId,
          target: "_blank",
          "aria-label": t('linkToExternalCuration'),
          className: classes.curationIdLink,
          rel: "noreferrer"
        }, /*#__PURE__*/React.createElement(IconButton, {
          size: "small"
        }, /*#__PURE__*/React.createElement(OpenInNewIcon, null)), ' ', (_curations$curationId = curations[curationId].label) !== null && _curations$curationId !== void 0 ? _curations$curationId : curationId)),
        "aria-label": t('toggleCurationItemsVisible')
      }));
    }))))), /*#__PURE__*/React.createElement(CanvasCurations, {
      curationItems: curationItems,
      visibleCanvasIds: visibleCanvasIds,
      containerRef: containerRef,
      key: id,
      totalSize: totalSize,
      windowId: windowId
    }), Boolean(dialog) && /*#__PURE__*/React.createElement(CurationResourceImport, {
      open: Boolean(dialog),
      container: container,
      handleClose: this.handleDialogClose()
    }));
  };
  return WindowSideBarCurationsPanel;
}(Component);
export { WindowSideBarCurationsPanel as default };
WindowSideBarCurationsPanel.propTypes = process.env.NODE_ENV !== "production" ? {
  // eslint-disable-next-line react/forbid-prop-types
  curations: PropTypes.object.isRequired,
  curationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  curationItems: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  totalSize: PropTypes.number.isRequired,
  visibleCanvasIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
  containerId: PropTypes.string.isRequired,
  toggleCurationItemsVisible: PropTypes.func.isRequired
} : {};
WindowSideBarCurationsPanel.defaultProps = {
  classes: {},
  t: function t(key) {
    return key;
  }
};