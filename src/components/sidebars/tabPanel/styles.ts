import styled from 'styled-components';
import { TextField, withStyles, makeStyles } from '@material-ui/core';

const Container = styled.div``;
const SearchInput = styled.div``;

const Content = styled.div`
  padding: 15px;
`;
const useStyles = makeStyles(theme => ({
  input: {
    '&::placeholder': {
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
        borderColor: '#1a1a1a',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 14px',
      textAlign: 'center',
    },
  },
}))(TextField);
export { Container, Content, SearchInput, useStyles, TextInput };
