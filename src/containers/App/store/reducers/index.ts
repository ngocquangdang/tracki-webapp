import produce from 'immer';

import { ActionType, GlobalTypes } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: GlobalTypes = {
  isLoading: false,
  profile: null,
  tracker: {
    trackers: {},
    trackerIds: null,
    trackerPlans: {},
    selectedTrackerId: null,
  },
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
      case types.SEARCH_TRACKERS_SUCCEED:
        draft.tracker.trackerIds = payload.trackerIds;
        break;
      case types.GET_TRACKERS_SUCCEED:
        draft.tracker = payload?.tracker;
        break;
      case types.SELECTED_TRACKER:
        draft.tracker.selectedTrackerId = payload.selectedTrackerId;
        break;
      case types.RESET_SELECTED_TRACKER:
        draft.tracker.selectedTrackerId = null;
        break;
      case types.SEARCH_TRACKERS_REQUESTED:
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
