import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const globalState = (state: any) => state.global || initialState;

const makeSelectLoading = () =>
  createSelector(globalState, state => state.isLoading);

const makeSelectProfile = () =>
  createSelector(globalState, state => state.profile);

const makeSelectMapTile = () =>
  createSelector(globalState, state => state.mapTile);

const makeSelectMapAction = () =>
  createSelector(globalState, state => state.mapAction);

const makeSelectMapView = () =>
  createSelector(globalState, state => state.mapView);

const makeSelectShowGeofences = () =>
  createSelector(globalState, state => state.showGeofences);

const makeSelectShowTrackersName = () =>
  createSelector(globalState, state => state.showTrackerName);

export {
  makeSelectMapView,
  makeSelectShowGeofences,
  makeSelectShowTrackersName,
  makeSelectProfile,
  makeSelectLoading,
  makeSelectMapTile,
  makeSelectMapAction,
};
