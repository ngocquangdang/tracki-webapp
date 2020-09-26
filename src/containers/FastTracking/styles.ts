import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    // maxWidth: 375,
  },
  header: {
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 300,
  },
}));
export { useStyles };
