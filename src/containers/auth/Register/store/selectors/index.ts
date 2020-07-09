import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const authState = (state: any) => state.auth || initialState;

const makeSelectErrors = () =>
  createSelector(authState, state => state.errors.errors || {});

const makeSelectErrorMessage = () =>
  createSelector(authState, state => state.errors.message);

const makeSelectIsRequesting = () => {
  return createSelector(authState, state => state.isRequesting);
};

const makeSelectErrorMessageKey = () =>
  createSelector(authState, state => state.errors.message_key);

const selectFormData = () => {
  return createSelector(authState, state => state.formData);
};

export {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
  makeSelectErrorMessageKey,
  selectFormData,
};
