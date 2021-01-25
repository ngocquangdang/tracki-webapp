import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 799,
    borderRadius: 4,
  },
  header: {
    height: 232,
  },
  content: {
    padding: '25px 75px',
  },
}));

export { useStyles };
