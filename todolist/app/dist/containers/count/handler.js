import { STORE_KEY } from '~/storage/reducer';
import { compose, withStyle, withStore } from '~/core/container';
import { withProps } from 'recompose';
import { filter } from 'ramda';

export default compose(
  withStore(`${STORE_KEY}.data`),
  withProps(({ active, storeData: tasks }) => ({
    count: filter(item => (active === 'completed' ? item.completed : !item.completed), tasks).length
  })),
  withStyle()
);
