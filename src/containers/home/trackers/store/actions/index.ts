import { PayloadType } from '@Interfaces';
import * as types from '../definitions';

export function getDeviceRequestAction(data: any) {
  return {
    type: types.DEVICE_REQUESTED,
    payload: { data },
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
