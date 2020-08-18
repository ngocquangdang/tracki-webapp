import produce from 'immer';

import * as types from '../constants';
import { ActionType } from '@Interfaces';

export const initialState = {
  errors: null,
  histories: {},
};

const trackingReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, draft => {
    switch (type) {
      case types.GET_HISTORY_TRACKER_SUCCEED:
        draft.histories[payload.trackerId] = payload.histories;
        draft.errors = null;
        break;
      case types.GET_HISTORY_TRACKER_FAILED:
        draft.errors = payload.errors;
        break;

      default:
        break;
    }
  });

export default trackingReducer;
