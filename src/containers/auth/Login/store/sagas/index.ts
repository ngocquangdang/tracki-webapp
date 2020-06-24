import { put, takeLatest, call } from 'redux-saga/effects';

import * as types from '../definitions';
// import * as actions from '../actions';

export function* loginSaga(action: any) {
  //
}

export default function* fetchData() {
  yield takeLatest(types.LOGIN_REQUESTED, loginSaga);
}
