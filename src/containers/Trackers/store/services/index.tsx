import axiosClient from '@Utils/axios';

export const fetchTrackers = async (accountId: number) => {
  return await axiosClient.get(`v4/accounts/${accountId}/devices/details`);
};

export const fetchAssignmentsByTrackerIds = async (
  accountId: number,
  trackerIds: number[]
) => {
  return await axiosClient.post(
    `v3/accounts/${accountId}/devices/assignments`,
    trackerIds
  );
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

export const linkTrackers = async (
  accountId: number,
  geofenceId: number,
  trackerIds: number[]
) =>
  await axiosClient.put(
    `v3/accounts/${accountId}/geozones/assign/${geofenceId}`,
    trackerIds
  );

export const unlinkTrackers = async (
  accountId: number,
  geofenceId: number,
  trackerIds: number[]
) =>
  await axiosClient.delete(
    `v3/accounts/${accountId}/geozones/assign/${geofenceId}`,
    {},
    { data: trackerIds }
  );

export const getAllAssignment = async (accountId: number, geofenceId: number) =>
  await axiosClient.get(
    `v3/accounts/${accountId}/geozones/${geofenceId}/devices`
  );

export const createNewGeofence = async (accountId: number, geofence: object) =>
  await axiosClient.post(`v3/accounts/${accountId}/geozones`, geofence);

export const refreshLocaion = async (accountId: number, data: object) =>
  await axiosClient.post(
    `v3/accounts/${accountId}/devices/ops/getLocation`,
    data
  );
