import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: 4,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.25)',
    border: '1px solid #fefefe',
    height: 396,
  },
  header: {
    height: 225,
  },
  container: {
    padding: '20px 15px',
  },
}));

export { useStyles };
