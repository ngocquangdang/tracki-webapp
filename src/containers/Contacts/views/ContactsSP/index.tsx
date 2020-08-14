import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { debounce } from 'lodash';

import { AiOutlineSearch } from 'react-icons/ai';

import { MdPhoneIphone, MdEmail } from 'react-icons/md';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';

import AddNewContact from '@Containers/AddNewContact';
import EmailForm from './form/Email';
import SMSForm from './form/SMS';

import {
  ContainerPage,
  ContactCard,
  Icon,
  ContactName,
  Name,
  Address,
  ContactOption,
  WrappIcon,
  useStyles,
  WrappContent,
  SelectCard,
  SearchInput,
  TextInput,
} from './styles';
import { SideBarOutside } from '@Components/sidebars';

interface Props {
  addContactPageRequest(data, callback): void;
  getContactListRequest(): void;
  searchContactRequest(key: string): void;
  editContactRequest(contact_id, data, callback): void;
  deleteContactRequest(contact_id, callback): void;
  errors: object;
  iRequesting: boolean;
  contacts: Contact;
  contactIds: number[];
  t(key: string, format?: object): string;
  isMobile: boolean;
}

interface Contact {
  name: string;
  type: string;
  contactId: number;
}

export default function ContactsSP(props: Props) {
  const classes = useStyles();

  const {
    addContactPageRequest,
    editContactRequest,
    deleteContactRequest,
    searchContactRequest,
    contactIds,
    contacts,
    t,
    isMobile,
    errors,
  } = props;

  const [initialContactIds, setInitialContactIds] = useState<number[]>([]);
  const [initialContacts, setInitialContacts] = useState({});
  const [editContactId, setEditContactId] = useState(0);
  const [type, setChangeType] = useState('EMAIL');
  const [showAddContact, setShowAddContact] = useState(false);

  const debounceSearch = debounce((v: string) => searchContactRequest(v), 300);

  useEffect(() => {
    setInitialContactIds(contactIds);
    setInitialContacts(contacts);
  }, [contactIds, contacts]);

  const setDefaultEdirContactId = () => {
    setEditContactId(0);
  };

  const onDeleteContact = (contact_id: number) => () => {
    deleteContactRequest(contact_id, setDefaultEdirContactId);
  };

  const onEditContact = (contact_id: number) => () => {
    setEditContactId(contact_id);
    setChangeType(initialContacts[contact_id].type);
  };

  const onShowAddContact = () => {
    setShowAddContact(true);
  };

  const onCloseContactPage = () => {
    Router.back();
  };

  const onHiddenAddContact = () => {
    setShowAddContact(false);
  };

  const onShowForm = () => {
    if (type === 'PHONE') {
      return (
        <SMSForm
          type={type}
          {...props}
          editContactRequest={editContactRequest}
          contact={initialContacts[editContactId]}
          onCancel={onCancel}
          callback={setDefaultEdirContactId}
        />
      );
    }
    return (
      <EmailForm
        type={type}
        {...props}
        editContactRequest={editContactRequest}
        contact={initialContacts[editContactId]}
        onCancel={onCancel}
        callback={setDefaultEdirContactId}
      />
    );
  };

  const onCancel = () => {
    setDefaultEdirContactId();
  };

  return (
    <SideBarOutside
      title={t('contact:contact_list')}
      show={true}
      direction="left"
      handleClose={onCloseContactPage}
      isMobile={isMobile}
      isAddContact={true}
      isLogo={true}
      onShowAddContact={onShowAddContact}
    >
      <ContainerPage>
        <SearchInput>
          <TextInput
            placeholder={t('contact:search_by')}
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AiOutlineSearch className={classes.color} />
                </InputAdornment>
              ),
            }}
            onChange={event => debounceSearch(event.target.value)}
            className={classes.input}
          />
        </SearchInput>
        {initialContactIds.map(item => {
          return item !== editContactId ? (
            <ContactCard key={item}>
              <WrappIcon>
                <Icon>
                  {initialContacts[item].type === 'PHONE' ? (
                    <MdPhoneIphone className={classes.iconAddress} />
                  ) : (
                    <MdEmail className={classes.iconAddress} />
                  )}
                </Icon>
              </WrappIcon>
              <WrappContent>
                <ContactName>
                  <Name>{initialContacts[item].name}</Name>
                  <Address> {initialContacts[item].address}</Address>
                </ContactName>
                <ContactOption>
                  <IconButton onClick={onDeleteContact(item)}>
                    <DeleteIcon className={classes.colorOption} />
                  </IconButton>
                  <IconButton
                    onClick={onEditContact(item)}
                    className={classes.iconOption}
                  >
                    <Create className={classes.colorOption} />
                  </IconButton>
                </ContactOption>
              </WrappContent>
            </ContactCard>
          ) : (
            <SelectCard key={initialContacts[editContactId]}>
              {onShowForm()}
            </SelectCard>
          );
        })}
      </ContainerPage>
      <AddNewContact
        showAddContact={showAddContact}
        onClose={onHiddenAddContact}
        addContactPageRequest={addContactPageRequest}
        t={t}
        isMobile={isMobile}
        errors={errors}
      />
    </SideBarOutside>
  );
}
