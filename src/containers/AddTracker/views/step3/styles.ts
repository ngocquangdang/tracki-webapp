import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Form = styled.form`
  max-width: 400px;
`;
const Typography = styled.span``;
const GroupInput = styled.div`
  margin-bottom: 14px;
`;
const UploadImage = styled.div`
  margin-bottom: 25px;
`;
const InputSubcription = styled.span`
  font-size: 12px;
  color: #999999;
`;
const useStyles = makeStyles(theme => ({
  widthBtn: {
    width: '100%',
  },
  marginInput: {
    marginBottom: 5,
  },
}));
export {
  Header,
  Form,
  Typography,
  GroupInput,
  UploadImage,
  InputSubcription,
  useStyles,
};
