import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: 4,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.25)',
    border: '1px solid #fefefe',
    height: 396,
    [theme.breakpoints.down('sm')]: {
      height: 300,
    },
  },
  header: {
    height: 225,
    [theme.breakpoints.down('sm')]: {
      height: 160,
    },
  },
  container: {
    padding: '20px 15px',
    [theme.breakpoints.down('sm')]: {
      padding: '14px 7px',
    },
  },
}));

export { useStyles };
