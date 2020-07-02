import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().email('email_invalid').required('required'),
  password: Yup.string()
    .min(6, 'too_short')
    .max(20, 'too_long')
    .required('required'),
});

export default LoginSchema;
