import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%',
  },
  item: {
    position: 'relative',
    width: '100%',
    height: '25%',
    borderBottom: '1px solid #ddd',
  },
}));

export { useStyles };
