import * as Yup from 'yup';

const AddTrackerSchema = Yup.object().shape({
  tracker_id: Yup.string().required('required'),
  imei: Yup.string().required('required'),
  order_id: Yup.string().required('required'),
});
export { AddTrackerSchema };
