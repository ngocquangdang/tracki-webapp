import * as types from '../constants';

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

export const fetchGeofencesRequestedAction = (accountId: number) => ({
  type: types.GET_GEOFENCES_REQUESTED,
  payload: { accountId },
});

export const fetchGeofencesSucceedAction = (geofence: object) => {
  return {
    type: types.GET_GEOFENCES_SUCCEED,
    payload: { geofence },
  };
};

export const fetchGeofencesFailedAction = (error: object) => ({
  type: types.GET_GEOFENCES_FAILED,
  payload: { error },
});

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

export const searchGeofencesRequestedAction = (search: string | null) => ({
  type: types.SEARCH_GEOFENCES_REQUESTED,
  payload: { search },
});

export const searchGeofencesSucceedAction = (
  geofenceIds: Array<number | string>
) => ({
  type: types.SEARCH_GEOFENCES_SUCCEED,
  payload: { geofenceIds },
});

export const searchGeofencesFailedAction = (error: object) => ({
  type: types.SEARCH_GEOFENCES_FAILED,
  payload: { error },
});

export const selectTrackerIdAction = (selectedTrackerId: number) => ({
  type: types.SELECTED_TRACKER,
  payload: { selectedTrackerId },
});

export const resetSelectedTrackerIdAction = () => ({
  type: types.RESET_SELECTED_TRACKER,
});

export const selectGeofenceIdAction = (geofenceId: number) => ({
  type: types.SELECTED_GEOFENCE,
  payload: { geofenceId },
});

export const resetSelectedGeofenceAction = () => ({
  type: types.RESET_SELECTED_GEOFENCE,
});
