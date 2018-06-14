import { STORE_KEY } from '~/storage/reducer';
import { compose, withStyle, withStore } from '~/core/container';
import { withHandlers, mapProps } from 'recompose';
/* helper */
import { sortWith, ascend, descend, prop } from 'ramda';

/* style */
import list from './list.scss';

export default compose(
  withHandlers({
    isDisabled: ({ active }) => completed => {
      switch (active) {
        case 'completed':
          return completed;
        case 'progress':
          return !completed;
        default:
          return true;
      }
    }
  }),
  withStore(`${STORE_KEY}.data`),
  mapProps(({ storeData, isDisabled }) => ({
    tasks: sortWith([
        descend(prop('important')),
        ascend(prop('order'))
      ], storeData
    ),
    isDisabled
  })),
  withStyle(list)
);
