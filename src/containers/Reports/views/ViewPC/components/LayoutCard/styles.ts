import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    border: 'solid 1px #e0e0e0',
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 25,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
    maxHeight: 66,
  },
  content: {
    padding: '0 31px 15px 31px',
    height: 'auto',
    maxHeight: 785,
    overflowY: 'auto',
  },
  leftItemHead: {
    display: 'flex',
    alignItems: 'center',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
}));

export { useStyles };
