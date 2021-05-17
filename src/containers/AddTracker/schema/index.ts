import * as Yup from 'yup';

const AddTrackerSchema = Yup.object().shape({
  device_id: Yup.string()
    .required('Required')
    .min(7, 'Too short')
    .max(11, 'Too long')
    .trim('Required'),
  imei: Yup.string()
    .required('Required')
    .trim('Required')
    .min(4, 'Too short')
    .max(4, 'Too long'),
  order: Yup.string(),
});
const TrackerDetail = Yup.object().shape({
  device_name: Yup.string().trim('required'),
  device_traking: Yup.string().required('required').trim('required'),
  // divice_image: Yup.string().required('required'),
});
export { AddTrackerSchema, TrackerDetail };
