import moment from 'moment';

/* type */
import { TASK_UPDATE } from '~/storage/reducer';

/* action */
import { emit } from '~/core/action/effects';

/* component */
import { compose, withStyle, withDispatch } from '~/core/container';
import { withHandlers, withProps, withPropsOnChange } from 'recompose';
import {
  modifyManager,
  modifyEvent,
  submitValid
} from '~/containers/add/handler';

/* helper */
import { of, concat } from 'rxjs';

/* style */
import modify from './modify.scss';

export default compose(
  withDispatch,
  modifyManager,
  modifyEvent,
  withPropsOnChange(['data'], ({ updateAllField, data }) => {
    updateAllField(data);
    return {};
  }),
  withHandlers(
    ({ dispatch, updateOneField, updateAllField, data: { id } }) => ({
      triggerHandler: ({ modifyMode }) => e => {
        if (modifyMode) return false;
        updateOneField('modifyMode', true);
      },
      cancel: ({ data }) => () => {
        updateAllField({ modifyMode: false, ...data });
      },
      toggleField: () => (field, value) => () => {
        dispatch(
          emit(TASK_UPDATE, {
            id,
            [field]: !value
          })
        );
      },
      submit: ({
        completed,
        important,
        content,
        file,
        comment,
        deadline: { date, time }
      }) => {
        /* moment obj */
        const dateMoment = moment(date, 'YYYY/MM/DD');
        const timeMoment = moment(time, 'HH:mm');

        /* 寫入 deadline 格式 */
        const deadline = {
          date: dateMoment.isValid() ? dateMoment.format('YYYY/MM/DD') : '',
          time: timeMoment.isValid() ? timeMoment.format('HH:mm') : ''
        };

        /* 判斷是不是只有輸入時間，是的話日期填今天*/
        if (deadline.date === '') deadline.date = moment().format('YYYY/MM/DD');

        const submitStream = concat(
          of(() =>
            dispatch(
              emit(TASK_UPDATE, {
                id,
                completed,
                important,
                content,
                file,
                comment,
                deadline
              })
            )
          ),
          of(() => updateOneField('modifyMode', false))
        );

        return () => {
          if (content.trim() !== '') submitStream.subscribe(stream => stream());
          return false;
        };
      }
    })
  ),
  submitValid,
  withProps(({ data, data: { deadline: { date, time }, comment, file } }) => ({
    isMultipleLine: data
      ? date.trim() !== '' ||
      time.trim() !== '' ||
      file.trim() !== '' ||
      comment.trim() !== ''
      : false,
    isLate: date !== '' ? moment().isAfter(`${date}${time !== '' ? ` ${time}` : ''}`) : false
  })),
  withStyle(modify)
);