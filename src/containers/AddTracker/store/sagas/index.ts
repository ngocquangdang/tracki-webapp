import { takeLatest, call, put } from 'redux-saga/effects';

import { ActionType } from '@Interfaces';
import * as apiServices from '../../services';
import * as types from '../constances';
import {
  checkDeviceAssignedSuccesAction,
  checkDeviceAssignedFailAction,
  getDevicePlanSuccesAction,
  getDevicePlanFailAction,
} from '../actions';

function* checkDeviceAssignedSaga(action: ActionType) {
  try {
    const res = yield call(
      apiServices.checkDeviceAssigned,
      action.payload.data
    );
    if (res.data.assigned === 'false') {
      yield action.payload.callback(true);
      yield put(checkDeviceAssignedSuccesAction(res.data));
      return;
    }
    if (res.data.assigned === 'true') {
      yield action.payload.callback(false);
      yield put(checkDeviceAssignedSuccesAction(res.data));
      return;
    }
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
    yield put(checkDeviceAssignedFailAction(payload));
  }
}
function* getDevicePlanSaga(action: ActionType) {
  try {
    const account_id = yield call(apiServices.getUserInfo);
    const res = yield call(apiServices.getTrackerPlan, action.payload);
    yield put(
      getDevicePlanSuccesAction(
        res.data?.planDTOList,
        account_id.data?.account_id
      )
    );
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield put(getDevicePlanFailAction(payload));
  }
}

export default function* watcher() {
  yield takeLatest(
    types.CHECK_DEVICEID_ASSIGNED_REQUESTED,
    checkDeviceAssignedSaga
  );
  yield takeLatest(types.GET_DEVICE_PLAN_REQUESTED, getDevicePlanSaga);
}
