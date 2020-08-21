import axiosClient from '@Utils/axios';
import { UNWIREDLABS_API_KEY } from '@Definitions/app';

export const fetchNotification = async (
  accountId: number,
  alarm_types: string,
  limit: number,
  page: number
) => {
  return await axiosClient.get(
    `/v3/accounts/${accountId}/events?alarm_types=${alarm_types}&limit=${limit}&page=${page}`
  );
};

export const fetchAddress = async (lat: number, lng: number) => {
  return await axiosClient.get(
    `https://us1.unwiredlabs.com/v2/reverse.php?token=${UNWIREDLABS_API_KEY}&lat=${lat}&lon=${lng}`
  );
};
