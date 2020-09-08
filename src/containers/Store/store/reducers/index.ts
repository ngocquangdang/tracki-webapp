import produce from 'immer';

import { ActionType, StoreDataTypes } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: StoreDataTypes = {
  viewMode: 'store',
  errors: null,
};

const trackingReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, (draft: StoreDataTypes) => {
    switch (type) {
      case types.CHANGE_STORE_VIEW:
        draft.viewMode = payload.viewMode;
        break;
      default:
        break;
    }
  });

export default trackingReducer;
