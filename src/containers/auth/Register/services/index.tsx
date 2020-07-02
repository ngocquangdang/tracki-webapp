import axiosClient from '@Utils/axios';

import IRegisterPage from '../interfaces';

const REGISTER_ENDPOINT = '/internal/v4/user/signup';

export const register = async (payload: IRegisterPage.RegisterState) => {
  return await axiosClient.post(REGISTER_ENDPOINT, payload);
};
