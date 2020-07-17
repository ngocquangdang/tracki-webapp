import { takeLatest, call, put } from 'redux-saga/effects';

import toast from '@Utils/notification';
import { ActionType } from '@Interfaces/index';

import {
  getUserSuccessAction,
  getUserFailAction,
  updateUserFailAction,
  updateUserSuccessAction,
} from '../actions';
import * as apiServices from '../../services';
import * as types from '../definitions';

function* getUserSaga(action: ActionType) {
  try {
    const { data } = yield call(apiServices.getUser);
    yield put(getUserSuccessAction(data));
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
      toast.error(data.message);
    }
    yield put(getUserFailAction(payload));
  }
}

function* updateUserSaga(action: ActionType) {
  try {
    yield call(apiServices.updateUser, action.payload.data, action.payload.id);
    yield put(updateUserSuccessAction(action.payload.data));
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
      toast.error(data.message);
    }
    yield put(updateUserFailAction(payload));
  }
}

export default function* getUserWatcher() {
  yield takeLatest(types.USER_REQUESTED, getUserSaga);
  yield takeLatest(types.UPDATE_USERS_REQUESTED, updateUserSaga);
}
