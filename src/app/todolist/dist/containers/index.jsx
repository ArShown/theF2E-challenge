import React from 'react';
import handler from './handler';
import List from './list';
import Nav from './nav';
import Add from './add';
import Count from './count';

export default handler(({ active, setActive }) =>
  <div>
    <div styleName="header">
      <div styleName="container">
        <Nav active={active} setActive={setActive}/>
      </div>
    </div>
    <div styleName="container">
      <div styleName="add-area">
        <Add/>
      </div>
      <div styleName="task-list">
        {/* 任務列表 */}
        <List active={active}/>
        {/* 總數 */}
        <Count active={active}/>
      </div>
    </div>
  </div>
);
