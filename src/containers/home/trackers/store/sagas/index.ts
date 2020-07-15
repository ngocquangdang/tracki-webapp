import { takeLatest, call, put } from 'redux-saga/effects';

import toast from '@Utils/notification';
import { ActionType } from '@Interfaces/index';

import { getDeviceSuccessAction, getDeviceFailAction } from '../actions';
import * as apiServices from '../../services';
import * as types from '../definitions';

function* getUserSaga(action: ActionType) {
  try {
    const { data } = yield call(apiServices.getDevice);
    yield put(getDeviceSuccessAction(data));
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
    yield put(getDeviceFailAction(payload));
  }
}

export default function* getUserWatcher() {
  yield takeLatest(types.DEVICE_REQUESTED, getUserSaga);
}
