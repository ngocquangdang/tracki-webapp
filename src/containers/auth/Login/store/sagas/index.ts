import { takeLatest, call, put } from 'redux-saga/effects';

import { ActionType } from '@Interfaces/index';
import AxiosClient from '@Utils/axios';
import CookieInstance from '@Utils/cookie';

import {
  loginSuccessAction,
  loginFailAction,
  loginGeoBotSuccessAction,
  loginGeoBotFailAction,
  loginGeoBotRequestAction,
} from '../actions';
import * as apiServices from '../../services';
import * as types from '../definitions';
import { sendMessageToGeobot } from '@Utils/helper';

function* loginSaga(action: ActionType) {
  try {
    const response = yield call(apiServices.login, action.payload.data);

    if (response.status) {
      yield put(loginSuccessAction(response.data));
      CookieInstance.setCookie(
        process.env.COOKIE_NAME || 'token',
        response.data.access_token
      );
      CookieInstance.setCookie('refreshToken', response.data.refresh_token);

      AxiosClient.setHeader(response.data.access_token);
      window.location.replace('/trackers');
      yield put(loginGeoBotRequestAction(response));
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
    yield put(loginFailAction(payload));
  }
}

function* loginSocialNetworkSaga(action: ActionType) {
  const { socialType, bodyData } = action.payload;

  try {
    const response = yield call(
      apiServices.loginSocialNetWork,
      socialType,
      bodyData
    );

    yield put(loginSuccessAction(response.data));
    CookieInstance.setCookie(
      process.env.COOKIE_NAME || 'token',
      response.data.access_token
    );
    CookieInstance.setCookie('refreshToken', response.data.refresh_token);

    AxiosClient.setHeader(response.data.access_token);
    yield put(loginGeoBotRequestAction(response));
    window.location.replace('/trackers');
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield put(loginFailAction(payload));
  }
}

function* loginGeobotSaga(action) {
  const {
    data: { response },
  } = action.payload;
  try {
    yield call(
      apiServices.loginGeobotTracki,
      CookieInstance.getEncryptedCookie(process.env.COOKIE_NAME || 'token'),
      response.data.refresh_token,
      response.data.expires_in
    );
    sendMessageToGeobot('AUTHENTICATE_TOKEN_CRM');
    yield put(loginGeoBotSuccessAction());
  } catch (error) {
    yield put(loginGeoBotFailAction(error));
  }
}
export default function* loginWatcher() {
  yield takeLatest(types.LOGIN_REQUESTED, loginSaga);
  yield takeLatest(
    types.LOGIN_VIA_SOCIAL_NETWORK_REQUESTED,
    loginSocialNetworkSaga
  );
  yield takeLatest(types.LOGIN_GEO_BOT_REQUESTED, loginGeobotSaga);
}
