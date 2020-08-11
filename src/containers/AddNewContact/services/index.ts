import axiosClient from '@Utils/axios';

export const createContact = async (account_id, data) => {
  return await axiosClient.post(`/v3/accounts/${account_id}/contacts`, data);
};
