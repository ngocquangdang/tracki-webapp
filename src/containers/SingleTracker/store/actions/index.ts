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

export const updateTrackerAction = (trackerId: number, data: object) => ({
  type: types.UPDATE_TRACKE,
  payload: { trackerId, data },
});

export const updateTrackerSettingsRequestedAction = (
  settingId: number,
  settings: object
) => ({
  type: types.UPDATE_TRACKER_SETTINGS_REQUESTED,
  payload: { settingId, settings },
});

export const updateTrackerSettingsSucceedAction = (settings: object) => ({
  type: types.UPDATE_TRACKER_SETTINGS_SUCCEED,
  payload: { settings },
});

export const updateTrackerSettingsFailedAction = (error: object) => ({
  type: types.UPDATE_TRACKER_SETTINGS_FAILED,
  payload: { error },
});
