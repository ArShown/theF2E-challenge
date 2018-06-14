import React from 'react';
import handler from './handler';

export default handler(({ active, setActive, hoverActive, hoverEvent }) =>
  <div
    styleName="nav"
    data-active={hoverActive}
    onMouseOut={hoverEvent(active)}>
    <div
      styleName={`nav-item${active === 'todo' ? ' active' : ''}`}
      onClick={setActive('todo')}
      onMouseOver={hoverEvent('todo')}>
      My Tasks
    </div>
    <div
      styleName={`nav-item${active === 'progress' ? ' active' : ''}`}
      onClick={setActive('progress')}
      onMouseOver={hoverEvent('progress')}>
      In Progress
    </div>
    <div
      styleName={`nav-item${active === 'completed' ? ' active' : ''}`}
      onClick={setActive('completed')}
      onMouseOver={hoverEvent('completed')}>
      Completed
    </div>
  </div>
);
