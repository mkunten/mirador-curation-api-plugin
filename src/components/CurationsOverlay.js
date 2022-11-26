import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import xor from 'lodash/xor';
import OpenSeadragonCanvasOverlay from 'mirador/dist/es/src/lib/OpenSeadragonCanvasOverlay';
import CanvasWorld from 'mirador/dist/es/src/lib/CanvasWorld';
import CanvasAnnotationDisplay from 'mirador/dist/es/src/lib/CanvasAnnotationDisplay';

export class CurationsOverlay extends Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.osdCanvasOverlay = null;
    this.updateCanvas = () => {};
    this.onUpdateViewport = this.onUpdateViewport.bind(this);
    this.onCanvasMouseMove = debounce(this.onCanvasMouseMove.bind(this));
    this.onCanvasExit = this.onCanvasExit.bind(this);
  }

  componentDidMount() {
    this.initializeViewer();
  }

  componentDidUpdate(prevProps) {
    const {
      visible,
      hoveredCurationIds,
      selectedCurationIds,
      viewer,
    } = this.props;

    this.initializeViewer();

    if (visible !== prevProps.visible
      || hoveredCurationIds !== prevProps.hoveredCurationIds
      || selectedCurationIds !== prevProps.selectedCurationIds) {
      this.updateCanvas = this.canvasUpdateCallback();
      viewer.forceRedraw();
    }
  }

  componentWillUnmount() {
    const { viewer } = this.props;

    viewer.removeHandler('update-viewport', this.onUpdateViewport);
    viewer.removeHandler('mouse-move', this.onCanvasMouseMove);
    viewer.removeHandler('canvas-exit', this.onCanvasExit);
  }

  onUpdateViewport() {
    this.updateCanvas();
  }

  onCanvasMouseMove(event) {
    const {
      totalSize,
      hoverCurations,
      hoveredCurationIds,
      canvasWorld,
      viewer,
    } = this.props;

    if (totalSize === 0 || !viewer) {
      return;
    }

    const { position: webPosition } = event;
    const point = viewer.viewport.pointFromPixel(webPosition);

    const canvas = canvasWorld.canvasAtPoint(point);
    if (!canvas) {
      hoverCurations([]);
      return;
    }

    const curationIds = this.curationsAtPoint(canvas, point)
      .map((c) => c.id);
    if (xor(hoveredCurationIds, curationIds).length > 0) {
      hoverCurations(curationIds);
    }
  }

  onCanvasExit() {
    const { hoverCurations } = this.props;
    this.onCanvasMouseMove.cancel();
    hoverCurations([]);
  }

  initializeViewer() {
    const { viewer } = this.props;
    if (!viewer || this.osdCanvasOverlay) {
      return;
    }
    this.osdCanvasOverlay = new OpenSeadragonCanvasOverlay(viewer, this.ref);
    viewer.addHandler('update-viewport', this.onUpdateViewport);
    viewer.addHandler('mouse-move', this.onCanvasMouseMove);
    viewer.addHandler('canvas-exit', this.onCanvasExit);
    this.updateCanvas = this.canvasUpdateCallback();
  }

  canvasUpdateCallback() {
    return () => {
      this.osdCanvasOverlay.clear();
      this.osdCanvasOverlay.resize();
      this.osdCanvasOverlay.canvasUpdate(this.renderCurations.bind(this));
      this.osdCanvasOverlay.canvasUpdate(this.renderCurations.bind(this));
    };
  }

  isCurationAtPoint(curation, canvas, point) {
    const { canvasWorld } = this.props;

    const [canvasX, canvasY] = canvasWorld
      .canvasToWorldCoordinates(canvas.id);
    const relativeX = point.x - canvasX;
    const relativeY = point.y - canvasY;

    const [x, y, w, h] = curation.fragmentSelector;
    return x <= relativeX && relativeX <= (x + w)
      && y <= relativeY && relativeY <= (y + h);
  }

  curationsAtPoint(canvas, point) {
    const { curationItems } = this.props;
    const curations = Object.values(curationItems)
      .flat().filter((curation) => {
        if (canvas.id !== curation.canvasId) {
          return false;
        }
        return this.isCurationAtPoint(curation, canvas, point);
      });
    return curations;
  }

  curationsToContext(curationItems, palette) {
    const {
      visible,
      hoveredCurationIds,
      selectedCurationIds,
      canvasWorld,
      viewer,
    } = this.props;
    const context = this.osdCanvasOverlay.context2d;
    const zoomRatio = viewer.viewport.getZoom(true)
      / viewer.viewport.getMaxZoom();
    Object.values(curationItems)
      .forEach((items) => items.forEach((curation) => {
        if (!canvasWorld.canvasIds.includes(curation.canvasId)) {
          return;
        }
        const offset = canvasWorld.offsetByCanvas(curation.canvasId);
        const canvasCurationDisplay = new CanvasAnnotationDisplay({
          hovered: hoveredCurationIds.includes(curation.id),
          offset,
          palette: {
            ...palette,
            default: {
              ...palette.default,
              ...(!visible && palette.hidden),
            },
          },
          resource: curation,
          selected: selectedCurationIds.includes(curation.id),
          zoomRatio,
        });
        canvasCurationDisplay.toContext(context);
      }));
  }

  renderCurations() {
    const {
      curationItems,
      palette,
    } = this.props;

    this.curationsToContext(curationItems, palette);
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
  visible: PropTypes.bool.isRequired,
  canvasWorld: PropTypes.instanceOf(CanvasWorld).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  curationItems: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object))
    .isRequired,
  totalSize: PropTypes.number.isRequired,
  hoveredCurationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCurationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  palette: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  viewer: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  hoverCurations: PropTypes.func.isRequired,
};

CurationsOverlay.defaultProps = {
  viewer: null,
};

export default CurationsOverlay;
