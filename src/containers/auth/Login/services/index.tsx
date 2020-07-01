import axiosClient from '@Utils/axios';
import ILoginPage from '../interfaces';

const LOGIN_ENDPOINT = '/internal/v2/user/login';

export const login = (body: ILoginPage.IStateLogin) => {
  return axiosClient.post(LOGIN_ENDPOINT, body);
};
