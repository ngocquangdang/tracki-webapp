import * as types from '../constants';

// get wallet info
export const getMyWallletRequest = id => {
  return {
    type: types.GET_MY_WALLET_REQUESTED,
    payload: { id },
  };
};

export const getMyWalletSucceed = data => {
  return {
    type: types.GET_MY_WALLET_SUCCEED,
    payload: { data },
  };
};

export const getMyWallletFailed = error => {
  return {
    type: types.GET_MY_WALLET_FAILED,
    payload: { error },
  };
};

// get adversiment
export const getAdvertimentRequest = () => {
  return {
    type: types.GET_ADVERTIMENT_REQUESTED,
  };
};

export const getAdvertimentSucceed = data => {
  return {
    type: types.GET_ADVERTIMENT_SUCCEED,
    payload: { data },
  };
};

export const getAdvertimentFailed = error => {
  return {
    type: types.GET_ADVERTIMENT_FAILED,
    payload: { error },
  };
};

// get point history
export const getPointHistoryRequest = id => {
  return {
    type: types.GET_POINT_HISTORY_REQUESTED,
    payload: { id },
  };
};

export const getPointHistorySucceed = data => {
  return {
    type: types.GET_POINT_HISTORY_SUCCEED,
    payload: { data },
  };
};

export const getPointHistoryFailed = error => {
  return {
    type: types.GET_POINT_HISTORY_FAILED,
    payload: { error },
  };
};

// get product
export const getProductRequest = () => {
  return {
    type: types.GET_PRODUCT_REQUESTED,
  };
};

export const getProductSucceed = (tracker, accesory) => {
  return {
    type: types.GET_PRODUCT_SUCCEED,
    payload: { tracker, accesory },
  };
};

export const getProductFailed = error => {
  return {
    type: types.GET_PRODUCT_FAILED,
    payload: { error },
  };
};

// get subscription
export const getSubscriptionPlanRequest = () => {
  return {
    type: types.GET_SUBSCRIPTION_REQUESTED,
  };
};

export const getSubscriptionPlanSucceed = data => {
  return {
    type: types.GET_SUBSCRIPTION_SUCCEED,
    payload: { data },
  };
};

export const getSubscriptionPlanFailed = error => {
  return {
    type: types.GET_SUBSCRIPTION_FAILED,
    payload: { error },
  };
};

// get subscription
export const getSMSPlanRequest = () => {
  return {
    type: types.GET_SMS_PLAN_REQUESTED,
  };
};

export const getSMSPlanSucceed = data => {
  return {
    type: types.GET_SMS_PLAN_SUCCEED,
    payload: { data },
  };
};

export const getSMSPlanFailed = error => {
  return {
    type: types.GET_SMS_PLAN_FAILED,
    payload: { error },
  };
};

// set hidden header wallet
export const setHiddenHeader = type => {
  return {
    type: types.SET_HIDDEN_HEADDER,
    payload: { type },
  };
};

// set view page wallet
export const setViewPage = page => {
  return {
    type: types.SET_VIEW_PAGE,
    payload: { page },
  };
};

// get Transction detail

export const getTransactionDetailRequest = () => {
  return {
    type: types.GET_TRANSACTION_DETAIL_REQUESTED,
  };
};

export const getTransactionDetailSucceed = data => {
  return {
    type: types.GET_TRANSACTION_DETAIL_SUCCEED,
    payload: { data },
  };
};

export const getTransactionDetailFailed = error => {
  return {
    type: types.GET_TRANSACTION_DETAIL_FAILED,
    payload: { error },
  };
};
