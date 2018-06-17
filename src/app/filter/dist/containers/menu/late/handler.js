import { compose, withDispatch, withStore } from '~/core/container/index';
import { withHandlers } from 'recompose';
import { emit } from '~/core/action/effects';
import { FILTER_WITH_ON_TIME } from '~/storage/epic/condition';
import { STORE_KEY } from '~/storage/reducer/condition';

export default compose(
  withDispatch,
  withHandlers({
    changeHandler: ({ dispatch }) => (checked) => () => {
      dispatch(emit(FILTER_WITH_ON_TIME, !checked));
    }
  }),
  withStore(`${STORE_KEY}.isOnTime`)
);
