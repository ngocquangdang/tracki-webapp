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

export const getContactListRequestAction = () => ({
  type: types.GET_LIST_CONTACT_REQUESTED,
});
export const getContactListSucceedAction = (contacts: object) => ({
  type: types.GET_LIST_CONTACT_SUCCESSED,
  payload: { contacts },
});
export const getContactListFailedAction = (error: object) => ({
  type: types.GET_LIST_CONTACT_FAILED,
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

export function addContactRequestAction(data, callback) {
  return {
    type: types.CREATE_NEW_CONTACT_REQUESTED,
    payload: {
      data,
      callback,
    },
  };
}

export function addContactSuccesstAction(payload) {
  return {
    type: types.CREATE_NEW_CONTACT_SUCCESSED,
    payload,
  };
}

export function addContactFailAction(payload) {
  return {
    type: types.CREATE_NEW_CONTACT_FAILED,
    payload,
  };
}
