import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
  first_name: Yup.string().required('required'),
  last_name: Yup.string().required('required'),
  // phone: Yup.string().required('required'),
});
