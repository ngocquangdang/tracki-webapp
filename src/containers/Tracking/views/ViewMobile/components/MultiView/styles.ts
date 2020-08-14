import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%',
  },
  multiView: {
    paddingBottom: 150,
  },
  item: {
    position: 'relative',
    width: '100%',
    height: '25%',
    // minHeight: 300,
    borderBottom: '1px solid #ddd',
  },
  trackerCard: {
    opacity: 0.95,
    borderRadius: 4,
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 5,
    width: 'calc(100% - 10px)',
    left: 5,
    right: 5,
    zIndex: 401,
  },
}));

export { useStyles };
