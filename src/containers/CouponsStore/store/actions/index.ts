import * as types from '../constants';

export const fetchDataCouponsRequestAction = (data: object) => ({
  type: types.FETCH_DATA_COUPONS_REQUESTED,
  payload: { data },
});

export const fetchDataCouponsSuccess = (coupon: object) => ({
  type: types.FETCH_DATA_COUPONS_SUCCEED,
  payload: { coupon },
});

export const fetchDataCouponsFailed = (error: object) => ({
  type: types.FETCH_DATA_COUPONS_FAILED,
  payload: { error },
});
