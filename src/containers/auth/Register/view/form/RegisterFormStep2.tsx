import React from 'react';
import { Formik } from 'formik';

import { TextInput } from '@Components/inputs';
import Button from '@Components/buttons/Button';
import { SingUpSchemaStep2 } from '../../schema';
import IRegisterPage from '../../interfaces';

import { Form, useStyles, InfoText } from '../styles';

function RegisterFormStep2(props: IRegisterPage.IProps) {
  const { t, updateStore, errors, onNextStep, formData } = props;
  const classes = useStyles();
  const submitForm = (values: IRegisterPage.RegisterFormStep2) => {
    updateStore({ ...formData, ...values });
    onNextStep();
  };

  return (
    <Formik
      initialValues={formData}
      onSubmit={submitForm}
      validationSchema={SingUpSchemaStep2}
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
            label={t('auth:first_name')}
            name="first_name"
            value={values.first_name}
            onChange={handleChange('first_name')}
            onBlur={handleBlur('first_name')}
            errorInput={
              errorsForm.first_name && touched.first_name
                ? t(errorsForm.first_name)
                : errors.first_name
            }
            variant="outlined"
          />
          <TextInput
            className={classes.margin}
            label={t('auth:last_name')}
            name="last_name"
            value={values.last_name}
            onChange={handleChange('last_name')}
            onBlur={handleBlur('last_name')}
            errorInput={
              errorsForm.last_name && touched.last_name
                ? t(errorsForm.last_name)
                : errors.last_name
            }
            variant="outlined"
          />
          <InfoText isDescription>
            {t('auth:create_account_step_2_description')}
          </InfoText>
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

export default RegisterFormStep2;
