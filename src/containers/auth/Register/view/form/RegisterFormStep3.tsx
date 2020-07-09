import React, { useState } from 'react';
import { Formik } from 'formik';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { PhoneNumberInput } from '@Components/inputs';
import Button from '@Components/buttons/Button';
import { SingUpSchemaStep3 } from '../../schema';
import IRegisterPage from '../../interfaces';

import { Form, useStyles } from '../styles';
const initialValuesForm = {
  phone: '',
};

function RegisterFormStep3(props: IRegisterPage.IProps) {
  const { t, updateStore, errors, onNextStep, formData } = props;
  const classes = useStyles();
  const [code, setCode] = useState(1);
  const submitForm = (values: IRegisterPage.RegisterFormStep3) => {
    const phoneNumber = parsePhoneNumberFromString(`+${code}${values.phone}`);
    const isValidPhone = phoneNumber?.isValid();
    if (isValidPhone) {
      updateStore({ ...formData, ...values });
      onNextStep();
    }
  };

  return (
    <Formik
      initialValues={formData || initialValuesForm}
      onSubmit={submitForm}
      validationSchema={SingUpSchemaStep3}
    >
      {({
        values,
        errors: errorsForm,
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
      }) => {
        const phoneNumber = parsePhoneNumberFromString(
          `+${code}${values.phone}`
        );
        const isValidPhone = phoneNumber?.isValid();
        return (
          <Form onSubmit={handleSubmit}>
            <PhoneNumberInput
              label="Phone Number"
              defaultCountry="us"
              variant="outlined"
              onChange={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              errorInput={
                errorsForm.phone && touched.phone
                  ? t(errorsForm.phone)
                  : values.phone && !isValidPhone
                  ? t('auth:wrong_phone_format')
                  : errors.phone
              }
              searchStyle={{ width: '93%', height: '35px' }}
              onChangeInput={(code: any) => setCode(code)}
            />
            <Button
              className={`${classes.margin} ${classes.btnContinue}`}
              color="primary"
              type="submit"
              isLoading={props.isRequesting}
              variant="outlined"
              text={t('auth:continue')}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default RegisterFormStep3;
