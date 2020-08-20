import * as types from '../constants';

export const changeTrackersTracking = (trackingIds: number[]) => ({
  type: types.CHANGE_TRACKERS_TRACKING,
  payload: { trackingIds },
});

export const getHistoryTrackerRequest = (data: object) => {
  console.log('getHistoryTrackerRequest -> data', data);
  return {
    type: types.GET_HISTORY_TRACKER_REQUESTED,
    payload: { data },
  };
};

export const getHistoryTrackerSucceed = (data: any) => ({
  type: types.GET_HISTORY_TRACKER_SUCCEED,
  payload: { trackerId: data.trackerId, histories: data.histories },
});

export const getHistoryTrackerFailed = (error: object) => ({
  type: types.GET_HISTORY_TRACKER_FAILED,
  payload: { error },
});

export const changeTrackingView = (viewMode: string) => ({
  type: types.CHANGE_TRACKING_VIEW,
  payload: { viewMode },
});

export const getAlarmTrackerRequest = (data: object) => {
  console.log('getAlarmTrackerRequest -> data', data);
  return {
    type: types.GET_ALARM_TRACKER_REQUESTED,
    payload: { data },
  };
};

export const getAlarmTrackerSucceed = (data: any) => ({
  type: types.GET_ALARM_TRACKER_SUCCEED,
  payload: { trackerId: data.trackerId, alarms: data.alarms },
});

export const getAlarmTrackerFailed = (error: object) => ({
  type: types.GET_ALARM_TRACKER_FAILED,
  payload: { error },
});
