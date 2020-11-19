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
  historyStop: {
    historyStops: {},
    historyStopIds: {},
  },
  historyLogs: {
    historyLogs: {},
    historyLogIds: {},
  },
  viewMode: 'overview',
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
      case types.CHANGE_REPORT_VIEW_MODE:
        draft.viewMode = payload.viewMode;
        break;
      default:
        break;
    }
  });

export default reportsReducer;
