import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from '@Interfaces';
import * as apiServices from '../../services';
import * as types from '../constants';

import {
  getDevicePlanSuccesAction,
  getDevicePlanFailAction,
  braintreeDropInFailAction,
  braintreeDropInSuccesAction,
  updateStore,
  renewDeviceFailAction,
  renewDeviceSuccesAction,
} from '../actions';
import Router from 'next/router';
import { showSnackbar } from '@Containers/Snackbar/store/actions';

function* getRenewDevicePlanSaga(action: ActionType) {
  try {
    const account_id = yield call(apiServices.getUserInfo);
    console.log(action.payload);
    const res = yield call(
      apiServices.getRenewalDevicePlansGroupNonce,
      action.payload
    );
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

function requestPaymentMethod(dropIn) {
  return new Promise((reslove, reject) => {
    dropIn
      .requestPaymentMethod()
      .then(payload => {
        reslove(payload);
      })
      .catch(error => reject(error));
  });
}

function* braintreeDropinSaga(action: ActionType) {
  const { formData, callback } = action.payload;

  try {
    const creditCard = yield call(requestPaymentMethod, window.dropinIntance);
    yield put(updateStore({ ...formData, creditCard }));
    yield callback('payment_confirm');
    yield put(braintreeDropInSuccesAction(action.payload));
  } catch (error) {
    yield put(braintreeDropInFailAction(error));
  }
}

function* renewDeviceSaga(action: ActionType) {
  const { formData, account_id, paymentData } = action.payload;

  try {
    if (formData.selectedPlan.paymentPlatform === 'PREPAID') {
      console.log(1);
      yield call(
        apiServices.setRenewalBraintreePlanToDevice,
        account_id,
        parseInt(formData.device_id),
        formData.selectedPlan.id,
        paymentData
      );
    } else if (formData.selectedPlan.paymentPlatform === 'NONCE') {
      console.log(2);
      yield call(
        apiServices.setRenewalBraintreeNoncePlanToDevice,
        account_id,
        parseInt(formData.device_id),
        paymentData
      );
    }
    yield put(
      showSnackbar({
        snackType: 'success',
        snackMessage: 'Renew Tracker Succeed',
      })
    );
    yield put(renewDeviceSuccesAction(action.payload));
    yield Router.push('/');
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield put(
      showSnackbar({
        snackType: 'error',
        snackMessage: data.error || data.message,
      })
    );
    yield put(renewDeviceFailAction(payload));
  }
}

export default function* watcher() {
  yield takeLatest(
    types.GET_RENEW_DEVICE_PLAN_REQUESTED,
    getRenewDevicePlanSaga
  );
  yield takeLatest(types.BRAINTREE_DROPIN_RENEW_REQUESTED, braintreeDropinSaga);
  yield takeLatest(types.RENEW_DEVICE_REQUESTED, renewDeviceSaga);
}
