import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 16,
  },
  colorRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 270,
    marginBottom: 16,
  },
  colorBtn: {
    width: 44,
    height: 44,
    color: 'white',
  },
  pickColor: {
    cursor: 'pointer',
    display: 'flex',
  },
  color: {
    width: 36,
    height: 24,
  },
}));

export { useStyles };
