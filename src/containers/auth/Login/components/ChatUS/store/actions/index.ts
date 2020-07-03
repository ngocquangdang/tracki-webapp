import { PayloadType } from '@Interfaces';
import * as types from '../definitions';
import IChatUsPage from '../../interfaces';

export function chatUsRequestAction(data: IChatUsPage.IStateChatUs) {
  return {
    type: types.CHATUS_REQUEST,
    payload: { data },
  };
}

export function chatUsSuccessAction(profile: PayloadType) {
  return {
    type: types.CHATUS_SUCCEED,
    payload: { profile },
  };
}

export function chatUsFailAction(errors: PayloadType) {
  return {
    type: types.CHATUS_FAILED,
    payload: { errors },
  };
}
