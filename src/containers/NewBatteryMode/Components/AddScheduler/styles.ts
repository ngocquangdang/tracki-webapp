import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dayCard: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  statusWifi: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
  },
}));
export { useStyles };
