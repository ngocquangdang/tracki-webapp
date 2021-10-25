import styled from 'styled-components';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const FormInput = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const TextInput = withStyles(theme => ({
  root: {
    '& .MuiInputBase-root': {
      height: '50px',
      color: '#1a1a1a',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#1a1a1a',
      },
      '&.Mui-focused fieldset': {
        border: `2px solid ${theme.palette.primary.main}`,
      },
      '&.Mui-error fieldset': {
        border: `2px solid ${theme.palette.error.main}`,
      },
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
      right: 0,
    },
    '& .MuiFormHelperText-root': {
      // marginRight: '0px',
      // marginLeft: '0px',
      // textAlign: 'right',
    },
    '& .MuiOutlinedInput-input': {
      padding: '15.5px 50px 15.5px 14px',
    },
  },
}))(TextField);

const useStyles = makeStyles(theme => ({
  heightInput: {
    height: 50,
  },
  inputWrapper: {
    marginTop: 15,
    marginBottom: 5,
    width: '100%',
  },
  error: {
    right: 0,
    marginRight: 0,
    textAlign: 'right',
    position: 'absolute',
    top: 55,
  },
  icon: {
    position: 'absolute',
    right: 14,
    top: 16,
  },
}));

export { FormInput, TextInput, useStyles };
