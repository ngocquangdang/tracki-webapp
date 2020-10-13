import produce from 'immer';

import { ActionType } from '@Interfaces';
import * as types from '../definitions';

// The initial state of the Change Password container
export const initialState = {
  errors: {},
  password: null,
  isRequesting: false,
};

const forgotPasswordReducer = (
  state = initialState,
  { type, payload }: ActionType
) =>
  produce(state, draft => {
    switch (type) {
      case types.UPDATE_PASSWORD_SUCCEED:
        draft.isRequesting = false;
        draft.password = payload.password;
        draft.errors = {};
        break;
      case types.UPDATE_PASSWORD_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.UPDATE_PASSWORD_FAILED:
        draft.isRequesting = false;
        draft.errors = payload;
        break;
      default:
        break;
    }
  });

export default forgotPasswordReducer;
