import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 0 15px;
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
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputText = withStyles(theme => ({
  root: {
    '& .MuiInputBase-root': {
      color: '#000',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000',
      },
      '&:hover fieldset': {
        borderColor: '#000',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        color: '#000',
      },
    },
  },
}))(TextField);

const useStyles = makeStyles(theme => ({
  media: {
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
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
  'btn-cancel': {
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
}));

export { Container, Logo, Title, SubTitle, Form, InputText, useStyles };
