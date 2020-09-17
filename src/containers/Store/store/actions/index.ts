import * as types from '../constants';

export const changeStoreView = (viewMode: string) => ({
  type: types.CHANGE_STORE_VIEW,
  payload: { viewMode },
});

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

export const fetchDataCouponsRequestAction = (data: object) => ({
  type: types.FETCH_DATA_COUPONS_REQUESTED,
  payload: { data },
});

export const fetchDataCouponsSuccess = (product: object) => ({
  type: types.FETCH_DATA_COUPONS_SUCCEED,
  payload: { product },
});

export const fetchDataCouponsFailed = (error: object) => ({
  type: types.FETCH_DATA_COUPONS_FAILED,
  payload: { error },
});
