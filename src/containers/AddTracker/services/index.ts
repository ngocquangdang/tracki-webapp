import axiosClient from '@Utils/axios';

const ASSIGNED_ENDPOINT = '/internal/v1';
const USER_ENPOINT = '/v3';

export const checkDeviceAssigned = async data => {
  return await axiosClient.get(
    `${ASSIGNED_ENDPOINT}/devices/${data.device_id}/assigned?challenge=${data.imei}`
  );
};
export const setPrepaidPlanToDevice = async data => {
  return await axiosClient.put(
    `${ASSIGNED_ENDPOINT}/activation/accounts/${data.account_id}/devices/${data.device_id}/plan/${data.plan_id}/activate/prepaid`,
    data
  );
};

export const getTrackerPlan = async data => {
  return await axiosClient.get(
    `${ASSIGNED_ENDPOINT}/devices/${data.device_id}/plans_group_nonce`
  );
};
export const getUserInfo = async () => {
  return await axiosClient.get(`${USER_ENPOINT}/user`);
};
export const getTokenForPayment = async (data, selectedPlanId, account_id) => {
  console.log('getTokenForPayment -> data', data);
  console.log('getTokenForPayment -> account_id', account_id);
  //data: {}
  return await axiosClient.get(
    `${ASSIGNED_ENDPOINT}/activation/accounts/${account_id}/paypal/token?device_id=${data.device_id}&plan_id=${selectedPlanId}`
  );
};
export const getBrainTreeDropInToken = async (accountId, deviceId, planId) => {
  return await axiosClient.get(
    `${ASSIGNED_ENDPOINT}/activation/accounts/${accountId}/paypal/token?device_id=${deviceId}&plan_id=${planId}`
  );
};
