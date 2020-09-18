import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const productState = (state: any) => state.product || initialState;

const makeSelectProducts = () =>
  createSelector(productState, state => state.product?.products);

const makeSelectProductIds = () =>
  createSelector(productState, state => state.product?.productIds);

const makeIsLoading = () =>
  createSelector(productState, state => state.isLoading);

const makeSelectTotalProducts = () =>
  createSelector(productState, state => state.product?.totalProducts);
export {
  makeSelectProducts,
  makeSelectProductIds,
  makeIsLoading,
  makeSelectTotalProducts,
};
