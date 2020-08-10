import * as types from '../constants';

export const changeTrackersTracking = (trackingIds: number[]) => ({
  type: types.CHANGE_TRACKERS_TRACKING,
  payload: { trackingIds },
});
