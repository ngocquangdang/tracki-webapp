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
`;
const GroupButton = styled.div`
  margin: 25px 0;
`;
const Line = styled.div`
  display: flex;
  text-align: center;
  margin: 40px 0 55px;
  &::before,
  &::after {
    display: inline-block;
    content: '';
    border-top: 1px solid black;
    width: 100%;
    margin: 0.6rem 0;
  }
`;

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
  textBtn: {
    height: 36,
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
  useStyles,
};
