import axiosClient from '@Utils/axios';

const DEVICE_DETAIL = '/v4/accounts';

export const getDevice = async (id: number) => {
  const url = `${DEVICE_DETAIL}/${id}/devices/details`;
  return axiosClient.get(url);
};
