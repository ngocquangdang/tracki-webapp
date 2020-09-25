import { makeStyles, withStyles, Tab } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    maxWidth: '844px',
  },
  tabs: {
    height: 55,
    [theme.breakpoints.down('sm')]: {
      height: 45,
    },
  },
  tabItem: {
    fontSize: 18,
    lineHeight: '22px',
    height: 55,
    color: '#b7b7b7',
    minHeight: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: 45,
      fontSize: 14,
      lineHeight: '17px',
      color: '#999',
      width: '50%',
      maxWidth: '100%',
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
export { useStyles, TabStyle };
