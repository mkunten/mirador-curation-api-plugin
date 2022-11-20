import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import OpenSeadragonCanvasOverlay from 'mirador/dist/es/src/lib/OpenSeadragonCanvasOverlay';
import CanvasWorld from 'mirador/dist/es/src/lib/CanvasWorld';
import CanvasAnnotationDisplay from 'mirador/dist/es/src/lib/CanvasAnnotationDisplay';

export class CurationsOverlay extends Component {
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
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.osdCanvasOverlay = null;
    // // An initial value for the updateCanvas method
    this.updateCanvas = () => {};
    this.onUpdateViewport = this.onUpdateViewport.bind(this);
    // this.onCanvasClick = this.onCanvasClick.bind(this);
    // this.onCanvasMouseMove = debounce(this.onCanvasMouseMove.bind(this), 10);
    // this.onCanvasExit = this.onCanvasExit.bind(this);
  }

  //
  // /**
  //  * React lifecycle event
  //  */
  componentDidMount() {
    this.initializeViewer();
  }

  //
  // /**
  //  * When the tileSources change, make sure to close the OSD viewer.
  //  * When the curations change, reset the updateCanvas method to make sure
  //  * they are added.
  //  * When the viewport state changes, pan or zoom the OSD viewer as appropriate
  //  */
  componentDidUpdate(prevProps) {
    const {
      config,
      viewer,
    } = this.props;

    this.initializeViewer();

    if (config.visible !== prevProps.config.visible
      || config.selectedCurationIds !== prevProps.config.selectedCurationIds) {
      this.updateCanvas = this.canvasUpdateCallback();
      viewer.forceRedraw();
    }
  }

  componentWillUnmount() {
    const { viewer } = this.props;

    viewer.removeHandler(
      'update-viewport',
      this.onUpdateViewport,
    );
  }

  onUpdateViewport() {
    this.updateCanvas();
  }

  initializeViewer() {
    const { viewer } = this.props;
    if (!viewer) return;
    if (this.osdCanvasOverlay) return;
    this.osdCanvasOverlay = new OpenSeadragonCanvasOverlay(viewer, this.ref);
    viewer.addHandler(
      'update-viewport',
      this.onUpdateViewport,
    );
    this.updateCanvas = this.canvasUpdateCallback();
  }

  // /** */
  canvasUpdateCallback() {
    return () => {
      this.osdCanvasOverlay.clear();
      this.osdCanvasOverlay.resize();
      this.osdCanvasOverlay
        .canvasUpdate(this.renderCurations.bind(this));
    };
  }

  curationsToContext(curations, palette) {
    const {
      config,
      canvasWorld,
      viewer,
    } = this.props;
    const context = this.osdCanvasOverlay.context2d;
    const zoomRatio = viewer.viewport.getZoom(true)
      / viewer.viewport.getMaxZoom();
    curations.forEach((curation) => {
      if (!canvasWorld.canvasIds.includes(curation.canvasId)) {
        return;
      }
      const offset = canvasWorld.offsetByCanvas(curation.canvasId);
      const canvasCurationDisplay = new CanvasAnnotationDisplay({
        hovered: config.visible,
        offset,
        palette: {
          ...palette,
          default: {
            ...palette.default,
            ...(!config.visible && palette.hidden),
          },
        },
        resource: curation,
        selected: config.selectedCurationIds
          .includes(curation.id),
        zoomRatio,
      });
      canvasCurationDisplay.toContext(context);
    });
  }

  /** */
  renderCurations() {
    const {
      curations,
      palette,
    } = this.props;

    this.curationsToContext(curations, palette.annotations);
  }

  render() {
    const { viewer } = this.props;
    if (!viewer || !viewer.canvas) {
      return null;
    }
    return ReactDOM.createPortal(
      (
        <div
          ref={this.ref}
          style={{
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
          }}
        >
          <canvas />
        </div>
      ),
      viewer.canvas,
    );
  }
}

CurationsOverlay.propTypes = {
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
  windowId: PropTypes.string.isRequired,
};

CurationsOverlay.defaultProps = {
  viewer: null,
};

export default CurationsOverlay;
