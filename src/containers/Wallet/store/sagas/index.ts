import { showSnackbar } from '@Containers/Snackbar/store/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getAdvertimentFailed,
  getAdvertimentSucceed,
  getMyWalletSucceed,
  getMyWallletFailed,
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
export default function* walletWatcher() {
  yield takeLatest(types.GET_MY_WALLET_REQUESTED, getMyWalletSaga);
  yield takeLatest(types.GET_ADVERTIMENT_REQUESTED, getAdvertimentSaga);
}
