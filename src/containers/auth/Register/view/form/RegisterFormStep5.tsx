import React from 'react';
import { Formik } from 'formik';
import Button from '@Components/buttons/Button';
import { SignUpSchema } from '../../schema';
import IRegisterPage from '../../interfaces';

import { Form, useStyles } from '../styles';

const initialValuesForm = {};

function RegisterFormStep5(props: IRegisterPage.IProps) {
  const { t, onNextStep } = props;
  const classes = useStyles();

  return (
    <Formik
      initialValues={initialValuesForm}
      onSubmit={onNextStep}
      validationSchema={SignUpSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Button
            className={`${classes.margin} ${classes.btnContinue}`}
            color="primary"
            type="submit"
            isLoading={props.isRequesting}
            variant="outlined"
            text={t('auth:continue')}
          />
        </Form>
      )}
    </Formik>
  );
}

export default RegisterFormStep5;
