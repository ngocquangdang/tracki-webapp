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
    const errors = data.errors
      ? data.errors.reduce((obj, e) => {
          const key =
            e.property_name === 'newPassword'
              ? 'new_password'
              : 'current_password';
          obj[key] = e.message;
          return obj;
        }, {})
      : { current_password: data.message };

    const payload = {
      ...data,
      errors: errors,
    };
    yield put(updatePasswordFailAction(payload));
  }
}
export default function* forgotPasswordWatcher() {
  yield takeLatest(types.UPDATE_PASSWORD_REQUESTED, updatePasswordSaga);
}
