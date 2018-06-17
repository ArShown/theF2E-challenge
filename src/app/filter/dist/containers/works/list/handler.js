import { compose, withStore, withStyle } from '~/core/container/index';
import { withStateHandlers, withPropsOnChange } from 'recompose';
import { STORE_KEY as WORK_STORE_KEY } from '~/storage/reducer/work';
import { slice, sort } from 'ramda';
import list from './list.scss';

export default compose(
  withStateHandlers(
    {
      originData: [],
      data: [],
      rowsPerPage: 10,
      page: 0
    },
    {
      setData: ({ rowsPerPage }) => {
        const sortFn = (a, b) => b.stage === a.stage ? b.timeStamp - a.timeStamp : b.stage - a.stage;
        return data => ({
          originData: sort(sortFn, data),
          data: slice(0, rowsPerPage, sort(sortFn, data)),
          rowsPerPage,
          page: 0
        });
      },
      handleChangePage: ({ originData, rowsPerPage }) => (event, page) => ({
        data: slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage, originData),
        page
      }),
      handleChangeRowsPerPage: ({ originData }) => event => ({
        data: slice(0, event.target.value, originData),
        rowsPerPage: event.target.value,
        page: 0
      })
    }
  ),
  withStore(`${WORK_STORE_KEY}.filter`),
  withPropsOnChange(['storeData'], ({ setData, storeData }) => {
    setData(storeData);
  }),
  withStyle(list)
);
