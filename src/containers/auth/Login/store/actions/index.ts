import { PayloadType } from '@Interfaces';
import * as types from '../definitions';
import ILoginPage from '../../interfaces';

export function loginRequestAction(data: ILoginPage.IStateLogin) {
  return {
    type: types.LOGIN_REQUESTED,
    payload: { data },
  };
}

export function chatusRequestAction(data: ILoginPage.IStateChatUs) {
  return {
    type: types.CHATUS_REQUESTED,
    payload: { data },
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
export function resetErrorMessage() {
  return { type: types.RESET_ERROR_MESSAGE };
}

export function loginGeoBotRequestAction(data) {
  return {
    type: types.LOGIN_GEO_BOT_REQUESTED,
    payload: { data },
  };
}

export function loginGeoBotSuccessAction() {
  return {
    type: types.LOGIN_GEO_BOT_SUCCEED,
  };
}

export function loginGeoBotFailAction(errors: PayloadType) {
  return {
    type: types.LOGIN_GEO_BOT_FAILED,
    payload: { errors },
  };
}

export function loginSocialNetworkRequestAction(socialType: string, bodyData) {
  return {
    type: types.LOGIN_VIA_SOCIAL_NETWORK_REQUESTED,
    payload: { socialType, bodyData },
  };
}
