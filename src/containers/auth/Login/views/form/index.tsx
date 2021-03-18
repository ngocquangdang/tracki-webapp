import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Link from 'next/link';

import { TextInput, PasswordInput } from '@Components/inputs';
import Button from '@Components/buttons/Button';
import { LoginSchema } from '../../schema';
import ILoginPage from '../../interfaces';

import { Form, Label, useStyles, Message, SwitchGroup } from './styles';
import { Switch } from '@material-ui/core';
import { firebaseLogEventRequest } from '@Utils/firebase';

function LoginForm(props: ILoginPage.IProps) {
  const {
    t,
    loginRequestAction,
    resetErrorAction,
    errors,
    errorMessage,
  } = props;
  const classes = useStyles();

  const [user, setUser] = useState({
    username: '',
    password: '',
    remember_me: false,
  });

  useEffect(() => {
    const rememeber = localStorage.getItem('remember_me');
    setUser({
      username: '',
      password: '',
      remember_me: rememeber === 'true',
    });
  }, []);

  useEffect(() => {
    // userf.current.focus();
  }, []);
  const submitForm = (values: ILoginPage.IStateLogin) => {
    loginRequestAction(values);
    firebaseLogEventRequest('login_page', 'enter_email');
    firebaseLogEventRequest('login_page', 'enter_password');
    firebaseLogEventRequest('login_page', 'login');
    localStorage.setItem('remember_me', values.remember_me + '');
  };
  // const resetError = () => resetErrorMessage();

  const onForgotPassword = () => {
    firebaseLogEventRequest('login_page', 'forgot_password');
    resetErrorAction();
  };

  return (
    <Formik
      initialValues={user}
      onSubmit={submitForm}
      validationSchema={LoginSchema}
      enableReinitialize
    >
      {({
        values,
        errors: errorsForm,
        handleChange,
        setFieldValue,
        handleSubmit,
        handleBlur,
        touched,
      }) => (
        <Form onSubmit={handleSubmit}>
          <TextInput
            id="username"
            className={classes.margin}
            label={t('auth:email_address')}
            name="username"
            type="text"
            value={values.username}
            onChange={handleChange('username')}
            errorInput={
              errorsForm.username && touched.username
                ? t(errorsForm.username)
                : errors.username
            }
            onBlur={handleBlur('username')}
            variant="outlined"
            // autoComplete="off"
            autoComplete={!user.remember_me ? 'new-password' : 'new-input'}
            InputLabelProps={{ shrink: true }}
          />
          <PasswordInput
            id="xxxxx-password"
            className={classes.margin}
            label={t('password')}
            name="password"
            errorInput={
              errorsForm.password && touched.password
                ? t(errorsForm.password)
                : undefined
            }
            value={values.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            autoComplete={!user.remember_me ? 'new-password' : 'new-input'}
          />

          {errorMessage && (
            <Message className={classes.errorText}>
              {errorMessage.message_key === 'exception_user_invalid_password' ||
              errorMessage.message_key === 'exception_user_nameNotFound'
                ? t('tracker:invalid_email_or_password')
                : errorMessage.message}
            </Message>
          )}
          <SwitchGroup>
            <span>{t('auth:remember_me')}</span>
            <Switch
              checked={values.remember_me}
              value={values.remember_me}
              onChange={handleChange('remember_me')}
              name="remember_me"
              color="primary"
            />
          </SwitchGroup>
          <Button
            className={`${classes.margin} ${classes.btn}`}
            color="primary"
            type="submit"
            isLoading={props.isRequesting}
            variant="outlined"
            text={t('auth:login')}
            onClick={() => resetErrorAction()}
          />
          <Link href="/forgot-password">
            <Label onClick={onForgotPassword}>{t('forgot_password')}?</Label>
          </Link>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
