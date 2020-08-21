import axiosClient from '@Utils/axios';

const FORGOT_PW_ENDPOINT = '/internal/v1/user/mobile/password/reset';
const CONFIRM_CODE_ENDPOINT = `${FORGOT_PW_ENDPOINT}/match`;
const RESET_PW_ENDPOINT = '/internal/v1/user/mobile/password/reset';
export const forgotPassword = (payload: any) => {
  return axiosClient.post(FORGOT_PW_ENDPOINT, payload);
};

export const confirmCode = (payload: any) => {
  return axiosClient.post(CONFIRM_CODE_ENDPOINT, payload);
};

export const resetPassword = (payload: any) => {
  return axiosClient.put(RESET_PW_ENDPOINT, payload);
};
