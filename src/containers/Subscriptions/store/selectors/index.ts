import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const renewTrackerState = (state: any) => state.subscription || initialState;

const makeSelectErrors = () =>
  createSelector(renewTrackerState, state => state.errors || {});

const makeSelectIsRequesting = () => {
  return createSelector(
    renewTrackerState,
    state => state.isRequesting || false
  );
};

const makeSelectFormData = () => {
  return createSelector(renewTrackerState, state => state.formData);
};

const makeSelectCountryCode = () => {
  return createSelector(renewTrackerState, state => {
    return state.countryCode;
  });
};

const makeSelectCountryCodeFollow = () => {
  return createSelector(renewTrackerState, state => state.countryCodeFollow);
};

export {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectFormData,
  makeSelectCountryCode,
  makeSelectCountryCodeFollow,
};
