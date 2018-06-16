import React from 'react';
import handler from './handler';
import Typography from '@material-ui/core/Typography';
import Result from './result';
import Tags from './tags';
import List from './list';

export default handler(() => <div>
  <Typography variant="headline" gutterBottom>
    Showing <Result/> results by…
  </Typography>

  {/* tags */}
  <Tags/>

  {/* project */}
  <List />

</div>);
