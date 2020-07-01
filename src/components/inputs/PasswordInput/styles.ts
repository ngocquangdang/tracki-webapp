import { withStyles, FormControl, makeStyles } from '@material-ui/core';

const FormPassword = withStyles(theme => ({
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
}))(FormControl);

const useStyles = makeStyles(theme => ({
  inputWrapper: {
    marginTop: 15,
    marginBottom: 15,
  },
  error: {
    right: 0,
    marginRight: 0,
    textAlign: 'right',
    position: 'absolute',
    top: 55
  }
}));
export { FormPassword, useStyles };
