import React from 'react';
import { Formik } from 'formik';
import Link from 'next/link';

import { TextInput } from '@Components/inputs';
import Button from '@Components/buttons/Button';
import LoginSchema from '../../schema';
import ILoginPage from '../../interfaces';

import { Form, Label, useStyles, Message, SwitchGroup } from './styles';
import { Switch } from '@material-ui/core';

const initialValuesForm = {
  username: '',
  password: '',
};

function LoginForm(props: ILoginPage.IProps) {
  const { t, loginRequestAction, errors, errorMessage } = props;
  const classes = useStyles();

  const submitForm = (values: ILoginPage.IStateLogin) =>
    loginRequestAction(values);

  return (
    <Formik
      initialValues={initialValuesForm}
      onSubmit={submitForm}
      validationSchema={LoginSchema}
    >
      {({ values, errors: errorsForm, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <TextInput
            className={classes.margin}
            label="Email Address"
            name="username"
            type="text"
            value={values.username}
            onChange={handleChange('username')}
            errorInput={
              errorsForm.username ? t(errorsForm.username) : errors.username
            }
            variant="outlined"
          />
          <TextInput
            className={classes.margin}
            label="Password"
            name="password"
            type="password"
            errorInput={
              errorsForm.password ? t(errorsForm.password) : errors.password
            }
            value={values.password}
            onChange={handleChange('password')}
            variant="outlined"
          />
          {errorMessage && (
            <Message className={classes.errorText}>{errorMessage}</Message>
          )}
          <SwitchGroup>
            <span>{t('auth:remember_me')}</span>
            <Switch
              // checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
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
          />
          <Link href="/forgot-password">
            <Label>{t('forgot_password')}?</Label>
          </Link>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
