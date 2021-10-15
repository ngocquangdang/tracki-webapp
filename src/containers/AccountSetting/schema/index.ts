import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, 'Invalid first name')
    .max(40, 'too_long')
    .required('required'),
  last_name: Yup.string()
    .matches(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, 'Invalid last name')
    .max(40, 'too_long')
    .required('required'),
  phone: Yup.string()
    .matches(/^[0-9]{1,2}[0-9]*$/, 'auth:wrong_phone_format')
    .required('required'),
});
