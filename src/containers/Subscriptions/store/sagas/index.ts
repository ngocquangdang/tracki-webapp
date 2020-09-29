import { takeLatest, call, put } from 'redux-saga/effects';
import * as apiServices from '../../services';
import * as types from '../constants';

import { showSnackbar } from '@Containers/Snackbar/store/actions';
import {
  getCountryCodeSucceedAction,
  getCountryCodeFailedAction,
  getCountryCodeFollowSucceedAction,
  getCountryCodeFollowFailedAction,
  updateSubscriptionStore,
  braintreeDropInSubscriptionSuccesAction,
  braintreeDropInSubscriptionFailAction,
  buySmsSubscriptionSuccesAction,
  buySmsSubscriptionFailAction,
  buyFastTrackingSubscriptionFailAction,
  buyFastTrackingSubscriptionSuccesAction,
  getFastTrackingFollowSucceedAction,
  getFastTrackingFollowFailedAction,
} from '../actions';
import Router from 'next/router';

function* getCountryCodeSaga(action) {
  try {
    const { data: userData } = yield call(apiServices.getUserInfo);
    const { data } = yield call(apiServices.getCountryCode);
    yield put(getCountryCodeSucceedAction(data));
    yield put(updateSubscriptionStore({ account_id: userData?.account_id }));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield put(getCountryCodeFailedAction(payload));
  }
}

function* getCountryCodeFollowCodeSaga(action) {
  const { code } = action.payload;
  try {
    const { data } = yield call(apiServices.getCountryCodeFollowCode, code);
    yield put(getCountryCodeFollowSucceedAction(data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
      errors: (data.errors || []).reduce(
        (obj: object, e: any) => ({ ...obj, [e.property_name]: e.message }),
        {}
      ),
    };
    yield put(getCountryCodeFollowFailedAction(payload));
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

function* braintreeDropinSaga(action) {
  const { formData, callback } = action.payload;

  try {
    const creditCard = yield call(requestPaymentMethod, window.dropinIntance);
    yield put(updateSubscriptionStore({ ...formData, creditCard }));
    yield callback();
    yield put(braintreeDropInSubscriptionSuccesAction(action.payload));
  } catch (error) {
    yield put(braintreeDropInSubscriptionFailAction(error));
  }
}

function* buySmsSubscriptionSaga(action) {
  const { formData, account_id, paymentData } = action.payload;

  try {
    const { data: userData } = yield call(apiServices.getUserInfo);
    const newPaymentData = {
      ...paymentData,
      email: userData.email,
      first_name: userData.preferances?.first_name,
      last_name: userData.preferances?.last_name,
    };
    yield call(
      apiServices.buySMSOption,
      account_id,
      parseInt(formData.device_id),
      newPaymentData
    );
    yield put(
      showSnackbar({
        snackType: 'success',
        snackMessage: 'Buy SMS Subscription Succeed',
      })
    );
    yield put(buySmsSubscriptionSuccesAction(action.payload));
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
    yield Router.push('/');
    yield put(buySmsSubscriptionFailAction(payload));
  }
}

function* getFastTrackingFollowCode(action) {
  const { code } = action.payload;

  try {
    const { data } = yield call(apiServices.getFastrackingFollowCode, code);
    yield put(getFastTrackingFollowSucceedAction(data));
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
    yield put(getFastTrackingFollowFailedAction(payload));
  }
}

function* buyFastTrackingSubscriptionSaga(action) {
  const { formData, account_id, paymentData } = action.payload;
  try {
    const { data: userData } = yield call(apiServices.getUserInfo);

    const newPaymentData = {
      ...paymentData,
      email: userData.email,
      first_name: userData.preferances?.first_name,
      last_name: userData.preferances?.last_name,
    };
    yield call(
      apiServices.buyFastrackingOption,
      account_id,
      parseInt(formData.device_id),
      newPaymentData
    );

    yield put(
      showSnackbar({
        snackType: 'success',
        snackMessage: 'Buy Fast Tracking Succeed',
      })
    );
    yield put(buyFastTrackingSubscriptionSuccesAction(action.payload));
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
    yield Router.push('/');
    yield put(buyFastTrackingSubscriptionFailAction(payload));
  }
}

export default function* watcher() {
  yield takeLatest(types.GET_CONTRY_CODE_REQUESTED, getCountryCodeSaga);
  yield takeLatest(
    types.GET_CONTRY_CODE_FOLLOW_REQUESTED,
    getCountryCodeFollowCodeSaga
  );
  yield takeLatest(
    types.BRAINTREE_DROPIN_SUBSCRIPTION_REQUESTED,
    braintreeDropinSaga
  );
  yield takeLatest(
    types.BUY_SMS_SUBSCRIPTION_REQUESTED,
    buySmsSubscriptionSaga
  );
  yield takeLatest(
    types.BUY_FAST_TRACKING_SUBSCRIPTION_REQUESTED,
    buyFastTrackingSubscriptionSaga
  );
  yield takeLatest(
    types.GET_FATS_TRACKING_FOLLOW_CODE_REQUESTED,
    getFastTrackingFollowCode
  );
}
