import { PayloadType } from '@Interfaces';
import * as types from '../definitions';
import ILoginPage from '../../interfaces';

export function loginRequestAction(data: ILoginPage.IStateLogin) {
  return {
    type: types.LOGIN_REQUESTED,
    payload: { data }
  };
}

export function loginSuccessAction(profile: PayloadType) {
  return {
    type: types.LOGIN_SUCCEED,
    payload: { profile },
  };
}

export function loginFailAction(errors: PayloadType) {
  return {
    type: types.LOGIN_FAILED,
    payload: { errors },
  };
}
