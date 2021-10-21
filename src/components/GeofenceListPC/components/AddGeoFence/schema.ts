import * as Yup from 'yup';

const ADD_GEO_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(4, 'too_short')
    .max(40, 'too_long')
    .required('required'),
});

export { ADD_GEO_SCHEMA };
