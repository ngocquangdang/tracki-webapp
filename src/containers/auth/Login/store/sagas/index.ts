import { takeLatest, call, put } from 'redux-saga/effects';

import toast from '@Utils/notification';
import { ActionType } from '@Interfaces/index';

import { loginSuccessAction, loginFailAction } from '../actions';
import * as apiServices from '../../services';
import * as types from '../definitions';

function* loginSaga(action: ActionType) {
  try {
    const { data } = yield call(apiServices.login, action.payload.data);
    yield put(loginSuccessAction(data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    if (data.message_key === 'exception_user_nameNotFound') {
      toast.error(data.message)
    }
    yield put(loginFailAction(payload));
  }
}

export default function* loginWatcher() {
  yield takeLatest(types.LOGIN_REQUESTED, loginSaga);
}
