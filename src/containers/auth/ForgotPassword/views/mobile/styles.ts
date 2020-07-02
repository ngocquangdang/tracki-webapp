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
  width: 90px;
  height: 26px;
`;
const Title = styled.h2`
  font-size: 24px;
  color: #333;
  font-weight: 700;
  margin: 10px 0;
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
const Header = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-item: center;
  padding: 15px;
  width: 100%;
  top: 0;
`;

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: 16,
    marginBottom: 16,
  },
  btn: {
    '&': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      marginBottom: 16,
      '&:hover': {
        backgroundColor: theme.palette.secondary,
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  text: {
    textAlign: 'center',
  },
}));

export { Container, Logo, Title, SubTitle, Form, Header, useStyles };
