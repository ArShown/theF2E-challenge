import { reducerCreator } from '~/core/reducer';

export const STORE_KEY = 'tags';

/* action type */
export const TAG_INSERT = 'TAG_INSERT';
export const TAG_RESTORE = 'TAG_RESTORE';

/* store */
const defaultStore = [];

const reducer = reducerCreator(defaultStore, {
  [TAG_INSERT]: (_, payload) => payload,

  [TAG_RESTORE]: () => defaultStore
});

export default {
  [STORE_KEY]: reducer
};
