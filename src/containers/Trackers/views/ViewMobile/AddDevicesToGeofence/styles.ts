import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 404,
  },
  content: {
    height: 'calc(100% - 56px)',
    position: 'relative',
  },
}));

export { useStyles };
