import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 799,
    margin: 'auto',
    border: '1px solid #e0e0e0',
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    backgroundColor: '#fff',
    position: 'relative',
    marginTop: -56,
  },
  paddingContainer: {
    padding: '27px 70px',
  },
  header: {
    height: 266,
    position: 'relative',
    backgroundImage: 'linear-gradient(254deg, #39a588, #046d34 0%)',
    color: '#fff',
  },
  nav: {
    height: 56,
    padding: '0 15px',
  },
  content: {
    padding: '25px 75px',
  },
  title: {},
  flex: {
    display: 'flex',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
  },
  direction: {
    flexDirection: 'column',
  },
  item: {
    position: 'absolute',
    bottom: '-35px',
    width: 'calc(100% - 30px)',
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.25)',
    border: 'solid 1px #fefefe',
    backgroundColor: '#ffffff',
  },
  bigCoin: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  description: {
    fontSize: 18,
  },
  contentHeader: {
    width: '100%',
    margin: 'auto',
    height: 'calc(100% - 56px)',
  },
  contentTitle: {
    fontSize: 15,
  },
  mr0: {
    margin: 0,
  },
  mb10: {
    marginBottom: 10,
  },
  mt70: {
    marginTop: 70,
  },
  point: {
    fontSize: 40,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    color: '#e99313',
    cursor: 'pointer',
    backgroundColor: '#fff',
    padding: '13px 19px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      padding: 13,
    },
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
  titleCard: {
    padding: 15,
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.secondary.main,
    backgroundColor: '#f4f5f6',
  },
  giftIcon: {
    width: '48px',
    height: '48px',
    color: '#a163ba',
  },
  ticketIcon: {
    width: '48px',
    height: '48px',
    fill: '#ff6465',
  },
  calenderIcon: {
    width: '42px',
    height: '42px',
  },
  img: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '13px 20px',
  },
  icon: {
    marginRight: 10,
  },
  name: {
    fontSize: 14,
  },
  subTicket: {
    fontSize: 14,
    margin: '3px 0',
  },
  time: {
    fontSize: 13,
    color: '#999999',
  },
  pointHistory: {
    minWidth: 100,
    textAlign: 'end',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
  },
  btnBackground: {
    marginBottom: 7,
    width: '100%',
    color: theme.palette.secondary.main,
    backgroundColor: '#f4f5f6',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#fff',
    },
  },
  cash: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    fill: theme.palette.primary.main,
    width: 'calc((100% - 20px)/2)',
    '&:first-child': {
      borderRight: '1px solid #e0e0e0',
    },
    '& > p': {
      margin: 0,
      fontSize: 18,
    },
  },
  settingIcon: {
    cursor: 'pointer',
  },
  selection: {
    width: 'calc((100% - 20px)/2)',
  },
  pd20: {
    padding: 20,
  },
  backIcon: {
    color: '#fff',
    fontSize: 24,
  },
  blueLight: {
    color: '#1976d2',
  },
}));

export { useStyles };
