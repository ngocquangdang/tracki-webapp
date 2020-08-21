import styled from 'styled-components';
import { makeStyles, withStyles, TextField } from '@material-ui/core';

const ImageWrapper = styled.div`
  width: 85px;
  border-radius: 50%;
  height: 85px;
  display: flex;
  background: #168449;
  position: relative;
`;
const Image = styled.img`
  width: 55px;
  height: 55px;
  margin: auto;
  object-fit: contain;
`;
const ImageTracker = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
`;
const UploadImage = styled.div`
  width: 57px;
  height: 19px;
  border-radius: 3px;
  background-color: #d41212;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 9%;
  left: 71%;
  padding: 5px;
  padding: 0 3px 0 3px;
  align-items: center;
`;
const TextUpload = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  color: #ffffff;
`;
const Content = styled.form``;
const SelectGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid #e0e0e0;
`;
const SubTitle = styled.p`
  font-size: 14px;
`;

const SwitchGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1a1a1a;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  height: 50px;
  font-size: 14px;
`;
const SwitchGroupLast = styled(SwitchGroup)`
  border-bottom: none;
`;
const TextDescription1 = styled.span`
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #999999;
  display: flex;
`;
const TextDescription2 = styled.span`
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.5;
  letter-spacing: normal;
  color: #999999;
`;
const ContainerButtonModal = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #e0e0e0;
  justify-content: space-between;
  padding-left: 15px;
  cursor: pointer;
`;
const TitleAlert = styled.div`
  width: 100%;
  height: 50px;
  background-color: #f4f5f6;
  color: #666666;
  font-size: 13px;
  display: flex;
  align-items: center;
  font-weight: 500;
  padding-left: 15px;
`;
const ContainerPadding = styled.div`
  padding: 5px 10px 0 15px;
`;
const ContainerPaddingSwitch = styled.div`
  padding: 5px 0 0 15px;
`;
const Container = styled.div`
  margin-top: 75px;
`;
const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #1a1a1a;
`;
const OptionRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const useStyles = makeStyles(theme => ({
  loading: {
    position: 'absolute',
    color: '#fff',
    top: 22,
    left: 22,
  },
  margin: {
    marginTop: 15,
    marginBottom: 15,
  },
  padding: {
    [theme.breakpoints.down('sm')]: {
      padding: '0 15px',
    },
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '10px 0',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  blackBtn: {
    '&': {
      borderColor: '#000',
      color: '#000',
      width: '100%',
    },
    '&:hover': {
      backgroundColor: '#333',
      color: theme.palette.primary.contrastText,
    },
  },
  errorText: {
    textAlign: 'center',
    color: theme.palette.error.main,
  },
  fontSize: {
    [theme.breakpoints.down(375)]: {
      fontSize: 15,
    },
  },
  iconNext: {
    fontSize: '30px',
    color: '#666666',
    marginRight: '10px',
  },
  questionIcon: {
    width: '21.5px',
    height: '22.5px',
    color: '#797575',
  },
  personAddIcon: {
    height: '25.4px;',
    color: '#1a1a1a',
    cursor: 'pointer',
  },
  speedLimit: {
    marginRight: '20px',
  },
  questionIconMargin: {
    marginRight: '8px',
  },
  selectOption: {
    margin: '15px 0',
  },
}));

const LimitInput = withStyles(theme => ({
  root: {
    width: '50px',
    marginRight: '15px',
    '& .MuiInputBase-root': {
      height: '30px',
      color: '#1a1a1a',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#1a1a1a',
      },
    },
    '& .MuiOutlinedInput-input': {
      textAlign: 'center',
      padding: 0,
      paddingTop: 4,
      fontSize: 15,
    },
  },
}))(TextField);

export {
  ImageWrapper,
  Image,
  ImageTracker,
  UploadImage,
  TextUpload,
  Content,
  SelectGroup,
  SubTitle,
  SwitchGroup,
  TextDescription1,
  TextDescription2,
  ContainerButtonModal,
  TitleAlert,
  ContainerPadding,
  Text,
  LimitInput,
  OptionRight,
  SwitchGroupLast,
  ContainerPaddingSwitch,
  Container,
  useStyles,
};
