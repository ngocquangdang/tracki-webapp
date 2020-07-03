import produce from 'immer';

import * as types from '../definitions';
import { ActionType } from '@Interfaces';

// The initial state of the Login container
export const initialState = {
  errors: {},
  isRequesting: false,
};

const loginReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, draft => {
    switch (type) {
      case types.CHATUS_REQUEST:
        draft.isRequesting = true;
        break;
      case types.CHATUS_FAILED:
        draft.isRequesting = false;
        draft.errors = payload.errors;
        break;
      case types.CHATUS_SUCCEED:
        draft.isRequesting = false;
        draft.errors = {};
        break;
      default:
        break;
    }
  });

export default loginReducer;
