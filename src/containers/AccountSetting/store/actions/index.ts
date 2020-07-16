import { PayloadType } from '@Interfaces';
import * as types from '../definitions';
import UserDetail from '../../interfaces';

export function getUserRequestAction(data?: UserDetail.IStateUser) {
  return {
    type: types.USER_REQUESTED,
    payload: { data },
  };
}

export function getUserSuccessAction(global?: PayloadType) {
  return {
    type: types.USER_SUCCEED,
    payload: { global },
  };
}

export function getUserFailAction(errors?: PayloadType) {
  return {
    type: types.USER_FAILED,
    payload: { errors },
  };
}

export function updateUserRequestAction(
  data: UserDetail.IStateUser,
  id: number
) {
  return {
    type: types.UPDATE_USERS_REQUESTED,
    payload: { data, id },
  };
}

export function updateUserSuccessAction(profile?: PayloadType) {
  return {
    type: types.UPDATE_USERS_SUCCEED,
    payload: { profile },
  };
}

export function updateUserFailAction(errors?: PayloadType) {
  return {
    type: types.UPDATE_USERS_FAILED,
    payload: { errors },
  };
}
