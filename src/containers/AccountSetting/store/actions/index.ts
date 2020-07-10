import { PayloadType } from '@Interfaces';
import * as types from '../definitions';
import UserDetail from '../../interfaces';

export function getUserRequestAction(data?: UserDetail.IStateUser) {
  return {
    type: types.USER_REQUESTED,
    payload: { data },
  };
}

export function getUserSuccessAction(profile?: PayloadType) {
  return {
    type: types.USER_SUCCEED,
    payload: { profile },
  };
}

export function getUserFailAction(errors?: PayloadType) {
  return {
    type: types.USER_FAILED,
    payload: { errors },
  };
}
