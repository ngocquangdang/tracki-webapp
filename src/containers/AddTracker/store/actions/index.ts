import * as types from '../constances';

export function checkDeviceAssignedRequestAction(payload: any, callback: any) {
  return {
    type: types.CHECK_DEVICEID_ASSIGNED_REQUESTED,
    payload: {
      data: payload,
      callback,
    },
  };
}
export function checkDeviceAssignedSuccesAction(data: any) {
  return {
    type: types.CHECK_DEVICEID_ASSIGNED_SUCCESSED,
    payload: data,
  };
}
export function checkDeviceAssignedFailAction(payload: any) {
  return {
    type: types.CHECK_DEVICEID_ASSIGNED_FAILED,
    payload,
  };
}

export function getDevicePlanRequestAction(payload: any) {
  return {
    type: types.GET_DEVICE_PLAN_REQUESTED,
    payload,
  };
}
export function getDevicePlanSuccesAction(
  trackerPlan: any,
  account_id: number
) {
  return {
    type: types.GET_DEVICE_PLAN_SUCCESSED,
    payload: {
      payload: trackerPlan,
      account_id,
    },
  };
}
export function getDevicePlanFailAction(payload: any) {
  return {
    type: types.GET_DEVICE_PLAN_FAILED,
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
export function updateStore(payload: any) {
  return {
    type: types.UPDATE_STORE,
    payload,
  };
}
export function getSubAccountRequestAction(
  account_id: number,
  device_id: number
) {
  return {
    type: types.GET_SUB_ACCOUNT_REQUESTED,
    payload: { account_id, device_id },
  };
}

export function getSubAccountSuccesAction(payload) {
  return {
    type: types.GET_SUB_ACCOUNT_SUCCESSED,
    payload,
  };
}

export function getSubAccountFailAction(payload: any) {
  return {
    type: types.GET_SUB_ACCOUNT_FAILED,
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

export function addDeviceRequestAction(
  data,
  formData,
  account_id,
  paymentData,
  callback
) {
  return {
    type: types.ADD_DEVICE_REQUESTED,
    payload: {
      data,
      formData,
      account_id,
      paymentData,
      callback,
    },
  };
}

export function addDeviceSuccesAction(payload) {
  return {
    type: types.ADD_DEVICE_SUCCESSED,
    payload,
  };
}

export function addDeviceFailAction(payload: any) {
  return {
    type: types.ADD_DEVICE_FAILED,
    payload,
  };
}
