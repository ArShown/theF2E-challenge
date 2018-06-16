import React from 'react';
import handler from './handler';
import TextField from '@material-ui/core/TextField';
import { times } from 'ramda';

export default handler(({ email, changeHandler, keyPressHandler }) =>
  <TextField
    label="Email"
    value={email}
    onChange={changeHandler}
    onKeyPress={keyPressHandler}
    margin="none"
    fullWidth
  />
);
