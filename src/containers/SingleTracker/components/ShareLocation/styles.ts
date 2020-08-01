import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';

const Container = styled.div`
  margin-top: 60px;
  padding: 15px;
`;

const Content = styled.form``;
const Title = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  margin-bottom: 20px;
`;
const ContainerDetail = styled.div``;
const ControlButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
`;
const Footer = styled.div`
  margin-top: 25px;
`;
const StatusDuration = styled.div`
  width: 100%;
  height: 83px;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #fefefe;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
`;
const Description = styled.div`
  font-size: 16px;
  color: #999999;
  padding-top: 18px;
  margin-bottom: 60px;
`;
const ButtonCopyCode = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const useStyles = makeStyles(theme => ({
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  btnShare: {
    margin: '10px 10px 10px 0px',
    height: '40px',
  },
  btnCopyLink: {
    margin: '10px 0px 10px 0px',
    height: '40px',
  },
  btnCopyCode: {
    margin: '10px 0px',
    height: '40px',
  },
  btnFullWidth: {
    margin: '17px 0px',
    width: '100%',
  },
  description: {
    fontSize: 16,
    color: '#999999',
    paddingTop: '18px',
  },
}));

const EmbedInput = withStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiInputBase-root': {
      height: '100px',
      color: '#1a1a1a',
      width: '100%',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#1a1a1a',
      },
      '&.Mui-focused fieldset': {
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
    '& .MuiFormLabel-root': {
      color: '#1a1a1a',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1a1a1a',
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 17px) scale(1)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.7)',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 14px',
    },
  },
}))(TextField);

const LinkInput = withStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiInputBase-root': {
      height: '50px',
      color: '#1a1a1a',
      width: '100%',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#1a1a1a',
      },
      '&.Mui-focused fieldset': {
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
    '& .MuiFormLabel-root': {
      color: '#1a1a1a',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1a1a1a',
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 17px) scale(1)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.7)',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 14px',
    },
  },
}))(TextField);

export {
  Container,
  Content,
  Title,
  ControlButton,
  ContainerDetail,
  Footer,
  StatusDuration,
  Description,
  ButtonCopyCode,
  EmbedInput,
  LinkInput,
  useStyles,
};
