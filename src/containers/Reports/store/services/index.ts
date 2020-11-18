import axiosClient from '@Utils/axios';

export const fetchNotificationUnread = async (
  accountId: number,
  query: string
) => {
  return await axiosClient.get(`/v3/accounts/${accountId}/events?${query}`);
};

export const getHistoryStopTracker = async (
  accountId: number,
  trackerId: number,
  query: string
) => {
  return await axiosClient.get(
    `v3/accounts/${accountId}/devices/${trackerId}/history?${query}`
  );
};
