import React, { useState, useEffect } from 'react';
import { MainLayout } from '@Layouts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import { MdPhoneIphone, MdEmail, MdContacts } from 'react-icons/md';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  useStyles,
  ContactContainer,
  Icon,
  PaginationStyle,
  IconContact,
  LogoContact,
  ActionContact,
  HeaderContact,
  Title,
  SearchInput,
  AddButton,
  TextInput,
} from './styles';

import AddNewContact from '@Containers/AddNewContact';
import { Button } from '@Components/buttons';
import { IoMdPersonAdd } from 'react-icons/io';
import EmailForm from './form/Email';
import SMSForm from './form/SMS';
import { AiOutlineSearch } from 'react-icons/ai';
import { debounce } from 'lodash';
import { firebaseLogEventRequest } from '@Utils/firebase';

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
export default function Contact(props: Props) {
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
  const classes = useStyles();
  const [initialContactIds, setInitialContactIds] = useState<number[]>([]);
  const [initialContacts, setInitialContacts] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [editContactId, setEditContactId] = useState(0);
  const [type, setChangeType] = useState('EMAIL');
  const [showAddContact, setShowAddContact] = useState(false);

  useEffect(() => {
    setInitialContactIds(contactIds);
    setInitialContacts(contacts);
  }, [contactIds, contacts]);

  const handleChangePage = (event, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const setDefaultEdirContactId = () => {
    setEditContactId(0);
  };
  const onDeleteContact = (contact_id: number) => () => {
    deleteContactRequest(contact_id, setDefaultEdirContactId);
    firebaseLogEventRequest('contact_page', 'delete_contact');
  };

  const onEditContact = (contact_id: number) => () => {
    setEditContactId(contact_id);
    setChangeType(initialContacts[contact_id].type);
    firebaseLogEventRequest('contact_page', 'edit_contact');
  };

  const onCancel = () => {
    setDefaultEdirContactId();
    firebaseLogEventRequest('contact_page', 'cancel_edit_contact');
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

  const onShowAddContact = () => {
    setShowAddContact(true);
    firebaseLogEventRequest('contact_page', 'add_new_contact');
  };

  const onHiddenAddContact = () => {
    setShowAddContact(false);
  };

  const debounceSearch = debounce((v: string) => {
    searchContactRequest(v);
    firebaseLogEventRequest('contact_page', 'search_contact');
  }, 300);

  return (
    <MainLayout hasFooter={false}>
      <div>
        <HeaderContact>
          <LogoContact>
            <IconContact>
              <MdContacts className={classes.iconHeader} />
            </IconContact>
            <Title>{t('contact:contact_list')}</Title>
          </LogoContact>
          <ActionContact>
            <SearchInput>
              <TextInput
                placeholder={t('contact:search_contact')}
                variant="outlined"
                type="search"
                className={classes.search}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiOutlineSearch className={classes.iconSearch} />
                    </InputAdornment>
                  ),
                }}
                onChange={event => debounceSearch(event.target.value)}
              />
            </SearchInput>
            <AddButton>
              <Button
                variant="contained"
                color="primary"
                text={t('contact:add_new_contact')}
                className={`${classes.btn}`}
                startIcon={<IoMdPersonAdd />}
                onClick={onShowAddContact}
              />
            </AddButton>
          </ActionContact>
        </HeaderContact>
        <ContactContainer>
          <TableContainer>
            <Table aria-label="custom pagination table">
              <TableBody>
                {(rowsPerPage > 0
                  ? initialContactIds.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : initialContactIds
                ).map(item => {
                  return item !== editContactId ? (
                    <TableRow key={item} className={classes.flexWrap}>
                      <TableCell className={`${classes.color} ${classes.col1}`}>
                        <Icon>
                          {initialContacts[item].type === 'PHONE' ? (
                            <MdPhoneIphone className={classes.icon} />
                          ) : (
                            <MdEmail className={classes.icon} />
                          )}
                        </Icon>
                      </TableCell>
                      <TableCell className={`${classes.color} ${classes.col2}`}>
                        {initialContacts[item].name}
                      </TableCell>
                      <TableCell className={`${classes.color} ${classes.col3}`}>
                        {initialContacts[item].address}
                      </TableCell>
                      <TableCell className={`${classes.color} ${classes.col4}`}>
                        <IconButton onClick={onEditContact(item)}>
                          <Create />
                        </IconButton>
                        <IconButton onClick={onDeleteContact(item)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow
                      key={initialContacts[editContactId]}
                      className={classes.flex}
                    >
                      <TableCell className={`${classes.color} ${classes.col1}`}>
                        <Icon className={classes.iconEdit}>
                          {initialContacts[editContactId].type === 'PHONE' ? (
                            <MdPhoneIphone className={`${classes.icon} `} />
                          ) : (
                            <MdEmail className={`${classes.icon}`} />
                          )}
                        </Icon>
                      </TableCell>
                      <TableCell
                        className={`${classes.color} ${classes.col2Edit}`}
                      >
                        <div>{onShowForm()}</div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow style={{ height: 5 }}>
                  <TableCell />
                </TableRow>
              </TableBody>
              <TableFooter className={classes.footer}>
                <tr>
                  <PaginationStyle
                    rowsPerPageOptions={[20, 30, 40]}
                    count={initialContactIds.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    className={`${classes.color} ${classes.flexWrap}`}
                  />
                </tr>
              </TableFooter>
            </Table>
          </TableContainer>
        </ContactContainer>
      </div>
      <AddNewContact
        showAddContact={showAddContact}
        onClose={onHiddenAddContact}
        addContactPageRequest={addContactPageRequest}
        t={t}
        isMobile={isMobile}
        errors={errors}
      />
    </MainLayout>
  );
}
