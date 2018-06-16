import { reducerCreator } from '~/core/reducer';

export const STORE_KEY = 'member';

/* action type */
export const MEMBER_UPDATE = 'MEMBER_UPDATE';

/* store */
const defaultStore = 0;

const reducer = reducerCreator(defaultStore, {
  [MEMBER_UPDATE]: (_, payload) => payload,
});

export default {
  [STORE_KEY]: reducer
};
