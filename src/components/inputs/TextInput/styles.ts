import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const TextInput = withStyles(theme => ({
  root: {
    '& .MuiInputBase-root': {
      height: '50px',
      color: '#1a1a1a',
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 17px) scale(1)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.7)',
      },
    },
    '& > .MuiFormHelperText-root.Mui-error': {
      position: 'absolute',
      top: '50px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 14px',
    },
  },
}))(TextField);

const useStyles = makeStyles(theme => ({
  heightInput: {
    height: 50,
  },
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
