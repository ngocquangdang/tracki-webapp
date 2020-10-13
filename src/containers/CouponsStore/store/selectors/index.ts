import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const couponsState = (state: any) => state.coupon || initialState;

const makeSelectCoupons = () =>
  createSelector(couponsState, state => state.coupon?.coupons);

const makeSelectCouponIds = () =>
  createSelector(couponsState, state => state.coupon?.couponIds);

const makeIsLoading = () =>
  createSelector(couponsState, state => state.isLoading);

export { makeSelectCoupons, makeSelectCouponIds, makeIsLoading };
