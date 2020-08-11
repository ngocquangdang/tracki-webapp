import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100% - 30px)',
    width: '100%',
    padding: '5px 10px 10px',
  },
  row: {
    display: 'flex',
    width: '100%',
    height: '50%',
    margin: '10px 0 15px',
    '&:last-child': {
      margin: '15px 0px 10px',
    },
  },
  item: {
    position: 'relative',
    width: '50%',
    height: '100%',
    backgroundColor: 'orange',
    margin: '0 7px 0 5px',
    borderRadius: 4,
    boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.12)',
    '&:last-child': {
      margin: '0 5px 0 7px',
    },
  },
}));

export { useStyles };
