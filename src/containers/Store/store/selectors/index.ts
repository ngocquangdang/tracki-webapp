import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const storeState = (state: any) => state.store || initialState;

const makeSelectViewMode = () =>
  createSelector(storeState, state => state.viewMode);

const makeSelectProducts = () =>
  createSelector(storeState, state => state.product?.products);

const makeSelectProductIds = () =>
  createSelector(storeState, state => state.product?.productIds);

const makeIsLoading = () =>
  createSelector(storeState, state => state.isLoading);

const makeSelectTotalProducts = () =>
  createSelector(storeState, state => state.product?.totalProducts);

const makeSelectCoupons = () =>
  createSelector(storeState, state => state.coupon?.coupons);

const makeSelectCouponIds = () =>
  createSelector(storeState, state => state.coupon?.couponIds);

export {
  makeSelectViewMode,
  makeSelectProducts,
  makeSelectProductIds,
  makeIsLoading,
  makeSelectTotalProducts,
  makeSelectCoupons,
  makeSelectCouponIds,
};
