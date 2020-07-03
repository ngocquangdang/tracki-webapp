import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;
  max-width: 400px;
`;
const Content = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
  @media (max-width: 955.59px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }
`;
const Logo = styled.img`
  height: 36px;
`;
const Title = styled.h2`
  font-size: 24px;
  color: #333;
  font-weight: 300;
  margin: 15px 0;
`;
const Header = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  padding: 8px 10px;
  justify-content: space-between;
`;

const SubTitle = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 13px;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const GroupButton = styled.div`
  @media (max-width: 955.59px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
const Signature = styled.div`
  @media (max-width: 955.59px) {
    display: none;
  }
`;
const Footer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 0;
  @media (max-width: 955.59px) {
    width: 100%;
  }
`;
const Contact = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  @media (max-width: 955.59px) {
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
  media: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  margin: {
    marginTop: 15,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '1rem 0',
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  cancelBtn: {
    '&': {
      borderColor: '#000',
      color: '#000',
    },
    '&:hover': {
      backgroundColor: '#333',
      color: theme.palette.primary.contrastText,
    },
  },
  logo: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  text: {
    textAlign: 'center',
  },
}));

export {
  Container,
  Footer,
  Contact,
  GroupButton,
  Signature,
  Logo,
  Content,
  Title,
  SubTitle,
  Form,
  Header,
  useStyles,
};
