import axiosClient from '@Utils/axios';
import axiosClientGeobot from '@Utils/axiosGeobot';
import ILoginPage from '../interfaces';
import {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URI,
} from '@Definitions/app';

const LOGIN_ENDPOINT = '/internal/v2/user/login';
const OAUTH_AUTHORIZE_ENDPOINT = '/v3/oauth2/auth';
const OAUTH_TOKEN_ENDPOINT = '/v3/oauth2/token';

export const login = async (body: ILoginPage.IStateLogin) => {
  await axiosClient.post(
    LOGIN_ENDPOINT,
    { ...body, whitelabel: 'TRACKI' },
    {
      withCredentials: true,
    }
  );
  const response = await axiosClient.get(OAUTH_AUTHORIZE_ENDPOINT, '', {
    params: {
      client_id: OAUTH_CLIENT_ID,
      redirect_uri: OAUTH_REDIRECT_URI,
      response_type: 'code',
      scope: 'locations,notifications,devices,accounts,settings,geozones',
    },
    withCredentials: true,
  });
  return axiosClient.post(
    OAUTH_TOKEN_ENDPOINT,
    {
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
      code: response.data?.code,
      redirect_uri: OAUTH_REDIRECT_URI,
    },
    {
      withCredentials: true,
    }
  );
};

export const loginGeobotTracki = async (
  token: string,
  refreshToken: string,
  expiresIn: string
) => {
  await axiosClientGeobot.get(
    `/setToken?token=${token}&refreshToken=${refreshToken}&expiresIn=${expiresIn}`
  );
};
