import React from 'react';
import translations from '../translations';

function CurationsButton() {
  return (
    <span>C</span>
  );
}
CurationsButton.value = 'curations';

export default {
  target: 'WindowSideBarButtons',
  component: CurationsButton,
  mode: 'add',
  config: {
    translations,
  },
};
