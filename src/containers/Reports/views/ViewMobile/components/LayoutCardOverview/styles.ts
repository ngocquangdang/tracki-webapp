import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {},
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    height: 'auto',
  },
  leftItemHead: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 0',
  },
  label: {
    fontSize: 18,
    lineHeight: 0.89,
    color: '#1a1a1a',
  },
}));

export { useStyles };
