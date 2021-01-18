import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  row1: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  row2: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

export { useStyles };
