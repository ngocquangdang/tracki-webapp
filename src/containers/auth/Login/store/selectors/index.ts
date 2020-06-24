import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const selectLogin = (state: any) => state.login || initialState;

const makeSelectError = () =>
  createSelector(selectLogin, state => state.errors);

const makeSelectIsRequesting = () => {
  return createSelector(selectLogin, state => state.isRequesting);
};

export { makeSelectError, makeSelectIsRequesting };
