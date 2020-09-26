import produce from 'immer';

import { StoreDataTypes } from '../../interfaces';
import { ActionType } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: StoreDataTypes = {
  isLoading: false,
  viewMode: 'products',
  errors: null,
};

const storeReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, (draft: StoreDataTypes) => {
    switch (type) {
      case types.CHANGE_STORE_VIEW:
        draft.viewMode = payload.viewMode;
        break;
      default:
        break;
    }
  });

export default storeReducer;
