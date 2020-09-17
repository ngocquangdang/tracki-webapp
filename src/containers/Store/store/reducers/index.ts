import produce from 'immer';

import { StoreDataTypes } from '../../interfaces';
import { ActionType } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: StoreDataTypes = {
  isLoading: false,
  viewMode: 'store',
  product: {
    products: {},
    productIds: null,
    totalProducts: 0,
  },
  coupon: {
    coupons: {},
    couponIds: null,
    totalCoupons: 0,
  },
  errors: null,
};

const trackingReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, (draft: StoreDataTypes) => {
    switch (type) {
      case types.CHANGE_STORE_VIEW:
        draft.viewMode = payload.viewMode;
        break;
      case types.FETCH_DATA_PRODUCTS_REQUESTED:
        draft.isLoading = true;
        break;
      case types.FETCH_DATA_PRODUCTS_SUCCEED:
        draft.product = payload?.product;
        draft.isLoading = false;
        draft.errors = null;
        break;
      case types.FETCH_DATA_PRODUCTS_FAILED:
        draft.errors = payload.error;
        break;
      case types.FETCH_DATA_COUPONS_SUCCEED:
        draft.coupon = payload?.coupon;
        draft.isLoading = false;
        draft.errors = null;
        break;
      case types.FETCH_DATA_COUPONS_FAILED:
        draft.errors = payload.error;
        break;
      default:
        break;
    }
  });

export default trackingReducer;
