import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const snackState = (state: any) => state.snack || initialState;

const makeSelectSnackType = () =>
  createSelector(snackState, state => state.snackType);

const makeSelectSnackMessage = () =>
  createSelector(snackState, state => state.snackMessage);

const makeSelectSnackShow = () =>
  createSelector(snackState, state => state.show);

export { makeSelectSnackShow, makeSelectSnackType, makeSelectSnackMessage };
