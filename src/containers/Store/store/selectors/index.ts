import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const storeState = (state: any) => state.tracking || initialState;

const makeSelectViewMode = () =>
  createSelector(storeState, state => state.viewMode);

export { makeSelectViewMode };
