import styled from 'styled-components';
import { makeStyles, withStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Tooltip } from '@material-ui/core';

const Form = styled.form`
  max-width: 400px;
  width: 100%;
  margin: 76px auto;
`;
const About = styled.div`
  font-size: 20px;
  text-align: center;
`;

const ToolTip = styled.div`
  background: '#ffffff';
`;
const Typography = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 47px auto;
  text-align: center;
`;
const AdornmentStyle = withStyles(theme => ({
  root: {
    position: 'absolute',
    right: 8,
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
    left: -15,
  },
  arrow: {
    color: 'white',
  },
})(Tooltip);

const useStyles = makeStyles(theme => ({
  icon: {
    width: 126.5,
    height: 126.5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },

  marginInput: {
    marginTop: '16px',
  },
  marginButton: {
    margin: '16px 0',
    width: '100%',
  },
  padding: {
    '& .MuiOutlinedInput-adornedStart': {
      padding: 0,
    },
  },
}));
export {
  Form,
  About,
  ToolTip,
  Typography,
  TooltipStyle,
  AdornmentStyle,
  useStyles,
};
