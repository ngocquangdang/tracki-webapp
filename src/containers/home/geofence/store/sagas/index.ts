import { takeLatest, call, put } from 'redux-saga/effects';

import toast from '@Utils/notification';
import { ActionType } from '@Interfaces/index';

import { getGeoFenceSuccessAction, getGeoFenceFailAction } from '../actions';
import * as apiServices from '../../services';
import * as types from '../definitions';

function* getGeoFenceSaga(action: ActionType) {
  try {
    const { data } = yield call(apiServices.getGeoFence, action.payload.id);
    yield put(getGeoFenceSuccessAction(data));
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
    yield put(getGeoFenceFailAction(payload));
  }
}

export default function* getGeoFenceWatcher() {
  yield takeLatest(types.GEO_FENCE_REQUESTED, getGeoFenceSaga);
}
