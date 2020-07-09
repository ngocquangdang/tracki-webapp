import axiosClient from '@Utils/axios';
import UserDetail from '../interfaces';

const USER_DETAIL = '/v3/user';
const UPDATE_SETTING =
  'https://dev.trackimo.com/api/v3/accounts/68950/settings/643206';
export const getUser = async () => {
  console.log('_____________getUser');
  await axiosClient.setHeader('42eeecd4-b4e4-40d9-b064-c23e8f1e8141');
  return axiosClient.get(USER_DETAIL);
};

export const updateSetting = (body: UserDetail.IStateUser) => {
  return axiosClient.post(UPDATE_SETTING, body);
};
