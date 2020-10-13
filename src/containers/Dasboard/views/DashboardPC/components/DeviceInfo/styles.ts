import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  color: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  header: {
    padding: '9px 0 19px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
  },
  col1: {
    width: '30%',
    fontWeight: 500,
  },
  col2: {
    width: '70%',
    textAlign: 'left',
  },
  iconCard: {
    width: 20,
    height: 20,
    marginRight: 8.5,
  },
  flexbox: {
    display: 'flex',
    padding: '17px 0',
    borderBottom: '1px solid #e0e0e0',
    '&:last-child': {
      border: 0,
    },
  },
}));

export { useStyles };
