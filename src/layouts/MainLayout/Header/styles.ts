import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
  },
  logoWrapper: {
    width: 240,
    alignSelf: 'center',
  },
  logo: {
    objectFit: 'contain',
    height: 24,
  },
  btnRoot: {
    color: theme.palette.secondary.main,
  },
  linkBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: '1.5em',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '& svg': {
      marginBottom: 4,
    },
    '&:not(svg)': {
      fontSize: 13,
    },
  },
  btnLabel: {
    flexDirection: 'column',
    fontSize: 12,
  },
}));

export default useStyles;
