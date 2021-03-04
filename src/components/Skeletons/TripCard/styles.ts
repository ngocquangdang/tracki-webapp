import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    padding: '9px 10px 10px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    border: '1px solid #fefefe',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 10,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  flexRowBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
}));

export { useStyles };
