import { compose, withStyle } from '~/core/container';
import { withHandlers, withStateHandlers } from 'recompose';
import modifyForm from './modify-form.scss';

export default compose(
  withHandlers({
    onChangeHandler: ({ setField }) => (field) => (e) => {
      setField(field, e.target.value);
    },
    changeDate: ({ setField, data: { deadline: { time } } }) => (e) => {
      setField('deadline', {
        date: e.target.value,
        time
      });
    },
    changeTime: ({ setField, data: { deadline: { date } } }) => (e) => {
      setField('deadline', {
        date,
        time: e.target.value
      });
    },
    changeFile: ({ setField }) => (e) => {
      setField('file', e.target.files[0].name);
    }
  }),
  withStyle(modifyForm)
);
