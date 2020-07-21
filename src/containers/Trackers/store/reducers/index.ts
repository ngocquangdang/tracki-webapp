import produce from 'immer';

import { ActionType, TrackerDataTypes } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: TrackerDataTypes = {
  tracker: {
    trackers: {},
    trackerIds: null,
    trackerPlans: {},
    selectedTrackerId: null,
  },
  geofence: {
    geofences: {},
    geofenceIds: null,
    selectedGeofenceId: null,
  },
  errors: null,
};

const trackerReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, (draft: TrackerDataTypes) => {
    switch (type) {
      case types.SEARCH_TRACKERS_SUCCEED:
        draft.tracker.trackerIds = payload.trackerIds;
        break;
      case types.GET_TRACKERS_SUCCEED:
        draft.tracker = payload?.tracker;
        break;
      case types.SELECTED_TRACKER:
        draft.tracker.selectedTrackerId = payload.selectedTrackerId;
        break;
      case types.RESET_SELECTED_TRACKER:
        draft.tracker.selectedTrackerId = null;
        break;
      case types.GET_GEOFENCES_SUCCEED:
        draft.geofence = payload?.geofence;
        break;
      case types.SELECTED_GEOFENCE:
        draft.geofence.selectedGeofenceId = payload.geofenceId;
        break;
      case types.RESET_SELECTED_GEOFENCE:
        draft.geofence.selectedGeofenceId = null;
        break;
      case types.GET_GEOFENCES_REQUESTED:
      case types.GET_TRACKERS_REQUESTED:
        draft.errors = null;
        break;
      case types.GET_GEOFENCES_FAILED:
      case types.GET_TRACKERS_FAILED:
        draft.errors = payload.error;
        break;
      default:
        break;
    }
  });

export default trackerReducer;
