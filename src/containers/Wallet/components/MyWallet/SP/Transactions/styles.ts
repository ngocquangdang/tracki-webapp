import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 56,
  },
  flex: {
    display: 'flex',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
  },
  backIcon: {
    color: '#1a1a1a',
    fontSize: 24,
  },
  title: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  mr0: {
    margin: 0,
  },
  selection: {
    width: 'calc((100% - 20px)/2)',
  },
  pd20: {
    padding: 20,
  },
  titleCard: {
    padding: 15,
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.secondary.main,
    backgroundColor: '#f4f5f6',
  },
}));

export { useStyles };
