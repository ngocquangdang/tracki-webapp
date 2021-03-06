import React from 'react';
import { Formik } from 'formik';

import { TextInput } from '@Components/inputs';
import Button from '@Components/buttons/Button';
import { SingUpSchemaStep4 } from '../../schema';
import IRegisterPage from '../../interfaces';

import { Form, useStyles, InfoText, Message } from '../styles';

function RegisterFormStep4(props: IRegisterPage.IProps) {
  const {
    t,
    registerRequestAction,
    updateStore,
    errors,
    onNextStep,
    formData,
    errorMessage,
    errorMessageKey,
  } = props;
  const classes = useStyles();
  const submitForm = (values: IRegisterPage.RegisterFormStep4) => {
    updateStore({ ...formData, ...values });
    if (errorMessageKey === 'exception_user_exist') {
      onNextStep();
      return;
    }
    registerRequestAction({ ...formData, ...values }, onNextStep);
  };

  return (
    <Formik
      initialValues={formData}
      onSubmit={submitForm}
      validationSchema={SingUpSchemaStep4}
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
            label={t('auth:zip')}
            name="zip"
            value={values.zip}
            onChange={handleChange('zip')}
            onBlur={handleBlur('zip')}
            errorInput={
              errorsForm.zip && touched.zip ? t(errorsForm.zip) : errors.zip
            }
            variant="outlined"
          />
          <InfoText isDescription>
            {t('auth:create_account_step_4_description')}
          </InfoText>
          {errorMessage && (
            <Message className={classes.errorText}>{errorMessage}</Message>
          )}
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

export default RegisterFormStep4;
