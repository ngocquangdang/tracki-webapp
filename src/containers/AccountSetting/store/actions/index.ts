import { PayloadType } from '@Interfaces';
import * as types from '../definitions';

export function getUserRequestAction() {
  return {
    type: types.USER_REQUESTED,
  };
}

export function getUserSuccessAction(profile: PayloadType) {
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

export function updatePrefrenceRequestAction(data: object) {
  return {
    type: types.UPDATE_PREFRENCE_REQUESTED,
    payload: { data },
  };
}

export function updatePrefrenceSuccessAction(global?: PayloadType) {
  return {
    type: types.UPDATE_PREFRENCE_SUCCEED,
    payload: { global },
  };
}

export function updatePrefrenceFailAction(errors?: PayloadType) {
  return {
    type: types.UPDATE_PREFRENCE_FAILED,
    payload: { errors },
  };
}

export function updateInfoUserRequestAction(data: object) {
  return {
    type: types.UPDATE_INFO_USER_REQUESTED,
    payload: { data },
  };
}

export function updateInfoUserSucceedAction(global?: PayloadType) {
  return {
    type: types.UPDATE_INFO_USER_SUCCEED,
    payload: { global },
  };
}

export function updateInfoUserFailedAction(errors?: PayloadType) {
  return {
    type: types.UPDATE_INFO_USER_FAILED,
    payload: { errors },
  };
}
