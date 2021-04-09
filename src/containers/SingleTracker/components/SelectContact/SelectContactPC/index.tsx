import React, { useEffect, useState } from 'react';
import { SideBarOutside } from '@Components/sidebars';
import { debounce } from 'lodash';
import ContactCard from '@Components/ContactCard';
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
import { firebaseLogEventRequest } from '@Utils/firebase';

interface Props {
  isMobile: boolean;
  show: boolean;
  contacts: object;
  handleClose(): void;
  onSearch(v): void;
  contactIds: any;
  contactAssigneds: object;
  contactAssignedIds: Array<number>;
  addContactRequest(data, eventTypes): void;
  removeContactRequest(data, eventTypes): void;
  eventTypes?: string;
  addContactPageRequest(data, callback): void;
  t(key: string): string;
  errors: any;
}

export default function SelectContactPC(props: Props) {
  const classes = useStyles();
  const {
    contacts,
    show,
    isMobile,
    handleClose,
    onSearch,
    contactIds,
    addContactRequest,
    removeContactRequest,
    addContactPageRequest,
    eventTypes,
    t,
    contactAssignedIds,
    contactAssigneds,
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
      addContactRequest(addContactAssign, eventTypes);
    }
    if (removeContactAssign.length > 0) {
      removeContactRequest(removeContactAssign, eventTypes);
    }
  };

  return (
    <SideBarOutside
      title="Select Contacts to Add"
      button={
        <Button
          onClick={onShowAddContact}
          className={`${classes.addBtn} ${classes.margin}`}
          variant="outlined"
          color="primary"
          startIcon={<FiPlus />}
          text={'Add'}
        />
      }
      show={show}
      direction="right"
      handleClose={handleClose}
      isMobile={isMobile}
    >
      <SelectContactContainer>
        <SearchInput>
          <TextInput
            placeholder={'Search contact by Name'}
            variant="outlined"
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
        {contactIds?.map(item => (
          <ContactCard
            contact={contacts[item]}
            contactSelected={contactSelected}
            handleChange={handleChecked}
            key={item}
          />
        ))}
        <Save>
          <Button
            className={`${classes.btn} ${classes.margin}`}
            variant="outlined"
            // isLoading={isRequesting}
            text={'save'}
            onClick={onSubmit}
          />
        </Save>
        <AddNewContact
          contacts={contacts}
          contactIds={contactIds}
          showAddContact={showAddContact}
          onClose={onHiddenAddContact}
          addContactPageRequest={addContactPageRequest}
          t={t}
          isMobile={isMobile}
          errors={errors}
        />
      </SelectContactContainer>
    </SideBarOutside>
  );
}
