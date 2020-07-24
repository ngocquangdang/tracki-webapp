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
