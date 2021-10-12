import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, 'too_short')
    .max(40, 'too_long')
    .email('email_invalid')
    .required('required'),
  password: Yup.string()
    .min(1, 'too_short')
    .max(25, 'too_long')
    .required('required'),
});
export const ChatUsSchema = Yup.object().shape({
  name: Yup.string().required('required'),
  username: Yup.string().email('email_invalid').required('required'),
  phonenumber: Yup.string().required('require'),
});
