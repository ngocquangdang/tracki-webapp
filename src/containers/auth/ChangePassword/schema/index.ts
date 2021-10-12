import * as Yup from 'yup';

const ForgotPasswordFromSchema = Yup.object().shape({
  current_password: Yup.string().max(50, 'too_long').required('required'),
  new_password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Invalid password format'
    )
    .max(25, 'too_long')
    .required('required'),
  confirm_password: Yup.string()
    .max(25, 'too_long')
    .oneOf([Yup.ref('new_password')], `Passwords didn't match`)
    .required('required'),
});
export { ForgotPasswordFromSchema };
