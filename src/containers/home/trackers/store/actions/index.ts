import { PayloadType } from '@Interfaces';
import * as types from '../definitions';

export function getDeviceRequestAction(accountId: number) {
  return {
    type: types.DEVICE_REQUESTED,
    payload: { accountId },
  };
}

export function getDeviceSuccessAction(device: PayloadType) {
  return {
    type: types.DEVICE_SUCCEED,
    payload: { device },
  };
}

export function getDeviceFailAction(errors: PayloadType) {
  return {
    type: types.DEVICE_FAILED,
    payload: { errors },
  };
}
