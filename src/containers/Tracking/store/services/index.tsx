import axiosClient from '@Utils/axios';

export const fetchTrackers = async (accountId: number) => {
  return await axiosClient.get(`v4/accounts/${accountId}/devices/details`);
};

export const getHistoryTracker = async (
  accountId: number,
  trackerId: number,
  fromDate: number,
  toDate: number,
  limit: number,
  page: number,
  type: number
) => {
  return await axiosClient.get(
    `v3/accounts/${accountId}/devices/${trackerId}/history?from=${fromDate}&to=${toDate}&limit=${limit}&page=${page}&type=${type}`
  );
};

export const getAlarmTracker = async (
  accountId: number,
  trackerId: number,
  limit: number,
  page: number,
  type: string
) => {
  return await axiosClient.get(
    `v3/accounts/${accountId}/devices/${trackerId}/events?alarm_types=${type}&limit=${limit}&page=${page}`
  );
};
