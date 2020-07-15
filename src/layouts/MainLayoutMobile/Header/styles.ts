import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      height: '56px',
    },
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      minHeight: '56px',
    },
  },
  textHeader: {
    display: 'flex',
    fontSize: '20px',
  },
  menuButton: {
    objectFit: 'contain',
  },
  menuMobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export { useStyles };
