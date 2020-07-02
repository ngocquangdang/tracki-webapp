import { PayloadType } from '@Interfaces';
import * as types from '../definitions';

export function registerRequestAction(payload: PayloadType) {
  return {
    type: types.REGISTER_REQUESTED,
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
