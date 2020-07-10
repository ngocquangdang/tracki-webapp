import { takeLatest, call, put } from 'redux-saga/effects';
import Router from 'next/router';

import toast from '@Utils/notification';
import { ActionType } from '@Interfaces/index';
import AxiosClient from '@Utils/axios';
import CookieInstance from '@Utils/cookie';

import { loginSuccessAction, loginFailAction } from '../actions';
import * as apiServices from '../../services';
import * as types from '../definitions';

function* loginSaga(action: ActionType) {
  try {
    const response = yield call(apiServices.login, action.payload.data);

    if (response.status) {
      yield put(loginSuccessAction(response.data));
      CookieInstance.setCookie('token', response.data.access_token);
      AxiosClient.setHeader(response.data.access_token);
      Router.push({
        pathname: '/home',
      });
    } else {
      //
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
    if (data.message_key === 'exception_user_nameNotFound') {
      toast.error(data.message);
    }
    yield put(loginFailAction(payload));
  }
}

export default function* loginWatcher() {
  yield takeLatest(types.LOGIN_REQUESTED, loginSaga);
}
