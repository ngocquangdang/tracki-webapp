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

export const logoutRequestAction = () => {
  return {
    type: types.LOGOUT,
  };
};

export const logoutSucceedAction = () => {
  return {
    type: types.LOGOUT_SUCCEED,
  };
};

export const logoutFailedAction = () => {
  return {
    type: types.LOGOUT_FAILED,
  };
};
export const searchTrackersRequestedAction = (search: string | null) => ({
  type: types.SEARCH_TRACKERS_REQUESTED,
  payload: { search },
});

export const searchTrackersSucceedAction = (
  trackerIds: Array<number | string>
) => ({
  type: types.SEARCH_TRACKERS_SUCCEED,
  payload: { trackerIds },
});

export const searchTrackersFailedAction = (error: object) => ({
  type: types.SEARCH_TRACKERS_FAILED,
  payload: { error },
});

export const selectedSingleTrackerRequestAction = (
  selectedTrackerId: number
) => ({
  type: types.SELECTED_TRACKER,
  payload: { selectedTrackerId },
});

export const resetSelectedTrackerIdAction = () => ({
  type: types.RESET_SELECTED_TRACKER,
});
