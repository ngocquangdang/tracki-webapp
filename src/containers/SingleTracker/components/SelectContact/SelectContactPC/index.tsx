import React, { useState, useEffect } from 'react';
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

export default function SelectContactPC(props: Props) {
  console.log('SelectContact -> props', props);
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
    eventTypes,
    t,
  } = props;
  const [initialAssigned, setInitialAssigned] = useState<number[]>([]);
  const [checked, setChecked] = useState<number[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);

  useEffect(() => {
    const speedLimit = contactAssignedIds.filter(contactId => {
      return contactAssigneds[contactId].eventTypes.find(
        item => item === eventTypes
      );
    });
    setChecked(speedLimit);
    setInitialAssigned(speedLimit);
  }, [contactAssignedIds, contactAssigneds, eventTypes]);

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
            checked={checked.indexOf(item) !== -1}
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
        <AddNewContact
          showAddContact={showAddContact}
          onClose={onHiddenAddContact}
          addContactAction={addContactAction}
          t={t}
          isMobile={isMobile}
        />
      </SelectContactContainer>
    </SideBarOutside>
  );
}
