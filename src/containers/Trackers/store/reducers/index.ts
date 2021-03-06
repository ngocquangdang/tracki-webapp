import produce from 'immer';

import { ActionType, TrackerDataTypes } from '@Interfaces/index';
import * as types from '../constants';
import * as singleTrackerTypes from '@Containers/SingleTracker/store/constants';
import * as trackingType from '@Containers/Tracking/store/constants';

export const initialState: TrackerDataTypes = {
  tracker: {
    trackers: {},
    trackerIds: null,
    trackerPlans: {},
    selectedTrackerId: null,
    settings: {},
    subAccount: {
      accounts: {},
      accountIds: [],
    },
    selectedSubAccountId: null,
  },
  geofence: {
    geofences: {},
    geofenceIds: null,
    selectedGeofenceId: null,
    editGeofenceId: null,
    newGeofence: null,
  },
  alert: {
    alerts: {},
    alertsIds: null,
  },
  smsCounter: {},
  subscription: {},
  dataLink: {},
  dataSendBeep: {},
  isBeep: false,
  isFetchingTracker: false,
  isFetchingSubAccount: false,
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
        draft.isFetchingTracker = false;
        draft.tracker = payload?.tracker;
        break;
      case types.SELECTED_TRACKER:
        draft.tracker.selectedTrackerId = payload.selectedTrackerId;
        draft.tracker.selectedSubAccountId = payload.subAccountId;
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
        draft.isFetchingTracker = true;
        draft.errors = null;
        break;
      case types.GET_GEOFENCES_FAILED:
        draft.geofence.geofenceIds = [];
        draft.errors = payload.error;
        break;
      case types.GET_TRACKERS_FAILED:
        draft.tracker.trackerIds = [];
        draft.isFetchingTracker = false;
        draft.errors = payload.error;
        break;
      case singleTrackerTypes.GET_TRACKER_SETTINGS_SUCCEED:
        draft.tracker.settings[payload.settings.id] = payload.settings;
        break;
      case singleTrackerTypes.UPDATE_TRACKER_SETTINGS_SUCCEED:
        draft.tracker.settings[payload.settings.id] = payload.settings;
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
      case types.CREATE_GEOFENCE_SUCCEED:
        draft.geofence.newGeofence = null;
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
      case types.MQTT_UPDATE_TRACKER_SUCCESS:
        draft.tracker.trackers[payload.tracker.device_id] = payload.tracker;
        break;
      case types.RESET_NEW_GEOFENCE:
        draft.geofence.newGeofence = null;
        draft.geofence.selectedGeofenceId = null;
        draft.geofence.editGeofenceId = null;
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
      case singleTrackerTypes.ACTIVE_LINK_SHARE_REQUESTED:
        draft.errors = null;
        break;
      case singleTrackerTypes.ACTIVE_LINK_SHARE_SUCCEED:
        draft.dataLink = payload.data;
        break;
      case singleTrackerTypes.ACTIVE_LINK_SHARE_FAILED:
        draft.errors = payload.error;
        break;
      case singleTrackerTypes.DEACTIVE_LINK_SHARE_REQUESTED:
        draft.errors = null;
        break;
      case singleTrackerTypes.DEACTIVE_LINK_SHARE_SUCCEED:
        draft.dataLink = null;
        delete draft.dataLink;
        break;
      case singleTrackerTypes.DEACTIVE_LINK_SHARE_FAILED:
        draft.errors = payload.error;
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
      case types.UPDATE_TRACKERS_LINKED_GEOFENCE:
      case types.UPDATE_TRACKERS_UNLINK_GEOFENCE:
        draft.tracker.trackers = { ...payload.trackers };
        break;

      case singleTrackerTypes.SEND_BEEP_SUCCEED:
        draft.dataSendBeep = payload?.data;
        draft.isBeep = true;
        break;
      case singleTrackerTypes.SEND_BEEP_FAILED:
        draft.errors = payload.error;
        break;
      case singleTrackerTypes.RESET_BEEP:
        draft.isBeep = false;
        break;
      case types.GET_DEVICE_SUBSCRIPTION_REQUESTED:
      case types.GET_SMS_COUNTER_REQUESTED:
        draft.errors = null;

        break;
      case types.GET_DEVICE_SUBSCRIPTION_SUCCEED:
        draft.subscription = payload.data;
        break;
      case types.GET_SMS_COUNTER_SUCCEED:
        draft.smsCounter = payload.data;
        break;
      case types.GET_DEVICE_SUBSCRIPTION_FAILED:
      case types.GET_SMS_COUNTER_FAILED:
        draft.errors = payload.error;
        break;
      case types.GET_SOS_ALERT_TRACKER_SUCCEED:
        draft.alert = payload.alert;
        draft.tracker.trackers = payload.newTrackers;
        break;
      case types.GET_SOS_ALERT_TRACKER_FAILED:
        draft.errors = payload.error;
        break;
      case types.ASSIGNMENT_TRACKER_SUB_ACCOUNT_REQUESTED:
        draft.isFetchingSubAccount = true;
        break;
      case types.ASSIGNMENT_TRACKER_SUB_ACCOUNT_SUCCEED:
        draft.tracker = {
          ...draft.tracker,
          settings: {
            ...draft.tracker.settings,
            ...payload.setting.settings,
          },
        };

        // draft.tracker.trackers = payload.newTrackers;
        break;
      case types.GET_FULL_DEVICE_DETAIL_SUCCEED:
        draft.tracker = {
          ...draft.tracker,
          settings: {
            ...draft.tracker.settings,
            [payload.setting.id]: payload.setting,
          },
        };
        break;
      case trackingType.GET_CURRENT_LOCACTION_TRACKER_SUCCEED:
        draft.tracker.trackers = payload.data;

        break;
      default:
        break;
    }
  });

export default trackerReducer;
