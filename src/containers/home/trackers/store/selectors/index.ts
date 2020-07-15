import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const deviceState = (state: any) => state.device || initialState;

const makeSelectDivices = () =>
  createSelector(deviceState, state => state.device || {});

const makeSelectErrors = () =>
  createSelector(deviceState, state => state.errors.errors || {});

const makeSelectErrorMessage = () =>
  createSelector(deviceState, state => state.errors.message);

const makeSelectIsRequesting = () => {
  return createSelector(deviceState, state => state.isRequesting);
};

export {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
  makeSelectDivices,
};
