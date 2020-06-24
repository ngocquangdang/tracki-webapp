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
      case types.LOGIN_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.LOGIN_FAILED:
        draft.isRequesting = false;
        draft.errors = action.errors;
        break;
      case types.LOGIN_SUCCEED:
        draft.isRequesting = false;
        draft.errors = {};
        break;
      default:
        break;
    }
  });

export default loginReducer;
