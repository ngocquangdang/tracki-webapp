import React, { useState, useEffect } from 'react';
import { SideBarOutsideContact } from '@Components/sidebars';
import { debounce } from 'lodash';
import ContactCard from '@Components/ContactCardSP';
import { Button } from '@Components/buttons';
import { FiPlus } from 'react-icons/fi';

import {
  SelectContactContainer,
  SearchInput,
  TextInput,
  Save,
  useStyles,
} from './styles';
import { AiOutlineSearch } from 'react-icons/ai';
import { InputAdornment } from '@material-ui/core';
import AddNewContact from '@Containers/AddNewContact';
import { ITracker } from '@Interfaces';
import { firebaseLogEventRequest } from '@Utils/firebase';

interface Props {
  isMobile: boolean;
  show: boolean;
  contacts: object;
  handleClose(): void;
  onSearch(v): void;
  contactIds: Array<number>;
  contactAssigneds: object;
  contactAssignedIds: Array<number>;
  addContactRequest(data, eventTypes, callback): void;
  removeContactRequest(data, eventTypes, callback): void;
  eventTypes?: string;
  addContactPageRequest(data, callback): void;
  t(key: string): string;
  tracker: ITracker;
  errors: any;
}

export default function SelectContactSP(props: Props) {
  const classes = useStyles();
  const {
    contacts,
    show,
    isMobile,
    handleClose,
    onSearch,
    contactIds,
    contactAssignedIds,
    contactAssigneds,
    addContactRequest,
    removeContactRequest,
    addContactPageRequest,
    t,
    eventTypes,
    errors,
  } = props;

  const [contactSelected, setContactSelected] = useState<any>([]);
  const [initContactSelected, setInitContactSelected] = useState<any>([]);

  useEffect(() => {
    firebaseLogEventRequest('contact_list_sidebar', '');
    if (contactAssignedIds.length > 0) {
      const contactSlectedByEventType = contactAssignedIds.filter(item =>
        contactAssigneds[item].eventTypes.includes(eventTypes)
      );
      setContactSelected(contactSlectedByEventType);
      setInitContactSelected(contactSlectedByEventType);
    }
  }, [contactAssignedIds]);

  const [showAddContact, setShowAddContact] = useState(false);

  const debounceSearch = debounce((v: string) => {
    onSearch(v);
    firebaseLogEventRequest('contact_list_sidebar', 'search_contact');
  }, 300);
  const onShowAddContact = () => {
    firebaseLogEventRequest('contact_list_sidebar', 'add_new_contact');
    setShowAddContact(true);
  };
  const onHiddenAddContact = () => {
    firebaseLogEventRequest('add_new_contact_modal', 'close_add_contact_modal');
    setShowAddContact(false);
  };

  const handleChecked = (contact_id: number) => {
    if (contactSelected.includes(contact_id)) {
      setContactSelected(contactSelected.filter(item => item !== contact_id));
    } else {
      setContactSelected([...contactSelected, contact_id]);
    }
  };

  const getRemoveData = (initArr: any, currentArr: any) => {
    return initArr.filter((item: any) => {
      return !currentArr.find((element: any) => element === item);
    });
  };

  const getAddData = (initArr: any, currentArr: any) => {
    return currentArr.filter((item: any) => {
      return !initArr.find((element: any) => element === item);
    });
  };

  const onSubmit = () => {
    firebaseLogEventRequest(
      'contact_list_sidebar',
      `assign_contact_${eventTypes}`
    );
    const addContactAssign = getAddData(initContactSelected, contactSelected);
    const removeContactAssign = getRemoveData(
      initContactSelected,
      contactSelected
    );
    if (addContactAssign.length > 0) {
      addContactRequest(addContactAssign, eventTypes, handleClose);
    }
    if (removeContactAssign.length > 0) {
      removeContactRequest(removeContactAssign, eventTypes, handleClose);
    }
  };

  return (
    <SideBarOutsideContact
      button={
        <SearchInput>
          <TextInput
            placeholder={'Search contact by Name'}
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AiOutlineSearch className={classes.color} />
                </InputAdornment>
              ),
            }}
            onChange={event => debounceSearch(event.target.value)}
          />
        </SearchInput>
      }
      show={show}
      direction="right"
      handleClose={handleClose}
      isMobile={isMobile}
    >
      <SelectContactContainer>
        {contactIds?.map(item => (
          <ContactCard
            contact={contacts[item]}
            contactSelected={contactSelected}
            handleChange={handleChecked}
            key={item}
          />
        ))}

        <Button
          className={`${classes.addBtn} ${classes.margin}`}
          variant="contained"
          color="primary"
          startIcon={<FiPlus />}
          onClick={onShowAddContact}
          text={'Add New Contact'}
        />
        <AddNewContact
          showAddContact={showAddContact}
          onClose={onHiddenAddContact}
          addContactPageRequest={addContactPageRequest}
          t={t}
          isMobile={isMobile}
          errors={errors}
        />
      </SelectContactContainer>
      <Save>
        <Button
          className={`${classes.btn} ${classes.margin}`}
          variant="outlined"
          // isLoading={isRequesting}
          text={'save'}
          onClick={onSubmit}
        />
      </Save>
    </SideBarOutsideContact>
  );
}
