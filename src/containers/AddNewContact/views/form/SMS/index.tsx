import React, { useState } from 'react';
import { Formik } from 'formik';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { TextInput, PhoneNumberInput } from '@Components/inputs';
import { Button } from '@Components/buttons';
import { smsSchema } from '../../../schema';
import { firebaseLogEventRequest } from '@Utils/firebase';

import { useStyles, Notifi } from './styles';

const initialData = {
  name: '',
  phone: '',
};
export default function SMSForm(props) {
  const classes = useStyles();
  const [code, setCode] = useState(1);
  const [textErrorPhone, setTextErrorPhone] = useState('');
  const {
    t,
    type,
    addContactPageRequest,
    isRequesting,
    onClose,
    errors,
    listContactPhone,
  } = props;
  const onSubmit = value => {
    const phoneNumber = parsePhoneNumberFromString(`+${code}${value.phone}`);
    if (listContactPhone.includes(phoneNumber?.number)) {
      setTextErrorPhone(t('contact:contact_already'));
      return;
    }
    firebaseLogEventRequest('add_new_contact_modal', 'add_contact_type_phone');
    addContactPageRequest(
      { name: value.name, type, address: phoneNumber?.number },
      onClose
    );
  };

  return (
    <div>
      <Formik
        initialValues={initialData}
        onSubmit={onSubmit}
        validationSchema={smsSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors: errorsForm,
          touched,
        }) => {
          const phoneNumber = parsePhoneNumberFromString(
            `+${code}${values.phone}`
          );
          const isValidPhone = phoneNumber?.isValid();
          return (
            <form onSubmit={handleSubmit}>
              <TextInput
                label={t('auth:name')}
                name="code"
                value={values.name}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                variant="outlined"
                errorInput={
                  errorsForm.name && touched.name ? t(errorsForm.name) : ''
                }
              />
              <PhoneNumberInput
                label="Phone Number"
                defaultCountry="us"
                variant="outlined"
                onChange={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                errorInput={
                  errorsForm.phone && touched.phone
                    ? t(errorsForm.phone)
                    : values.phone && !isValidPhone
                    ? t('auth:wrong_phone_format')
                    : ''
                }
                onChangeInput={(code: any) => setCode(code)}
                searchStyle={{ width: '93%', height: '35px' }}
              />
              <Notifi>{errors.code || textErrorPhone}</Notifi>
              <Button
                classes={`${classes.fullWidth} ${classes.btn}`}
                text={t('auth:add_contact')}
                isLoading={isRequesting}
                color="primary"
                type="submit"
                variant="outlined"
              />
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
