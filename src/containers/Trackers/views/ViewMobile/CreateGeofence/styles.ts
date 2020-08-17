import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 409,
    backgroundColor: '#fff',
  },
  content: {
    height: 'calc(100% - 56px)',
    position: 'relative',
  },
  iconBtn: {
    width: 31,
    padding: 0,
    color: '#1a1a1a',
  },
  iconBack: {
    width: 20,
    height: 20,
    position: 'relative',
    left: 3,
  },
}));

export { useStyles };
