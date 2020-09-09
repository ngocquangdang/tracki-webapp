import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Form = styled.form`
  max-width: 400px;
`;
const Typography = styled.span`
  font-size: 18px;
  font-weight: 300;
  @media (max-width: 995.95px) {
    font-size: 14px;
  }
`;
const GroupInput = styled.div`
  margin-bottom: 14px;
`;
const UploadImage = styled.div`
  margin-bottom: 25px;
  max-width: 400px;
  height: 174px;
  border-radius: 4px;
  border: dashed 2px #cbcbcb;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
const InputSubcription = styled.span`
  font-size: 12px;
  color: #999999;
`;
const Error = styled.p`
  text-align: center;
  color: red;
`;
const Image = styled.div`
  width: 40px;
  height: 40px;
  margin: auto;
  object-fit: contain;
  background-image: ${(props: { background: string }) =>
    props.background && ` url(${props.background})`};
  background-size: cover;
`;
const useStyles = makeStyles(theme => ({
  widthBtn: {
    width: '100%',
  },
  marginInput: {
    marginBottom: 10,
  },
  selectOption: {
    margin: '15px 0',
  },
  elipLocation: {
    width: '62px !important',
    height: '62px !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #e0e0e0',
    color: '#aeaeae',
    borderRadius: '50%',
    backgroundColor: '#f1f1f1',
  },
  iconLocation: {
    fontSize: 38,
  },
  inputUploadImage: {
    display: 'flex',
    alignItems: 'center',
    justifyVontent: 'center',
    marginTop: 15,
    color: '#999999',
    fontWeight: 'normal',
    border: '1px solid #999999',
    padding: '2px 10px 2px 10px',
    borderRadius: 3,
    backgroundColor: '#f5f5f5',
  },
  iconCamera: {
    fontSize: 18,
    marginRight: 5,
  },
  textAdd: {
    fontSize: 13,
  },
  loading: {
    position: 'absolute',
    color: '#fff',
    top: 22,
    left: 22,
  },
}));
export {
  Header,
  Form,
  Typography,
  GroupInput,
  UploadImage,
  InputSubcription,
  Error,
  useStyles,
  Image,
};
