import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .email('email_invalid')
    .max(50, 'too_long')
    .required('required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'invalid_password'
    )
    .max(25, 'too_long')
    .required('required'),
  confirm_password: Yup.string()
    .max(25, 'too_long')
    .oneOf([Yup.ref('password')], 'password_not_matching')
    .required('required'),
  whitelabel: Yup.string(),
});

const SingUpSchemaStep2 = Yup.object().shape({
  first_name: Yup.string().max(50, 'too_long').required('required'),
  last_name: Yup.string().max(50, 'too_long').required('required'),
});

const SingUpSchemaStep3 = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{5,15}[0-9]*$/, 'auth:wrong_phone_format')
    .required('required'),
});

const SingUpSchemaStep4 = Yup.object().shape({
  zip: Yup.string()
    .matches(/^[0-9]{5,6}(?:-[0-9]{4})?$/, 'auth:wrong_zip_format')
    .required('required'),
});

export {
  SignUpSchema,
  SingUpSchemaStep2,
  SingUpSchemaStep3,
  SingUpSchemaStep4,
};
