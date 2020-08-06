import React from 'react';
import { Formik } from 'formik';
import Link from 'next/link';

import { TextInput } from '@Components/inputs';
import Button from '@Components/buttons/Button';
import { LoginSchema } from '../../schema';
import ILoginPage from '../../interfaces';

import { Form, Label, useStyles, Message, SwitchGroup } from './styles';
import { Switch } from '@material-ui/core';

const initialValuesForm = {
  username: '',
  password: '',
  remember_me: true,
};

function LoginForm(props: ILoginPage.IProps) {
  const {
    t,
    loginRequestAction,
    resetErrorAction,
    errors,
    errorMessage,
  } = props;
  const classes = useStyles();

  const submitForm = (values: ILoginPage.IStateLogin) =>
    loginRequestAction(values);
  // const resetError = () => resetErrorMessage();
  return (
    <Formik
      initialValues={initialValuesForm}
      onSubmit={submitForm}
      validationSchema={LoginSchema}
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
            autoComplete="off"
            InputLabelProps={{ shrink: true }}
          />
          <TextInput
            id="password"
            className={classes.margin}
            label={t('password')}
            name="password"
            type="password"
            errorInput={
              errorsForm.password && touched.password
                ? t(errorsForm.password)
                : undefined
            }
            value={values.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            variant="outlined"
            autoComplete="off"
            InputLabelProps={{ shrink: true }}
          />
          {errorMessage && (
            <Message className={classes.errorText}>{errorMessage}</Message>
          )}
          <SwitchGroup>
            <span>{t('auth:remember_me')}</span>
            <Switch
              checked={values.remember_me}
              value={values.remember_me}
              onChange={handleChange}
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
            <Label onClick={() => resetErrorAction()}>
              {t('forgot_password')}?
            </Label>
          </Link>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
