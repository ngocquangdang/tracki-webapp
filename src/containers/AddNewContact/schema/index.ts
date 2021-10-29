import * as Yup from 'yup';

export const emailSchema = Yup.object().shape({
  name: Yup.string().trim().max(25, 'too_long').required('auth:required'),
  email: Yup.string()
    .matches(/(?!^ +$)^.+$/, 'auth:required')
    .max(45, 'too_long')
    .email('auth:email_invalid')
    .required('Required'),
});

export const smsSchema = Yup.object().shape({
  name: Yup.string().trim('auth:required').required('auth:required'),
  phone: Yup.string()
    .trim('auth:required')
    .matches(/^[0-9]{1,2}[0-9]*$/, {
      message: 'auth:wrong_phone_format',
      excludeEmptyString: true,
    })
    .required('auth:required'),
});
