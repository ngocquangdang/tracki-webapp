import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const geoFenceState = (state: any) => state.geo_fence || initialState;

const makeSelectGeoFence = () =>
  createSelector(geoFenceState, state => state.geo_fence || {});

const makeSelectErrors = () =>
  createSelector(geoFenceState, state => state.errors.errors || {});

const makeSelectErrorMessage = () =>
  createSelector(geoFenceState, state => state.errors.message);

const makeSelectIsRequesting = () => {
  return createSelector(geoFenceState, state => state.isRequesting);
};

export {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectErrorMessage,
  makeSelectGeoFence,
};
