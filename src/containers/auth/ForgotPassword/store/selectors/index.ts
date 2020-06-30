import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const selectForgotPassword = (state: any) => state.forgot || initialState;

const makeSelectError = () =>
  createSelector(selectForgotPassword, state => state.errors);

const makeSelectIsRequesting = () => {
  return createSelector(selectForgotPassword, state => state.isRequesting);
};

export { makeSelectError, makeSelectIsRequesting };
