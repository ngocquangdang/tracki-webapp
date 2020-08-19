import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const contactsState = (state: any) => state.contacts || initialState;

const makeSelectErrors = () =>
  createSelector(contactsState, state => state.errors || {});

const makeSelectIsRequesting = () => {
  return createSelector(contactsState, state => state.isRequesting || false);
};

const makeSelectContacts = () => {
  return createSelector(contactsState, state => state.contacts || {});
};

const makeSelectContactIds = () => {
  return createSelector(contactsState, state => state.contactIds || []);
};

const makeSelectContactOfTracker = () => {
  return createSelector(contactsState, state => state.contactOfTracker || {});
};
const makeSelectcontactAssigneds = () =>
  createSelector(contactsState, state => state.contactAssigneds);

const makeSelectcontactAssignedIds = () =>
  createSelector(contactsState, state => state.contactAssignedIds);

export {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectContacts,
  makeSelectContactIds,
  makeSelectContactOfTracker,
  makeSelectcontactAssigneds,
  makeSelectcontactAssignedIds,
};
