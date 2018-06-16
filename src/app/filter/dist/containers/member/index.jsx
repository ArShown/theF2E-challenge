import React from 'react';
import handler from './handler';
import Typography from '@material-ui/core/Typography';

export default handler(({ storeData }) =>
  <Typography variant="title">
    {storeData}
  </Typography>
);
