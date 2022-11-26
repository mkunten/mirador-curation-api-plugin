import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import Typography from '@material-ui/core/Typography';
import debounce from 'lodash/debounce';

export class CurationTooltipsOverlay extends Component {
  constructor(props) {
    super(props);
    this.onCanvasMouseMove = debounce(this.onCanvasMouseMove
      .bind(this), 10);
    this.onCanvasExit = this.onCanvasExit.bind(this);
    this.initialized = false;
    this.state = { x: 0, y: 0 };
  }

  componentDidMount() {
    this.initializeViewer();
  }

  componentDidUpdate() {
    this.initializeViewer();
  }

  componentWillUnmount() {
    const { viewer } = this.props;
    if (viewer) {
      viewer.removeHandler('canvas-exit', this.onCanvasExit);
      viewer.removeHandler('mouse-move', this.onCanvasMouseMove);
    }
  }

  onCanvasExit() {
    this.onCanvasMouseMove.cancel();
    this.setState({ x: 0, y: 0 });
  }

  onCanvasMouseMove(event) {
    const { totalSize } = this.props;
    if (totalSize === 0) {
      return;
    }
    this.setState(event.position);
  }

  initializeViewer() {
    const { viewer } = this.props;
    if (!viewer || this.initialized) {
      return;
    }
    this.initialized = true;
    viewer.addHandler('canvas-exit', this.onCanvasExit);
    viewer.addHandler('mouse-move', this.onCanvasMouseMove);
  }

  render() {
    const {
      curationItems, totalSize, hoveredCurationIds,
      classes, htmlSanitizationRuleSet,
      makeLabel, viewer,
    } = this.props;
    if (!viewer || totalSize === 0
      || hoveredCurationIds.length === 0) {
      return null;
    }

    const { x, y } = this.state;
    if (!(x > 0 && y > 0)) {
      return null;
    }

    const xoffset = 10;
    const yoffset = 10;
    const top = y + yoffset;
    const left = x + xoffset;
    return ReactDOM.createPortal(
      (
        <Typography
          component="div"
          style={{ top, left }}
          className={`${classes.curations}`}
        >
          {
            Object.values(curationItems).map((items) => items.map(
              (curation) => {
                if (hoveredCurationIds.includes(curation.id)) {
                  return (
                    <div
                      className={`${classes.curation}`}
                      key={curation.id}
                    >
                      <SanitizedHtml
                        ruleSet={htmlSanitizationRuleSet}
                        htmlString={makeLabel(curation)}
                      />
                    </div>
                  );
                }
                return null;
              },
            ))
          }
        </Typography>
      ),
      viewer.canvas,
    );
  }
}

CurationTooltipsOverlay.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  curationItems: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object))
    .isRequired,
  totalSize: PropTypes.number.isRequired,
  hoveredCurationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.shape({
    curations: PropTypes.string,
    curation: PropTypes.string,
  }),
  htmlSanitizationRuleSet: PropTypes.string,
  makeLabel: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  viewer: PropTypes.object,
};

CurationTooltipsOverlay.defaultProps = {
  classes: {},
  htmlSanitizationRuleSet: 'liberal',
  viewer: null,
};

export default CurationTooltipsOverlay;
