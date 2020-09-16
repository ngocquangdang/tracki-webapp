import * as types from '../constants';

export const changeStoreView = (viewMode: string) => ({
  type: types.CHANGE_STORE_VIEW,
  payload: { viewMode },
});

export const fetchDataProductsRequestAction = () => ({
  type: types.FETCH_DATA_PRODUCTS_REQUESTED,
});

export const fetchDataProductsSuccess = (product: object) => ({
  type: types.FETCH_DATA_PRODUCTS_SUCCEED,
  payload: { product },
});

export const fetchDataProductsFailed = (error: object) => ({
  type: types.FETCH_DATA_PRODUCTS_FAILED,
  payload: { error },
});
