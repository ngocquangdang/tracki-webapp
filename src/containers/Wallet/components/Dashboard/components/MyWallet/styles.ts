import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    display: 'flex',
    margin: '22px 0',
  },
  item: {
    width: '50%',
    textAlign: 'center',
  },
  flexBox: {
    display: 'flex',
    borderRight: '1px solid #e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 36,
    marginBottom: 5,
    '& > p': {
      margin: 0,
      fontSize: 36,
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    color: '#e99313',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      background: '#f4f5f6',
      padding: 5,
    },
  },
  title: {
    fontSize: '16px',
    fontWeight: 500,
    marign: '7px 0',
  },
  point: {
    fontSize: '16px',
    padding: '3px 11px',
    backgroundColor: '#ec7d29',
    width: 'fit-content',
    color: '#ffffff',
    margin: 'auto',
  },
  bigCoin: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  normalCoin: {
    width: 27,
    height: 27,
    marginRight: 5,
  },
  moneyIcon: {
    width: 31,
    height: 26,
    marginLeft: 5,
  },
  money: {
    fontSize: 36,
    margin: 0,
    marginBottom: 5,
  },
  cast: {
    padding: '3px 11px',
    color: '#1976d2',
    margin: 0,
    cursor: 'pointer',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: 500,
    marginRight: 0,
  },
}));

export { useStyles };
