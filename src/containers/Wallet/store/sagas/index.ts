import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getAdvertimentFailed,
  getAdvertimentSucceed,
  getMyWalletSucceed,
  getMyWallletFailed,
  getPointHistoryFailed,
  getPointHistorySucceed,
  getProductFailed,
  getProductSucceed,
  getSubscriptionPlanSucceed,
  getSubscriptionPlanFailed,
  getSMSPlanSucceed,
  getSMSPlanFailed,
} from '../actions';
import * as types from '../constants';
import * as apiServices from '../services';

function* getMyWalletSaga(action) {
  try {
    const data = yield call(apiServices.getMyWalllet);
    yield put(getMyWalletSucceed(data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      yield put(
        showSnackbar({
          snackType: 'error',
          snackMessage: data.error || data.message,
        })
      );
    }
    yield put(getMyWallletFailed(payload));
  }
}

function* getAdvertimentSaga(action) {
  try {
    const data = yield call(apiServices.getAdvertiment);
    const formatData = data.reduce(
      (obj, item) => {
        obj.advs = { ...obj.advs, [item.id]: item };
        obj.advIds.push(item.id);
        return obj;
      },
      {
        advs: {},
        advIds: [],
      }
    );
    yield put(getAdvertimentSucceed(formatData));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      yield put(
        showSnackbar({
          snackType: 'error',
          snackMessage: data.error || data.message,
        })
      );
    }
    yield put(getAdvertimentFailed(payload));
  }
}

function* getPointHistorySaga(action) {
  try {
    const data = yield call(apiServices.getPointHistory);
    const formatData = data.reduce(
      (obj, item) => {
        obj.pointHistories = { ...obj.pointHistories, [item.id]: item };
        obj.pointHistoryIds.push(item.id);
        return obj;
      },
      {
        pointHistories: {},
        pointHistoryIds: [],
      }
    );
    yield put(getPointHistorySucceed(formatData));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      yield put(
        showSnackbar({
          snackType: 'error',
          snackMessage: data.error || data.message,
        })
      );
    }
    yield put(getPointHistoryFailed(payload));
  }
}

function* getProductSaga(action) {
  try {
    const data = yield call(apiServices.getProduct);
    const tracker = data.filter(item => item.type === 'tracker');
    const accesory = data.filter(item => item.type === 'accesory');

    const formatTracker = tracker.reduce(
      (obj, item) => {
        obj.trackers = { ...obj.trackers, [item.id]: item };
        obj.trackerIds.push(item.id);
        return obj;
      },
      {
        trackers: {},
        trackerIds: [],
      }
    );
    const formatAccesory = accesory.reduce(
      (obj, item) => {
        obj.accesories = { ...obj.accesories, [item.id]: item };
        obj.accesoryIds.push(item.id);
        return obj;
      },
      {
        accesories: {},
        accesoryIds: [],
      }
    );
    yield put(getProductSucceed(formatTracker, formatAccesory));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      yield put(
        showSnackbar({
          snackType: 'error',
          snackMessage: data.error || data.message,
        })
      );
    }
    yield put(getProductFailed(payload));
  }
}

function* getSubscriptionPlanSaga(action) {
  try {
    const data = yield call(apiServices.getSubscriptionPlan);
    yield put(getSubscriptionPlanSucceed(data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      yield put(
        showSnackbar({
          snackType: 'error',
          snackMessage: data.error || data.message,
        })
      );
    }
    yield put(getSubscriptionPlanFailed(payload));
  }
}

function* getSMSPlanSaga(action) {
  try {
    const data = yield call(apiServices.getSMSPlan);
    yield put(getSMSPlanSucceed(data));
  } catch (error) {
    const { data = {} } = { ...error };
    const payload = {
      ...data,
    };
    if (data.error || data.message) {
      yield put(
        showSnackbar({
          snackType: 'error',
          snackMessage: data.error || data.message,
        })
      );
    }
    yield put(getSMSPlanFailed(payload));
  }
}
export default function* walletWatcher() {
  yield takeLatest(types.GET_MY_WALLET_REQUESTED, getMyWalletSaga);
  yield takeLatest(types.GET_ADVERTIMENT_REQUESTED, getAdvertimentSaga);
  yield takeLatest(types.GET_POINT_HISTORY_REQUESTED, getPointHistorySaga);
  yield takeLatest(types.GET_PRODUCT_REQUESTED, getProductSaga);
  yield takeLatest(types.GET_SUBSCRIPTION_REQUESTED, getSubscriptionPlanSaga);
  yield takeLatest(types.GET_SMS_PLAN_REQUESTED, getSMSPlanSaga);
}
