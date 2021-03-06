import { compose, withDispatch, withStyle } from '~/core/container/index';
import { withHandlers } from 'recompose';
import { emit } from '~/core/action/effects';

/* action type */
import { FILTER_APPEND_TAG } from '~/storage/epic/condition';

/* style */
import tags from './tags.scss';

export default compose(
  withDispatch,
  withHandlers({
    clickHandler: ({ dispatch }) => (value) => () => {
      dispatch(emit(FILTER_APPEND_TAG, value));
    }
  }),
  withStyle(tags)
);
