import * as types from '../constants';

export const fetchDataProductsRequestAction = (data: object) => ({
  type: types.FETCH_DATA_PRODUCTS_REQUESTED,
  payload: { data },
});

export const fetchDataProductsSuccess = (product: object) => ({
  type: types.FETCH_DATA_PRODUCTS_SUCCEED,
  payload: { product },
});

export const fetchDataProductsFailed = (error: object) => ({
  type: types.FETCH_DATA_PRODUCTS_FAILED,
  payload: { error },
});
