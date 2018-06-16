/* action type */
import {
  APPEND_TAGS,
  REMOVE_TAGS,
  SET_EMAIL,
  SET_STAGE,
  SET_IS_ON_TIME
} from '../reducer/condition';
import { FILTER_UPDATE, FETCH_LIST, FETCH_LIST_BY_EMAIL } from './work';

/* store key */
import { STORE_KEY as WORK_STORE_KEY } from '../reducer/work';
import { STORE_KEY as CONDITION_STORE_KEY } from '../reducer/condition';

/* action */
import { emit } from '~/core/action/effects';

/* helper */
import { empty } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { filter, difference, allPass, findIndex, equals } from 'ramda';

/* epic type */
export const FILTER_APPEND_TAG = 'CONDITION_FILTER_APPEND_TAG';
export const FILTER_REMOVE_TAG = 'CONDITION_FILTER_REMOVE_TAG';
export const FILTER_WITH_STAGE = 'CONDITION_FILTER_WITH_STAGE';
export const FILTER_WITH_ON_TIME = 'CONDITION_FILTER_WITH_ON_TIME';
export const FILTER_WITH_EMAIL = 'FILTER_WITH_EMAIL';
export const FILTER_WITH_CONDITION = 'CONDITION_FILTER_WITH_CONDITION';

export const filterAppendTags = (action$, store$) =>
  action$.ofType(FILTER_APPEND_TAG).pipe(
    map(action => {
      const email = store$.value[CONDITION_STORE_KEY]['email'];
      const tags = store$.value[CONDITION_STORE_KEY]['tags'];
      const stage = store$.value[CONDITION_STORE_KEY]['stage'];
      if (tags.length > 0)
        return [emit(APPEND_TAGS, action.payload), emit(FILTER_WITH_CONDITION)];

      let query = { tag: action.payload };
      if (stage !== '') query.stage = stage;

      return email
        ? [emit(APPEND_TAGS, action.payload), emit(FILTER_WITH_CONDITION)]
        : [
          emit(APPEND_TAGS, action.payload),
          emit(FETCH_LIST, { query }),
          emit(FILTER_WITH_CONDITION)
        ];
    })
  );

export const filterRemoveTags = (action$, store$) =>
  action$.ofType(FILTER_REMOVE_TAG).pipe(
    map(action => {
      const email = store$.value[CONDITION_STORE_KEY]['email'];
      const tags = store$.value[CONDITION_STORE_KEY]['tags'];
      const stage = store$.value[CONDITION_STORE_KEY]['stage'];

      const idx = findIndex(equals(action.payload), tags);
      if (idx > 0) {
        return [emit(REMOVE_TAGS, action.payload), emit(FILTER_WITH_CONDITION)];
      } else {
        let query = {};
        if (tags.length > 1) query.tag = tags[1];
        if (stage !== '') query.stage = stage;

        return email
          ? [emit(REMOVE_TAGS, action.payload), emit(FILTER_WITH_CONDITION)]
          : [
            emit(REMOVE_TAGS, action.payload),
            emit(FETCH_LIST, { query }),
            emit(FILTER_WITH_CONDITION)
          ];
      }
    })
  );

export const filterWithStage = (action$, store$) =>
  action$.ofType(FILTER_WITH_STAGE).pipe(
    map(action => {
      const email = store$.value[CONDITION_STORE_KEY]['email'];
      const tags = store$.value[CONDITION_STORE_KEY]['tags'];
      let query = { stage: action.payload };
      if (tags.length > 0) query.tag = tags[0];

      return email
        ? [emit(SET_STAGE, action.payload), emit(FILTER_WITH_CONDITION)]
        : [
          emit(SET_STAGE, action.payload),
          emit(FETCH_LIST, { query }),
          emit(FILTER_WITH_CONDITION)
        ];
    })
  );

export const filterWithOnTime = action$ =>
  action$.ofType(FILTER_WITH_ON_TIME).pipe(
    map(action => [
      emit(SET_IS_ON_TIME, action.payload),
      emit(FILTER_WITH_CONDITION)
    ])
  );

export const filterWithEmail = action$ =>
  action$.ofType(FILTER_WITH_EMAIL).pipe(
    map(action => [
      emit(SET_EMAIL, action.payload),
      emit(action.payload ? FETCH_LIST_BY_EMAIL : FETCH_LIST, {
        email: action.payload
      }),
      emit(FILTER_WITH_CONDITION)
    ])
  );

export const filterWithCondition = (action$, store$) => {
  const filterTag = tags => work =>
    difference(work.tag, tags).length === work.tag.length - tags.length;
  const filterStage = stage => work =>
    stage === '' ? true : work.stage === stage;
  const filterOnTime = onTime => work =>
    !onTime ? true : work.onTime === !onTime;

  return action$.ofType(FILTER_WITH_CONDITION).pipe(
    map(action => {
      const works = store$.value[WORK_STORE_KEY]['origin'];
      const tags = store$.value[CONDITION_STORE_KEY]['tags'];
      const stage = store$.value[CONDITION_STORE_KEY]['stage'];
      const isOnTime = store$.value[CONDITION_STORE_KEY]['isOnTime'];

      return emit(
        FILTER_UPDATE,
        filter(
          allPass([
            filterTag(tags),
            filterStage(stage),
            filterOnTime(isOnTime)
          ]),
          works
        )
      );
    })
  );
};

/* export epic */
export const epics = [
  filterAppendTags,
  filterRemoveTags,
  filterWithStage,
  filterWithOnTime,
  filterWithEmail,
  filterWithCondition
];
