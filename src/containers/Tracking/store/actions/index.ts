import * as types from '../constants';

export const changeTrackersTracking = (trackingIds: number[]) => ({
  type: types.CHANGE_TRACKERS_TRACKING,
  payload: { trackingIds },
});

export const getHistoryTrackerRequest = (data: object) => ({
  type: types.GET_HISTORY_TRACKER_REQUESTED,
  payload: { data },
});

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
