/* action type */
import {
  APPEND_TAGS,
  REMOVE_TAGS,
  SET_EMAIL,
  SET_STAGE,
  SET_IS_ON_TIME
} from '../reducer/condition';
import {
  FILTER_UPDATE,
  FETCH_LIST,
  FETCH_LIST_BY_EMAIL,
  FETCH_SUCCESS
} from './work';

/* store key */
import { STORE_KEY as WORK_STORE_KEY } from '../reducer/work';
import { STORE_KEY as CONDITION_STORE_KEY } from '../reducer/condition';

/* action */
import { emit } from '~/core/action/effects';

/* helper */
import { empty, concat, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { filter, difference, allPass, findIndex, equals } from 'ramda';

/* epic type */
export const FILTER_APPEND_TAG = 'CONDITION_FILTER_APPEND_TAG';
export const FILTER_REMOVE_TAG = 'CONDITION_FILTER_REMOVE_TAG';
export const FILTER_WITH_STAGE = 'CONDITION_FILTER_WITH_STAGE';
export const FILTER_WITH_ON_TIME = 'CONDITION_FILTER_WITH_ON_TIME';
export const FILTER_WITH_EMAIL = 'CONDITION_FILTER_WITH_EMAIL';
export const FILTER_TO_REFETCH = 'CONDITION_FILTER_TO_REFETCH';
export const FILTER_WITH_CONDITION = 'CONDITION_FILTER_WITH_CONDITION';

export const filterToReFetch = (action$, store$) =>
  action$.ofType(FILTER_TO_REFETCH).pipe(
    map(action => {
      const email = store$.value[CONDITION_STORE_KEY]['email'];
      if (email)
        return emit(FETCH_LIST_BY_EMAIL, {
          email,
          successCallback: switchMap(res => concat(
            of(emit(FETCH_SUCCESS, res.response)),
            of(emit(FILTER_WITH_CONDITION))
          ))
        });

      const tags = store$.value[CONDITION_STORE_KEY]['tags'];
      const stage = store$.value[CONDITION_STORE_KEY]['stage'];
      let query = {};
      if (tags.length > 0) query.tag = tags[0];
      if (stage !== '') query.stage = stage;

      return emit(FETCH_LIST, {
        query,
        successCallback: switchMap(res => concat(
          of(emit(FETCH_SUCCESS, res)),
          of(emit(FILTER_WITH_CONDITION))
        ))
      });
    })
  );

export const filterAppendTags = (action$, store$) =>
  action$.ofType(FILTER_APPEND_TAG).pipe(
    map(action => {
      const tags = store$.value[CONDITION_STORE_KEY]['tags'];
      const email = store$.value[CONDITION_STORE_KEY]['email'];

      return [
        emit(APPEND_TAGS, action.payload),
        emit(tags.length > 0 || email ? FILTER_WITH_CONDITION : FILTER_TO_REFETCH)
      ];
    })
  );

export const filterRemoveTags = (action$, store$) =>
  action$.ofType(FILTER_REMOVE_TAG).pipe(
    map(action => {
      const email = store$.value[CONDITION_STORE_KEY]['email'];
      const tags = store$.value[CONDITION_STORE_KEY]['tags'];
      /* 移除的標籤序號 */
      const idx = findIndex(equals(action.payload), tags);

      return [
        emit(REMOVE_TAGS, action.payload),
        emit(email || idx > 0 ? FILTER_WITH_CONDITION : FILTER_TO_REFETCH)
      ];
    })
  );

export const filterWithStage = (action$, store$) =>
  action$.ofType(FILTER_WITH_STAGE).pipe(
    map(action => {
      const email = store$.value[CONDITION_STORE_KEY]['email'];

      return [
        emit(SET_STAGE, action.payload),
        emit(email ? FILTER_WITH_CONDITION : FILTER_TO_REFETCH)
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
      emit(FILTER_TO_REFETCH)
    ])
  );

export const filterWithCondition = (action$, store$) => {
  const filterTag = tags => work =>
    difference(work.tag, tags).length === work.tag.length - tags.length;
  const filterStage = stage => work =>
    stage === '' ? true : work.stage === stage;
  const filterOnTime = onTime => work =>
    onTime ? true : work.onTime === false;

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
  filterToReFetch,
  filterAppendTags,
  filterRemoveTags,
  filterWithStage,
  filterWithOnTime,
  filterWithEmail,
  filterWithCondition
];
