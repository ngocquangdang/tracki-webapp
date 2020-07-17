import { PayloadType } from '@Interfaces';
import * as types from '../definitions';

export function updatePasswordRequestAction(payload: PayloadType) {
  return {
    type: types.UPDATE_PASSWORD_REQUESTED,
    payload,
  };
}
export function updatePasswordSuccesAction(payload: PayloadType) {
  return {
    type: types.UPDATE_PASSWORD_SUCCEED,
    payload,
  };
}
export function updatePasswordFailAction(payload: PayloadType) {
  return {
    type: types.UPDATE_PASSWORD_FAILED,
    payload,
  };
}
