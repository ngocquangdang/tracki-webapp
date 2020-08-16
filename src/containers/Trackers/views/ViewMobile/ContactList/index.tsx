import React, { useState } from 'react';
import { Slide, InputAdornment } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { Button } from '@Components/buttons';
import AddContact from '@Containers/AddNewContact';
import { useStyles, SearchInput, TextInput, ButtonClose } from './styles';
import ContactCard from '@Components/ContactCardSP';
import { AiOutlineSearch } from 'react-icons/ai';
import { debounce } from 'lodash';
import { IoMdClose } from 'react-icons/io';
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

export default function ContactList(props: Props) {
  const [showAddContact, setShowAddContact] = useState(false);
  const classes = useStyles();
  const {
    contacts,
    show,
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

  const debounceSearch = debounce((v: string) => onSearch(v), 300);

  const onShowAddContact = () => {
    console.log('aaaa');
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
    <>
      <React.Fragment>
        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
          <div className={classes.container}>
            <div className={classes.header}>
              <SearchInput>
                <TextInput
                  placeholder={'Search contact by Name'}
                  type="search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineSearch />
                      </InputAdornment>
                    ),
                  }}
                  onChange={event => debounceSearch(event.target.value)}
                />
              </SearchInput>
              <ButtonClose onClick={handleClose}>
                <IoMdClose className={classes.buttonClose} />
              </ButtonClose>
            </div>
            <div className={classes.content}>
              {contactIds?.map(item => (
                <ContactCard
                  contact={contacts[item]}
                  contactSelected={contactSelected}
                  handleChange={handleChecked}
                  key={item}
                />
              ))}
              <Button
                text="Add New Contact"
                variant="contained"
                startIcon={<Add />}
                className={classes.addNewBtn}
                onClick={onShowAddContact}
              />
            </div>

            <div className={classes.footer}>
              <Button
                text="Save"
                color="primary"
                variant="contained"
                fullWidth
                className={classes.saveBtn}
                onClick={onSubmit}
              />
            </div>
          </div>
        </Slide>
      </React.Fragment>
      <AddContact
        isMobile={true}
        showAddContact={showAddContact}
        onClose={onHiddenAddContact}
        addContactPageRequest={addContactPageRequest}
        t={t}
        errors={errors}
      />
    </>
  );
}
