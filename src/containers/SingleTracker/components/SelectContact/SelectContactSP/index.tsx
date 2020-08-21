import React, { useState } from 'react';
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

interface Props {
  isMobile: boolean;
  show: boolean;
  contacts: object;
  handleClose(): void;
  onSearch(v): void;
  contactIds: Array<number>;
  contactAssigneds?: object;
  contactAssignedIds?: Array<number>;
  addContactRequest(data, eventTypes): void;
  removeContactRequest(data, eventTypes): void;
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
    addContactRequest,
    removeContactRequest,
    addContactPageRequest,
    t,
    eventTypes,
    tracker,
    errors,
  } = props;

  const { contacts: contactOfTracker = [] } = tracker;
  const [contactSelected, setContactSelected] = useState([...contactOfTracker]);

  const [showAddContact, setShowAddContact] = useState(false);

  const debounceSearch = debounce((v: string) => onSearch(v), 300);
  const onShowAddContact = () => {
    setShowAddContact(true);
  };
  const onHiddenAddContact = () => {
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
    const addContactAssign = getAddData(contactOfTracker, contactSelected);
    const removeContactAssign = getRemoveData(
      contactOfTracker,
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
