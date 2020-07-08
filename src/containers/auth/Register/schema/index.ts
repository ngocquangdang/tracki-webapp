import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  username: Yup.string().email('email_invalid').required('required'),
  password: Yup.string()
    .min(6, 'too_short')
    .max(50, 'too_long')
    .required('required'),
  confirm_password: Yup.string()
    .min(6, 'too_short')
    .max(50, 'too_long')
    .oneOf([Yup.ref('password')], 'password_not_matching')
    .required('required'),
  whitelabel: Yup.string(),
});

const SingUpSchemaStep2 = Yup.object().shape({
  first_name: Yup.string().required('required'),
  last_name: Yup.string().required('required'),
});

const SingUpSchemaStep3 = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{5,15}[0-9]*$/, 'auth:wrong_phone_format')
    .required('required'),
});

const SingUpSchemaStep4 = Yup.object().shape({
  zip: Yup.string()
    .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'auth:wrong_zip_format')
    .required('required'),
});

export {
  SignUpSchema,
  SingUpSchemaStep2,
  SingUpSchemaStep3,
  SingUpSchemaStep4,
};
