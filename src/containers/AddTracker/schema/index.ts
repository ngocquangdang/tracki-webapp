import * as Yup from 'yup';

const AddTrackerSchema = Yup.object().shape({
  tracker_id: Yup.string()
    .min(6, 'too_short')
    .max(10, 'too_long')
    .required('required'),
  imei: Yup.string()
    .min(4, 'too_short')
    .max(4, 'too_long')
    .required('required'),
  order_id: Yup.string().required('required'),
});
const TrackerDetail = Yup.object().shape({
  device_name: Yup.string().required('required'),
  device_traking: Yup.string().required('required'),
  // divice_image: Yup.string().required('required'),
});
export { AddTrackerSchema, TrackerDetail };
