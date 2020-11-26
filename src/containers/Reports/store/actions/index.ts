import * as types from '../constants';

export const fetchNotificationUnreadRequest = (query: string) => ({
  type: types.FETCH_NOTIFICATION_UNREAD_REQUESTED,
  query,
});

export const fetchNotficationUnreadSucceed = (notifications: object) => ({
  type: types.FETCH_NOTIFICATION_UNREAD_SUCCEED,
  payload: { notifications },
});

export const fetchNotficationUnreadFailed = (errors: object) => ({
  type: types.FETCH_NOTIFICATION_UNREAD_FAILED,
  payload: { errors },
});

export const fetchHistoryRecentStopRequest = data => ({
  type: types.FETCH_HISTORY_RECENT_STOP_REQUESTED,
  payload: { data },
});

export const fetchHistoryRecentStopSucceed = (trackerId, data) => ({
  type: types.FETCH_HISTORY_RECENT_STOP_SUCCEED,
  payload: { trackerId, ...data },
});

export const fetchHistoryRecentStopFailed = (errors: object) => ({
  type: types.FETCH_HISTORY_RECENT_STOP_FAILED,
  payload: { errors },
});

export const fetchHistoryLogsRequest = data => ({
  type: types.FETCH_HISTORY_LOGS_REQUESTED,
  payload: { data },
});

export const fetchHistoryLogsSucceed = (trackerId, data) => ({
  type: types.FETCH_HISTORY_LOGS_SUCCEED,
  payload: { trackerId, ...data },
});

export const fetchHistoryLogsFailed = (errors: object) => ({
  type: types.FETCH_HISTORY_LOGS_FAILED,
  payload: { errors },
});

export const fetchHistoryLSpeedsRequest = data => ({
  type: types.FETCH_HISTORY_SPEED_REQUESTED,
  payload: { data },
});

export const fetchHistorySpeedsSucceed = (trackerId, data) => ({
  type: types.FETCH_HISTORY_SPEED_SUCCEED,
  payload: { trackerId, ...data },
});

export const fetchHistoryLSpeedsFailed = (errors: object) => ({
  type: types.FETCH_HISTORY_SPEED_FAILED,
  payload: { errors },
});

export const changeReportViewMode = (viewMode: string) => ({
  type: types.CHANGE_REPORT_VIEW_MODE,
  payload: { viewMode },
});
