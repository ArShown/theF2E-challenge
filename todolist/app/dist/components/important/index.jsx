import React from 'react';
import handler from './handler';

export default handler(({ isChecked = false }) =>
  <div styleName={`important fa fa-star${isChecked ? ' checked' : '-o'}`}/>
);
