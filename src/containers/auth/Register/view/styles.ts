import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  height: 100%;
`;
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
const Logo = styled.img`
  object-fit: contain;
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
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #1a1a1a;
  @media (max-width: 955.95px) {
    text-align: center;
  }
`;

const InfoTextTerm = styled.span`
  @media (max-width: 767px) {
    display: inline-block;
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

const Title = styled.h1`
  font-size: 40px;
  color: #1a1a1a;
  letter-spacing: normal;
  text-align: center;
  margin-top: 0;
`;

const SubTitle = styled.div`
  font-size: 22px;
  color: #1a1a1a;
  margin-top: 1rem;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1em;
`;
const Label = styled.a`
  text-decoration: underline;
  &:hover {
    color: #168449;
    cursor: pointer;
  }
`;

const GroupButton = styled.div`
  margin: 25px 0;
`;

const Footer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  @media (max-width: 955.59px) {
    display: flex;
    width: calc(100% - 30px);
  }
`;
const Text = styled.span``;

const Message = styled.p``;

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
    padding: 14,
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
      padding: 14,
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
}));

export {
  Container,
  Logo,
  Title,
  SubTitle,
  Form,
  Header,
  Label,
  Footer,
  Message,
  GroupButton,
  Info,
  InfoText,
  Content,
  Text,
  InfoTextTerm,
  useStyles,
};
