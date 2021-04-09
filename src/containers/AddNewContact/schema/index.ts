import * as Yup from 'yup';

export const emailSchema = Yup.object().shape({
  name: Yup.string().trim().required('auth:required'),
  email: Yup.string()
    .matches(/(?!^ +$)^.+$/, 'auth:required')
    .email('auth:email_invalid')
    .required('Required'),
});

export const smsSchema = Yup.object().shape({
  name: Yup.string().trim().required('auth:required'),
  phone: Yup.string()
    .matches(/^[0-9]{1,2}[0-9]*$/, {
      message: 'auth:wrong_phone_format',
      excludeEmptyString: true,
    })
    .trim()
    .required('auth:required'),
});
