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

interface Props {
  isMobile: boolean;
  show: boolean;
  contacts: object;
  handleClose(): void;
  onSearch(v): void;
  contactIds: Array<number>;
  contactAssigneds: object;
  contactAssignedIds: Array<number>;
  addContactRequest(data, eventTypes): void;
  removeContactRequest(data, eventTypes): void;
  eventTypes?: string;
  addContactAction(data, callback): void;
  t(key: string): string;
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
    addContactAction,
    t,
    eventTypes,
  } = props;

  const [initialAssigned, setInitialAssigned] = useState<number[]>([]);
  const [intialContactIds, seIintialContactIds] = useState<number[]>([]);
  const [intialContacts, setInitialContacts] = useState({});
  const [checked, setChecked] = useState<number[]>([]); // day la mang ban dau a

  useEffect(() => {
    const speedLimit = contactAssignedIds.filter(contactId => {
      return contactAssigneds[contactId].eventTypes.find(
        item => item === eventTypes
      );
    });
    setChecked(speedLimit);
    setInitialAssigned(speedLimit);
  }, [contactAssignedIds, contactAssigneds, eventTypes]);

  useEffect(() => {
    setInitialContacts(contacts);
    seIintialContactIds(contactIds);
  }, [contacts, contactIds]);

  const [showAddContact, setShowAddContact] = useState(false);

  const debounceSearch = debounce((v: string) => onSearch(v), 300);

  const onShowAddContact = () => {
    setShowAddContact(true);
  };
  const onHiddenAddContact = () => {
    setShowAddContact(false);
  };
  const onChecked = value => {
    const index = checked.indexOf(value);
    if (checked[index] === value) {
      return setChecked([
        ...checked.slice(0, index),
        ...checked.slice(index + 1),
      ]);
    }
    setChecked([...checked, value]);
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
    const addContactAssign = getAddData(initialAssigned, checked);
    const removeContactAssign = getRemoveData(initialAssigned, checked);
    if (addContactAssign.length > 0) {
      addContactRequest(addContactAssign, eventTypes);
    }
    if (removeContactAssign.length > 0) {
      removeContactRequest(removeContactAssign, eventTypes);
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
        {intialContactIds?.map(item => (
          <ContactCard
            contact={intialContacts[item]}
            checked={checked.includes(item)}
            handleChange={onChecked}
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
          addContactAction={addContactAction}
          t={t}
          isMobile={isMobile}
        />
      </SelectContactContainer>
    </SideBarOutsideContact>
  );
}
