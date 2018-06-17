import React from 'react';
import handler from './handler';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { times } from 'ramda';

export default handler(({ email, changeHandler, keyPressHandler, clearEmail }) =>
  <Input
    type="text"
    value={email}
    onChange={changeHandler}
    onKeyPress={keyPressHandler}
    placeholder="Email"
    fullWidth
    endAdornment={
      email ? <InputAdornment position="end">
        <IconButton onClick={clearEmail}><Icon>close</Icon></IconButton>
      </InputAdornment> : null
    }
  />
);