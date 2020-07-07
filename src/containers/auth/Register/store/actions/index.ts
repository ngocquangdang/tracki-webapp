import { PayloadType } from '@Interfaces';
import * as types from '../definitions';

export function registerRequestAction(payload: PayloadType, callback: any) {
  return {
    type: types.REGISTER_REQUESTED,
    payload: {
      data: payload,
      callback,
    },
  };
}

export function updateStore(payload: PayloadType) {
  return {
    type: types.UPDATE_STORE,
    payload,
  };
}

export function registerSuccessAction(payload: PayloadType) {
  return {
    type: types.REGISTER_SUCCEED,
    payload,
  };
}

export function registerFailAction(payload: PayloadType) {
  return {
    type: types.REGISTER_FAILED,
    payload,
  };
}
