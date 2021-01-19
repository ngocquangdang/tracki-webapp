import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px 0 rgba(210, 210, 210, 0.3)',
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
    '& > svg': {
      fill: theme.palette.primary.main,
    },
  },
  tabIcon: {
    fontSize: 12,
    fontWeight: 300,
    '& svg': {
      fontSize: 24,
      color: '#999999',
      fill: '#999999',
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
  isActive: {
    '& > .MuiTab-wrapper > svg': {
      fill: theme.palette.primary.main,
    },
  },
}));

export { useStyles };
