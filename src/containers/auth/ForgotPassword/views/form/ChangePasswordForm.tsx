import React from 'react';
import { Formik } from 'formik';

import { InfoRounded as InfoIcon } from '@material-ui/icons';
import IForgotPage from '../../interfaces';
import { PasswordInput } from '@Components/inputs';
import { ForgotPasswordFromSchema } from '../../schema';

import { Form, Info, InfoText, useStyles } from '../styles';
import { Button } from '@Components/buttons';

const initialPassword = {
  password: '',
  confirm_password: '',
};

export default function ChangePasswordForm(props: IForgotPage.IProps) {
  const {
    t,
    errors,
    isRequesting,
    email,
    code,
    confirmPasswordRequestAction,
  } = props;
  const classes = useStyles();
  const submitForm = (value: any) => {
    if (email && code) {
      return confirmPasswordRequestAction({
        email,
        code,
        password: value.password,
      });
    }
  };
  return (
    <Formik
      initialValues={initialPassword}
      onSubmit={submitForm}
      validationSchema={ForgotPasswordFromSchema}
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
          <PasswordInput
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
          />
          <PasswordInput
            className={classes.margin}
            label={t('auth:confirm_password')}
            name="confirm_password"
            errorInput={
              errorsForm.confirm_password && touched.confirm_password
                ? t(errorsForm.confirm_password)
                : errors.password
            }
            value={values.confirm_password}
            onChange={handleChange('confirm_password')}
            onBlur={handleBlur('confirm_password')}
          />
          <Info>
            <InfoIcon className={classes.infoIcon} />
            <InfoText>{t('password_tips')}</InfoText>
          </Info>
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
