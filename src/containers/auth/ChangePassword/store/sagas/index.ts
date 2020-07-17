import { takeLatest, call, put } from 'redux-saga/effects';
import Router from 'next/router';
import { ActionType } from '@Interfaces/index';
import {
  updatePasswordFailAction,
  updatePasswordSuccesAction,
} from '../actions';
import * as apiServices from '../../services';
import * as types from '../definitions';

function* updatePasswordSaga(action: ActionType) {
  try {
    yield call(apiServices.updatePassword, action.payload);
    yield put(updatePasswordSuccesAction(action.payload));
    yield Router.push('/settings');
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { code: data.message },
    };
    yield put(updatePasswordFailAction(payload));
  }
}
export default function* forgotPasswordWatcher() {
  yield takeLatest(types.UPDATE_PASSWORD_REQUESTED, updatePasswordSaga);
}
