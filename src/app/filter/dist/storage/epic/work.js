/* constant */
import { WORK_INIT, WORK_UPDATE, WORK_RESTORE } from '../reducer/work';
/* action */
import { emit } from '~/core/action/effects';
/* helper */
import { empty } from 'rxjs';
import { switchMap, map, catchError, mapTo } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { keys, map as ramdaMap, join } from 'ramda';

/* epic type */
export const FETCH_LIST = 'WORK_FETCH_LIST';
export const FETCH_LIST_BY_EMAIL = 'WORK_FETCH_LIST_BY_EMAIL';
export const FETCH_SUCCESS = 'WORK_FETCH_SUCCESS';
export const FETCH_FAILED = 'WORK_FETCH_FAILED';
export const CLEAR_STORE = 'WORK_CLEAR_STORE';
export const FILTER_UPDATE = 'WORK_FILTER_UPDATE';

export const fetchList = action$ =>
  action$.ofType(FETCH_LIST).pipe(
    switchMap(action => {
      const {
        query = {},
        successCallback = res => emit(FETCH_SUCCESS, res),
        failedCallback = err => emit(FETCH_FAILED, err)
      } =
        action.payload || {};

      return ajax
        .getJSON(
          `https://www.thef2e.com/api/codeList?${join(
            '&',
            ramdaMap(key => `${key}=${query[key]}`, keys(query))
          )}`
        )
        .pipe(map(successCallback), catchError(failedCallback));
    })
  );

export const fetchListByEmail = action$ =>
  action$.ofType(FETCH_LIST_BY_EMAIL).pipe(
    switchMap(action => {
      const {
        email,
        successCallback = res => emit(FETCH_SUCCESS, res),
        failedCallback = err => emit(FETCH_FAILED, err)
      } =
        action.payload || {};

      return ajax
        .post(
          'https://www.thef2e.com/api/stageCheck',
          { email },
          { 'Content-Type': 'application/json' }
        )
        .pipe(
          map(res => emit(FETCH_SUCCESS, res.response)),
          catchError(failedCallback)
        );
    })
  );

/* update */
export const filterUpdate = action$ =>
  action$
    .ofType(FILTER_UPDATE)
    .pipe(map(action => emit(WORK_UPDATE, action.payload)));

/* save */
export const saveToStore = action$ =>
  action$
    .ofType(FETCH_SUCCESS)
    .pipe(map(action => emit(WORK_INIT, action.payload)));

/* error */
export const errorEmitter = action$ =>
  action$.ofType(FETCH_FAILED).pipe(
    map(action => {
      console.log(action.payload);
      return empty();
    })
  );

/* clear */
export const clearStore = action$ =>
  action$.ofType(CLEAR_STORE).pipe(mapTo(emit(WORK_RESTORE)));

/* export epic */
export const epics = [
  fetchList,
  fetchListByEmail,
  filterUpdate,
  saveToStore,
  errorEmitter,
  clearStore
];
