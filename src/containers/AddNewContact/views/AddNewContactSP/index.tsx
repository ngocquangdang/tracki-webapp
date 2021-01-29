import React, { useEffect, useState } from 'react';
import { SideBarOutside } from '@Components/sidebars';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { firebaseLogEventRequest } from '@Utils/firebase';
import EmailForm from '../form/Email';
import SMSForm from '../form/SMS';

import { Type, Container, Typography, useStyles } from './styles';

export default function AddNewContactSP(props) {
  const classes = useStyles();
  const { showAddContact, onClose, t, isMobile } = props;

  const [type, setChangeType] = useState('EMAIL');
  useEffect(() => firebaseLogEventRequest('add_new_contact_modal', ''), []);

  const onChangeType = e => {
    setChangeType(e.target.value);
    firebaseLogEventRequest(
      'add_new_contact_modal',
      `contact_type_${e.target.value.toLowerCase()}`
    );
  };

  const onShowForm = () => {
    if (type === 'PHONE') {
      return <SMSForm type={type} {...props} onClose={onClose} />;
    }
    return <EmailForm type={type} {...props} onClose={onClose} />;
  };

  return (
    <SideBarOutside
      title="Add new Contact"
      show={showAddContact}
      direction="left"
      handleClose={onClose}
      isMobile={isMobile}
      isLogo={true}
    >
      <Container>
        <Type>
          <Typography>{t('auth:select_type')}</Typography>
          <RadioGroup
            value={type}
            onChange={onChangeType}
            style={{ flexDirection: 'column' }}
          >
            <FormControlLabel
              value="EMAIL"
              control={<Radio color="primary" />}
              label="Email"
              className={classes.fontSize}
            />
            <FormControlLabel
              value="PHONE"
              control={<Radio color="primary" />}
              label={t('auth:receive_sms')}
              className={classes.fontSize}
            />
          </RadioGroup>
        </Type>
        <hr />
        <div>{onShowForm()}</div>
      </Container>
    </SideBarOutside>
  );
}
