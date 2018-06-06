import React from 'react';
import handler from './handler';
import Nav from '../nav';

export default handler(({ active, setActive }) =>
  <div>
    <div styleName="header">
      <div styleName="container">
        <Nav active={active} setActive={setActive}/>
      </div>
    </div>
    <div>
      <div styleName="container">index</div>
    </div>
  </div>
);
