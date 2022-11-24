function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import { ScrollTo } from 'mirador/dist/es/src/components/ScrollTo';
export var CanvasCurations = /*#__PURE__*/function (_Component) {
  _inheritsLoose(CanvasCurations, _Component);
  function CanvasCurations(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleCurationHover = _this.handleCurationHover.bind(_assertThisInitialized(_this));
    _this.handleCurationBlur = _this.handleCurationBlur.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = CanvasCurations.prototype;
  _proto.handleClick = function handleClick(event, curation) {
    var updateViewerCanvas = this.props.updateViewerCanvas;
    if (curation.index && curation.index >= 1) {
      updateViewerCanvas(curation.canvasId);
    }
  };
  _proto.handleCurationHover = function handleCurationHover(curation) {
    var hoverCuration = this.props.hoverCuration;
    hoverCuration([curation.id]);
  };
  _proto.handleCurationBlur = function handleCurationBlur() {
    var hoverCuration = this.props.hoverCuration;
    hoverCuration([]);
  };
  _proto.render = function render() {
    var _this2 = this;
    var _this$props = this.props,
      totalSize = _this$props.totalSize,
      curationItems = _this$props.curationItems,
      visibleCanvasIds = _this$props.visibleCanvasIds,
      containerRef = _this$props.containerRef,
      selectedIndex = _this$props.selectedIndex,
      listContainerComponent = _this$props.listContainerComponent,
      classes = _this$props.classes,
      htmlSanitizationRuleSet = _this$props.htmlSanitizationRuleSet,
      makeLabel = _this$props.makeLabel;
    if (totalSize === 0) {
      return null;
    }
    return /*#__PURE__*/React.createElement(MenuList, {
      autoFocusItem: true,
      variant: "selectedMenu"
    }, Object.values(curationItems).map(function (items) {
      return items.map(function (curation) {
        return /*#__PURE__*/React.createElement(ScrollTo, {
          containerRef: containerRef,
          key: curation.id + "-scroll",
          offsetTop: 96 // offset for the height of the form above
          ,
          scrollTo: selectedIndex === curation.id
        }, /*#__PURE__*/React.createElement(MenuItem, {
          button: true,
          component: listContainerComponent,
          key: curation.id,
          className: visibleCanvasIds.includes(curation.canvasId) ? classes.menuItemOnCanvas : classes.menuItem,
          curationid: curation.id,
          selected: selectedIndex === curation.id,
          onClick: function onClick(e) {
            return _this2.handleClick(e, curation);
          },
          onMouseEnter: function onMouseEnter() {
            return _this2.handleCurationHover(curation);
          },
          onMouseLeave: _this2.handleCurationBlur
        }, curation.serviceId && /*#__PURE__*/React.createElement("div", {
          style: {
            minWidth: 50
          }
        }, /*#__PURE__*/React.createElement("img", {
          alt: "presentation",
          src: curation.serviceId + "/" + curation.region + "/60,/0/default.jpg",
          className: classes.image
        })), /*#__PURE__*/React.createElement("div", {
          className: classes.label
        }, /*#__PURE__*/React.createElement(SanitizedHtml, {
          ruleSet: htmlSanitizationRuleSet,
          htmlString: makeLabel(curation)
        }))));
      });
    }));
  };
  return CanvasCurations;
}(Component);
CanvasCurations.propTypes = process.env.NODE_ENV !== "production" ? {
  // eslint-disable-next-line react/forbid-prop-types
  curationItems: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  visibleCanvasIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalSize: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number,
  classes: PropTypes.objectOf(PropTypes.string),
  htmlSanitizationRuleSet: PropTypes.string,
  makeLabel: PropTypes.func.isRequired,
  listContainerComponent: PropTypes.elementType,
  // eslint-disable-next-line react/forbid-prop-types
  containerRef: PropTypes.object.isRequired,
  updateViewerCanvas: PropTypes.func.isRequired,
  hoverCuration: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  windowId: PropTypes.string.isRequired
} : {};
CanvasCurations.defaultProps = {
  selectedIndex: 0,
  classes: {},
  htmlSanitizationRuleSet: 'liberal',
  listContainerComponent: 'li'
};
export default CanvasCurations;