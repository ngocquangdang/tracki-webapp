import * as types from '../constants';

export const getDeviceByTokenRequestedAction = (token: string) => ({
  type: types.GET_DEVICE_BY_TOKEN_REQUESTED,
  payload: { token },
});

export const getDeviceByTokenSucceedAction = (device: object) => {
  return {
    type: types.GET_DEVICE_BY_TOKEN_SUCCESSED,
    payload: { device },
  };
};

export const getDeviceByTokenFailedAction = (error: object) => ({
  type: types.GET_DEVICE_BY_TOKEN_FAILED,
  payload: { error },
});
