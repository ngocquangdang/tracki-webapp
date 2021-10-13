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
  name: Yup.string().max(20, 'too_long').required('required'),
  username: Yup.string()
    .max(40, 'too_long')
    .email('email_invalid')
    .required('required'),
  phonenumber: Yup.string()
    .matches(/^\b\d{3}[-.]?\d{3}[-.]?\d{4}\b$/, 'invalid_phone_number')
    .required('required'),
});
