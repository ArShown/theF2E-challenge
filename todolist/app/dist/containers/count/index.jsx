import React from 'react';
import handler from './handler';

export default handler(({ active,count }) => <div styleName="status">
  {`${count} task${count > 1 ? 's' :''} ${active === 'completed' ? 'completed' : 'left'}`}
</div>)