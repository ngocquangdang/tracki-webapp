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

export default SignUpSchema;
