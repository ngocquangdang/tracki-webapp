import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  trackingContainer: {
    position: 'absolute',
    left: 405,
    width: 350,
    zIndex: 400,
    cursor: 'move',
    backgroundColor: 'white',
    bottom: 5,
    paddingTop: 5,
    borderRadius: 4,
    display: 'none',
    boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
  },
  show: {
    display: 'block',
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 4,
    color: '#1a1a1a',
    '& svg': {
      fontSize: 20,
    },
  },
  prevBtn: {
    marginRight: 8,
    minHeight: 30,
    height: 30,
    width: 30,
    '&:first-child': {
      paddingLeft: 8,
    },
    '& svg': {
      fontSize: '16px !important',
    },
  },

  rowInfoIconControl: {
    display: 'flex',
  },
}));
export { useStyles };
