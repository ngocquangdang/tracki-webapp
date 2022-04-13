import { makeStyles, withStyles } from '@material-ui/core';
import { TextInput } from '@Components/inputs';

const useStyles = makeStyles(theme => ({
  fullWidth: {
    width: '100%',
    marginRight: 10,
  },
  btnPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 40,
    width: '120px',
    '&:hover': {
      backgroundColor: theme.palette.secondary,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  heightInput: {
    height: 40,
  },
  btn: {
    height: 40,
    width: '120px',
  },
  styleInput: {
    height: 40,
    '& > .form-control': {
      height: 40,
    },
  },
}));

const TextInputStyle = withStyles(theme => ({
  root: {
    height: 40,
    width: 242,
    marginRight: 10,
    '& .MuiInputBase-root': {
      height: '40px',
      color: '#1a1a1a',
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 10px) scale(1)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.7)',
      },
    },
    '& > .MuiFormHelperText-root.Mui-error': {
      position: 'absolute',
      top: '34px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px',
    },
  },
}))(TextInput) as any;

export { useStyles, TextInputStyle };
