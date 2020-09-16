import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';

function* fetchDataProductsSaga() {
  try {
    const { data } = yield call(apiServices.fetchProducts);
    const product = data.reduce(
      (obj, item) => {
        obj.products = { ...obj.products, [item.id]: item };
        obj.productIds.push(item.id);
        return obj;
      },
      {
        products: {},
        productIds: [],
      }
    );

    yield put(actions.fetchDataProductsSuccess(product));
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
    yield put(actions.fetchDataProductsFailed(payload));
  }
}
export default function* trackingWatcher() {
  yield takeLatest(types.FETCH_DATA_PRODUCTS_REQUESTED, fetchDataProductsSaga);
}
