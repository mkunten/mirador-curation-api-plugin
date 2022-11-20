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
  /**
   * curationsMatch - compares previous curations to current to determine
   * whether to add a new updateCanvas method to draw curations
   * @param  {Array} currentCurations
   * @param  {Array} prevCurations
   * @return {Boolean}
   */
  // static curationsMatch(currentCurations, prevCurations) {
  //   if (!currentCurations && !prevCurations) return true;
  //   if (
  //     (currentCurations && !prevCurations)
  //     || (!currentCurations && prevCurations)
  //   ) return false;
  //
  //   if (currentCurations.length === 0 && prevCurations.length === 0) return true;
  //   if (currentCurations.length !== prevCurations.length) return false;
  //   return currentCurations.every((curation, index) => {
  //     const newIds = curation.resources.map(r => r.id);
  //     const prevIds = prevCurations[index].resources.map(r => r.id);
  //     if (newIds.length === 0 && prevIds.length === 0) return true;
  //     if (newIds.length !== prevIds.length) return false;
  //
  //     if ((curation.id === prevCurations[index].id) && (isEqual(newIds, prevIds))) {
  //       return true;
  //     }
  //     return false;
  //   });
  // }
  //
  // /**
  //  * @param {Object} props
  //  */
  function CurationsOverlay(props) {
    var _this;
    _this = _Component.call(this, props) || this;
    _this.ref = React.createRef();
    _this.osdCanvasOverlay = null;
    // // An initial value for the updateCanvas method
    _this.updateCanvas = function () {};
    _this.onUpdateViewport = _this.onUpdateViewport.bind(_assertThisInitialized(_this));
    // this.onCanvasClick = this.onCanvasClick.bind(this);
    // this.onCanvasMouseMove = debounce(this.onCanvasMouseMove.bind(this), 10);
    // this.onCanvasExit = this.onCanvasExit.bind(this);
    return _this;
  }

  //
  // /**
  //  * React lifecycle event
  //  */
  var _proto = CurationsOverlay.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.initializeViewer();
  }

  //
  // /**
  //  * When the tileSources change, make sure to close the OSD viewer.
  //  * When the curations change, reset the updateCanvas method to make sure
  //  * they are added.
  //  * When the viewport state changes, pan or zoom the OSD viewer as appropriate
  //  */
  ;
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
      config = _this$props.config,
      viewer = _this$props.viewer;
    this.initializeViewer();
    if (config.visible !== prevProps.config.visible || config.selectedCurationIds !== prevProps.config.selectedCurationIds) {
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
  }

  // /** */
  ;
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
    curations.forEach(function (curation) {
      if (!canvasWorld.canvasIds.includes(curation.canvasId)) {
        return;
      }
      var offset = canvasWorld.offsetByCanvas(curation.canvasId);
      var canvasCurationDisplay = new CanvasAnnotationDisplay({
        hovered: config.visible,
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
  }

  /** */;
  _proto.renderCurations = function renderCurations() {
    var _this$props3 = this.props,
      curations = _this$props3.curations,
      palette = _this$props3.palette;
    this.curationsToContext(curations, palette.annotations);
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
  curations: PropTypes.arrayOf(PropTypes.object).isRequired,
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