import * as Yup from 'yup';

const ForgotPasswordFromSchema = Yup.object().shape({
  current_password: Yup.string().max(50, 'too_long').required('required'),
  new_password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'invalid_password'
    )
    .max(50, 'too_long')
    .required('required'),
  confirm_password: Yup.string()
    .max(50, 'too_long')
    .oneOf([Yup.ref('new_password')], 'password_not_matching')
    .required('required'),
});
export { ForgotPasswordFromSchema };
