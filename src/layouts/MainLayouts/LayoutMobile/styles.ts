import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  container: {
    position: 'relative',
    height: 'calc(100% - 56px)',
    width: '100%',
  },
  blurHeader: {
    filter: 'brightness(0.5)',
    backgroundColor: '#000000',
  },
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export { useStyles };
