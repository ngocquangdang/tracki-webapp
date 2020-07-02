import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const TextInput = withStyles(theme => ({
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
    '& > .MuiFormHelperText-root.Mui-error': {
      position: 'absolute',
      top: '40px',
    },
  },
}))(TextField);

const useStyles = makeStyles(theme => ({
  inputWrapper: {
    marginTop: 15,
    marginBottom: 15,
  },
  errorRoot: {
    right: 0,
    marginRight: 0,
  },
}));

export { TextInput, useStyles };
