import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const authState = (state: any) => state.auth || initialState;

const makeSelectErrors = () =>
  createSelector(authState, state => state.errors.errors || {});

const makeSelectIsRequesting = () => {
  return createSelector(authState, state => state.isRequesting);
};

const makeSelectEmail = () => {
  return createSelector(authState, state => state.email);
};

export { makeSelectErrors, makeSelectIsRequesting, makeSelectEmail };
