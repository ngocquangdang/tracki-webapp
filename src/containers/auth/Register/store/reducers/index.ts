import produce from 'immer';

import { ActionType } from '@Interfaces';
import * as types from '../definitions';

// The initial state of the Login container
export const initialState = {
  errors: {},
  formData: {
    username: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    phone: '',
    zip: '',
  },
  isRequesting: false,
};

const registerReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, draft => {
    switch (type) {
      case types.REGISTER_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.REGISTER_FAILED:
        draft.isRequesting = false;
        draft.errors = payload;
        break;
      case types.REGISTER_SUCCEED:
        draft.isRequesting = false;
        draft.errors = {};
        break;
      case types.RESET_AUTH_ERRORS:
        draft.errors = {};
        draft.isRequesting = false;
        break;
      case types.UPDATE_STORE:
        draft.formData = payload;
        break;
      default:
        break;
    }
  });

export default registerReducer;
