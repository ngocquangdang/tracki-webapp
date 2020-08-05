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
const makeSelectMessageKey = () =>
  createSelector(addTrackerState, state => state.message_key || '');
const makeSelectTrackerPlan = () =>
  createSelector(addTrackerState, state => state.trackerPlan || '');
const selectFormData = () => {
  return createSelector(addTrackerState, state => state.formData);
};
const makeSelectFormData = () => {
  return createSelector(addTrackerState, state => state.account_id);
};
export {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSleectAssigned,
  makeSelectMessageKey,
  makeSelectTrackerPlan,
  selectFormData,
  makeSelectFormData,
};
