import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  min-height: 100%;
  overflow-y: overlay;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  min-height: 100%;
  max-width: ${(props: { isTitle?: boolean; isSucces?: boolean }) =>
    props.isTitle ? '460px' : props.isSucces ? '452px' : '400px'};
`;
const ContainerForm = styled.div`
  max-width: 400px;
`;
const ContainerText = styled.div`
  max-width: 410px;
  text-align: center;
`;
const TextGmail = styled.div`
  font-weight: 600;
`;
const CheckIcon = styled.div`
  width: 132.6px;
  height: 132.6px;
  background-color: #168449;
`;
const Logo = styled.img`
  object-fit: contain;
  height: 36px;
  margin: auto 0;
  @media (max-width: 959.95px) {
    height: 29px;
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
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: ${(props: { isDescription?: boolean }) =>
    props.isDescription ? '1.25' : '1.5'};
  letter-spacing: normal;
  text-align: left;
  color: ${(props: { isDescription?: boolean }) =>
    props.isDescription ? '#999999' : '#1a1a1a'};
  @media (max-width: 955.95px) {
    text-align: center;
  }
  @media (max-width: 420px) {
    text-align: left;
    font-size: 12px;
  }
`;

const InforTextFooter = styled(InfoText)`
  text-align: center;
  @media (max-width: 600px) {
    text-align: center;
    font-size: 12px;
  }
`;

const InfoTextLogin = styled(InfoText)`
  @media (max-width: 420px) {
    text-align: center;
    font-size: 12px;
    max-width: 158px;
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
  font-size: ${(props: { isStep1?: boolean }) =>
    props.isStep1 ? '40px' : '34px'};
  color: #1a1a1a;
  letter-spacing: normal;
  text-align: center;
  margin-bottom: ${(props: { isStep1?: boolean; isStep5?: boolean }) =>
    props.isStep1 ? null : props.isStep5 ? '' : '0px'};
  @media (max-width: 959.95px) {
    margin-bottom: 20px;
    font-size: ${(props: { isStep1?: boolean; isStep5?: boolean }) =>
      props.isStep1 ? '30px' : props.isStep5 ? '32px' : '24px'};
    max-width: 330px;
    margin-top: 30%;
  }
  margin-top: ${(props: { isStep1?: boolean }) => (props.isStep1 ? '40%' : '')};
`;

const TitleZipCode = styled(Title)`
  @media (max-width: 420px) {
    font-weight: normal;
  }
`;

const TitleRegisterName = styled(Title)`
  @media (max-width: 420px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const SubTitle = styled.div`
  font-size: 22px;
  color: #1a1a1a;
  margin-top: 1rem;
  text-align: center;
  @media (max-width: 420px) {
    font-size: 16px;
    max-width: 236px;
    margin-top: 0;
    margin-bottom: 15px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1em;
  @media (max-width: 420px) {
    margin-top: 0;
  }
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
  display: flex;
  justify-content: center;
  margin-top: 40px;
  @media (max-width: 959.95px) {
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
    [theme.breakpoints.down(420)]: {
      marginTop: '2em',
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  btnContinue: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginTop: '1em',
    marginBottom: '1rem',
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  btnFullWidth: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginTop: '1em',
    marginBottom: '1rem',
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
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: '90.5px',
      height: '26px',
    },
  },
  logo2: {
    display: 'block',
    [theme.breakpoints.down(420)]: {
      width: '90.5px',
      height: '26px',
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
    [theme.breakpoints.down(420)]: {
      width: '158px',
    },
  },
  checkIcon: {
    width: '132.6px',
    height: '132.6px',
    color: theme.palette.primary.main,
    marginBottom: '32px',
    [theme.breakpoints.down(420)]: {
      marginBottom: '0',
    },
  },
  fullWidthButton: {
    width: '100%',
  },
}));

export {
  Container,
  Logo,
  Title,
  TitleRegisterName,
  TitleZipCode,
  SubTitle,
  Form,
  Header,
  Label,
  Footer,
  Message,
  GroupButton,
  Info,
  InfoText,
  InfoTextLogin,
  InforTextFooter,
  Content,
  Text,
  InfoTextTerm,
  ContainerForm,
  CheckIcon,
  ContainerText,
  TextGmail,
  useStyles,
};
