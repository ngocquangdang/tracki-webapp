import axiosClient from '@Utils/axios';

const ASSIGNED_ENDPOINT = '/internal/v1';
const USER_ENPOINT = '/v3';

export const getRenewalDevicePlansGroup = async data => {
  return await axiosClient.get(
    `${ASSIGNED_ENDPOINT}/devices/${data}/default_renewal_plans_group`
  );
};

export const getRenewalDevicePlansGroupNonce = async deviceId => {
  // return this.getRenewalDevicePlansGroup(deviceId);
  return await axiosClient.get(
    `${ASSIGNED_ENDPOINT}/devices/${deviceId}/default_renewal_plans_group_nonce`
  );
};

export const getUserInfo = async () => {
  return await axiosClient.get(`${USER_ENPOINT}/user`);
};

export const getTokenForPayment = async (data, selectedPlanId, account_id) => {
  return await axiosClient.get(
    `${ASSIGNED_ENDPOINT}/activation/accounts/${account_id}/paypal/token?device_id=${data.device_id}&plan_id=${selectedPlanId}`
  );
};

export const getBrainTreeDropInToken = async (accountId, deviceId, planId) => {
  return await axiosClient.get(
    `${ASSIGNED_ENDPOINT}/activation/accounts/${accountId}/paypal/token?device_id=${deviceId}&plan_id=${planId}`
  );
};

export const setRenewalBraintreePlanToDevice = async (
  account_id,
  deviceId,
  planId,
  braintreeForm
) => {
  return await axiosClient.put(
    `${ASSIGNED_ENDPOINT}
      /activation/accounts/${account_id}/devices/${deviceId}/plan/${planId}/renew/braintree`,
    braintreeForm
  );
};

export const setRenewalBraintreeNoncePlanToDevice = async (
  account_id,
  device_id,
  data
) => {
  return await axiosClient.post(
    `${ASSIGNED_ENDPOINT}/activation/accounts/${account_id}/devices/${device_id}/paypal/renew`,
    data
  );
};
