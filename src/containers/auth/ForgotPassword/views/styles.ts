import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55%;
  @media (max-width: 955.59px) {
    width: 100%;
  }
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
  margin-bottom: 2em;
`;
const Title = styled.h2`
  font-size: 24px;
  color: #333;
  font-weight: 300;
`;
const SubTitle = styled.div`
  font-size: 14px;
  color: #333;
  margin: 1em;
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
  width: 55%;
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
  media: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  margin: {
    marginTop: 16,
    marginBottom: 16,
  },
  btn: {
    '&': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      marginBottom: 16,
      padding: 14,
      '&:hover': {
        backgroundColor: theme.palette.secondary,
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  cancelBtn: {
    '&': {
      borderColor: '#000',
      color: '#000',
      padding: 14,
    },
    '&:hover': {
      backgroundColor: '#333',
      color: theme.palette.primary.contrastText,
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
  useStyles,
};
