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

const makeSelectTrackerSettings = () =>
  createSelector(globalState, state => state.tracker.settings);

const makeSelectEditGeofenceId = () =>
  createSelector(globalState, state => state.geofence?.editGeofenceId);

const makeSelectErrors = () =>
  createSelector(globalState, state => state.errors);

const makeSelectDataLink = () =>
  createSelector(globalState, state => state.dataLink);

const makeSelectBeep = () =>
  createSelector(globalState, state => state?.isBeep);

const makeSelectNewGeofence = () =>
  createSelector(globalState, state => state.geofence?.newGeofence);

const makeSelectSubscription = () =>
  createSelector(globalState, state => state.subscription);

const makeSelectSmsCounter = () =>
  createSelector(globalState, state => state.smsCounter);

const makeSelectAlerts = () =>
  createSelector(globalState, state => state.alert?.alerts);

const makeSelectAlertsIds = () =>
  createSelector(globalState, state => state.alert?.alertsIds);

const makeSelectTrackerPlans = () =>
  createSelector(globalState, state => state.tracker?.trackerPlans);

const makeSelectIsFetchingTracker = () =>
  createSelector(globalState, state => state.isFetchingTracker);

export {
  makeSelectTrackers,
  makeSelectTrackerIds,
  makeSelectLoading,
  makeSelectTrackerId,
  makeSelectGeofences,
  makeSelectGeofenceIds,
  makeSelectGeofenceId,
  makeSelectTrackerSettings,
  makeSelectEditGeofenceId,
  makeSelectDataLink,
  makeSelectBeep,
  makeSelectNewGeofence,
  makeSelectErrors,
  makeSelectSubscription,
  makeSelectSmsCounter,
  makeSelectAlerts,
  makeSelectAlertsIds,
  makeSelectTrackerPlans,
  makeSelectIsFetchingTracker,
};
