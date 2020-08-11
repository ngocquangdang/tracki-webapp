import * as types from '../constants';

export const changeTrackersTracking = (trackingIds: number[]) => ({
  type: types.CHANGE_TRACKERS_TRACKING,
  payload: { trackingIds },
});

export const getHistoryTrackerRequest = (data: object) => ({
  type: types.GET_HISTORY_TRACKER_REQUESTED,
  payload: { data },
});

export const getHistoryTrackerSucceed = (data: object) => ({
  type: types.GET_HISTORY_TRACKER_SUCCEED,
  payload: { data },
});

export const getHistoryTrackerFailed = (error: object) => ({
  type: types.GET_HISTORY_TRACKER_FAILED,
  payload: { error },
});
