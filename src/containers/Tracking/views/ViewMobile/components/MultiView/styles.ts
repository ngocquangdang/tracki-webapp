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
    borderBottom: '1px solid #ddd',
  },
  itemMultiView: {
    minHeight: 200,
  },
  emptyMultiView: {
    height: 150,
  },
  trackerCard: {
    opacity: 0.95,
    borderRadius: 4,
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    position: 'fixed',
    bottom: 50,
    width: 'calc(100% - 10px)',
    left: 5,
    right: 5,
    zIndex: 411,
    transition: 'all 0.5s',
  },
  hideCard: {
    bottom: -94,
  },
  toggleContainer: {
    position: 'absolute',
    width: '100%',
    height: 4,
    top: -10,
    display: 'flex',
    justifyContent: 'center',
  },
  toggle: {
    width: 40,
    borderRadius: 3,
    height: 5,
    backgroundColor: '#fff',
  },
}));

export { useStyles };
