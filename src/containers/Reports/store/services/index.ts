import axios from 'axios';
import axiosClient from '@Utils/axios';
import { GOOGLE_API_KEY } from '@Definitions/app';

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

export const getOptimizedTrip = async (coordinate: number[]) => {
  console.log('zzzzzzzz', coordinate);
  return await axios.get(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${
      coordinate[0]
    }&destination=${coordinate[coordinate.length - 1]}&key=${GOOGLE_API_KEY}`
  );
};
