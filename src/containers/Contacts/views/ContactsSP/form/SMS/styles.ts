import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core';
import { TextInput } from '@Components/inputs';

const Icon = styled.div`
  height: 100%;
  background: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
`;
const WrappContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  padding-right: 10px;
  @media (max-width: 995.95px) {
    width: 100%;
  }
  @media (max-width: 374.95px) {
    padding: 0;
  }
`;

const useStyles = makeStyles(theme => ({
  fullWidth: {
    width: '100%',
    marginLeft: 10,
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
    width: '100%',
  },
  heightInput: {
    height: 40,
  },
  btn: {
    height: 40,
    width: '120px',
  },
  btnEdit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 77,
    borderRadius: 0,
    fontSize: 11,
    outline: 'none',
    border: 0,
  },
  btnSave: {
    color: '#ffffff',
    background: '#168449',
  },
  btnClose: {
    color: '#1a1a1a',
    background: '#ffffff',
  },
  icon: {
    width: 30,
    height: 25,
  },
}));

const TextInputStyle = withStyles(theme => ({
  root: {
    height: 40,
    width: 136,
    marginLeft: 10,
    '& .MuiInputBase-root': {
      height: '45px',
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
      top: '35px',
    },
    '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px',
    },
    [theme.breakpoints.down('sm')]: {
      width: 270,
      height: 45,
    },
    [theme.breakpoints.down(374.95)]: {
      width: 223,
      height: 45,
    },
  },
}))(TextInput);
export { useStyles, TextInputStyle, Icon, WrappContent };
