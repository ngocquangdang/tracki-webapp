import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  item: {
    cursor: 'pointer',
    minHeight: 40,
    '&:hover div': {
      color: 'red',
    },
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
    whiteSpace: 'nowrap',
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    paddingRight: 0,
  },
  dot: {
    position: 'relative',
  },
  moving: {
    backgroundColor: 'yellow',
  },
  stop: {
    backgroundColor: 'red',
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
  active: {
    '& div': {
      color: 'red',
    },
  },
  outter: {
    position: 'absolute',
    width: 28,
    height: 28,
    border: '2px solid',
    borderRadius: '50%',
    left: -10,
    top: -10,
  },
}));

export default useStyles;
