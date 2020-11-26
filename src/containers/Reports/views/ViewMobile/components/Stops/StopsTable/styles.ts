import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  pd: {
    padding: '15px 15px 50px 15px',
  },
}));

export { useStyles };
