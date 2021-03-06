import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: 0,
    height: 55,
    boxShadow: '0 3px 4px 0 rgba(0, 0, 0, 0.12)',
    background: 'linear-gradient(rgba(0,0,0,0.5) -50%, rgba(0,0,0,0) 8%)',
  },
  tabs: {
    height: '100%',
    '& div div': {
      height: '100%',
    },
  },
  tabPanel: {
    height: 'calc(100% - 55px)',
    overflowY: 'auto',
  },
  tabItem: {
    width: '50%',
    flexDirection: 'row',
    fontWeight: 300,
    fontSize: 18,
  },
}));

export { useStyles };
