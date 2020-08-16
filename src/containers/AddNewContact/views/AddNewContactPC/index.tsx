import React, { useState } from 'react';
import Modal from '@Components/modals';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import EmailForm from '../form/Email';
import SMSForm from '../form/SMS';

import { Type } from './styles';

export default function AddNewContactPC(props) {
  const { showAddContact, onClose, t } = props;

  const [type, setChangeType] = useState('EMAIL');

  const onChangeType = e => setChangeType(e.target.value);

  const onShowForm = () => {
    if (type === 'PHONE') {
      return <SMSForm type={type} {...props} onClose={onClose} />;
    }
    return <EmailForm type={type} {...props} onClose={onClose} />;
  };

  return (
    <>
      <Modal
        open={showAddContact}
        handleClose={onClose}
        title={t('auth:add_new_contact')}
      >
        <div>
          <Type>
            <p>{t('auth:select_type')}</p>
            <RadioGroup
              value={type}
              onChange={onChangeType}
              style={{ flexDirection: 'column' }}
            >
              <FormControlLabel
                value="EMAIL"
                control={<Radio color="primary" />}
                label="Email"
              />
              <FormControlLabel
                value="PHONE"
                control={<Radio color="primary" />}
                label={t('auth:receive_sms')}
              />
            </RadioGroup>
          </Type>
          <hr />
          <div>{onShowForm()}</div>
        </div>
      </Modal>
    </>
  );
}
