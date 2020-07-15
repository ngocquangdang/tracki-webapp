import * as Yup from 'yup';

const ForgotPasswordFromSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'too_short')
    .max(50, 'too_long')
    .required('required'),
  confirm_password: Yup.string()
    .min(6, 'too_short')
    .max(50, 'too_long')
    .oneOf([Yup.ref('password')], 'password_not_matching')
    .required('required'),
});
const EmailFormSchema = Yup.object().shape({
  email: Yup.string().email('email_invalid').required('required'),
});
const CodeFormSchema = Yup.object().shape({
  code: Yup.string().required('required'),
});
export { ForgotPasswordFromSchema, EmailFormSchema, CodeFormSchema };
