import produce from 'immer';

import { ActionType, TrackerDataTypes } from '@Interfaces/index';
import * as types from '../constants';
import * as singleTrackerTypes from '@Containers/SingleTracker/store/constants';

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
  settings: {},
  errors: null,
};

const trackerReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, (draft: TrackerDataTypes) => {
    switch (type) {
      case types.SEARCH_TRACKERS_SUCCEED:
        draft.tracker.trackerIds = payload.trackerIds;
        break;
      case types.SEARCH_GEOFENCES_SUCCEED:
        draft.geofence.geofenceIds = payload.geofenceIds;
        break;
      case types.UPDATE_GEOFENCE_SUCCEED:
        draft.geofence.geofences[payload.geoId] = {
          ...draft.geofence.geofences[payload.geoId],
          ...payload.data,
        };
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
      case singleTrackerTypes.GET_TRACKER_SETTINGS_SUCCEED:
        draft.settings[payload.settings.id] = payload.settings;
        break;
      default:
        break;
    }
  });

export default trackerReducer;
