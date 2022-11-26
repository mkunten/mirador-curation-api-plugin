function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import xor from 'lodash/xor';
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
    _this.onCanvasMouseMove = debounce(_this.onCanvasMouseMove.bind(_assertThisInitialized(_this)));
    _this.onCanvasExit = _this.onCanvasExit.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = CurationsOverlay.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.initializeViewer();
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
      visible = _this$props.visible,
      hoveredCurationIds = _this$props.hoveredCurationIds,
      selectedCurationIds = _this$props.selectedCurationIds,
      viewer = _this$props.viewer;
    this.initializeViewer();
    if (visible !== prevProps.visible || hoveredCurationIds !== prevProps.hoveredCurationIds || selectedCurationIds !== prevProps.selectedCurationIds) {
      this.updateCanvas = this.canvasUpdateCallback();
      viewer.forceRedraw();
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    var viewer = this.props.viewer;
    viewer.removeHandler('update-viewport', this.onUpdateViewport);
    viewer.removeHandler('mouse-move', this.onCanvasMouseMove);
    viewer.removeHandler('canvas-exit', this.onCanvasExit);
  };
  _proto.onUpdateViewport = function onUpdateViewport() {
    this.updateCanvas();
  };
  _proto.onCanvasMouseMove = function onCanvasMouseMove(event) {
    var _this$props2 = this.props,
      totalSize = _this$props2.totalSize,
      hoverCurations = _this$props2.hoverCurations,
      hoveredCurationIds = _this$props2.hoveredCurationIds,
      canvasWorld = _this$props2.canvasWorld,
      viewer = _this$props2.viewer;
    if (totalSize === 0 || !viewer) {
      return;
    }
    var webPosition = event.position;
    var point = viewer.viewport.pointFromPixel(webPosition);
    var canvas = canvasWorld.canvasAtPoint(point);
    if (!canvas) {
      hoverCurations([]);
      return;
    }
    var curationIds = this.curationsAtPoint(canvas, point).map(function (c) {
      return c.id;
    });
    if (xor(hoveredCurationIds, curationIds).length > 0) {
      hoverCurations(curationIds);
    }
  };
  _proto.onCanvasExit = function onCanvasExit() {
    var hoverCurations = this.props.hoverCurations;
    this.onCanvasMouseMove.cancel();
    hoverCurations([]);
  };
  _proto.initializeViewer = function initializeViewer() {
    var viewer = this.props.viewer;
    if (!viewer || this.osdCanvasOverlay) {
      return;
    }
    this.osdCanvasOverlay = new OpenSeadragonCanvasOverlay(viewer, this.ref);
    viewer.addHandler('update-viewport', this.onUpdateViewport);
    viewer.addHandler('mouse-move', this.onCanvasMouseMove);
    viewer.addHandler('canvas-exit', this.onCanvasExit);
    this.updateCanvas = this.canvasUpdateCallback();
  };
  _proto.canvasUpdateCallback = function canvasUpdateCallback() {
    var _this2 = this;
    return function () {
      _this2.osdCanvasOverlay.clear();
      _this2.osdCanvasOverlay.resize();
      _this2.osdCanvasOverlay.canvasUpdate(_this2.renderCurations.bind(_this2));
      _this2.osdCanvasOverlay.canvasUpdate(_this2.renderCurations.bind(_this2));
    };
  };
  _proto.isCurationAtPoint = function isCurationAtPoint(curation, canvas, point) {
    var canvasWorld = this.props.canvasWorld;
    var _canvasWorld$canvasTo = canvasWorld.canvasToWorldCoordinates(canvas.id),
      canvasX = _canvasWorld$canvasTo[0],
      canvasY = _canvasWorld$canvasTo[1];
    var relativeX = point.x - canvasX;
    var relativeY = point.y - canvasY;
    var _curation$fragmentSel = curation.fragmentSelector,
      x = _curation$fragmentSel[0],
      y = _curation$fragmentSel[1],
      w = _curation$fragmentSel[2],
      h = _curation$fragmentSel[3];
    return x <= relativeX && relativeX <= x + w && y <= relativeY && relativeY <= y + h;
  };
  _proto.curationsAtPoint = function curationsAtPoint(canvas, point) {
    var _this3 = this;
    var curationItems = this.props.curationItems;
    var curations = Object.values(curationItems).flat().filter(function (curation) {
      if (canvas.id !== curation.canvasId) {
        return false;
      }
      return _this3.isCurationAtPoint(curation, canvas, point);
    });
    return curations;
  };
  _proto.curationsToContext = function curationsToContext(curationItems, palette) {
    var _this$props3 = this.props,
      visible = _this$props3.visible,
      hoveredCurationIds = _this$props3.hoveredCurationIds,
      selectedCurationIds = _this$props3.selectedCurationIds,
      canvasWorld = _this$props3.canvasWorld,
      viewer = _this$props3.viewer;
    var context = this.osdCanvasOverlay.context2d;
    var zoomRatio = viewer.viewport.getZoom(true) / viewer.viewport.getMaxZoom();
    Object.values(curationItems).forEach(function (items) {
      return items.forEach(function (curation) {
        if (!canvasWorld.canvasIds.includes(curation.canvasId)) {
          return;
        }
        var offset = canvasWorld.offsetByCanvas(curation.canvasId);
        var canvasCurationDisplay = new CanvasAnnotationDisplay({
          hovered: hoveredCurationIds.includes(curation.id),
          offset: offset,
          palette: _extends({}, palette, {
            "default": _extends({}, palette["default"], !visible && palette.hidden)
          }),
          resource: curation,
          selected: selectedCurationIds.includes(curation.id),
          zoomRatio: zoomRatio
        });
        canvasCurationDisplay.toContext(context);
      });
    });
  };
  _proto.renderCurations = function renderCurations() {
    var _this$props4 = this.props,
      curationItems = _this$props4.curationItems,
      palette = _this$props4.palette;
    this.curationsToContext(curationItems, palette);
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
  visible: PropTypes.bool.isRequired,
  canvasWorld: PropTypes.instanceOf(CanvasWorld).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  curationItems: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  totalSize: PropTypes.number.isRequired,
  hoveredCurationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCurationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  palette: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  viewer: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  hoverCurations: PropTypes.func.isRequired
} : {};
CurationsOverlay.defaultProps = {
  viewer: null
};
export default CurationsOverlay;