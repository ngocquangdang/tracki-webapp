import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const SettingContainer = styled.div`
  padding-top: 32px;
  background-color: #fafafa;
  padding-bottom: 91px;
  @media (max-width: 959.95px) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Content = styled.form`
  padding: 51px 162px;
  border-radius: 4px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px #e0e0e0;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  max-width: 650px;
  @media (max-width: 959.95px) {
    max-width: inherit;
    padding: 0;
  }
`;
const AccountForm = styled.div`
  @media (max-width: 959.95px) {
    padding: 0 15px;
  }
`;
const LoginForm = styled.div`
  @media (max-width: 959.95px) {
    padding: 0 15px;
  }
`;
const Notification = styled.div``;

const Title = styled.h2`
  font-size: 24px;
  color: #1a1a1a;
  margin: 12px 0;
  @media (max-width: 959.95px) {
    display: flex;
    font-size: 16px;
    padding: 0 15px;
    margin: 0;
    height: 50px;
    text-align: start;
    justify-content: start;
    align-items: center;
    color: #666666;
    background: #f4f5f6;
    text-transform: uppercase;
  }
  @media (max-width: 375px) {
    font-size: 14px;
  }
`;
const SubTitle = styled.p`
  font-size: 14px;
`;

const SwitchGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1a1a1a;
  margin: 4px 0;
  @media (max-width: 959.95px) {
    padding: 0 15px;
  }
`;
const Line = styled.hr`
  margin: 30px 0;
  @media (max-width: 959.95px) {
    display: none;
  }
`;
const SelectGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 959.95px) {
    flex-flow: wrap-reverse;
  }
`;
const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  background-color: #1d222e;
`;

const useStyles = makeStyles(theme => ({
  loading: {
    margin: 'auto',
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
  media: {
    margin: '15px 0',
    [theme.breakpoints.down('sm')]: {
      padding: '0 15px',
    },
  },
  selectOption: {
    marginTop: 15,
    width: '100%',
    maxWidth: '100%',
  },
}));
export {
  Container,
  Content,
  AccountForm,
  LoginForm,
  Notification,
  Title,
  SubTitle,
  SwitchGroup,
  Line,
  SelectGroup,
  Loading,
  Layout,
  SettingContainer,
  useStyles,
};
