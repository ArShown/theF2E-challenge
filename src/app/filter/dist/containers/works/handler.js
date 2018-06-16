import { compose, withDispatch } from '../../core/container/index';
import { lifecycle } from 'recompose';
import { emit } from '../../core/action/effects';
import { FETCH_LIST } from '../../storage/epic/work';

export default compose(
  withDispatch,
  lifecycle({
    componentDidMount() {
      this.props.dispatch(emit(FETCH_LIST));
    }
  })
);
