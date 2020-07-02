import React from 'react';
import { Formik } from 'formik';

import { TextInput, PasswordInput } from '@Components/inputs';
import Button from '@Components/buttons/Button';
import RegisterSchema from '../../schema';
import IRegisterPage from '../../interfaces';

import { Form, useStyles, Message } from '../styles';

const initialValuesForm = {
  username: '',
  password: '',
  confirm_password: '',
};

function RegisterForm(props: IRegisterPage.IProps) {
  const { t, registerRequestAction, errors, errorMessage } = props;
  const classes = useStyles();

  const submitForm = (values: IRegisterPage.RegisterState) =>
    registerRequestAction(values);

  return (
    <Formik
      initialValues={initialValuesForm}
      onSubmit={submitForm}
      validationSchema={RegisterSchema}
    >
      {({ values, errors: errorsForm, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <TextInput
            className={classes.margin}
            label={t('auth:email_address')}
            name="username"
            value={values.username}
            onChange={handleChange('username')}
            errorInput={
              errorsForm.username ? t(errorsForm.username) : errors.username
            }
            variant="outlined"
          />
          <PasswordInput
            className={classes.margin}
            label={t('password')}
            name="password"
            errorInput={
              errorsForm.password ? t(errorsForm.password) : undefined
            }
            value={values.password}
            onChange={handleChange('password')}
          />
          <PasswordInput
            className={classes.margin}
            label={t('auth:confirm_password')}
            name="confirm_password"
            errorInput={
              errorsForm.confirm_password
                ? t(errorsForm.confirm_password)
                : errors.password
            }
            value={values.confirm_password}
            onChange={handleChange('confirm_password')}
          />
          {errorMessage && (
            <Message className={classes.errorText}>{errorMessage}</Message>
          )}
          <Button
            className={`${classes.margin} ${classes.btn}`}
            color="primary"
            type="submit"
            isLoading={props.isRequesting}
            variant="outlined"
            text={t('auth:create_account')}
          />
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
