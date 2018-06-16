import { compose, withDispatch, withStore } from '../../core/container/index';
import { withStateHandlers, withHandlers } from 'recompose';
import { emit } from '../../core/action/effects';
import { FILTER_WITH_EMAIL } from '../../storage/epic/condition';

export default compose(withDispatch, withStateHandlers({
  email: ''
}, {
  setEmail: () => (email) => ({
    email
  })
}), withHandlers({
  changeHandler: ({ setEmail }) => (event) => {
    setEmail(event.target.value);
  },
  keyPressHandler: ({ dispatch, email }) => (e) => {
    if (e.charCode === 13)
      dispatch(emit(FILTER_WITH_EMAIL, email));
  }
}));