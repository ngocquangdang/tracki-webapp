import produce from 'immer';

import { ActionType, GlobalTypes } from '@Interfaces/index';
import * as types from '../constants';

export const initialState: GlobalTypes = {
  isLoading: false,
  profile: null,
  errors: null,
  mapTile: 'streets-v11',
  showGeofences: false,
  showTrackerName: false,
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
      case types.GET_PROFILE_REQUESTED:
        draft.errors = null;
        break;
      case types.GET_PROFILE_FAILED:
        draft.errors = payload.error;
        break;
      case types.CHANGE_MAP_TILE:
        draft.mapTile = payload.mapTile;
        break;
      case types.TOGGLE_GEOFENCES:
        draft.showGeofences = !draft.showGeofences;
        break;
      case types.TOGGLE_TRACKER_NAME:
        draft.showTrackerName = !draft.showTrackerName;
        break;
      case types.RESET_MAP:
        draft.mapTile = 'streets-v11';
        draft.showGeofences = false;
        draft.showTrackerName = false;
        break;
      default:
        break;
    }
  });

export default appReducer;
