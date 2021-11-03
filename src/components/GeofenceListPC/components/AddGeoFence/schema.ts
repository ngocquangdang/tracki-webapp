import * as Yup from 'yup';

const ADD_GEO_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(1, 'too_short')
    .max(50, 'too_long')
    .required('required'),
});

export { ADD_GEO_SCHEMA };
