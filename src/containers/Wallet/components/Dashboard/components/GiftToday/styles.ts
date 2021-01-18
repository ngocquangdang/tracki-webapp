import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: 'linear-gradient(124deg, #ff91a6 -1%, #9e3038 100%)',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#ffffff',
    marginTop: '20%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  icon: {
    width: 139,
    height: 139,
  },
  playIcon: {
    width: 20.8,
    height: 20.8,
  },
  subText: {
    display: 'flex',
    /* align-items: center, */
    width: '150px',
    textAlign: 'center',
  },
}));

export { useStyles };
