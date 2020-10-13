import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const renewTrackerState = (state: any) => state.renewtracker || initialState;

const makeSelectErrors = () =>
  createSelector(renewTrackerState, state => state.errors || {});

const makeSelectIsRequesting = () => {
  return createSelector(
    renewTrackerState,
    state => state.isRequesting || false
  );
};

const makeSleectAssigned = () => {
  return createSelector(renewTrackerState, state => state.assigned || '');
};

const makeSelectErrorMessage = () =>
  createSelector(renewTrackerState, state => state.errorsMessage || '');

const makeSelectTrackerPlan = () =>
  createSelector(renewTrackerState, state => state.trackerPlan || '');

const selectFormData = () => {
  return createSelector(renewTrackerState, state => state.formData);
};

const makeSelectFormData = () => {
  return createSelector(renewTrackerState, state => state.account_id);
};

const makeSelectNewDeviceInfo = () => {
  return createSelector(renewTrackerState, state => state.newDeviceInfo);
};
export {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSleectAssigned,
  makeSelectErrorMessage,
  makeSelectTrackerPlan,
  selectFormData,
  makeSelectFormData,
  makeSelectNewDeviceInfo,
};
