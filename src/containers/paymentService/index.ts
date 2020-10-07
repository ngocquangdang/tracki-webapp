import axiosClient from '@Utils/axios';

const ASSIGNED_ENDPOINT = '/internal/v1';

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
