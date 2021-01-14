import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  background: {
    backgroundImage: 'linear-gradient(124deg, #ff91a6 -1%, #9e3038 100%)',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#ffffff',
  },
  icon: {
    width: 139,
    height: 139,
  },
  playIcon: {
    width: 20.8,
    height: 20.8,
  },
}));

export { useStyles };
