import React from 'react';
import dynamic from 'next/dynamic';

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

export default function AddContactContainer(props: Props) {
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
