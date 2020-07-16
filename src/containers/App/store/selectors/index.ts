import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const selectGlobal = (state: any) => state.global || initialState;

const makeSelectProfileGlobal = () =>
  createSelector(selectGlobal, state => state.profile);

const makeSelectLoading = () =>
  createSelector(selectGlobal, state => state.isLoading);

const makeSelectDivices = () =>
  createSelector(selectGlobal, state => state.device || {});

const makeSelectIsRequesting = () => {
  return createSelector(selectGlobal, state => state.isRequesting);
};

export {
  makeSelectProfileGlobal,
  makeSelectLoading,
  makeSelectIsRequesting,
  makeSelectDivices,
};
