import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  trackingContainer: {
    position: 'absolute',
    left: 405,
    width: 300,
    zIndex: 400,
    backgroundColor: 'white',
    bottom: 5,
    padding: 8,
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
  rowInfo: {
    display: 'flex',
    marginBottom: 8,
  },
  rowIcon: {
    width: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 500,
    margin: 0,
  },
  prevBtn: {
    marginRight: 8,
    minHeight: 30,
    height: 30,
    fontSize: 14,
    color: 'white',
    fontWeight: 400,
    '& svg': {
      fontSize: '16px !important',
    },
  },
  subtitle: {
    fontSize: 13,
    lineHeight: '17px',
    margin: 0,
  },
  rowText: {
    alignSelf: 'center',
  },
  dashIcon: {
    fontSize: 22,
    alignSelf: 'center',
  },
  rowLeft: {
    display: 'flex',
    borderRight: '1px solid #ddd',
  },
  block: {
    display: 'flex',
  },
  rowRight: {
    textAlign: 'center',
    padding: '0 8px',
  },
  text: {
    marginLeft: 8,
    alignSelf: 'center',
    marginRight: 8,
  },
}));
export { useStyles };
