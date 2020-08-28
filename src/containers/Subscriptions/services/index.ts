import axiosClient from '@Utils/axios';

export const getCountryCode = async () => {
  return axiosClient.get('/v3/countrycodes');
};

export const getCountryCodeFollowCode = async (code: number) => {
  return axiosClient.get(`/v3/country/${code}/smsoptions`);
};

export const getUserInfo = async () => {
  return await axiosClient.get(`/v3/user`);
};

export const buySMSOption = async (account_id, device_id, data) => {
  return await axiosClient.post(
    `/internal/v1//activation/accounts/${account_id}/devices/${device_id}/paypal/sms`,
    data
  );
};
