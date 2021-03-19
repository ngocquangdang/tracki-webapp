import * as types from '../constants';

export function getDevicePlanRequestAction(payload: any) {
  return {
    type: types.GET_RENEW_DEVICE_PLAN_REQUESTED,
    payload,
  };
}

export function getDevicePlanSuccesAction(
  trackerPlan: any,
  account_id: number
) {
  return {
    type: types.GET_RENEW_DEVICE_PLAN_SUCCESSED,
    payload: {
      payload: trackerPlan,
      account_id,
    },
  };
}

export function getDevicePlanFailAction(payload: any) {
  return {
    type: types.GET_RENEW_DEVICE_PLAN_FAILED,
    payload,
  };
}

export function braintreeDropInRequestAction(formData, callback) {
  return {
    type: types.BRAINTREE_DROPIN_RENEW_REQUESTED,
    payload: {
      formData,
      callback,
    },
  };
}

export function braintreeDropInSuccesAction(payload) {
  return {
    type: types.BRAINTREE_DROPIN_RENEW_SUCCESSED,
    payload,
  };
}

export function braintreeDropInFailAction(payload: any) {
  return {
    type: types.BRAINTREE_DROPIN_RENEW_FAILED,
    payload,
  };
}

export function updateStore(payload: any) {
  return {
    type: types.UPDATE_STORE,
    payload,
  };
}

export function renewDeviceRequestAction(
  formData,
  account_id,
  paymentData,
  imei
) {
  return {
    type: types.RENEW_DEVICE_REQUESTED,
    payload: {
      formData,
      account_id,
      paymentData,
      imei,
    },
  };
}

export function renewDeviceSuccesAction(payload) {
  return {
    type: types.RENEW_DEVICE_SUCCESSED,
    payload,
  };
}

export function renewDeviceFailAction(payload: any) {
  return {
    type: types.RENEW_DEVICE_FAILED,
    payload,
  };
}
