import { takeLatest, call, put } from 'redux-saga/effects';
import { ActionType } from '@Interfaces';

import * as types from '../constants';
import * as apiServices from '../services';
import * as actions from '../actions';
import { showSnackbar } from '@Containers/Snackbar/store/actions';

function* fetchDataProductsSaga(action: ActionType) {
  try {
    const { data, headers } = yield call(
      apiServices.fetchProducts,
      action.payload.data.page,
      action.payload.data.perPage
    );
    const totalProducts = parseInt(headers['x-wp-total'], 10);
    const product = data.reduce(
      (obj, item) => {
        obj.products = { ...obj.products, [item.id]: item };
        obj.productIds.push(item.id);
        return obj;
      },
      {
        products: {},
        productIds: [],
        totalProducts,
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
export default function* productsWatcher() {
  yield takeLatest(types.FETCH_DATA_PRODUCTS_REQUESTED, fetchDataProductsSaga);
}
