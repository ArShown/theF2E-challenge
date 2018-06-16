import React from 'react';
import handler from './handler';
import Chip from '@material-ui/core/Chip';
import { map, addIndex } from 'ramda';

export default handler(({ tags, clickHandler }) =>
  <div styleName="tag-set">
    {addIndex(map)((tag, idx) =>
      <Chip key={`tag-${idx}`} label={tag} styleName="tag-item" onClick={clickHandler(tag)}/>
    )(tags)}
  </div>
);
