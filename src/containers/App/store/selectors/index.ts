import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const globalState = (state: any) => state.global || initialState;

const makeSelectLoading = () =>
  createSelector(globalState, state => state.isLoading);

const makeSelectProfile = () =>
  createSelector(globalState, state => state.profile);

const makeSelectMapTile = () =>
  createSelector(globalState, state => state.mapTile);

export { makeSelectProfile, makeSelectLoading, makeSelectMapTile };
