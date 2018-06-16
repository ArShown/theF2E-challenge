import moment from 'moment';
import { reducerCreator } from '~/core/reducer';
import Work from '../schema/work';
import { map, merge, split, is } from 'ramda';

export const STORE_KEY = 'work';

/* action type */
export const WORK_INIT = 'WORK_INIT';
export const WORK_UPDATE = 'WORK_UPDATE';
export const WORK_RESTORE = 'WORK_RESTORE';

/* store */
const defaultStore = {
  origin: [],
  filter: []
};

const weekDateStart = [
  ,
  moment('2018-06-04 12:00:00').format('x'),
  moment('2018-06-11 12:00:00').format('x'),
  moment('2018-06-18 12:00:00').format('x'),
  moment('2018-06-25 12:00:00').format('x'),
  moment('2018-06-02 12:00:00').format('x'),
  moment('2018-06-09 12:00:00').format('x'),
  moment('2018-06-16 12:00:00').format('x'),
  moment('2018-06-23 12:00:00').format('x'),
  moment('2018-06-30 12:00:00').format('x'),
  moment('2018-07-07 12:00:00').format('x')
];

const checkWorkOnTime = (stage, timeStamp) => {
  const startDatetime = weekDateStart[stage];
  const endDatetime = weekDateStart[stage + 1];
  return timeStamp >= startDatetime && timeStamp < endDatetime;
};

const reducer = reducerCreator(defaultStore, {
  [WORK_INIT]: (preStore, payload) => {
    const data = map(
      ({ tag, ...others }) =>
        merge(new Work(), {
          tag: split(', ', tag),
          onTime: checkWorkOnTime(others.stage, others.timeStamp),
          ...others
        }),
      payload
    );
    return {
      origin: data,
      filter: data
    };
  },

  [WORK_UPDATE]: ({ origin }, payload) => ({
    origin,
    filter: map(
      data =>
        merge(new Work(), {
          onTime: checkWorkOnTime(data.stage, data.timeStamp),
          ...data
        }),
      payload
    )
  }),

  [WORK_RESTORE]: () => defaultStore
});

export default {
  [STORE_KEY]: reducer
};
