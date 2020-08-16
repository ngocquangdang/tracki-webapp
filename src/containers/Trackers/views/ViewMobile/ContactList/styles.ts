import { TextField, withStyles, makeStyles } from '@material-ui/core';
import styled from 'styled-components';

const SearchInput = styled.div``;

const ButtonClose = styled.div``;

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#363640',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 404,
  },
  header: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
  },
  content: {
    height: 'calc(100% - 140px)',
    position: 'relative',
    color: '#ffffff',
  },
  saveBtn: {
    height: 50,
  },
  addNewBtn: {
    position: 'absolute',
    right: 15,
    bottom: 0,
    color: '#4b4f56',
    fontSize: 15,
    lineHeight: '19px',
    fontWeight: 400,
    borderColor: '#ccd0d5',
    backgroundColor: '#fff',
    borderRadius: 30,
    '& > span > span': {
      marginRight: 0,
      '& svg': {
        fontSize: '30px !important',
      },
    },
  },
  footer: {
    height: 80,
    padding: 15,
  },
  buttonClose: {
    width: '25px',
    height: '25px',
    color: '#ffffff',
    cursor: 'pointer',
    marginRight: 14.5,
  },
}));

const TextInput = withStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiInputBase-root': {
      height: '50px',
      color: '#ffffff',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 0',
      fontSize: 15,
    },
    '& .MuiInput-underline:before': {
      border: 0,
    },
    '.MuiInput-underline:hover:not(.Mui-disabled):before': {
      border: 0,
    },
  },
}))(TextField);

export { useStyles, SearchInput, TextInput, ButtonClose };
