import axiosClient from '@Utils/axios';

export const getTrackerSettings = async (
  accountId: number,
  settingId: number
) => {
  return await axiosClient.get(
    `v3/accounts/${accountId}/settings/${settingId}`
  );
};

// v3/accounts/108384/devices/560218420/icon
export const uploadImage = async (
  accountId: number,
  trackerId: number,
  formdata: any
) => {
  return await axiosClient.post(
    `v3/accounts/${accountId}/devices/${trackerId}/icon`,
    formdata
  );
};

export const getPreferance = async (account_id: number) => {
  return await axiosClient.get(`v3/accounts/${account_id}/preferences`);
};

// v3/accounts/108384/preferences
export const updatePreferences = async (
  accountId: number,
  preferences: object
) => {
  return await axiosClient.put(
    `v3/accounts/${accountId}/preferences`,
    preferences
  );
};

// v3/accounts/108384/settings/728617
export const updateSettings = async (
  accountId: number,
  settingId: number,
  settings: object
) => {
  return await axiosClient.put(
    `v3/accounts/${accountId}/settings/${settingId}`,
    settings
  );
};

export const getContactList = async (accountId: number) => {
  return await axiosClient.get(`/v3/accounts/${accountId}/contacts`);
};

//share location api
export const activeLinkShareLocation = async (
  accountId: number,
  trackerId: number,
  duration: object
) => {
  return await axiosClient.post(
    `v3/accounts/${accountId}/devices/${trackerId}/share`,
    duration
  );
};

export const deactiveLinkShareLocation = async (
  accountId: number,
  trackerId: number
) => {
  return await axiosClient.delete(
    `v3/accounts/${accountId}/devices/${trackerId}/share`
  );
};

export const sendBeep = async (accountId: number, data: object) => {
  return await axiosClient.post(
    `v3/accounts/${accountId}/devices/ops/beep`,
    data
  );
};
