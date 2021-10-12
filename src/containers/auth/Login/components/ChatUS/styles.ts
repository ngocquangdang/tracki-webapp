import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

const Form = styled.form`
  width: 100%;
  max-width: 457px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 4px;
`;
const PhoneNumber = styled.div`
  display: flex;
  & > :nth-child(1) {
    flex: 2;
    margin-right: 10px;
  }
  & > :nth-child(2) {
    flex: 3;
  }
`;

const useStyles = makeStyles(theme => ({
  'ml-10': {
    marginLeft: 10,
  },
  'w-50': {
    width: '50%',
  },
  margin: {
    marginTop: 15,
    marginBottom: 15,
  },
  btn: {
    '&': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      marginBottom: 16,
      width: '100%',
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
  container: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    textAlign: 'center',
    color: theme.palette.error.main,
  },
}));
export { Form, PhoneNumber, useStyles };
