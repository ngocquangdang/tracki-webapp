import React from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'next-i18next';

import { TextInput, PhoneNumberInput } from '@Components/inputs';
import Button from '@Components/buttons/Button';
import { Form, useStyles } from './styles';
import { ChatUsSchema } from '../../schema';
import ILoginPage from '../../interfaces';

const initialValuesForm = {
  name: '',
  username: '',
  phonenumber: '',
};

export default function ChatUs(props: ILoginPage.IProps) {
  const { t } = useTranslation('auth');

  const { chatusRequestAction, resetErrorAction, errors } = props;
  const classes = useStyles();
  const submitForm = (values: ILoginPage.IStateChatUs) =>
    chatusRequestAction(values);

  return (
    <Formik
      className={classes.container}
      initialValues={initialValuesForm}
      onSubmit={submitForm}
      validationSchema={ChatUsSchema}
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
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange('name')}
            errorInput={
              errorsForm.name && touched.name ? t(errorsForm.name) : errors.name
            }
            variant="outlined"
            onBlur={handleBlur('name')}
          />
          <PhoneNumberInput
            label="Phone Number"
            name="phonenumber"
            defaultCountry={'us'}
            variant="outlined"
            onChange={handleChange('phonenumber')}
            value={values.phonenumber}
            errorInput={
              errorsForm.phonenumber && touched.phonenumber
                ? t(errorsForm.phonenumber)
                : errors.phonenumber
            }
            searchStyle={{ width: '93%', height: '35px' }}
            buttonStyle={{ left: 5 }}
          />
          <TextInput
            label="Email"
            name="username"
            value={values.username}
            onChange={handleChange('username')}
            errorInput={
              errorsForm.username && touched.username
                ? t(errorsForm.username)
                : errors.username
            }
            variant="outlined"
          />
          {/* {errorMessage && (
            <p className={classes.errorText}>
              {errorMessage.message_key === 'exception_user_nameNotFound'
                ? t('tracker:invalid_email_or_phone')
                : ''}
            </p>
          )} */}
          <Button
            className={`${classes.margin} ${classes.btn}`}
            color="primary"
            type="submit"
            variant="outlined"
            text={t('submit')}
            onClick={() => resetErrorAction()}
          />
        </Form>
      )}
    </Formik>
  );
}
