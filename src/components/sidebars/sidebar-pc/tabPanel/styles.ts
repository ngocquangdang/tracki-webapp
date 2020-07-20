import styled from 'styled-components';
import { TextField, withStyles, makeStyles } from '@material-ui/core';

const Container = styled.div``;
const SearchInput = styled.div``;

const Content = styled.div`
  padding: 0 15px;
`;
const useStyles = makeStyles(theme => ({
  inputRoot: {
    borderColor: '#e0e0e0',
    borderRadius: 6,
  },
  input: {
    fontSize: 15,
    lineHeight: 18,
    '&::placeholder': {
      color: '#b7b7b7',
      textAlign: 'center',
    },
  },
}));
const TextInput = withStyles(theme => ({
  root: {
    width: '100%',
    padding: '15px 15px 0',
    '& .MuiInputBase-root': {
      height: '50px',
      color: '#1a1a1a',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 14px',
      textAlign: 'center',
    },
  },
}))(TextField);
export { Container, Content, SearchInput, useStyles, TextInput };
