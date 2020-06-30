import * as types from '../definitions';

export function forgotRequestAction(): any {
  return {
    type: types.FORGOT_PASSWORD_REQUESTED,
  };
}

export function forgotSuccessAction(profile: any): any {
  return {
    type: types.FORGOT_PASSWORD_SUCCEED,
    profile,
  };
}

export function forgotFailAction(errors: any): any {
  return {
    type: types.FORGOT_PASSWORD_FAILED,
    errors,
  };
}
