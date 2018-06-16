import React from 'react';
import handler from './handler';
import Chip from '@material-ui/core/Chip';
import { map, addIndex } from 'ramda';

export default handler(({ storeData, clickHandler }) =>
  <div styleName="tag-set">
    {addIndex(map)((tag, idx) =>
      <Chip key={`tag-${idx}`} label={tag} styleName="tag-item" onDelete={clickHandler(tag)}/>
    )(storeData)}
  </div>
);
