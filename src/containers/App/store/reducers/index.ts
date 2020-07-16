import produce from 'immer';

import { ActionType, GlobalTypes } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: GlobalTypes = {
  isLoading: false,
  profile: null,
  tracker: null,
  errors: null,
};

const appReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, (draft: GlobalTypes) => {
    switch (type) {
      case types.SHOW_LOADING:
        draft.isLoading = true;
        break;
      case types.HIDE_LOADING:
        draft.isLoading = false;
        break;
      case types.GET_PROFILE_SUCCEED: {
        draft.profile = payload?.profile;
        break;
      }
      case types.GET_TRACKERS_SUCCEED:
        draft.tracker = payload?.trackers;
        break;
      case types.GET_PROFILE_REQUESTED:
      case types.GET_TRACKERS_REQUESTED:
        draft.errors = null;
        break;
      case types.GET_PROFILE_FAILED:
      case types.GET_TRACKERS_FAILED:
        draft.errors = payload.error;
        break;
      default:
        break;
    }
  });

export default appReducer;
