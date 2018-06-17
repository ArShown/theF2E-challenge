import React from 'react';
import moment from 'moment';
import handler from './handler';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import Tag from '../item-tags';
import { map, addIndex } from 'ramda';

export default handler(({ originData, data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) =>
  <div>
    <TablePagination
      component="div"
      count={originData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
    {addIndex(map)(({ url, stage, timeStamp, tag }, idx) =>
      <Card key={`work-${idx}`} styleName="list-item">
        <CardContent>
          <Typography variant="title" gutterBottom>
            [ 第 {stage} 週 ]
          </Typography>
          <Typography variant="subheading" gutterBottom>
            提交時間：{moment(timeStamp).format('YYYY-MM-DD HH:mm:ss')}
          </Typography>
          <Tag tags={tag}/>
          <br/>
          <Button variant="contained" href={url} target="_blank">查看作品</Button>
        </CardContent>
      </Card>
    )(data)}
    <TablePagination
      component="div"
      count={originData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  </div>
);
