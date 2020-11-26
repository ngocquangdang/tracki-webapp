import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  iconLocation: {
    padding: 0,
    width: 20,
    height: 20,
    color: '#168449',
    marginRight: 8,
    position: 'relative',
    top: 5,
  },
  contentBody: {
    color: '#1a1a1a',
    position: 'relative',
    fontSize: 17,
  },
  skeContainer: {
    margin: 10,
  },
  expand: {
    transition: 'transform .2s ease-in-out',
    transform: 'rotate(90deg)',
    cursor: 'pointer',
  },
  noExpand: {
    transition: 'transform .2s ease-in-out',
    transform: 'rotate(0)',
    cursor: 'pointer',
  },
  rowContainer: {
    margin: '0 10px',
  },
  cellMap: {
    height: 300,
    position: 'relative',
    padding: 0,
    borderBottom: 'none',
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconExpand: {
    display: 'flex',
  },
  location: {
    display: 'flex',
    flex: 0.8,
  },
}));
export { useStyles };
