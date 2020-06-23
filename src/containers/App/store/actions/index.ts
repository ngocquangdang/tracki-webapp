import * as types from '../definitions';

export function getProfileRequested(): any {
  return {
    type: types.GET_PROFILE_REQUESTED,
  };
}

export function getProfileSucceed(profile: any): any {
  return {
    type: types.GET_PROFILE_SUCCEED,
    profile,
  };
}

export function getProfileFailed(errors: any): any {
  return {
    type: types.GET_PROFILE_FAILED,
    errors,
  };
}

export function pageLoadingProgressChange(payload: any): any {
  return {
    type: types.PAGE_LOADING_PROGRESS_CHANGE,
    payload,
  };
}
