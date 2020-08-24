import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  item: {
    minHeight: 40,
  },
  oppositeText: {
    fontSize: 14,
    lineHeight: '17px',
    fontWeight: 500,
    flex: 0,
    paddingLeft: 0,
    whiteSpace: 'nowrap',
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
