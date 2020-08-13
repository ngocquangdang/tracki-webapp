import produce from 'immer';

import { ActionType, TrackingDataTypes } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: TrackingDataTypes = {
  trackingIds: [],
  viewMode: 'single_view',
  errors: null,
  histories: {},
};

const trackingReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, (draft: TrackingDataTypes) => {
    switch (type) {
      case types.CHANGE_TRACKERS_TRACKING:
        draft.trackingIds = payload.trackingIds;
        break;
      case types.CHANGE_TRACKING_VIEW:
        draft.viewMode = payload.viewMode;
        break;
      default:
        break;
    }
  });

export default trackingReducer;
