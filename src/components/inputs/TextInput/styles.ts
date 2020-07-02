import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const TextInput = withStyles(theme => ({
  root: {
    '& .MuiInputBase-root': {
      color: '#000',
      height: '50px',
    },
    '& .MuiOutlinedInput-root': {
      padding: '15.6px 10px',

      '& fieldset': {
        borderColor: '#000',
        height: '50px',
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
      top: '50px',
    },
    '& .MuiInputLabel-formControl': {
      top: '-5px',
      '&.Mui-focused': {
        top: 0,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.6px 10px',
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiInputBase-root': {
        color: '#000',
        height: '45px',
      },
      '& .MuiOutlinedInput-root': {
        padding: '15.6px 10px',
        '& fieldset': {
          borderColor: '#000',
          height: '45px',
        },
      },
      '& > .MuiFormHelperText-root.Mui-error': {
        position: 'absolute',
        top: '45px',
      },
      '& .MuiInputLabel-formControl': {
        top: '-5px',
        '&.Mui-focused': {
          top: 0,
        },
      },
      '& .MuiOutlinedInput-input': {
        padding: '15.6px 10px',
      },
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
