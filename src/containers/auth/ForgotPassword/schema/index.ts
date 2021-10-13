import * as Yup from 'yup';

const ForgotPasswordFromSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'invalid_password'
    )
    .max(50, 'too_long')
    .required('required'),
  confirm_password: Yup.string()
    .max(50, 'too_long')
    .oneOf([Yup.ref('password')], 'password_not_matching')
    .required('required'),
});
const EmailFormSchema = Yup.object().shape({
  email: Yup.string()
    .max(40, 'too_long')
    .email('email_invalid')
    .required('required')
    .trim('required'),
});
const CodeFormSchema = Yup.object().shape({
  code: Yup.string()
    .matches(/^\b\d{5}$/, 'invalid_code')
    .required('required'),
});
export { ForgotPasswordFromSchema, EmailFormSchema, CodeFormSchema };
