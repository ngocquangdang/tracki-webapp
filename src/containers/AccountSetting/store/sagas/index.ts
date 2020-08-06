import { takeLatest, call, put, select } from 'redux-saga/effects';

import toast from '@Utils/notification';
import { ActionType } from '@Interfaces/index';
import { makeSelectProfile } from '@Containers/App/store/selectors';

import {
  getUserSuccessAction,
  getUserFailAction,
  updatePrefrenceSuccessAction,
  updatePrefrenceFailAction,
  updateInfoUserSucceedAction,
  updateInfoUserFailedAction,
} from '../actions';
import * as apiServices from '../../services';
import * as types from '../definitions';

function* getUserSaga() {
  const { account_id } = yield select(makeSelectProfile());
  try {
    const { data } = yield call(apiServices.getUser, account_id);
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

function* updatePrefrenceSaga(action: ActionType) {
  const { account_id } = yield select(makeSelectProfile());
  try {
    yield call(apiServices.updatePrefrence, account_id, action.payload.data);
    yield put(updatePrefrenceSuccessAction(action.payload.data));
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
    yield put(updatePrefrenceFailAction(payload));
  }
}

function* updateInfoUserSaga(action: ActionType) {
  const { account_id } = yield select(makeSelectProfile());
  try {
    yield call(apiServices.updateInfoUser, account_id, action.payload.data);
    yield put(updateInfoUserSucceedAction(action.payload.data));
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
    yield put(updateInfoUserFailedAction(payload));
  }
}
export default function* getUserWatcher() {
  yield takeLatest(types.USER_REQUESTED, getUserSaga);
  yield takeLatest(types.UPDATE_PREFRENCE_REQUESTED, updatePrefrenceSaga);
  yield takeLatest(types.UPDATE_INFO_USER_REQUESTED, updateInfoUserSaga);
}
