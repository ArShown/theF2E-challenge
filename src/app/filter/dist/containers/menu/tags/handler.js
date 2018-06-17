import { compose, withDispatch, withStyle, withStore } from '~/core/container/index';
import { lifecycle, withHandlers } from 'recompose';
import { emit } from '~/core/action/effects';
import { STORE_KEY as TAG_STORE_KEY } from '~/storage/reducer/tag';

/* action type */
import { FETCH_LIST } from '~/storage/epic/tag';
import { FILTER_APPEND_TAG } from '~/storage/epic/condition';

/* style */
import tags from './tags.scss';

export default compose(
  withDispatch,
  lifecycle({
    componentDidMount() {
      this.props.dispatch(emit(FETCH_LIST));
    }
  }),
  withHandlers({
    clickHandler: ({ dispatch }) => (value) => () => {
      dispatch(emit(FILTER_APPEND_TAG, value));
    }
  }),
  withStore(TAG_STORE_KEY),
  withStyle(tags)
);
