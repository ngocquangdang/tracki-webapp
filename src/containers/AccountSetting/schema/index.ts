import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
  first_name: Yup.string().required('required'),
  last_name: Yup.string().required('required'),
  phone: Yup.string()
    .matches(/^[0-9]{5,15}[0-9]*$/, 'auth:wrong_phone_format')
    .required('required'),
});
