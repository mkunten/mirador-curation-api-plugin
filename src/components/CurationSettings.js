import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  Switch,
} from '@material-ui/core';

// eslint-disable-next-line react/prefer-stateless-function
export class CurationSettings extends Component {
  render() {
    const {
      displayAll, listAll,
      toggleCurationDisplay, toggleCurationListAll,
      t,
    } = this.props;

    return (
      <>
        <FormControlLabel
          control={(
            <Switch
              checked={displayAll}
              onChange={toggleCurationDisplay}
            />
          )}
          label={
            displayAll ? t('highlightCurations')
              : t('highlightNoCurations')
          }
          aria-label="highlight switch"
        />
        <FormControlLabel
          control={(
            <Switch
              checked={listAll}
              onChange={toggleCurationListAll}
            />
          )}
          label={
            listAll ? t('listAll')
              : t('listOnlyInManifest')
          }
          aria-label="listing switch"
        />
      </>
    );
  }
}

CurationSettings.propTypes = {
  displayAll: PropTypes.bool.isRequired,
  listAll: PropTypes.bool.isRequired,
  toggleCurationDisplay: PropTypes.func.isRequired,
  toggleCurationListAll: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  windowId: PropTypes.string.isRequired,
};

export default CurationSettings;
