/* constant */
import { MEMBER_UPDATE } from '../reducer/member';
/* action */
import { emit } from '~/core/action/effects';
/* helper */
import { empty } from 'rxjs';
import { switchMap, map, catchError, mapTo } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

/* epic type */
export const FETCH_DATA = 'MEMBER_FETCH_DATA';
export const FETCH_SUCCESS = 'MEMBER_FETCH_SUCCESS';
export const FETCH_FAILED = 'MEMBER_FETCH_FAILED';

export const fetchData = action$ =>
  action$.ofType(FETCH_DATA).pipe(
    switchMap(action => {
      const {
        successCallback = map(res => emit(FETCH_SUCCESS, res)),
        failedCallback = catchError(err => emit(FETCH_FAILED, err))
      } = action.payload || {};

      return ajax.getJSON('https://www.thef2e.com/api/signUpTotal').pipe(
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
        MEMBER_UPDATE,
        action.payload.total
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

/* export epic */
export const epics = [
  fetchData,
  saveToStore,
  errorEmitter
];
