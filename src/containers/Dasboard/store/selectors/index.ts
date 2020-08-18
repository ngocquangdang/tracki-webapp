import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const historyState = (state: any) => state.history || initialState;

const makeSelectTrackerHistories = () =>
  createSelector(historyState, state => state.histories);

export { makeSelectTrackerHistories };
