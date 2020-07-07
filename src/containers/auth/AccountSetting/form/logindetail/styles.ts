import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const Form = styled.div`
  padding: 7px 15px;
`;

const useStyles = makeStyles(theme => ({
  btn: {
    color: '#4b4f56',
    marginBottom: '1em',
    width: '100%',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    border: 'solid 1px #ccd0d5',
    backgroundColor: '#f5f6f7',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#ffffff',
      borderColor: theme.palette.primary.main,
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

export { Form, useStyles };
