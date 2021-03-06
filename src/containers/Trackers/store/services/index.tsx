import axiosClient from '@Utils/axios';

export const fetchTrackers = async (
  accountId: number,
  page: number = 1,
  limit: number = 200
) => {
  return await axiosClient.get(
    `v4/accounts/${accountId}/devices/details?page=${page}&limit=${limit}`
  );
};

export const trackerFullDetails = async (
  accountId: number,
  deviceId: number
) => {
  return await axiosClient.get(
    `v3/accounts/${accountId}/devices/${deviceId}/details/full`
  );
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

export const deviceSubscriptionDetail = async data => {
  return axiosClient.get(
    `/support/v1/device/all?search=${data.device_id}&page=${data.page}&size=${data.size}`
  );
};

export const getSmsCounter = async (account_id: number, device_id: number) => {
  return axiosClient.get(
    `/v3/accounts/${account_id}/devices/${device_id}/smscounters`
  );
};

export const getSOSalert = async (
  accountId: number,
  alarmTypes: string,
  deviceIds: number[] | string,
  limit: number,
  page: number,
  readStatus: string,
  sortDirection: string
) => {
  return axiosClient.get(
    `v3/accounts/${accountId}/events?alarm_types=${alarmTypes}&device_ids=${deviceIds}&limit=${limit}&page=${page}&read_status=${readStatus}&sort_direction=${sortDirection}`
  );
};

export const readSOSalert = async (
  accountId: number,
  data: {
    alertId: number | string;
    priority: string;
    read: boolean;
  }
) => {
  return axiosClient.put(
    `v3/accounts/${accountId}/events/${data.alertId}`,
    data
  );
};
