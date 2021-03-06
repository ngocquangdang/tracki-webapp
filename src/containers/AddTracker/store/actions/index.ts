import * as types from '../constants';

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

export function updatePersonalizeDeviceRequestAction(
  data,
  formData,
  account_id,
  callback
) {
  return {
    type: types.UPDATE_PERSONALIZE_DEVICE_REQUESTED,
    payload: {
      data,
      formData,
      account_id,
      callback,
    },
  };
}

export function addDeviceSuccesAction(payload) {
  return {
    type: types.UPDATE_PERSONALIZE_DEVICE_SUCCESSED,
    payload,
  };
}

export function addDeviceFailAction(payload: any) {
  return {
    type: types.UPDATE_PERSONALIZE_DEVICE_FAILED,
    payload,
  };
}

export function braintreeDropInRequestAction(
  formData,
  callback,
  setDisableButton
) {
  return {
    type: types.BRAINTREE_DROPIN_REQUESTED,
    payload: {
      formData,
      callback,
      setDisableButton,
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

export function asignedDeciveRequestAction(plan, device_id) {
  return {
    type: types.ASSIGNED_DEVICE_REQUESTED,
    payload: {
      plan,
      device_id,
    },
  };
}

export function asignedDeciveSuccesAction(payload) {
  return {
    type: types.ASSIGNED_DEVICE_SUCCESSED,
    payload,
  };
}

export function asignedDeciveFailAction(payload: any) {
  return {
    type: types.ASSIGNED_DEVICE_FAILED,
    payload,
  };
}

export function resetStoreAddTracker() {
  return {
    type: types.RESET_STORE_ADD_TRACKER,
  };
}

// new channel sales action
export function newChannelSaleRequestAction(data) {
  return {
    type: types.NEW_CHANNEL_SALE_REQUESTED,
    payload: {
      data,
    },
  };
}

export function newChannelSaleSuccesAction() {
  return {
    type: types.NEW_CHANNEL_SALE_SUCCESSED,
  };
}

export function newChannelSaleFailAction(payload: any) {
  return {
    type: types.NEW_CHANNEL_SALE_FAILED,
    payload,
  };
}

// update channel sales action

export function updateChannelSaleRequestAction(data) {
  return {
    type: types.UPDATE_CHANNEL_SALE_REQUESTED,
    payload: {
      data,
    },
  };
}

export function updateChannelSaleSuccesAction() {
  return {
    type: types.UPDATE_CHANNEL_SALE_SUCCESSED,
  };
}

export function updateChannelSaleFailAction(payload: any) {
  return {
    type: types.UPDATE_CHANNEL_SALE_FAILED,
    payload,
  };
}
