import { withStyles, FormControl, makeStyles } from '@material-ui/core';

const FormPassword = withStyles(theme => ({
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
}))(FormControl);

const useStyles = makeStyles(theme => ({
  heightInput: {
    height: 50,
  },
  inputWrapper: {
    marginTop: 15,
    marginBottom: 15,
  },
  error: {
    right: 0,
    marginRight: 0,
    textAlign: 'right',
    position: 'absolute',
    top: 55,
  },
}));
export { FormPassword, useStyles };
