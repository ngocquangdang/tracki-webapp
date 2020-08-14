import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Button } from '@Components/buttons';
import { smsSchema } from '../../../schema';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { useStyles, TextInputStyle } from './styles';
import { PhoneNumberInputH40 } from '@Components/inputs';

interface Data {
  name: string;
  phone: any;
  init_phone_code: string;
  phone_code: any;
}
export default function SMSForm(props) {
  const classes = useStyles();

  const {
    t,
    isRequesting,
    contact,
    onCancel,
    editContactRequest,
    type,
    callback,
  } = props;

  const [initialData, setInitialData] = useState<Data>({
    name: '',
    phone: '',
    init_phone_code: '',
    phone_code: '',
  });

  useEffect(() => {
    const phoneNumber = parsePhoneNumberFromString(`${contact?.address}`);

    setInitialData({
      phone_code: phoneNumber?.countryCallingCode || '',
      init_phone_code: phoneNumber?.country?.toLowerCase() || 'us',
      phone: phoneNumber?.nationalNumber || '',
      name: contact.name || '',
    });
  }, [contact]);

  const onSubmit = value => {
    const phoneNumber = parsePhoneNumberFromString(
      `+${value.phone_code}${value.phone}`
    );

    if (
      value.name !== contact.name ||
      phoneNumber?.number !== contact.address
    ) {
      editContactRequest(
        { name: value.name, type, address: phoneNumber?.number },
        contact.id,
        callback
      );
    }
  };

  const handleCancel = () => {
    onCancel();
  };
  return (
    <>
      <Formik
        initialValues={initialData}
        onSubmit={onSubmit}
        validationSchema={smsSchema}
        enableReinitialize
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
            `+${values.phone_code}${values.phone}`
          );
          const isValidPhone = phoneNumber?.isValid();
          return (
            <form onSubmit={handleSubmit} className={classes.flex}>
              <TextInputStyle
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
              <PhoneNumberInputH40
                className={classes.styleInput}
                label="Phone Number"
                defaultCountry={values?.init_phone_code}
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
                onChangeInput={handleChange('phone_code')}
                searchStyle={{ width: '93%', height: '35px' }}
              />
              <Button
                className={`${classes.fullWidth} ${classes.btnPrimary}`}
                text={t('auth:add')}
                isLoading={isRequesting}
                color="primary"
                type="submit"
                variant="outlined"
              />
              <Button
                className={`${classes.fullWidth} ${classes.btn}`}
                text={t('auth:cancel')}
                isLoading={isRequesting}
                variant="contained"
                onClick={handleCancel}
              />
            </form>
          );
        }}
      </Formik>
    </>
  );
}
