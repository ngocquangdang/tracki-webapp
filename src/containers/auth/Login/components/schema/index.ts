import * as Yup from 'yup';

const ChatUsSchema = Yup.object().shape({
  username: Yup.string().email('email_invalid').required('required'),
  name: Yup.string().required('required'),
  phonenumber: Yup.string().required('required'),
});

export default ChatUsSchema;
