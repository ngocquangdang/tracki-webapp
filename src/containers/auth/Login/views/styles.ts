import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
  @media (max-width: 959.59px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }
  @media (max-width: 767.95) and (min-height: 439.95px) {
    margin-top: 100px;
  }
`;
const Title = styled.h2`
  color: #1a1a1a;
  font-size: 40px;
  margin: 0;
  height: 48px;
  @media (max-width: 959.59px) {
    display: none;
  }
`;
const Description = styled.p`
  color: #1a1a1a;
  margin: 15px 0;
  @media (max-width: 959.59px) {
    display: none;
  }
`;
const Logo = styled.img`
  display: none;
  width: 100px;
  height: 30px;
  margin-bottom: 2em;
  @media (max-width: 959.59px) {
    display: block;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Label = styled.a`
  text-decoration: none;
  color: #168449;
  text-align: center;
`;
const GroupButton = styled.div`
  @media (max-width: 959.59px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
const Signature = styled.div`
  color: #1a1a1a;
  @media (max-width: 959.59px) {
    display: none;
  }
`;

const Line = styled.div`
  display: flex;
  text-align: center;
  margin: 40px 0 55px;
  color: #1a1a1a;
  line-height: 1.19;
  width: 100%;
  letter-spacing: normal;
  text-transform: uppercase;
  &::before,
  &::after {
    display: inline-block;
    content: '';
    border-top: 2px solid #e0e0e0;
    width: 100%;
    height: 2px;
  }
  &::before {
    margin: 0.6rem 0.5rem 0.6rem 0;
  }
  &::after {
    margin: 0.6rem 0 0.6rem 0.5rem;
  }
`;

const Footer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 0;
  @media (max-width: 767.95px) {
    position: static;
  }
`;
const Contact = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  @media (max-width: 959.59px) {
    padding: 0 15px;
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
    marginBottom: '1rem',
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  blackBtn: {
    color: '#000',
    border: 'solid 1px #ccd0d5',
    backgroundColor: '#f5f6f7',
    width: '100%',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
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
}));

export {
  Container,
  Logo,
  Form,
  Label,
  Footer,
  Contact,
  Line,
  GroupButton,
  Signature,
  Title,
  Description,
  Content,
  useStyles,
};
