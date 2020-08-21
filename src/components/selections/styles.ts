import { FormControl, makeStyles, withStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  menuItem: {
    color: '#1a1a1a',
  },
  select: {
    color: '#1a1a1a',
  },
}));
const SelectForm = withStyles(theme => ({
  root: {
    '&.MuiFormControl-root': {
      width: '100% !important',
    },
    '& .MuiInputBase-root': {
      height: '50px',
      color: '#1a1a1a',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#1a1a1a',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #1a1a1a',
      },
    },
    '& .MuiInputLabel-outlined': {
      color: '#1a1a1a',
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
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#168449',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1a1a1a',
    },
  },
}))(FormControl);
export { SelectForm, useStyles };
