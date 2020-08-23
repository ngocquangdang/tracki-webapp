import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  item: {
    minHeight: 40,
  },
  text: {
    fontSize: 14,
    lineHeight: '17px',
  },
  moving: {
    backgroundColor: 'yellow',
  },
  stop: {
    backgroundColor: 'red',
  },
}));

export default useStyles;
