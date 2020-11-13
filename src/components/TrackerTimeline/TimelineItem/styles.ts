import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  item: {
    cursor: 'pointer',
    minHeight: 40,
    '&:hover div': {
      color: '#168449',
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
    borderColor: '#168449',
    borderWidth: 0,
  },
  stop: {
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 0,
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
  active: {
    '& div': {
      color: '#168449',
    },
  },
  outter: {
    position: 'absolute',
    width: 18,
    height: 18,
    border: '2px solid',
    borderRadius: '50%',
    left: -5,
    top: -5,
  },
  showDate: {
    fontSize: 14,
    fontWeight: 500,
    padding: '0 30px',
  },
  containerShowDate: {
    display: 'flex',
    alignItems: 'center',
    margin: '7px 0',
  },
}));

export default useStyles;
