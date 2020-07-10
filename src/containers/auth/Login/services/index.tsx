import axiosClient from '@Utils/axios';
import ILoginPage from '../interfaces';

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
      client_id: '943f9b0f-73c8-4435-8801-0260db687f05',
      redirect_uri: 'https://api.dev.tracki.com/api/internal/v1/oauth_redirect',
      response_type: 'code',
      scope: 'locations,notifications,devices,accounts,settings,geozones',
    },
    withCredentials: true,
  });
  return axiosClient.post(
    OAUTH_TOKEN_ENDPOINT,
    {
      client_id: '943f9b0f-73c8-4435-8801-0260db687f05',
      client_secret: '96ca64b0ae5f7005fd18387a28019615',
      code: response.data?.code,
      redirect_uri: 'https://api.dev.tracki.com/api/internal/v1/oauth_redirect',
    },
    {
      withCredentials: true,
    }
  );
};
