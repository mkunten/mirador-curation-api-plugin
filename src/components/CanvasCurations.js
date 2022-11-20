import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import { ScrollTo } from 'mirador/dist/es/src/components/ScrollTo';

export class CanvasCurations extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleCurationHover = this.handleCurationHover.bind(this);
    this.handleCurationBlur = this.handleCurationBlur.bind(this);
  }

  handleClick(event, curation) {
    const { updateViewerCanvas } = this.props;
    if (curation.index && curation.index >= 1) {
      updateViewerCanvas(curation.canvasId);
    }
  }

  handleCurationHover(curation) {
    const { hoverCuration } = this.props;
    hoverCuration([curation.id]);
  }

  handleCurationBlur() {
    const { hoverCuration } = this.props;
    hoverCuration([]);
  }

  render() {
    const {
      totalSize,
      curationItems,
      visibleCanvasIds,
      containerRef,
      selectedIndex,
      listContainerComponent,
      classes,
      htmlSanitizationRuleSet,
      makeLabel,
    } = this.props;
    if (totalSize === 0) {
      return null;
    }

    return (
      <MenuList autoFocusItem variant="selectedMenu">
        {
            curationItems.map((curation) => (
              <ScrollTo
                containerRef={containerRef}
                key={`${curation.id}-scroll`}
                offsetTop={96} // offset for the height of the form above
                scrollTo={selectedIndex === curation.id}
              >
                <MenuItem
                  button
                  component={listContainerComponent}
                  key={curation.id}
                  className={
                    visibleCanvasIds
                      .includes(curation.canvasId)
                      ? classes.menuItemOnCanvas
                      : classes.menuItem
                  }
                  curationid={curation.id}
                  selected={selectedIndex === curation.id}
                  onClick={(e) => this.handleClick(e, curation)}
                  onMouseEnter={() => this.handleCurationHover(curation)}
                  onMouseLeave={this.handleCurationBlur}
                >
                  <div style={{ minWidth: 50 }}>
                    <img
                      alt="presentation"
                      src={`${curation.serviceId}/${curation.region}/60,/0/default.jpg`}
                      className={classes.image}
                    />
                  </div>
                  <div className={classes.label}>
                    <SanitizedHtml
                      ruleSet={htmlSanitizationRuleSet}
                      htmlString={makeLabel(curation)}
                    />
                  </div>
                </MenuItem>
              </ScrollTo>
            ))
          }
      </MenuList>
    );
  }
}

CanvasCurations.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  curationItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  visibleCanvasIds: PropTypes.arrayOf(PropTypes.string)
    .isRequired,
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
  windowId: PropTypes.string.isRequired,
};

CanvasCurations.defaultProps = {
  selectedIndex: 0,
  classes: {},
  htmlSanitizationRuleSet: 'liberal',
  listContainerComponent: 'li',
};

export default CanvasCurations;
