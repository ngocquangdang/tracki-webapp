import produce from 'immer';

import { ActionType } from '@Interfaces/index';
import * as types from '../constants';

export const initialState = {
  isLoading: false,
  coupon: {
    coupons: {},
    couponIds: null,
    totalCoupons: 0,
  },
  errors: null,
};

const couponReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, draft => {
    switch (type) {
      case types.FETCH_DATA_COUPONS_REQUESTED:
        draft.isLoading = true;
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

export default couponReducer;
