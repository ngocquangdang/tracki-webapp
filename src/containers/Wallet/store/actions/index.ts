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
