import axiosClient from '@Utils/axios';

export const fetchTrackers = async (accountId: number) => {
  return await axiosClient.get(`v4/accounts/${accountId}/devices/details`);
};

export const fetchGeofences = async (
  accountId: number,
  option?: { limit: number; page: number }
) => {
  let enpoint = `v3/accounts/${accountId}/geozones`;
  if (option) {
    const { limit, page } = option;
    enpoint += `?limit=${limit}&page=${page}`;
  }
  return await axiosClient.get(enpoint);
};

export const deleteGeofence = async (accountId: number, geofenceId: number) =>
  await axiosClient.delete(`v3/accounts/${accountId}/geozones/${geofenceId}`);

export const updateGeofence = async (
  accountId: number,
  geofenceId: number,
  data: object
) =>
  await axiosClient.put(
    `v3/accounts/${accountId}/geozones/${geofenceId}`,
    data
  );
