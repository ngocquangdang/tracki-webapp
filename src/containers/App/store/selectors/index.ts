import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const globalState = (state: any) => state.global || initialState;

const makeSelectLoading = () =>
  createSelector(globalState, state => state.isLoading);

const makeSelectProfile = () =>
  createSelector(globalState, state => state.profile);

const makeSelectTrackers = () =>
  createSelector(globalState, state => state.tracker?.trackers);

const makeSelectTrackerIds = () =>
  createSelector(globalState, state => state.tracker?.trackerIds);

const makeSelectTrackerId = () =>
  createSelector(globalState, state => state.tracker?.selectedTrackerId);

export {
  makeSelectProfile,
  makeSelectTrackers,
  makeSelectTrackerIds,
  makeSelectLoading,
  makeSelectTrackerId,
};
