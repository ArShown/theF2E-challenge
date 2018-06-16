import { compose, withDispatch, withStore } from '../../core/container/index';
import { lifecycle } from 'recompose';
import { emit } from '../../core/action/effects';
import { STORE_KEY as MEMBER_STORE_KEY } from '../../storage/reducer/member';
import { FETCH_DATA } from '../../storage/epic/member';

export default compose(
  withDispatch,
  lifecycle({
    componentDidMount() {
      this.props.dispatch(emit(FETCH_DATA));
    }
  }),
  withStore(MEMBER_STORE_KEY),
);
