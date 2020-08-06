import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const addTrackerState = (state: any) => state.addtracker || initialState;

const makeSelectErrors = () =>
  createSelector(addTrackerState, state => state.errors || {});

const makeSelectIsRequesting = () => {
  return createSelector(addTrackerState, state => state.isRequesting || false);
};

const makeSleectAssigned = () => {
  return createSelector(addTrackerState, state => state.assigned || '');
};

const makeSelectErrorMessage = () =>
  createSelector(addTrackerState, state => state.errorsMessage || '');

const makeSelectTrackerPlan = () =>
  createSelector(addTrackerState, state => state.trackerPlan || '');

const selectFormData = () => {
  return createSelector(addTrackerState, state => state.formData);
};

const makeSelectFormData = () => {
  return createSelector(addTrackerState, state => state.account_id);
};

const makeSelectNewDeviceInfo = () => {
  return createSelector(addTrackerState, state => state.newDeviceInfo);
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
