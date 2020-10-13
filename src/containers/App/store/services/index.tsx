import axiosClient from '@Utils/axios';
import axiosClientGeobot from '@Utils/axiosGeobot';

const USER_ENDPOINT = '/v3/user';
const LOGOUT_ENDPOINT = '/internal/v1/user/logout';

export const fetchUser = async () => {
  return await axiosClient.get(USER_ENDPOINT);
};

export const logout = async () => {
  return await axiosClient.post(LOGOUT_ENDPOINT);
};

export const logoutGeobotTracki = async (
  token: string,
  refreshToken: string,
  expiresIn: number
) => {
  await axiosClientGeobot.post(
    `/setToken`,
    {
      token,
      refreshToken,
      expiresIn,
    },
    {
      withCredentials: true,
    }
  );
};
