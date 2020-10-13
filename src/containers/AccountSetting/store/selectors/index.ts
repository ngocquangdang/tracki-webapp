import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const userState = (state: any) => state.profile || initialState;

const makeSelectUserProfile = () =>
  createSelector(userState, state => state.profile || {});

const makeSelectErrors = () =>
  createSelector(userState, state => state.errors?.errors || {});

const makeSelectErrorMessage = () =>
  createSelector(userState, state => state.errors?.message);

const makeSelectIsRequesting = () => {
  return createSelector(userState, state => state.isRequesting);
};

export {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
  makeSelectUserProfile,
};
