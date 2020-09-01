import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const globalState = (state: any) => state.publicMap || initialState;

const makeSelectTracker = () =>
  createSelector(globalState, state => state.tracker);

const makeSelectIsRequesting = () =>
  createSelector(globalState, state => state.isRequesting);

export { makeSelectTracker, makeSelectIsRequesting };
