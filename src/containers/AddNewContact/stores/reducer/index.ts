import produce from 'immer';

import { ActionType } from '@Interfaces';
import * as types from '../constans';

// The initial state of the Change Password container
export const initialState = {
  errors: {},
  isRequesting: false,
};

const createContactReducer = (
  state = initialState,
  { type, payload }: ActionType
) =>
  produce(state, draft => {
    switch (type) {
      case types.CREATE_NEW_CONTACT_SUCCESSED:
        draft.isRequesting = false;
        draft.errors = {};
        break;
      case types.CREATE_NEW_CONTACT_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.CREATE_NEW_CONTACT_FAILED:
        draft.isRequesting = false;
        draft.errors = payload;
        break;
      default:
        break;
    }
  });

export default createContactReducer;
