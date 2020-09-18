import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const storeState = (state: any) => state.store || initialState;

const makeSelectViewMode = () =>
  createSelector(storeState, state => state.viewMode);

const makeIsLoading = () =>
  createSelector(storeState, state => state.isLoading);

export { makeSelectViewMode, makeIsLoading };
