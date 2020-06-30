import { PayloadType } from '@Interfaces';
import * as types from '../definitions';

export function forgotRequestAction(payload: PayloadType) {
  return {
    type: types.FORGOT_PASSWORD_REQUESTED,
    payload
  };
}

export function forgotSuccessAction(payload: PayloadType) {
  return {
    type: types.FORGOT_PASSWORD_SUCCEED,
    payload,
  };
}

export function forgotFailAction(payload: PayloadType) {
  return {
    type: types.FORGOT_PASSWORD_FAILED,
    payload,
  };
}

export function confirmCodeRequestAction(payload: PayloadType) {
  return {
    type: types.CONFIRM_CODE_REQUESTED,
    payload
  };
}

export function confirmCodeSuccessAction(payload: PayloadType) {
  return {
    type: types.CONFIRM_CODE_SUCCEED,
    payload,
  };
}

export function confirmCodeFailAction(payload: PayloadType) {
  return {
    type: types.CONFIRM_CODE_FAILED,
    payload,
  };
}
