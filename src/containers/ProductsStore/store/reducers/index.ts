import produce from 'immer';

import { ActionType } from '@Interfaces/index';
import * as types from '../constants';

export const initialState = {
  isLoading: false,
  product: {
    products: {},
    productIds: null,
    totalProducts: 0,
  },
  errors: null,
};

const productReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, draft => {
    switch (type) {
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
      default:
        break;
    }
  });

export default productReducer;
