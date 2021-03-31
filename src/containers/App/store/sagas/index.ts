import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import CookieInstance from '@Utils/cookie';
import {
  fetchTrackersRequestedAction,
  fetchGeofencesRequestedAction,
} from '@Containers/Trackers/store/actions';
import { getUserRequestAction } from '@Containers/AccountSetting/store/actions';
import { getContactListRequestAction } from '@Containers/Contacts/store/actions';
function* fetchProfileSaga() {
  try {
    const { data } = yield call(apiServices.fetchUser);
    yield put(actions.fetchUserSucceedAction(data));
    yield put(getUserRequestAction(data.account_id));
    yield put(fetchTrackersRequestedAction(data.account_id));
    yield put(fetchGeofencesRequestedAction(data.account_id));
    yield put(getContactListRequestAction(data.account_id));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: { email: data.message },
    };
    yield put(actions.fetchUserFailedAction(payload));
  }
}

export function* logoutSaga() {
  // const res = yield call(apiServices.logout);
  const res = true;
  yield call(
    apiServices.logoutGeobotTracki,
    CookieInstance.getEncryptedCookie(process.env.COOKIE_NAME || 'token'),
    CookieInstance.getCookie('refreshToken'),
    -8640000
  );
  CookieInstance.removeCookie(process.env.COOKIE_NAME || 'token');
  CookieInstance.removeCookie('refreshToken');
  CookieInstance.removeCookie('next-auth.session-token');
  if (res) {
    yield put(actions.logoutSucceedAction());
    window.location.replace('/');
    return;
  }
  yield put(actions.logoutFailedAction());
}

export default function* appWatcher() {
  yield takeLatest(types.GET_PROFILE_REQUESTED, fetchProfileSaga);
  yield takeLatest(types.LOGOUT, logoutSaga);
}
