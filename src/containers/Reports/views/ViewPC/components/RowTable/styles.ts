import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  iconLocation: {
    padding: 0,
    width: 16,
    height: 18,
    color: '#168449',
  },
  contentBody: {
    display: 'flex',
    color: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    margin: '0 25px',
    position: 'relative',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    height: '94px',
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
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  cellMap: {
    height: 300,
    position: 'relative',
    padding: 0,
    borderBottom: 'none',
  },
  iconBattery: {
    width: 10,
    height: 17,
    marginRight: 10,
  },
  flexCol1: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    flex: 0.5,
    paddingLeft: 34,
  },
  flexRow2: {
    display: 'flex',
    alignItems: 'center',
    flex: 0.5,
    paddingLeft: 10,
  },
  iconExpand: {
    display: 'flex',
  },
  textFont17: {
    fontSize: 17,
  },
  location: {
    display: 'flex',
    paddingTop: 5,
  },
}));
export { useStyles };
