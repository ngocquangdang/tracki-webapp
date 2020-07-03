import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 5%;
`;
const Logo = styled.img`
  width: 100px;
  height: 30px;
  margin-bottom: 2em;
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
  margin: 10px 0;
`;
const GroupButton = styled.div`
  margin: 10px 0;
`;
const Line = styled.div`
  display: flex;
  text-align: center;
  margin: 40px 0 55px;
  color: #1a1a1a;
  line-height: 1.19;
  letter-spacing: normal;
  text-transform: uppercase;
  &::before,
  &::after {
    display: inline-block;
    content: '';
    border-top: 1px solid #e0e0e0;
    width: 100%;
  }
  &::before {
    margin: 0.6rem 0.5rem 0.6rem 0;
  }
  &::after {
    margin: 0.6rem 0 0.6rem 0.5rem;
  }
`;
const SwitchGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #1a1a1a;
`;
const Message = styled.p``;

const Footer = styled.div`
  width: 100%;
`;
const Contact = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40%;
  align-items: flex-end;
`;
const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: 15,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginBottom: '1em',
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
  textBtn: {
    height: 36,
  },
  errorText: {
    textAlign: 'center',
    color: theme.palette.error.main,
  },
}));

export {
  Container,
  Logo,
  Form,
  Label,
  Footer,
  Contact,
  Message,
  Line,
  GroupButton,
  SwitchGroup,
  useStyles,
};