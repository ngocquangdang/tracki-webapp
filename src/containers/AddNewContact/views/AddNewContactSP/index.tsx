import React, { useState } from 'react';
import { SideBarOutside } from '@Components/sidebars';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import EmailForm from '../form/Email';
import SMSForm from '../form/SMS';

import { Type, Container, Typography, useStyles } from './styles';

export default function AddNewContactSP(props) {
  const classes = useStyles();
  const { showAddContact, onClose, t, isMobile } = props;

  const [type, setChangeType] = useState('EMAIL');

  const onChangeType = value => setChangeType(value);

  const onShowForm = () => {
    switch (type) {
      case 'PHONE':
        return <SMSForm t={t} type={type} {...props} onClose={onClose} />;
      default:
        return <EmailForm t={t} type={type} {...props} onClose={onClose} />;
    }
  };

  return (
    <SideBarOutside
      title="Add new Contact"
      show={showAddContact}
      direction="right"
      handleClose={onClose}
      isMobile={isMobile}
      isLogo={true}
    >
      <Container>
        <Type>
          <Typography>{t('auth:select_type')}</Typography>
          <RadioGroup
            value={type}
            onChange={e => onChangeType(e.target.value)}
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
