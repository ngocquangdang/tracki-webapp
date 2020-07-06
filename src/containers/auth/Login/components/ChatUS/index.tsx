import React from 'react';
import { Formik } from 'formik';

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
  console.log('ChatUs -> props', props);
  const { chatusRequestAction, t } = props;
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
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            variant="outlined"
          />
          <PhoneNumberInput
            label="Phone Number"
            defaultCountry={'us'}
            variant="outlined"
            onChange={handleChange}
            value={values.phonenumber}
            searchStyle={{ width: '93%', height: '35px' }}
          />
          <TextInput
            label="Email"
            name="username"
            value={values.username}
            onChange={handleChange}
            variant="outlined"
          />
          <Button
            className={`${classes.margin} ${classes.btn}`}
            color="primary"
            variant="outlined"
            text={t('submit')}
          />
        </Form>
      )}
    </Formik>
  );
}
