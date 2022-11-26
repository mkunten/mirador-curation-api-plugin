function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import Typography from '@material-ui/core/Typography';
import debounce from 'lodash/debounce';
export var CurationTooltipsOverlay = /*#__PURE__*/function (_Component) {
  _inheritsLoose(CurationTooltipsOverlay, _Component);
  function CurationTooltipsOverlay(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.onCanvasMouseMove = debounce(_this.onCanvasMouseMove.bind(_assertThisInitialized(_this)), 10);
    _this.onCanvasExit = _this.onCanvasExit.bind(_assertThisInitialized(_this));
    _this.initialized = false;
    _this.state = {
      x: 0,
      y: 0
    };
    return _this;
  }
  var _proto = CurationTooltipsOverlay.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.initializeViewer();
  };
  _proto.componentDidUpdate = function componentDidUpdate() {
    this.initializeViewer();
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    var viewer = this.props.viewer;
    if (viewer) {
      viewer.removeHandler('canvas-exit', this.onCanvasExit);
      viewer.removeHandler('mouse-move', this.onCanvasMouseMove);
    }
  };
  _proto.onCanvasExit = function onCanvasExit() {
    this.onCanvasMouseMove.cancel();
    this.setState({
      x: 0,
      y: 0
    });
  };
  _proto.onCanvasMouseMove = function onCanvasMouseMove(event) {
    var totalSize = this.props.totalSize;
    if (totalSize === 0) {
      return;
    }
    this.setState(event.position);
  };
  _proto.initializeViewer = function initializeViewer() {
    var viewer = this.props.viewer;
    if (!viewer || this.initialized) {
      return;
    }
    this.initialized = true;
    viewer.addHandler('canvas-exit', this.onCanvasExit);
    viewer.addHandler('mouse-move', this.onCanvasMouseMove);
  };
  _proto.render = function render() {
    var _this$props = this.props,
      curationItems = _this$props.curationItems,
      totalSize = _this$props.totalSize,
      hoveredCurationIds = _this$props.hoveredCurationIds,
      classes = _this$props.classes,
      htmlSanitizationRuleSet = _this$props.htmlSanitizationRuleSet,
      makeLabel = _this$props.makeLabel,
      viewer = _this$props.viewer;
    if (!viewer || totalSize === 0 || hoveredCurationIds.length === 0) {
      return null;
    }
    var _this$state = this.state,
      x = _this$state.x,
      y = _this$state.y;
    if (!(x > 0 && y > 0)) {
      return null;
    }
    var xoffset = 10;
    var yoffset = 10;
    var top = y + yoffset;
    var left = x + xoffset;
    return ReactDOM.createPortal( /*#__PURE__*/React.createElement(Typography, {
      component: "div",
      style: {
        top: top,
        left: left
      },
      className: "" + classes.curations
    }, Object.values(curationItems).map(function (items) {
      return items.map(function (curation) {
        if (hoveredCurationIds.includes(curation.id)) {
          return /*#__PURE__*/React.createElement("div", {
            className: "" + classes.curation,
            key: curation.id
          }, /*#__PURE__*/React.createElement(SanitizedHtml, {
            ruleSet: htmlSanitizationRuleSet,
            htmlString: makeLabel(curation)
          }));
        }
        return null;
      });
    })), viewer.canvas);
  };
  return CurationTooltipsOverlay;
}(Component);
CurationTooltipsOverlay.propTypes = process.env.NODE_ENV !== "production" ? {
  // eslint-disable-next-line react/forbid-prop-types
  curationItems: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  totalSize: PropTypes.number.isRequired,
  hoveredCurationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.shape({
    curations: PropTypes.string,
    curation: PropTypes.string
  }),
  htmlSanitizationRuleSet: PropTypes.string,
  makeLabel: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  viewer: PropTypes.object
} : {};
CurationTooltipsOverlay.defaultProps = {
  classes: {},
  htmlSanitizationRuleSet: 'liberal',
  viewer: null
};
export default CurationTooltipsOverlay;