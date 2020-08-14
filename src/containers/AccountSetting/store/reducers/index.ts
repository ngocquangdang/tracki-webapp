import produce from 'immer';

import * as types from '../definitions';
import { ActionType } from '@Interfaces';

// The initial state of the Login container
export const initialState = {
  profile: {},
  errors: {},
  errorPrefrences: {},
  isRequesting: false,
};

const UserProfileReducer = (
  state = initialState,
  { type, payload }: ActionType
) =>
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
        draft.profile = payload?.profile;
        draft.isRequesting = false;
        draft.errors = {};
        break;
      case types.UPDATE_PREFRENCE_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.UPDATE_PREFRENCE_FAILED:
        draft.isRequesting = false;
        draft.errorPrefrences = payload.errors;
        break;
      case types.UPDATE_PREFRENCE_SUCCEED:
        draft.profile = {
          ...state.profile,
          ...payload?.profile,
        };
        draft.isRequesting = false;
        draft.errorPrefrences = {};
        break;
      case types.UPDATE_INFO_USER_REQUESTED:
        draft.isRequesting = true;
        break;
      case types.UPDATE_INFO_USER_FAILED:
        draft.isRequesting = false;
        draft.errors = payload.errors;
        break;
      case types.UPDATE_INFO_USER_SUCCEED:
        draft.profile = {
          ...state.profile,
          ...payload?.profile,
        };
        draft.isRequesting = false;
        draft.errors = {};
        break;
      default:
        break;
    }
  });

export default UserProfileReducer;
