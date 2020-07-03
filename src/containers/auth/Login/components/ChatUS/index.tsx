import React from 'react';
import { Formik } from 'formik';

import { TextInput, PhoneNumberInput } from '@Components/inputs';
import Button from '@Components/buttons/Button';
import { Form, useStyles } from './styles';
import ChatUsSchema from '../schema';
import IChatUsPage from './interfaces';

const initialValuesForm = {
  name: '',
  email: '',
  phonenumber: '',
};

export default function ChatUs(props: IChatUsPage.IProps) {
  console.log('ChatUs -> props', props);
  const { chatUsRequestAction } = props;
  const classes = useStyles();
  const submitForm = (values: IChatUsPage.IStateChatUs) =>
    chatUsRequestAction(values);

  return (
    <Formik
      className={classes.container}
      initialValues={initialValuesForm}
      onSubmit={submitForm}
      validationSchema={ChatUsSchema}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form>
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
          />
          <TextInput
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            variant="outlined"
          />
          <Button
            className={`${classes.margin} ${classes.btn}`}
            color="primary"
            variant="outlined"
            text="submit"
          />
        </Form>
      )}
    </Formik>
  );
}
