import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Tooltip } from '@material-ui/core';

const Typography = styled.span`
  font-size: 18px;
  font-weight: 300;
  @media (max-width: 995.95px) {
    font-size: 14px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
`;
const Image = styled.div`
  margin-left: 76px;
  width: 236px;
  height: 211px;
  object-fit: contain;
  @media (max-width: 995.95px) {
    display: none;
  }
`;
const StepOneContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ToolTip = styled.div`
  background: '#ffffff';
`;
const Notifi = styled.p`
  color: #ff0000;
  text-align: center;
`;
const ScanQR = styled.div``;
const QRImage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;
const QR1 = styled.div`
  width: 136;
  height: 108;
`;
const QR2 = styled.div`
  width: 167;
  height: 7;
`;
const AdornmentStyle = withStyles(theme => ({
  root: {
    position: 'absolute',
    cursor: 'pointer',
    right: 10,
    fontSize: 19,
  },
}))(InputAdornment);
const TooltipStyle = withStyles({
  tooltip: {
    color: '#1a1a1a',
    fontSize: '15px',
    fontWeight: 'normal',
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.2)',
  },
  arrow: {
    color: 'white',
  },
})(Tooltip);
const useStyles = makeStyles(theme => ({
  marginInput: {
    margin: '9.5px 0',
  },
  padding: {
    '& .MuiOutlinedInput-adornedStart': {
      padding: 0,
    },
  },
  displayNone: {
    display: 'none',
  },
  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
    top: '50%',
    right: 15,
  },
  maxWidth: {
    width: '100%',
  },
  btn: {
    margin: '1rem 0',
    color: '#666666',
    width: '100%',
    fontSize: 16,
    lineHeight: '19px',
    fontWeight: 400,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    border: 'solid 1px #ccd0d5',
    backgroundColor: '#f5f6f7',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  or: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px auto',
  },
}));

export {
  Typography,
  Form,
  StepOneContainer,
  Image,
  ToolTip,
  Notifi,
  ScanQR,
  QRImage,
  QR1,
  QR2,
  TooltipStyle,
  useStyles,
  AdornmentStyle,
};
