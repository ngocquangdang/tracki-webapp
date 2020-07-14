import { takeLatest, call, put } from 'redux-saga/effects';

import { ActionType } from '@Interfaces/index';
import { registerSuccessAction, registerFailAction } from '../actions';
import * as apiServices from '../../services';
import * as types from '../definitions';

function* registerSaga(action: ActionType) {
  try {
    yield call(apiServices.register, action.payload.data);
    yield action.payload.callback(true);
    yield put(registerSuccessAction(action.payload));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield action.payload.callback(false);
    yield put(registerFailAction(payload));
  }
}

export default function* watcher() {
  yield takeLatest(types.REGISTER_REQUESTED, registerSaga);
}
