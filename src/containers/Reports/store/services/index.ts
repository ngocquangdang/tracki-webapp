import axios from 'axios';
import axiosClient from '@Utils/axios';
import { MAPBOX_API_KEY } from '@Definitions/app';

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
  let param;
  if (coordinate.length < 12) {
    param = coordinate.join(';');
  } else {
    const arrayRequest = [
      coordinate[0],
      coordinate[2],
      coordinate[4],
      coordinate[6],
      coordinate[8],
      coordinate[10],
    ];

    param = arrayRequest.join(';');
  }

  return await axios.get(
    `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${param}?access_token=${MAPBOX_API_KEY}`
  );
};
