import { compose, withDispatch, withStore } from '../../core/container/index';
import { withHandlers } from 'recompose';
import { emit } from '../../core/action/effects';
import { FILTER_WITH_STAGE } from '../../storage/epic/condition';
import { STORE_KEY } from '../../storage/reducer/condition';

export default compose(
  withDispatch,
  withHandlers({
    changeHandler: ({ dispatch }) => (event) => {
      dispatch(emit(FILTER_WITH_STAGE, event.target.value === 'all' ? '' : +event.target.value));
    }
  }),
  withStore(`${STORE_KEY}.stage`)
);
