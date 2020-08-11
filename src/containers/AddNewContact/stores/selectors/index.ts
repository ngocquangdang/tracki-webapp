import { createSelector } from 'reselect';
import { initialState } from '../reducer';

const addTrackerState = (state: any) => state.addContact || initialState;

const makeSelectErrors = () =>
  createSelector(addTrackerState, state => state.errors || {});

const makeSelectIsRequesting = () => {
  return createSelector(addTrackerState, state => state.isRequesting || false);
};

export { makeSelectErrors, makeSelectIsRequesting };
