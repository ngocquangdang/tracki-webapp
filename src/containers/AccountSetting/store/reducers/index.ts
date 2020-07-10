import produce from 'immer';

import * as types from '../definitions';
import { ActionType } from '@Interfaces';

// The initial state of the Login container
export const initialState = {
  profile: {},
  errors: {},
  isRequesting: false,
};

const loginReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, draft => {
    switch (type) {
      case types.USER_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.USER_FAILED:
        draft.isRequesting = false;
        draft.errors = payload.errors;
        break;
      case types.USER_SUCCEED:
        draft.profile = payload;
        draft.isRequesting = false;
        draft.errors = {};
        break;
      default:
        break;
    }
  });

export default loginReducer;
