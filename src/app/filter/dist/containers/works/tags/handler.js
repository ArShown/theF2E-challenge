import { compose, withDispatch, withStyle, withStore } from '~/core/container/index';
import { withHandlers } from 'recompose';
import { emit } from '~/core/action/effects';
import { STORE_KEY as TAG_STORE_KEY } from '~/storage/reducer/condition';

/* action type */
import { FILTER_REMOVE_TAG } from '~/storage/epic/condition';

/* style */
import tags from './tags.scss';

export default compose(
  withDispatch,
  withHandlers({
    clickHandler: ({ dispatch }) => (value) => () => {
      dispatch(emit(FILTER_REMOVE_TAG, value));
    }
  }),
  withStore(`${TAG_STORE_KEY}.tags`),
  withStyle(tags)
);
