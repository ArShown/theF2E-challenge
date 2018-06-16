/* constant */
import { TAG_INSERT, TAG_RESTORE } from '../reducer/tag';
/* action */
import { emit } from '~/core/action/effects';
/* helper */
import { empty } from 'rxjs';
import { switchMap, map, catchError, mapTo } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

/* epic type */
export const FETCH_LIST = 'TAG_FETCH_LIST';
export const FETCH_SUCCESS = 'TAG_FETCH_SUCCESS';
export const FETCH_FAILED = 'TAG_FETCH_FAILED';
export const CLEAR_STORE = 'TAG_CLEAR_STORE';

export const fetchList = (action$) =>
  action$.ofType(FETCH_LIST).pipe(
    switchMap(action => {
      const {
        successCallback = map(res => emit(FETCH_SUCCESS, res)),
        failedCallback = catchError(err => emit(FETCH_FAILED, err))
      } = action.payload || {};

      return ajax.getJSON('https://www.thef2e.com/api/tagList').pipe(
        successCallback,
        failedCallback
      );
    })
  );

/* save */
export const saveToStore = action$ =>
  action$.ofType(FETCH_SUCCESS).pipe(
    map(action =>
      emit(
        TAG_INSERT,
        action.payload
      )
    )
  );

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
  action$.ofType(CLEAR_STORE).pipe(mapTo(emit(TAG_RESTORE)));

/* export epic */
export const epics = [
  fetchList,
  saveToStore,
  errorEmitter,
  clearStore
];
