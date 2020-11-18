import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: 0,
    height: '100%',
    width: '100%',
  },
  tabs: {
    height: '100%',
    width: '100%',
    '& div div': {
      height: '100%',
    },
  },
  tabItem: {
    padding: 0,
    width: '20%',
    minWidth: '20%',
    flexDirection: 'row',
    fontWeight: 300,
    fontSize: 14,
    lineHeight: '17px',
  },
}));

export { useStyles };
