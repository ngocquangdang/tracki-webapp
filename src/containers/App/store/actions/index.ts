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

export const resetMapAction = () => ({
  type: types.RESET_MAP,
});

export const changeMapTileAction = (mapTile: string) => ({
  type: types.CHANGE_MAP_TILE,
  payload: { mapTile },
});

export const toggleGeofenceAction = () => ({
  type: types.TOGGLE_GEOFENCES,
});

export const toggleTrackerNameAction = () => ({
  type: types.TOGGLE_TRACKER_NAME,
});
