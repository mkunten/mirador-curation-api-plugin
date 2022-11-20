import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';
import CanvasCurations from '../plugins/miradorCanvasCurationsPlugin';
import CurationSettings from '../plugins/miradorCurationSettingsPlugin';

export default class WindowSideBarCurationsPanel extends Component {
  constructor() {
    super();
    this.containerRef = React.createRef();
  }

  render() {
    const {
      curationIds, curationItems,
      visibleCanvasIds,
      classes, id, t, windowId,
    } = this.props;
    const totalSize = (curationItems ?? []).length;

    return (
      <CompanionWindow
        title={t('curations')}
        paperClassName={ns('window-sidebar-curation-panel')}
        windowId={windowId}
        id={id}
        ref={this.containerRef}
        otherRef={this.containerRef}
        titleControls={<CurationSettings windowId={windowId} />}
      >
        <div className={classes.section}>
          <Typography component="p" variant="subtitle2">
            {
              curationIds.map((curationId) => (
                <React.Fragment key={curationId}>
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
                    {curationId}
                  </a>
                  <br />
                </React.Fragment>
              ))
            }
            {
              totalSize === 0
                ? t('noCurations')
                : t('showingNumCurations', { number: totalSize })
            }
          </Typography>
        </div>
        <CanvasCurations
          curationItems={curationItems}
          visibleCanvasIds={visibleCanvasIds}
          containerRef={this.containerRef}
          key={id}
          totalSize={totalSize}
          windowId={windowId}
        />
      </CompanionWindow>
    );
  }
}

WindowSideBarCurationsPanel.propTypes = {
  curationIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  curationItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  visibleCanvasIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarCurationsPanel.defaultProps = {
  classes: {},
  t: (key) => key,
};
