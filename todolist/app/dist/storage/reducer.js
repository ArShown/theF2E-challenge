import { reducerCreator } from '~/core/reducer';
import Task from './schema';
import { append, findIndex, propEq, update, merge, remove } from 'ramda';

export const STORE_KEY = 'task';

/* action type */
export const TASK_INSERT = 'TASK_INSERT';
export const TASK_UPDATE = 'TASK_UPDATE';
export const TASK_DELETE = 'TASK_DELETE';

/* store */
const defaultStore = [];

const reducer = reducerCreator(defaultStore, {
  [TASK_INSERT]: (preStore, payload) => append(merge(new Task(), payload), preStore),
  [TASK_UPDATE]: (preStore, payload) => {
    const { id, ...fields } = payload;
    const taskIdx = findIndex(propEq('id', id))(preStore);
    return update(taskIdx, merge(preStore[taskIdx], fields), preStore);
  },
  [TASK_DELETE]: (preStore, payload) => {
    const { id } = payload;
    const taskIdx = findIndex(propEq('id', id))(preStore);
    return remove(taskIdx, 1, preStore);
  }
});

export default {
  [STORE_KEY]: reducer
};