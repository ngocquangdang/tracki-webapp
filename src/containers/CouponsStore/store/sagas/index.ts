import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from '@Interfaces';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';

function* fetchDataCouponsSaga(action: ActionType) {
  try {
    const { data, headers } = yield call(
      apiServices.fetchCoupons,
      action.payload.data.page,
      action.payload.data.perPage
    );
    const totalCoupons = parseInt(headers['x-wp-total'], 10);
    const coupon = data.reduce(
      (obj, item) => {
        obj.coupons = { ...obj.coupons, [item.id]: item };
        obj.couponIds.push(item.id);
        return obj;
      },
      {
        coupons: {},
        couponIds: [],
        totalCoupons,
      }
    );

    yield put(actions.fetchDataCouponsSuccess(coupon));
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
    yield put(actions.fetchDataCouponsFailed(payload));
  }
}
export default function* couponsWatcher() {
  yield takeLatest(types.FETCH_DATA_COUPONS_REQUESTED, fetchDataCouponsSaga);
}
