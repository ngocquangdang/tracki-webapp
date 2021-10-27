import * as Yup from 'yup';

export const emailSchema = Yup.object().shape({
  name: Yup.string().max(25, 'too_long').required('required'),
  email: Yup.string()
    .email('email_invalid')
    .max(40, 'too_long')
    .required('required'),
});

export const smsSchema = Yup.object().shape({
  name: Yup.string().required('required'),
  phone: Yup.string()
    .matches(/^[0-9]{1,2}[0-9]*$/, 'auth:wrong_phone_format')
    .required('required'),
});
