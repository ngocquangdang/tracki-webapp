import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

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
  cursor: pointer;
`;

const SwitchGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #1a1a1a;
`;
const Message = styled.p``;

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

export { Form, Label, useStyles, Message, SwitchGroup };
