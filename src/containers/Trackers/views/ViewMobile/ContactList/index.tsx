import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Slide } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { Button } from '@Components/buttons';
import AddContact from '@Containers/AddNewContact';
import { addContactRequestAction } from '@Containers/SingleTracker/store/actions';
import { useStyles } from './styles';

interface Props {
  contacts: object;
  show: boolean;
  onClose: () => void;
  t(key: string, format?: object): string;
  addContactPageRequest(data: object, callback: void): void;
  [data: string]: any;
}

function ContactList(props: Props) {
  const [showAddContact, setShowAddContact] = useState(false);
  const classes = useStyles();
  const { show, t, onClose, addContactPageRequest } = props;

  const onSaveClick = () => {
    console.log('onSaveClick');
    onClose();
  };

  const addContact = () => setShowAddContact(true);
  const onCloseAddContact = () => setShowAddContact(false);

  return (
    <React.Fragment>
      <Slide direction="up" in={show} mountOnEnter unmountOnExit>
        <div className={classes.container}>
          <div className={classes.header}></div>
          <div className={classes.content}>
            <Button
              text="Add New Contact"
              variant="contained"
              startIcon={<Add />}
              className={classes.addNewBtn}
              onClick={addContact}
            />
          </div>

          <div className={classes.footer}>
            <Button
              text="Save"
              color="primary"
              variant="contained"
              fullWidth
              className={classes.saveBtn}
              onClick={onSaveClick}
            />
          </div>
        </div>
      </Slide>
      <AddContact
        isMobile={true}
        showAddContact={showAddContact}
        onClose={onCloseAddContact}
        addContactPageRequest={addContactPageRequest}
        t={t}
      />
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => ({
  addContactPageRequest: (data: object, callback: void) =>
    dispatch(addContactRequestAction(data, callback)),
});

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ContactList);
