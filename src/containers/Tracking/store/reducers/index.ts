import produce from 'immer';

import { ActionType, TrackingDataTypes } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: TrackingDataTypes = {
  trackingIds: [],
  errors: null,
  histories: [],
};

const trackingReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, (draft: TrackingDataTypes) => {
    switch (type) {
      case types.CHANGE_TRACKERS_TRACKING:
        draft.trackingIds = payload.trackingIds;
        break;
      case types.GET_HISTORY_TRACKER_SUCCEED:
        draft.histories = payload.data;
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
