import * as types from '../constants';

export function getCountryCodeRequestedAction() {
  return {
    type: types.GET_CONTRY_CODE_REQUESTED,
  };
}
export function getCountryCodeSucceedAction(data: object) {
  return {
    type: types.GET_CONTRY_CODE_SUCCESSED,
    payload: { data },
  };
}
export function getCountryCodeFailedAction(error) {
  return {
    type: types.GET_CONTRY_CODE_FAILED,
    payload: { error },
  };
}

export function getCountryCodeFollowRequestedAction(code: number) {
  return {
    type: types.GET_CONTRY_CODE_FOLLOW_REQUESTED,
    payload: { code },
  };
}

export function getCountryCodeFollowSucceedAction(data: object) {
  return {
    type: types.GET_CONTRY_CODE_FOLLOW_SUCCESSED,
    payload: { data },
  };
}

export function getCountryCodeFollowFailedAction(error) {
  return {
    type: types.GET_CONTRY_CODE_FOLLOW_FAILED,
    payload: { error },
  };
}

export function updateSubscriptionStore(payload: any) {
  return {
    type: types.UPDATE_SUBSCRIPTION_STORE,
    payload,
  };
}

export function braintreeDropInSubscriptionRequestAction(formData, callback) {
  return {
    type: types.BRAINTREE_DROPIN_SUBSCRIPTION_REQUESTED,
    payload: {
      formData,
      callback,
    },
  };
}

export function braintreeDropInSubscriptionSuccesAction(payload) {
  return {
    type: types.BRAINTREE_DROPIN_SUBSCRIPTION_SUCCESSED,
    payload,
  };
}

export function braintreeDropInSubscriptionFailAction(payload: any) {
  return {
    type: types.BRAINTREE_DROPIN_SUBSCRIPTION_FAILED,
    payload,
  };
}

export function buySmsSubscriptionSuccesAction(payload) {
  return {
    type: types.BUY_SMS_SUBSCRIPTION_SUCCESSED,
    payload,
  };
}

export function buySmsSubscriptionFailAction(payload: any) {
  return {
    type: types.BUY_SMS_SUBSCRIPTION_FAILED,
    payload,
  };
}

export function buyFastTrackingSubscriptionSuccesAction(payload) {
  return {
    type: types.BUY_FAST_TRACKING_SUBSCRIPTION_SUCCESSED,
    payload,
  };
}

export function buyFastTrackingSubscriptionFailAction(payload: any) {
  return {
    type: types.BUY_FAST_TRACKING_SUBSCRIPTION_FAILED,
    payload,
  };
}

export function getFastTrackingFollowRequestedAction(code: number) {
  return {
    type: types.GET_FATS_TRACKING_FOLLOW_CODE_REQUESTED,
    payload: { code },
  };
}

export function getFastTrackingFollowSucceedAction(data: object) {
  return {
    type: types.GET_FATS_TRACKING_FOLLOW_CODE_SUCCEED,
    payload: { data },
  };
}

export function getFastTrackingFollowFailedAction(error) {
  return {
    type: types.GET_FATS_TRACKING_FOLLOW_CODE_FAILED,
    payload: { error },
  };
}
