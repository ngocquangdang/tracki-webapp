import * as types from '../constants';

export const fetchTrackerSettingsRequestedAction = (settingId: number) => ({
  type: types.GET_TRACKER_SETTINGS_REQUESTED,
  payload: { settingId },
});

export const fetchTrackerSettingsSucceedAction = (settings: object) => {
  return {
    type: types.GET_TRACKER_SETTINGS_SUCCEED,
    payload: { settings },
  };
};

export const fetchTrackerSettingsFailedAction = (error: object) => ({
  type: types.GET_TRACKER_SETTINGS_FAILED,
  payload: { error },
});
