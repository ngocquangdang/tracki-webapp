import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  row1: {
    display: 'flex',
    justifyContent: 'space-between',
    // height: 260,
    marginBottom: 20,
  },
  row2: {
    display: 'flex',
    justifyContent: 'space-between',
    // height: 425,
  },
}));

export { useStyles };
