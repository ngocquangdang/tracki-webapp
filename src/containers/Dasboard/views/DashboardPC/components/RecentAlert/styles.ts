import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  color: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  font14: {
    fontSize: 14,
  },
  flexbox: {
    display: 'flex',
    padding: '17px 0',
    borderBottom: '1px solid #e0e0e0',
    '&:last-child': {
      border: 0,
    },
  },
  iconCard: {
    width: 20,
    height: 20,
    marginRight: 8.5,
  },
  header: {
    padding: '9px 0 19px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
  },
  colHeader1: {
    width: '22%',
    fontWeight: 500,
    marginRight: 15,
    textAlign: 'left',
  },
  colHeader2: {
    width: '56%',
    fontWeight: 500,
    textAlign: 'left',
    marginRight: 15,
  },
  colItem1: {
    width: '22%',
    marginRight: 15,
  },
  colItem2: {
    width: '56%',
    textAlign: 'left',
    marginRight: 15,
  },
  rowHeader: {
    display: 'flex',
    width: '100%',
    borderBottom: '1px solid #e0e0e0',
    padding: '17px 0',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    color: '#999999',
    cursor: 'pointer',
    padding: '15px 0 7px',
    margin: 0,
    '&:hover': {
      color: '#1a1a1a',
    },
  },
  overflow: {
    maxHeight: 500,
    overflowY: 'scroll',
    display: 'block',
  },
  fullWidth: {
    width: '100%',
  },
  noAlert: {
    fontSize: 14,
    textAlign: 'center',
    padding: '17px 0',
    color: '#999999',
    margin: 0,
  },
}));

export { useStyles };
