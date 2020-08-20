import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  color: {
    fontSize: 16,
    color: '#1a1a1a',
    padding: '17px 0',
  },
  col1: {
    width: '21%',
    fontWeight: 500,
  },
  col2: {
    width: '65%',
    textAlign: 'left',
  },
}));

export { useStyles };
