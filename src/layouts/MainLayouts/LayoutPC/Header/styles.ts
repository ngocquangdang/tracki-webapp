import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tabRoot: {
    height: 70,
  },
  tabItemRoot: {
    minWidth: 90,
    padding: '6px 0',
  },
  tabIcon: {
    fontSize: 12,
    fontWeight: 300,
    '& svg': {
      fontSize: 24,
    },
  },
  row: {
    display: 'flex',
  },
  logoWrapper: {
    width: 376,
    paddingLeft: 14,
    cursor: 'pointer',
    alignSelf: 'center',
    '@media screen and (max-width: 1100px)': {
      width: 287,
    },
  },
  logo: {
    objectFit: 'contain',
    height: 35.4,
  },
}));

export { useStyles };
