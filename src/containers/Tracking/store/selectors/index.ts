import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const trackingState = (state: any) => state.tracking || initialState;

const makeSelectTrackerIdsTracking = () =>
  createSelector(trackingState, state => state.trackingIds);

const makeSelectViewMode = () =>
  createSelector(trackingState, state => state.viewMode);

const makeSelectTrackerHistories = () =>
  createSelector(trackingState, state => state.histories[state.trackingIds[0]]);

const makeSelectHistories = () =>
  createSelector(trackingState, state => state.histories);

const makeSelectHistoryIds = () =>
  createSelector(trackingState, state => state.historyIds);

const makeSelectTrackerHistoryIds = () =>
  createSelector(
    trackingState,
    state => state.historyIds[state.trackingIds[0]]
  );

const makeSelectAlarmTracker = () =>
  createSelector(trackingState, state => state.alarms[state.trackingIds[0]]);

export {
  makeSelectHistories,
  makeSelectHistoryIds,
  makeSelectTrackerIdsTracking,
  makeSelectViewMode,
  makeSelectTrackerHistories,
  makeSelectTrackerHistoryIds,
  makeSelectAlarmTracker,
};
