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

export function getTokenForPaymentRequestAction(payload: any) {
  return {
    type: types.GET_TOKEN_FOR_PAYMENT_REQUESTED,
    payload,
  };
}

export function getTokenForPaymentSuccesAction(trackerPlan: any) {
  console.log('getTokenForPaymentSuccesAction -> trackerPlan', trackerPlan);
  return {
    type: types.GET_TOKEN_FOR_PAYMENT_SUCCESSED,
    payload: trackerPlan,
  };
}

export function getTokenForPaymentFailAction(payload: any) {
  return {
    type: types.GET_TOKEN_FOR_PAYMENT_FAILED,
    payload,
  };
}

export function setBrainTreeDeviceRequestAction(account_id, device_id, data) {
  return {
    type: types.SET_BRAINTREE_DEVICE_REQUESTED,
    payload: {
      account_id,
      device_id,
      data,
    },
  };
}

export function setBrainTreeDeviceSuccesAction(payload) {
  return {
    type: types.SET_BRAINTREE_DEVICE_SUCCESSED,
    payload,
  };
}

export function setBrainTreeDeviceFailAction(payload: any) {
  return {
    type: types.SET_BRAINTREE_DEVICE_FAILED,
    payload,
  };
}

export function braintreeDropInRequestAction(formData, callback) {
  return {
    type: types.BRAINTREE_DROPIN_REQUESTED,
    payload: {
      formData,
      callback,
    },
  };
}

export function braintreeDropInSuccesAction(payload) {
  return {
    type: types.BRAINTREE_DROPIN_SUCCESSED,
    payload,
  };
}

export function braintreeDropInFailAction(payload: any) {
  return {
    type: types.BRAINTREE_DROPIN_FAILED,
    payload,
  };
}

export function updateStore(payload: any) {
  return {
    type: types.UPDATE_STORE,
    payload,
  };
}

export function renewDeviceRequestAction(formData, account_id, paymentData) {
  return {
    type: types.RENEW_DEVICE_REQUESTED,
    payload: {
      formData,
      account_id,
      paymentData,
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
