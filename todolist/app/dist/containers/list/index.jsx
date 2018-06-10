import React from 'react';
import handler from './handler';
import Modify from '../modify';
import { map } from 'ramda';

export default handler(({ isDisabled, storeData }) =>
  <div styleName="list">
    {map(
      item =>
        <div styleName={`list-item ${isDisabled(item.completed) ? '' : 'hidden'}`} key={item.id}>
          <Modify data={item}/>
        </div>,
      storeData
    )}
  </div>
);
