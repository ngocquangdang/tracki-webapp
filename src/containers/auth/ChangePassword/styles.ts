import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Container = styled.div`
  background-color: #fafafa;
`;
const Content = styled.form`
  padding: 51px 162px;
  border-radius: 4px;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.12);
  border: solid 1px var(--e-0-e-0-e-0-border-color);
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  max-width: 650px;
  @media (max-width: 959.95px) {
    max-width: inherit;
    padding: 0;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: #1a1a1a;
  margin: 12px 0;
  @media (max-width: 959.95px) {
    display: flex;
    font-size: 13px;
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
`;
const PasswordForm = styled.div``;
const Line = styled.hr`
  margin: 30px 0;
  @media (max-width: 959.95px) {
    display: none;
  }
`;
const Info = styled.div`
  display: flex;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #fefefe;
  background-color: #ffffff;
  padding: 10px;
`;
const InfoText = styled.p`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #1a1a1a;
  @media (max-width: 959.95px) {
    text-align: center;
  }
`;

const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#4b4f56',
    '& span svg': {
      fontSize: '36px !important',
    },
  },
  margin: {
    marginTop: 15,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginTop: '3em',
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
  logo: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  infoIcon: {
    margin: 'auto 10px auto 0',
    fontSize: 40,
    color: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
  media: {
    [theme.breakpoints.down('sm')]: {
      padding: '0 15px',
    },
  },
}));
export {
  Container,
  Content,
  Title,
  Line,
  PasswordForm,
  Info,
  InfoText,
  useStyles,
};
