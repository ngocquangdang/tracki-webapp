import axiosClient from '@Utils/axios';

export const getSharedDevicesStatus = (devicesIds, account_id) => {
  return axiosClient.get(
    `v3/accounts/${account_id}/devices/share?device_ids=${devicesIds}`,
    {}
  );
};
export const getDevicesByToken = token => {
  return axiosClient.get(`v3/public/devices/${token}`, {}, true);
};
