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

export const fetchHistorySpeedsRequest = data => ({
  type: types.FETCH_HISTORY_SPEED_REQUESTED,
  payload: { data },
});

export const fetchHistorySpeedsSucceed = (trackerId: number, data) => ({
  type: types.FETCH_HISTORY_SPEED_SUCCEED,
  payload: { trackerId, ...data },
});

export const fetchHistorySpeedsFailed = (errors: object) => ({
  type: types.FETCH_HISTORY_SPEED_FAILED,
  payload: { errors },
});

export const fetchHistoryTripRequest = data => ({
  type: types.FETCH_HISTORY_TRIP_REQUESTED,
  payload: { data },
});

export const fetchHistoryTripSucceed = data => ({
  type: types.FETCH_HISTORY_TRIP_SUCCEED,
  payload: { data },
});

export const fetchHistoryTripFailed = (errors: object) => ({
  type: types.FETCH_HISTORY_TRIP_FAILED,
  payload: { errors },
});

export const changeReportViewMode = (viewMode: string) => ({
  type: types.CHANGE_REPORT_VIEW_MODE,
  payload: { viewMode },
});

export const setPointSelected = (point: object) => ({
  type: types.SET_POINT_SELECTED,
  payload: { point },
});

export const setOptimizedTrip = (data: number[]) => ({
  type: types.SET_OPTIMIZED_TRIP,
  payload: { data },
});

export const changeModeViewMap = (modeMap: string) => ({
  type: types.CHANGE_MODE_VIEW_MAP,
  payload: { modeMap },
});
