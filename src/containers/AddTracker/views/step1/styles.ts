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
}));

export {
  Typography,
  Form,
  StepOneContainer,
  Image,
  ToolTip,
  Notifi,
  TooltipStyle,
  useStyles,
  AdornmentStyle,
};
