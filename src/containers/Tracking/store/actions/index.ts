import * as types from '../constants';

export const changeTrackersTracking = (trackingIds: number[]) => ({
  type: types.CHANGE_TRACKERS_TRACKING,
  payload: { trackingIds },
});

export const changeTrackingView = (viewMode: string) => ({
  type: types.CHANGE_TRACKING_VIEW,
  payload: { viewMode },
});
