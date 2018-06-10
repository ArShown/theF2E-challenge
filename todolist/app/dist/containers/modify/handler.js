/* type */
import { TASK_UPDATE } from '~/storage/reducer';

/* action */
import { emit } from '~/core/action/effects';

/* component */
import { compose, withStyle, withDispatch } from '~/core/container';
import {
  withStateHandlers,
  withHandlers,
  withProps,
  withPropsOnChange
} from 'recompose';
import { modifyManager, modifyEvent, submitValid } from '~/containers/add/handler';

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
  withHandlers(({ dispatch, updateOneField, updateAllField, data: { id } }) => ({
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
        }));
    },
    submit: ({
      completed,
      important,
      content,
      file,
      comment,
      deadline
    }) => {
      const submitStream = concat(
        of(dispatch(
          emit(TASK_UPDATE, {
            id,
            completed,
            important,
            content,
            file,
            comment,
            deadline
          })
        )),
        of(updateOneField('modifyMode', false))
      );

      return () => {
        if (content.trim() !== '')
          submitStream.subscribe();
        return false;
      };
    }
  })),
  submitValid,
  withStyle(modify)
);