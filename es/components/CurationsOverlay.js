function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import OpenSeadragonCanvasOverlay from 'mirador/dist/es/src/lib/OpenSeadragonCanvasOverlay';
import CanvasWorld from 'mirador/dist/es/src/lib/CanvasWorld';
import CanvasAnnotationDisplay from 'mirador/dist/es/src/lib/CanvasAnnotationDisplay';
export var CurationsOverlay = /*#__PURE__*/function (_Component) {
  _inheritsLoose(CurationsOverlay, _Component);
  function CurationsOverlay(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.ref = React.createRef();
    _this.osdCanvasOverlay = null;
    _this.updateCanvas = function () {};
    _this.onUpdateViewport = _this.onUpdateViewport.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = CurationsOverlay.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.initializeViewer();
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
      config = _this$props.config,
      viewer = _this$props.viewer;
    this.initializeViewer();
    if (config.visible !== prevProps.config.visible || config.hoveredCurationIds !== prevProps.config.hoveredCurationIds) {
      this.updateCanvas = this.canvasUpdateCallback();
      viewer.forceRedraw();
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    var viewer = this.props.viewer;
    viewer.removeHandler('update-viewport', this.onUpdateViewport);
  };
  _proto.onUpdateViewport = function onUpdateViewport() {
    this.updateCanvas();
  };
  _proto.initializeViewer = function initializeViewer() {
    var viewer = this.props.viewer;
    if (!viewer) return;
    if (this.osdCanvasOverlay) return;
    this.osdCanvasOverlay = new OpenSeadragonCanvasOverlay(viewer, this.ref);
    viewer.addHandler('update-viewport', this.onUpdateViewport);
    this.updateCanvas = this.canvasUpdateCallback();
  };
  _proto.canvasUpdateCallback = function canvasUpdateCallback() {
    var _this2 = this;
    return function () {
      _this2.osdCanvasOverlay.clear();
      _this2.osdCanvasOverlay.resize();
      _this2.osdCanvasOverlay.canvasUpdate(_this2.renderCurations.bind(_this2));
    };
  };
  _proto.curationsToContext = function curationsToContext(curations, palette) {
    var _this$props2 = this.props,
      config = _this$props2.config,
      canvasWorld = _this$props2.canvasWorld,
      viewer = _this$props2.viewer;
    var context = this.osdCanvasOverlay.context2d;
    var zoomRatio = viewer.viewport.getZoom(true) / viewer.viewport.getMaxZoom();
    Object.values(curations).forEach(function (items) {
      return items.forEach(function (curation) {
        if (!canvasWorld.canvasIds.includes(curation.canvasId)) {
          return;
        }
        var offset = canvasWorld.offsetByCanvas(curation.canvasId);
        var canvasCurationDisplay = new CanvasAnnotationDisplay({
          hovered: config.hoveredCurationIds.includes(curation.id),
          offset: offset,
          palette: _extends({}, palette, {
            "default": _extends({}, palette["default"], !config.visible && palette.hidden)
          }),
          resource: curation,
          selected: config.selectedCurationIds.includes(curation.id),
          zoomRatio: zoomRatio
        });
        canvasCurationDisplay.toContext(context);
      });
    });
  };
  _proto.renderCurations = function renderCurations() {
    var _this$props3 = this.props,
      curations = _this$props3.curations,
      palette = _this$props3.palette;
    this.curationsToContext(curations, palette);
  };
  _proto.render = function render() {
    var viewer = this.props.viewer;
    if (!viewer || !viewer.canvas) {
      return null;
    }
    return ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
      ref: this.ref,
      style: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("canvas", null)), viewer.canvas);
  };
  return CurationsOverlay;
}(Component);
CurationsOverlay.propTypes = process.env.NODE_ENV !== "production" ? {
  canvasWorld: PropTypes.instanceOf(CanvasWorld).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  curations: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  palette: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  viewer: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  windowId: PropTypes.string.isRequired
} : {};
CurationsOverlay.defaultProps = {
  viewer: null
};
export default CurationsOverlay;