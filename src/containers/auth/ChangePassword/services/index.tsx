import axiosClient from '@Utils/axios';

const UPDATE_PW_ENDPOINT = '/internal/v1/user/password';

export const updatePassword = (payload: any) => {
  return axiosClient.put(UPDATE_PW_ENDPOINT, payload);
};
