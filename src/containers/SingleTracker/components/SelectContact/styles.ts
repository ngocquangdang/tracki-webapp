import styled from 'styled-components';
import { TextField, withStyles, makeStyles } from '@material-ui/core';

const SelectContactContainer = styled.div`
  margin-top: 70px;
  height: cacl(100% - 70px);
`;
const Save = styled.div`
  margin: 10px;
`;
const SelectContactAddButton = styled.div``;
const SearchInput = styled.div``;

const useStyles = makeStyles(theme => ({
  loading: {
    position: 'absolute',
    color: '#fff',
    top: 22,
    left: 22,
  },
  margin: {
    marginTop: 15,
    marginBottom: 15,
  },
  padding: {
    [theme.breakpoints.down('sm')]: {
      padding: '0 15px',
    },
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '10px 0',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },

  addBtn: {
    width: '83px',
    height: 32,
    margin: '10px',
  },
  errorText: {
    textAlign: 'center',
    color: theme.palette.error.main,
  },
  fontSize: {
    [theme.breakpoints.down(375)]: {
      fontSize: 15,
    },
  },
  iconNext: {
    fontSize: '30px',
    color: '#666666',
    marginRight: '10px',
  },
  questionIcon: {
    width: '21.5px',
    height: '22.5px',
    color: '#797575',
  },
  personAddIcon: {
    height: '25.4px;',
    color: '#1a1a1a',
  },
  speedLimit: {
    marginRight: '20px',
  },
  questionIconMargin: {
    marginRight: '8px',
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
export {
  SelectContactContainer,
  SelectContactAddButton,
  SearchInput,
  TextInput,
  Save,
  useStyles,
};
