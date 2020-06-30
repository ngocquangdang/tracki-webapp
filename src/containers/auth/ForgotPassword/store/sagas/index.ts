import { takeLatest, call, put } from 'redux-saga/effects';

import { ActionType } from '@Interfaces/index';
import {
  forgotSuccessAction,
  forgotFailAction,
  confirmCodeFailAction,
  confirmCodeSuccessAction,
} from '../actions';
import * as apiServices from '../../services';
import * as types from '../definitions';

function* forgotPasswordSaga(action: ActionType) {
  try {
    yield call(apiServices.forgotPassword, action.payload);
    yield put(forgotSuccessAction(action.payload));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { email: data.message },
    };
    yield put(forgotFailAction(payload));
  }
}

function* confirmCodeSaga(action: ActionType) {
  try {
    yield call(apiServices.confirmCode, action.payload);
    yield put(confirmCodeSuccessAction(action.payload));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { code: data.message },
    };
    yield put(confirmCodeFailAction(payload));
  }
}

export default function* forgotPasswordWatcher() {
  yield takeLatest(types.FORGOT_PASSWORD_REQUESTED, forgotPasswordSaga);
  yield takeLatest(types.CONFIRM_CODE_REQUESTED, confirmCodeSaga);
}
