import React from 'react';
import { Formik } from 'formik';
import IForgotPage from '../../interfaces';
import { TextInput } from '@Components/inputs';
import { Button } from '@Components/buttons';

import { Form, useStyles } from '../styles';
import { EmailFormSchema } from '../../schema';

const initialEmail = {
  email: '',
};

export default function EmailFrom(props: IForgotPage.IProps) {
  const { t, errors, isRequesting, forgotRequestAction } = props;
  const classes = useStyles();
  const submitForm = (value: any) =>
    forgotRequestAction({ email: value.email });
  return (
    <Formik
      initialValues={initialEmail}
      onSubmit={submitForm}
      validationSchema={EmailFormSchema}
    >
      {({
        values,
        errors: errorsForm,
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
      }) => (
        <Form onSubmit={handleSubmit}>
          <TextInput
            className={classes.margin}
            label={t('auth:email_address')}
            name="email"
            value={values.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            errorInput={
              errorsForm.email && touched.email
                ? t(errorsForm.email)
                : errors.email
            }
            variant="outlined"
          />
          <Button
            classes={`${classes.margin}, ${classes.btn}`}
            text={t('auth:reset_password')}
            isLoading={isRequesting}
            color="primary"
            type="submit"
            variant="outlined"
          />
        </Form>
      )}
    </Formik>
  );
}
