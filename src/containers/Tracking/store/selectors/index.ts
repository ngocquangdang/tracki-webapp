import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const trackingState = (state: any) => state.tracking || initialState;

const makeSelectTrackerIdsTracking = () =>
  createSelector(trackingState, state => state.trackingIds);

const makeSelectViewMode = () =>
  createSelector(trackingState, state => state.viewMode);

const makeSelectTrackerHistories = () =>
  createSelector(trackingState, state => state.histories[state.trackingIds[0]]);

export {
  makeSelectTrackerIdsTracking,
  makeSelectViewMode,
  makeSelectTrackerHistories,
};
