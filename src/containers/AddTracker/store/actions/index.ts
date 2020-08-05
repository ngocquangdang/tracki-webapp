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
