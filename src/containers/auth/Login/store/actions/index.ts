import * as types from '../definitions';

export function loginRequestAction(): any {
  return {
    type: types.LOGIN_REQUESTED,
  };
}

export function loginSuccessAction(profile: any): any {
  return {
    type: types.LOGIN_SUCCEED,
    profile,
  };
}

export function loginFailAction(errors: any): any {
  return {
    type: types.LOGIN_FAILED,
    errors,
  };
}
