import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  padding: 0 5%;
`;
const Logo = styled.img`
  width: 155px;
  height: 45px;
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
`

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
  'btn-black': {
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
