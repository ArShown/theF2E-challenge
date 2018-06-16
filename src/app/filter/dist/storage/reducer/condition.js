import { reducerCreator } from '~/core/reducer';
import Condition from '../schema/condition';
import { assoc, contains, append, remove, findIndex,equals } from 'ramda';

export const STORE_KEY = 'condition';

/* action type */
export const APPEND_TAGS = 'CONDITION_APPEND_TAGS';
export const REMOVE_TAGS = 'CONDITION_REMOVE_TAGS';
export const SET_EMAIL = 'CONDITION_SET_EMAIL';
export const SET_STAGE = 'CONDITION_SET_STAGE';
export const SET_IS_ON_TIME = 'CONDITION_SET_IS_ON_TIME';

/* store */
const defaultStore = new Condition();

const reducer = reducerCreator(defaultStore, {
  [APPEND_TAGS]: (preState, payload) => {
    const { tags } = preState;
    if (contains(payload, tags))
      return preState;
    return assoc('tags', append(payload, tags), preState);
  },
  [REMOVE_TAGS]: (preState, payload) => {
    const { tags } = preState;
    const idx = findIndex(equals(payload), tags);
    if (idx === -1)
      return preState;
    return assoc('tags', remove(idx, 1, tags), preState);
  },
  [SET_EMAIL]: (preState, payload) => assoc('email', payload, preState),
  [SET_STAGE]: (preState, payload) => assoc('stage', payload, preState),
  [SET_IS_ON_TIME]: (preState, payload) => assoc('isOnTime', payload, preState)
});

export default {
  [STORE_KEY]: reducer
};
