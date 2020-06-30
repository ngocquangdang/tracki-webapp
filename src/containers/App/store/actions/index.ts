import * as types from '../definitions';
import { PayloadType } from '@Interfaces';

export function getProfileRequested() {
  return {
    type: types.GET_PROFILE_REQUESTED,
  };
}

export function getProfileSucceed(payload: PayloadType) {
  return {
    type: types.GET_PROFILE_SUCCEED,
    payload,
  };
}

export function getProfileFailed(payload: PayloadType) {
  return {
    type: types.GET_PROFILE_FAILED,
    payload,
  };
}

export function showLoadingAction() {
  return {
    type: types.SHOW_LOADING,
  };
}

export function hideLoadingAction() {
  return {
    type: types.HIDE_LOADING,
  };
}
