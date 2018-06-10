import { STORE_KEY } from '~/storage/reducer';
import { compose, withStyle, withStore } from '~/core/container';
import { withHandlers } from 'recompose';
import list from './list.scss';

export default compose(
  withHandlers({
    isDisabled : ({active}) => completed => {
      switch (active){
        case 'completed':
          return completed;
        case 'progress':
          return !completed;
        default:
          return true;
      }
    }
  }),
  withStore(STORE_KEY),
  withStyle(list)
);
