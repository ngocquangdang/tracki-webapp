import axiosClient from '@Utils/axios';

const DEVICE_DETAIL = '/v4/accounts/108384/devices/details';

export const getDevice = async () => {
  return axiosClient.get(DEVICE_DETAIL);
};
