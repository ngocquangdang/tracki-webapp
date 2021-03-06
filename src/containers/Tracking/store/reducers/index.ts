import produce from 'immer';

import { ActionType, TrackingDataTypes } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: TrackingDataTypes = {
  trackingIds: [],
  viewMode: 'single_view',
  errors: null,
  pointTrackingIndex: -1,
  histories: {},
  historyIds: {},
  alarms: {},
  isLoading: false,
};

const trackingReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, (draft: TrackingDataTypes) => {
    switch (type) {
      case types.CHANGE_TRACKERS_TRACKING:
        draft.trackingIds = payload.trackingIds;
        break;
      case types.GET_HISTORY_TRACKER_REQUESTED:
        draft.isLoading = true;
        break;
      case types.GET_HISTORY_TRACKER_SUCCEED:
        draft.isLoading = false;
        draft.histories[payload.trackerId] = payload.histories;
        draft.historyIds[payload.trackerId] = payload.historieIds;
        draft.pointTrackingIndex = 0;
        draft.errors = null;
        break;
      case types.GET_HISTORY_TRACKER_FAILED:
        draft.isLoading = false;
        draft.errors = payload.errors;
        break;
      case types.GET_ALARM_TRACKER_SUCCEED:
        draft.alarms[payload.trackerId] = payload.alarms;
        draft.errors = null;
        break;
      case types.GET_ALARM_TRACKER_FAILED:
        draft.errors = payload.errors;
        break;
      case types.CHANGE_TRACKING_VIEW:
        draft.viewMode = payload.viewMode;
        break;
      case types.CHANGE_POINT_TRACKING:
        draft.pointTrackingIndex = payload.pointIndex;
        draft.histories = payload.pointIndex === -1 ? {} : draft.histories;
        draft.historyIds = payload.pointIndex === -1 ? {} : draft.historyIds;
        break;
      default:
        break;
    }
  });

export default trackingReducer;
