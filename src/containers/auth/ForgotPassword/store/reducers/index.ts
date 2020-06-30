import produce from 'immer';

import * as types from '../definitions';

// The initial state of the Login container
export const initialState = {
  errors: {},
  isRequesting: false,
};

const loginReducer = (state = initialState, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case types.FORGOT_PASSWORD_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.FORGOT_PASSWORD_FAILED:
        draft.isRequesting = false;
        draft.errors = action.errors;
        break;
      case types.FORGOT_PASSWORD_SUCCEED:
        draft.isRequesting = false;
        draft.errors = {};
        break;
      default:
        break;
    }
  });

export default loginReducer;
