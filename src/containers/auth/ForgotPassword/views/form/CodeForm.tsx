import React from 'react';
import { Formik } from 'formik';
import IForgotPage from '../../interfaces';
import { Typography } from '@material-ui/core';
import { TextInput } from '@Components/inputs';
import { Button } from '@Components/buttons';
import { CodeFormSchema } from '../../schema';
import { Form, useStyles } from '../styles';
import { firebaseLogEventRequest } from '@Utils/firebase';

const initialEmail = {
  code: '',
};

export default function CodeFrom(props: IForgotPage.IProps) {
  const { t, errors, email, isRequesting, confirmCodeRequestAction } = props;
  const classes = useStyles();
  const submitForm = (value: any) => {
    if (email) {
      firebaseLogEventRequest(
        'forgot_password_page',
        'enter_code_forgot_password'
      );
      return confirmCodeRequestAction({ email, code: value.code });
    }
  };

  return (
    <Formik
      initialValues={initialEmail}
      onSubmit={submitForm}
      validationSchema={CodeFormSchema}
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
          <Typography className={classes.text}>
            {t('auth:sent_email_to', { text: email })}
          </Typography>
          <Typography className={classes.text2}>
            {t('auth:sent_email_description')}
          </Typography>
          <TextInput
            className={classes.margin}
            label={t('auth:code')}
            name="code"
            value={values.code}
            onChange={handleChange('code')}
            onBlur={handleBlur('code')}
            errorInput={
              errorsForm.code && touched.code ? t(errorsForm.code) : errors.code
            }
            variant="outlined"
          />
          <Button
            classes={`${classes.margin}, ${classes.btn}`}
            text={t('auth:confirm_code')}
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
