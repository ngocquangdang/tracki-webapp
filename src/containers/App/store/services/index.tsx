import axiosClient from '@Utils/axios';

const USER_ENDPOINT = '/v3/user';

export const fetchUser = async () => {
  return await axiosClient.get(USER_ENDPOINT);
};

export const fetchTrackers = async (accountId: number) => {
  return await axiosClient.get(`v4/accounts/${accountId}/devices/details`);
};
