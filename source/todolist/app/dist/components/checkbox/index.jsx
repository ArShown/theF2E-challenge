import React from 'react';
import handler from './handler';

export default handler(({ modifyMode = false, isChecked = false }) =>
  <div styleName={`checkbox ${modifyMode ? 'modify-mode' : ''} ${isChecked ? 'checked' : ''}`}>
    <div styleName="checkbox-toggle">
      <i styleName="fa fa-check"/>
    </div>
    <div styleName="line first"/>
    <div styleName="line second"/>
    <div styleName="line third"/>
    <div styleName="line last"/>
  </div>
);
