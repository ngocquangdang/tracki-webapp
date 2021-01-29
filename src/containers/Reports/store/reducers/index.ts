import produce from 'immer';

import { ActionType } from '@Interfaces/index';
import * as types from '../constants';

export const initialState = {
  notifications: {
    notifications: {},
    notificationsIds: [],
  },
  isFetchingDataNoti: false,
  isFetchingDataStop: false,
  isFetchingHistoryLogs: false,
  isFetchHistorySpeed: false,
  isFetchingTrips: false,
  historyStop: {
    historyStops: {},
    historyStopIds: {},
  },
  historyLogs: {
    historyLogs: {},
    historyLogIds: {},
  },
  historySpeeds: {
    historySpeeds: {},
    historySpeedIds: {},
  },
  trips: {
    trips: {},
    tripIds: [],
    selectPoints: {},
    selectPointIds: [],
    steps: 1000,
    coordinateOptimized: [],
    modeMap: 'actual',
  },
  viewMode: 'trip',
  errors: null,
};

const reportsReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, draft => {
    switch (type) {
      case types.FETCH_HISTORY_LOGS_REQUESTED:
        draft.isFetchingHistoryLogs = true;
        break;
      case types.FETCH_NOTIFICATION_UNREAD_REQUESTED:
        draft.isFetchingDataNoti = true;
        break;
      case types.FETCH_HISTORY_RECENT_STOP_REQUESTED:
        draft.isFetchingDataStop = true;
        break;
      case types.FETCH_HISTORY_SPEED_REQUESTED:
        draft.isFetchHistorySpeed = true;
        break;
      case types.FETCH_HISTORY_TRIP_REQUESTED:
        draft.isFetchingTrips = true;
        break;
      case types.FETCH_NOTIFICATION_UNREAD_SUCCEED:
        draft.notifications = payload.notifications;
        draft.isFetchingDataNoti = false;
        draft.errors = null;
        break;
      case types.FETCH_NOTIFICATION_UNREAD_FAILED:
        draft.errors = payload.errors;
        draft.isFetchingDataNoti = false;
        break;
      case types.FETCH_HISTORY_RECENT_STOP_SUCCEED:
        draft.historyStop.historyStops[payload.trackerId] =
          payload.historyStops;
        draft.historyStop.historyStopIds[payload.trackerId] =
          payload.historyStopIds;
        draft.isFetchingDataStop = false;
        break;
      case types.FETCH_HISTORY_SPEED_SUCCEED:
        draft.historySpeeds.historySpeeds[payload.trackerId] =
          payload.historySpeeds;
        draft.historySpeeds.historySpeedIds[payload.trackerId] =
          payload.historySpeedIds;
        draft.isFetchHistorySpeed = false;
        break;
      case types.FETCH_HISTORY_LOGS_SUCCEED:
        draft.historyLogs.historyLogs[payload.trackerId] = payload.historyLogs;
        draft.historyLogs.historyLogIds[payload.trackerId] =
          payload.historyLogIds;
        draft.isFetchingHistoryLogs = false;
        break;
      case types.FETCH_HISTORY_RECENT_STOP_FAILED:
        draft.errors = payload.errors;
        draft.isFetchingDataStop = false;
        break;
      case types.FETCH_HISTORY_TRIP_SUCCEED:
        draft.isFetchingTrips = false;
        draft.trips.tripIds = payload.data.tripIds;
        draft.trips.trips = payload.data.trips;
        break;
      case types.FETCH_HISTORY_TRIP_FAILED:
        draft.isFetchingTrips = false;
        draft.errors = payload.errors;
        break;
      case types.CHANGE_REPORT_VIEW_MODE:
        draft.viewMode = payload.viewMode;
        break;
      case types.SET_POINT_SELECTED:
        draft.trips.selectPoints = payload.point.points;
        draft.trips.selectPointIds = payload.point.pointIds;
        break;
      case types.SET_OPTIMIZED_TRIP:
        draft.trips.coordinateOptimized = payload.data;
        break;
      case types.CHANGE_MODE_VIEW_MAP:
        draft.trips.modeMap = payload.modeMap;
        break;
      default:
        break;
    }
  });

export default reportsReducer;
