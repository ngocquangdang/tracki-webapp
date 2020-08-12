import React from 'react';
import { Formik } from 'formik';
import { TextInput } from '@Components/inputs';
import { Button } from '@Components/buttons';
import { emailSchema } from '../../../schema';

import { useStyles } from './styles';

const initialData = {
  name: '',
  email: '',
};
export default function EmailForm(props) {
  const { t, type, addContactAction, isRequesting, onClose } = props;
  const classes = useStyles();
  const onSubmit = value => {
    addContactAction({ name: value.name, type, address: value.email }, onClose);
  };
  return (
    <div>
      <Formik
        initialValues={initialData}
        onSubmit={onSubmit}
        validationSchema={emailSchema}
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
              <TextInput
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
                className={`${classes.fullWidth} ${classes.btn}`}
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
