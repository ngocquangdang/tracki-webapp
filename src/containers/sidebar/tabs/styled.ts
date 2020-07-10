import { withStyles, makeStyles } from '@material-ui/core';
import { Tab } from 'material-ui';

const useStyles = makeStyles(theme => ({
  backBtn: {
    color: '#4b4f56 !important',
    padding: 0,
    '& span svg': {
      fontSize: '36px !important',
    },
    [theme.breakpoints.down(375)]: {
      fontSize: '16px !important',
      padding: 0,
      '& span svg': {
        width: 20,
        height: 20,
      },
    },
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.down(375)]: {
      height: 26,
      width: 90,
    },
  },
  arrow: {
    width: 18,
    height: 18,
  },
  border: {
    borderRadius: 0,
    height: 55,
  },
  heightTab: {
    minHeight: 55,
  },
  relative: {
    position: 'relative',
    top: 0,
  },
  absolute: {
    position: 'absolute',
    right: -25,
    top: 0,
    color: 'black',
  },
  btnIcon: {
    color: '#1a1a1a',
    width: 26,
    height: 55,
    background: '#ffffff',
    borderRadius: 0,
    boxShadow: '3px 0 4px 0 rgba(0, 0, 0, 0.12)',
    minWidth: 'auto',
    '&:hover': {
      background: '#ffffff',
    },
  },
}));
const TabStyle = withStyles(theme => ({
  wrapper: {
    flexDirection: 'row',
    '& > *:first-child': {
      marginBottom: '0 !important',
      marginRight: '6px',
    },
  },
}))(Tab);
export { TabStyle, useStyles };
