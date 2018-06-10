import { compose, withStyle } from '~/core/container';
import { withHandlers } from 'recompose';
import modifyForm from './modify-form.scss';

export default compose(
  withHandlers({
    onChangeHandler: ({ setField }) => (field) => (e) => {
      setField(field, e.target.value);
    }
  }),
  withStyle(modifyForm)
);
