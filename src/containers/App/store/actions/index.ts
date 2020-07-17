import * as types from '../constants';

export const showLoadingAction = () => ({
  type: types.SHOW_LOADING,
});

export const hideLoadingAction = () => ({
  type: types.HIDE_LOADING,
});

export const fetchUserRequestedAction = () => {
  return {
    type: types.GET_PROFILE_REQUESTED,
  };
};

export const fetchUserSucceedAction = (profile: object) => {
  return {
    type: types.GET_PROFILE_SUCCEED,
    payload: { profile },
  };
};

export const fetchUserFailedAction = (error: object) => ({
  type: types.GET_PROFILE_FAILED,
  payload: { error },
});

export const fetchTrackersRequestedAction = (accountId: number) => ({
  type: types.GET_TRACKERS_REQUESTED,
  payload: { accountId },
});

export const fetchTrackersSucceedAction = (tracker: object) => {
  return {
    type: types.GET_TRACKERS_SUCCEED,
    payload: { tracker },
  };
};

export const fetchTrackersFailedAction = (error: object) => ({
  type: types.GET_TRACKERS_FAILED,
  payload: { error },
});
