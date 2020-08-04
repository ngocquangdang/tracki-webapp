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
    editGeofenceId: null,
    newGeofence: null,
  },
  settings: {},
  contactList: [],
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
      case types.SAVE_GEOFENCE_SUCCEED:
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
      case singleTrackerTypes.UPDATE_TRACKER_SETTINGS_SUCCEED:
        draft.settings[payload.settings.id] = payload.settings;
        break;
      case singleTrackerTypes.UPDATE_TRACKE:
        draft.tracker.trackers[payload.trackerId] = {
          ...draft.tracker.trackers[payload.trackerId],
          ...payload.data,
        };
        break;
      case types.EDIT_GEOFENCE:
        draft.geofence.editGeofenceId = payload.geofenceId;
        draft.geofence.selectedGeofenceId = payload.geofenceId;
        break;
      case types.CREATE_NEW_GEOFENCE:
        draft.geofence.newGeofence = payload.geofence;
        break;
      case types.UPDATE_NEW_GEOFENCE:
        draft.geofence.newGeofence = {
          ...draft.geofence.newGeofence,
          ...payload.geofence,
        };
        break;
      case types.UPDATE_GEOFENCE:
        draft.geofence.geofences[payload.geoId] = {
          ...draft.geofence.geofences[payload.geoId],
          ...payload.geofence,
        };
        break;
      case types.REMOVE_GEOFENCE_SUCCEED:
        draft.geofence.selectedGeofenceId =
          draft.geofence.selectedGeofenceId === payload.geofenceId
            ? null
            : draft.geofence.selectedGeofenceId;
        draft.geofence.geofenceIds =
          draft.geofence.geofenceIds?.filter(id => id !== payload.geofenceId) ||
          [];
        delete draft.geofence.geofences[payload.geofenceId];
        break;
      case types.LINK_TRACKERS_SUCCEED:
        draft.geofence.geofences[payload.geofenceId] = {
          ...draft.geofence.geofences[payload.geofenceId],
          trackers: payload.trackerIds,
        };
        break;
      case types.UNLINK_TRACKERS_SUCCEED:
        draft.geofence.geofences[payload.geofenceId] = {
          ...draft.geofence.geofences[payload.geofenceId],
          trackers: (
            draft.geofence.geofences[payload.geofenceId]?.trackers || []
          ).filter(i => !payload.trackerIds.includes(i)),
        };
        break;
      case singleTrackerTypes.GET_LIST_CONTACT_REQUESTED:
        draft.errors = null;
        break;
      case singleTrackerTypes.GET_LIST_CONTACT_SUCCESSED:
        draft.contactList = payload;
        break;
      default:
        break;
    }
  });

export default trackerReducer;
