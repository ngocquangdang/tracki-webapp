import axiosClient from '@Utils/axios';

const UPDATE_PW_ENDPOINT = '/v3/user/password';

interface Payload {
  current_password: string;
  new_password: string;
}

export const updatePassword = (payload: Payload) => {
  return axiosClient.put(UPDATE_PW_ENDPOINT, payload);
};
