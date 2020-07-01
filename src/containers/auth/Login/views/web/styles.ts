import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: auto;
  padding: 0 5%;
`;
const Logo = styled.img`
  margin-bottom: 2em;
`;
const SubTitle = styled.div`
  font-size: 18px;
  color: #333;
  margin: 8px 0;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const Line = styled.div`
  display: none;
  text-align: center;
  &::before,
  &::after {
    display: inline-block;
    content: '';
    border-top: 1px solid black;
    width: 100%;
    margin: 0.6rem 0;
  }
  @media (max-width: 959.95px) {
    display: flex;
    margin: 50px 0 65px;
  }
`;

const Footer = styled.div`
  margin: 8px 0;
  width: 100%;
`;

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: 15,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginTop: '3em',
    marginBottom: '1em',
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
}));

export {
  Container,
  Logo,
  SubTitle,
  Form,
  Label,
  Footer,
  GroupButton,
  useStyles,
};
