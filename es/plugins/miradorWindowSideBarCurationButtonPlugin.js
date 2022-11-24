import React from 'react';
import translations from '../translations';
function CurationsButton() {
  return /*#__PURE__*/React.createElement("span", null, "C");
}
CurationsButton.value = 'curations';
export default {
  target: 'WindowSideBarButtons',
  component: CurationsButton,
  mode: 'add',
  config: {
    translations: translations
  }
};