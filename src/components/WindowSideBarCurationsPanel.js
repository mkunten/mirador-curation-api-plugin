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

export default class WindowSideBarCurationsPanel extends Component {
  constructor() {
    super();
    this.state = { dialog: false };
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.containerRef = React.createRef();
  }

  handleDialogClick(event) {
    const obj = { dialog: true };
    this.setState(obj);
    event.preventDefault();
    event.stopPropagation();
  }

  handleDialogClose() {
    return () => {
      const obj = { dialog: false };
      this.setState(obj);
    };
  }

  render() {
    const {
      curations, curationIds, curationItems, totalSize,
      visibleCanvasIds,
      classes, id, t, windowId,
      containerId,
      toggleCurationItemsVisible,
    } = this.props;
    const container = document
      .querySelector(`#${containerId} .${ns('viewer')}`);
    const { containerRef } = this;
    const { dialog } = this.state;

    return (
      <CompanionWindow
        title={t('curations')}
        paperClassName={ns('window-sidebar-curation-panel')}
        windowId={windowId}
        id={id}
        ref={containerRef}
        otherRef={containerRef}
        titleControls={<CurationSettings windowId={windowId} />}
      >
        <div>
          <Typography component="div" variant="subtitle2">
            <Accordion square>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
                className={classes.accordionSummary}
              >
                <IconButton
                  size="small"
                  aria-label={t('curationResourceImport')}
                  title={t('curationResourceImport')}
                  onClick={this.handleDialogClick}
                >
                  <AddToQueueIcon />
                </IconButton>
                <span className={classes.center}>
                  {
                    totalSize === 0
                      ? t('noCurations')
                      : t('showingNumCurations', { number: totalSize })
                  }
                </span>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                {
                  curationIds.map((curationId) => (
                    <div key={curationId}>
                      <FormControlLabel
                        control={(
                          <>
                            <Switch
                              checked={curations[curationId].visible}
                              onChange={() => toggleCurationItemsVisible(curationId)}
                            />
                            <a
                              href={curationId}
                              title={curationId}
                              target="_blank"
                              aria-label={t('linkToExternalCuration')}
                              className={classes.curationIdLink}
                              rel="noreferrer"
                            >
                              <IconButton size="small">
                                <OpenInNewIcon />
                              </IconButton>
                              {' '}
                              {curations[curationId].label ?? curationId}
                            </a>
                          </>
                        )}
                        aria-label={t('toggleCurationItemsVisible')}
                      />
                    </div>
                  ))
                }
              </AccordionDetails>
            </Accordion>
          </Typography>
        </div>
        <CanvasCurations
          curationItems={curationItems}
          visibleCanvasIds={visibleCanvasIds}
          containerRef={containerRef}
          key={id}
          totalSize={totalSize}
          windowId={windowId}
        />
        {
          Boolean(dialog) && (
            <CurationResourceImport
              open={Boolean(dialog)}
              container={container}
              handleClose={this.handleDialogClose()}
            />
          )
        }
      </CompanionWindow>
    );
  }
}

WindowSideBarCurationsPanel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  curations: PropTypes.object.isRequired,
  curationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  curationItems: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object))
    .isRequired,
  totalSize: PropTypes.number.isRequired,
  visibleCanvasIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
  containerId: PropTypes.string.isRequired,
  toggleCurationItemsVisible: PropTypes.func.isRequired,
};

WindowSideBarCurationsPanel.defaultProps = {
  classes: {},
  t: (key) => key,
};
