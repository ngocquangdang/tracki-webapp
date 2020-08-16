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
export {
  makeSelectErrors,
  makeSelectIsRequesting,
  makeSelectContacts,
  makeSelectContactIds,
};
