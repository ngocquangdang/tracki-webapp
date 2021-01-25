import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 800,
    margin: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '25px 80px',
  },
  title: {
    position: 'relative',
    margin: 0,
    marginRight: '30%',
    fontSize: 42,
    fontWeight: 300,
    color: '#1a1a1a',
  },
  content: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    borderRadius: 4,
  },
  icon: {
    cursor: 'pointer',
  },
}));

export { useStyles };
