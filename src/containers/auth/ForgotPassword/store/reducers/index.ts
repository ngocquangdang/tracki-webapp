import produce from 'immer';

import { ActionType } from '@Interfaces';
import * as types from '../definitions';

// The initial state of the Login container
export const initialState = {
  errors: {},
  email: null,
  code: null,
  password: null,
  isRequesting: false,
};

const forgotPasswordReducer = (
  state = initialState,
  { type, payload }: ActionType
) =>
  produce(state, draft => {
    switch (type) {
      case types.CONFIRM_CODE_REQUESTED:
      case types.FORGOT_PASSWORD_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.CONFIRM_CODE_FAILED:
      case types.FORGOT_PASSWORD_FAILED:
        draft.isRequesting = false;
        draft.errors = payload;
        break;
      case types.CONFIRM_CODE_SUCCEED:
        draft.isRequesting = false;
        draft.code = payload.code;
        draft.errors = {};
        break;
      case types.FORGOT_PASSWORD_SUCCEED:
        draft.isRequesting = false;
        draft.email = payload.email;
        draft.errors = {};
        break;
      case types.RESET_AUTH_ERRORS:
        draft.errors = {};
        draft.isRequesting = false;
        break;
      case types.RESET_ERROR_MESSAGE:
        draft.isRequesting = false;
        draft.errors = {};
        break;
      case types.RESET_STORE:
        draft.isRequesting = false;
        draft.email = null;
        draft.code = null;
        draft.password = null;
        draft.errors = {};
        break;
      default:
        break;
    }
  });

export default forgotPasswordReducer;
