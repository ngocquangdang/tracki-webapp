import produce from 'immer';

import * as types from '../definitions';
import { ActionType } from '@Interfaces';

// The initial state of the Login container
export const initialState = {
  device: {},
  errors: {},
  isRequesting: false,
};

const loginReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, draft => {
    switch (type) {
      case types.DEVICE_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.DEVICE_FAILED:
        draft.isRequesting = false;
        draft.errors = payload.errors;
        break;
      case types.DEVICE_SUCCEED:
        draft.device = payload.device;
        draft.isRequesting = false;
        draft.errors = {};
        break;
      default:
        break;
    }
  });

export default loginReducer;
