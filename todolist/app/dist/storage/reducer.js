import { reducerCreator } from '~/core/reducer';
import Task from './schema';
import { append, findIndex, propEq, update, merge, remove, evolve, add } from 'ramda';

export const STORE_KEY = 'task';

/* action type */
export const TASK_INSERT = 'TASK_INSERT';
export const TASK_UPDATE = 'TASK_UPDATE';
export const TASK_DELETE = 'TASK_DELETE';

/* store */
const defaultStore = {
  increment: 0,
  data: [
    merge(new Task(), {
      content: '吃飯',
      order: 0,
      important: true,
      completed: true
    }),
    merge(new Task(), {
      content: '睡覺',
      order: 1,
      completed: true
    }),
    merge(new Task(), {
      content: '打東東',
      order: 2
    })
  ]
};

const reducer = reducerCreator(defaultStore, {
  [TASK_INSERT]: (preStore, payload) => evolve({
    increment: add(1),
    data: append(merge(new Task(), { order: preStore.increment + 1 }, payload))
  }, preStore),

  [TASK_UPDATE]: (preStore, payload) => {
    const { id, ...fields } = payload;
    const taskIdx = findIndex(propEq('id', id))(preStore.data);
    return evolve({
      data: update(taskIdx, merge(preStore.data[taskIdx], fields))
    }, preStore);
  },

  [TASK_DELETE]: (preStore, payload) => {
    const { id } = payload;
    const taskIdx = findIndex(propEq('id', id))(preStore.data);
    return evolve({
      data: remove(taskIdx, 1)
    }, preStore);
  }
});

export default {
  [STORE_KEY]: reducer
};
