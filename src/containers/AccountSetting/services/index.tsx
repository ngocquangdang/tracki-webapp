import axiosClient from '@Utils/axios';
import UserDetail from '../interfaces';

const USER_DETAIL = '/v3/user';
const UPDATE_SETTING =
  'https://dev.trackimo.com/api/v3/accounts/68950/settings/643206';

export const getUser = async () => {
  console.log('_____________getUser', axiosClient);
  return axiosClient.get(USER_DETAIL);
};

export const updateSetting = (body: UserDetail.IStateUser) => {
  return axiosClient.post(UPDATE_SETTING, body);
};
