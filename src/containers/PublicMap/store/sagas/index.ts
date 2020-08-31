import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../../services';

import {
  getDeviceByTokenSucceedAction,
  getDeviceByTokenFailedAction,
} from '../actions';

function* getDeviceByTokenSaga(action) {
  const { token } = action.payload;
  try {
    const { data } = yield call(apiServices.getDevicesByToken, token);

    // const trackers = data.reduce((obj, item) => {
    //   obj.trackers = { ...obj.trackers, [item.deviceId]: item };
    //   return obj;
    // }, {});
    yield put(getDeviceByTokenSucceedAction(data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };

    yield put(getDeviceByTokenFailedAction(payload));
  }
}

export default function* appWatcher() {
  yield takeLatest(types.GET_DEVICE_BY_TOKEN_REQUESTED, getDeviceByTokenSaga);
}
