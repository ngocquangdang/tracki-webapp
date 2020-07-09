import React from 'react';
import { Formik } from 'formik';

import { TextInput, PasswordInput } from '@Components/inputs';
import Button from '@Components/buttons/Button';
import { SignUpSchema } from '../../schema';
import IRegisterPage from '../../interfaces';

import { Form, useStyles } from '../styles';

const initialValues = {
  username: '',
  password: '',
  confirm_password: '',
};

function RegisterFormStep1(props: IRegisterPage.IProps) {
  const { t, updateStore, errors, onNextStep, formData } = props;
  const classes = useStyles();

  const submitForm = (values: IRegisterPage.RegisterFormStep1) => {
    updateStore(values);
    onNextStep();
  };

  return (
    <Formik
      initialValues={formData || initialValues}
      onSubmit={submitForm}
      validationSchema={SignUpSchema}
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
            name="username"
            value={values.username}
            onChange={handleChange('username')}
            onBlur={handleBlur('username')}
            errorInput={
              errorsForm.username && touched.username
                ? t(errorsForm.username)
                : errors.username
            }
            variant="outlined"
          />
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

export default RegisterFormStep1;
