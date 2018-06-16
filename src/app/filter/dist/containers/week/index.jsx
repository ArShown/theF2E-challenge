import React from 'react';
import handler from './handler';
import NativeSelect from '@material-ui/core/NativeSelect';
import { times } from 'ramda';

export default handler(({ storeData: stage, changeHandler }) =>
  <NativeSelect
    style={{ width: '100%' }}
    value={stage}
    onChange={changeHandler}>
    <option value="all">全部</option>
    {times(idx => <option key={`stage-${idx + 1}`} value={idx + 1}>{idx + 1}</option>, 9)}
  </NativeSelect>
);
