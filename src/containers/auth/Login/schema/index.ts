import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string().email('email_invalid').required('required'),
  password: Yup.string()
    .min(6, 'too_short')
    .max(50, 'too_long')
    .required('required'),
});
export const ChatUsSchema = Yup.object().shape({
  name: Yup.string().required('required'),
  username: Yup.string().email('email_invalid').required('required'),
  phonenumber: Yup.string().required('require'),
});
