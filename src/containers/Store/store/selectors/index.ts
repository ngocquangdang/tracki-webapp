import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const storeState = (state: any) => state.store || initialState;

const makeSelectViewMode = () =>
  createSelector(storeState, state => state.viewMode);

const makeSelectProducts = () =>
  createSelector(storeState, state => state.product?.products);

const makeSelectProductIds = () =>
  createSelector(storeState, state => state.product?.productIds);
export { makeSelectViewMode, makeSelectProducts, makeSelectProductIds };
