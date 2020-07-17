import axiosClient from '@Utils/axios';
import UserDetail from '../interfaces';

const USER_DETAIL = '/v3/user';
const UPDATE_USER = '/v3/accounts';

export const getUser = async () => {
  return axiosClient.get(USER_DETAIL);
};

export const updateUser = (body: UserDetail.IStateUser, id: number) => {
  const url = `${UPDATE_USER}/${id}/preferences`;
  return axiosClient.put(url, body);
};
