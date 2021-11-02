import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  getContactListRequestAction,
  searchContactRequestedAction,
  addContactRequestAction,
  editContactRequestedAction,
  deleteContactRequestedAction,
} from '@Containers/Contacts/store/actions';

import {
  makeSelectErrors,
  makeSelectContacts,
  makeSelectContactIds,
} from '@Containers/Contacts/store/selector';
import { fetchUserRequestedAction } from '@Containers/App/store/actions';

const ViewSP = dynamic(() => import('./views/AddNewContactSP'));
const ViewPC = dynamic(() => import('./views/AddNewContactPC'));

interface Props {
  showAddContact: boolean;
  onClose(): void;
  addContactPageRequest(data, callback): void;
  t(key: string, format?: object): string;
  isMobile: boolean;
  [data: string]: any;
}

// function filter contact by email or by phone number
const filterContactByType = (
  contactIds: Array<number>,
  contacts: object,
  typeContact: string
) =>
  contactIds &&
  contactIds
    .filter(
      contactId =>
        contacts[contactId].type.toLowerCase() === typeContact.toLowerCase()
    )
    .map(id => contacts[id].address);

function AddContactContainer(props: Props) {
  const { isMobile, contactIds, contacts } = props;
  // get list contact email and phone to verify email and phone existed
  const listContactEmail = filterContactByType(contactIds, contacts, 'EMAIL');
  const listContactPhone = filterContactByType(contactIds, contacts, 'PHONE');

  if (isMobile) {
    return (
      <ViewSP
        {...props}
        listContactEmail={listContactEmail}
        listContactPhone={listContactPhone}
      />
    );
  }
  return (
    <ViewPC
      {...props}
      listContactEmail={listContactEmail}
      listContactPhone={listContactPhone}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  errors: makeSelectErrors(),
  contacts: makeSelectContacts(),
  contactIds: makeSelectContactIds(),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRequestedAction: () => dispatch(fetchUserRequestedAction()),
  addContactPageRequest: (data, callback) =>
    dispatch(addContactRequestAction(data, callback)),
  getContactListRequest: account_id =>
    dispatch(getContactListRequestAction(account_id)),
  searchContactRequest: (key: string) =>
    dispatch(searchContactRequestedAction(key)),
  editContactRequest: (data, contact_id, callback) =>
    dispatch(editContactRequestedAction(data, contact_id, callback)),
  deleteContactRequest: (contact_id: number, callback) =>
    dispatch(deleteContactRequestedAction(contact_id, callback)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(AddContactContainer) as React.ComponentType;
