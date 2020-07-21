import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const globalState = (state: any) => state.tracker || initialState;

const makeSelectLoading = () =>
  createSelector(globalState, state => state.isLoading);

const makeSelectTrackers = () =>
  createSelector(globalState, state => state.tracker?.trackers);

const makeSelectTrackerIds = () =>
  createSelector(globalState, state => state.tracker?.trackerIds);

const makeSelectTrackerId = () =>
  createSelector(globalState, state => state.tracker?.selectedTrackerId);

const makeSelectGeofences = () =>
  createSelector(globalState, state => state.geofence?.geofences);

const makeSelectGeofenceIds = () =>
  createSelector(globalState, state => state.geofence?.geofenceIds);

const makeSelectGeofenceId = () =>
  createSelector(globalState, state => state.geofence?.selectedGeofenceId);

export {
  makeSelectTrackers,
  makeSelectTrackerIds,
  makeSelectLoading,
  makeSelectTrackerId,
  makeSelectGeofences,
  makeSelectGeofenceIds,
  makeSelectGeofenceId,
};