import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Button } from '@Components/buttons';
import { emailSchema } from '@Containers/Contacts/schema';

import { useStyles, TextInputStyle } from './styles';

export default function EmailForm(props) {
  const {
    t,
    isRequesting,
    contact,
    type,
    editContactRequest,
    onCancel,
    callback,
  } = props;
  const classes = useStyles();

  const [initialData, setInitialData] = useState({
    name: '',
    email: '',
  });

  const onSubmit = value => {
    if (value.name !== contact.name || value.email !== contact.address) {
      editContactRequest(
        { name: value.name, type, address: value.email },
        contact.id,
        callback
      );
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    setInitialData({
      email: contact.address || '',
      name: contact.name || '',
    });
  }, [contact]);

  return (
    <>
      <Formik
        initialValues={initialData}
        onSubmit={onSubmit}
        validationSchema={emailSchema}
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
          return (
            <form onSubmit={handleSubmit} className={classes.flex}>
              <TextInputStyle
                label={t('auth:name')}
                name="code"
                value={values.name}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                variant="outlined"
                InputProps={{
                  className: classes.heightInput,
                }}
                errorInput={
                  errorsForm.name && touched.name ? t(errorsForm.name) : ''
                }
              />
              <TextInputStyle
                label={t('auth:email_address')}
                name="email"
                value={values.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                variant="outlined"
                errorInput={
                  errorsForm.email && touched.email ? t(errorsForm.email) : ''
                }
              />
              <Button
                className={`${classes.fullWidth} ${classes.btnPrimary}`}
                text={t('auth:edit')}
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
