import axiosClient from '@Utils/axios';

export const getUser = async (accountId: number) => {
  return await axiosClient.get(`v3/accounts/${accountId}`);
};

export const updatePrefrence = async (
  accountId: number,
  preferences: object
) => {
  return await axiosClient.put(
    `v3/accounts/${accountId}/preferences`,
    preferences
  );
};

export const updateInfoUser = async (accountId: number, infoUser: object) => {
  return await axiosClient.put(`internal/v1/accounts/${accountId}`, infoUser);
};
