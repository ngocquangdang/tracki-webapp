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
  /* max-width: 400px; */
`;
const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 100px;
  text-align: center;
  @media (max-width: 959.59px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }
`;
const Logo = styled.img`
  height: 36px;
  margin: auto 0;
  @media (max-width: 959.95px) {
    height: 29px;
  }
`;
const Title = styled.h2`
  font-size: 24px;
  color: #333;
  font-weight: 300;
  margin: 15px 0;
  @media (max-width: 959.59px) {
    font-size: 30px;
    font-weight: 500;
    line-height: 37px;
  }
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
  @media (max-width: 959.59px) {
    text-align: left;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const GroupButton = styled.div`
  @media (max-width: 959.59px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
const Signature = styled.div`
  @media (max-width: 959.59px) {
    display: none;
  }
`;
const Footer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 0;
  @media (max-width: 959.59px) {
    width: 100%;
  }
  @media (max-height: 521.98px) {
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
const Info = styled.div`
  display: flex;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #fefefe;
  background-color: #ffffff;
  padding: 10px;
`;
const InfoText = styled.p`
  font-size: 14px;
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
  logo2: {
    display: 'block',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  desc1: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  desc2: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  text: {
    textAlign: 'center',
  },
  text2: {
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      textAlign: 'left',
    },
  },
  infoIcon: {
    margin: 'auto 10px auto 0',
    fontSize: 40,
    color: theme.palette.primary.main,
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
  Info,
  InfoText,
  useStyles,
};
