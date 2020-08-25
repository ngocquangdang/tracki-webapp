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

export const generateLinkShareLocationRequest = (duration: object) => ({
  type: types.ACTIVE_LINK_SHARE_REQUESTED,
  payload: { duration },
});

export const generateLinkShareLocationSucceed = (data: object) => ({
  type: types.ACTIVE_LINK_SHARE_SUCCEED,
  payload: { data },
});

export const generateLinkShareLocationFailed = (error: object) => ({
  type: types.ACTIVE_LINK_SHARE_FAILED,
  payload: { error },
});

export const deactiveLinkShareLocationRequest = () => ({
  type: types.DEACTIVE_LINK_SHARE_REQUESTED,
});

export const deactiveLinkShareLocationSuccess = () => ({
  type: types.DEACTIVE_LINK_SHARE_SUCCEED,
});

export const deactiveLinkShareLocationFailed = (error: object) => ({
  type: types.DEACTIVE_LINK_SHARE_FAILED,
  payload: { error },
});

export const sendBeepRequest = (data: object) => ({
  type: types.SEND_BEEP_REQUESTED,
  payload: { data },
});

export const sendBeepSucceed = () => ({
  type: types.SEND_BEEP_SUCCEED,
});

export const sendBeepFailed = (error: object) => ({
  type: types.SEND_BEEP_FAILED,
  payload: { error },
});

export const resetBeepAction = () => ({
  type: types.RESET_BEEP,
});

export const updatePreferancesRequestedAction = (speed_unit: string) => ({
  type: types.UPDATE_PREFERANCES_TRACKER_REQUESTED,
  payload: { speed_unit },
});

export const updatePreferancesSucceedAction = (speed_unit: string) => ({
  type: types.UPDATE_PREFERANCES_TRACKER_SUCCESSED,
  payload: { speed_unit },
});

export const updatePreferancesFailedAction = (error: object) => ({
  type: types.UPDATE_PREFERANCES_TRACKER_FAILED,
  payload: { error },
});

export const getDeviceSettingRequestedAction = (
  setting_id: number,
  device_id: number
) => ({
  type: types.GET_DEVICE_SETTING_REQUESTED,
  payload: { setting_id, device_id },
});

export const getDeviceSettingSucceedAction = (settings: object) => {
  return {
    type: types.GET_DEVICE_SETTING_SUCCEED,
    payload: { settings },
  };
};

export const getDeviceSettingFailedAction = (error: object) => ({
  type: types.GET_DEVICE_SETTING_FAILED,
  payload: { error },
});
