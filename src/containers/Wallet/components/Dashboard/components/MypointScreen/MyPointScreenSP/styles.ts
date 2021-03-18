import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 799,
    borderRadius: 4,
  },
  paddingContainer: {
    padding: '27px 70px',
  },
  header: {
    height: 232,
    display: 'flex',
    position: 'relative',
    backgroundImage: 'linear-gradient(254deg, #39a588, #046d34 0%)',
    color: '#fff',
  },
  content: {
    padding: '25px 75px',
  },
  title: {
    position: 'absolute',
    top: 18,
    left: 30,
    margin: 0,
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  direction: {
    flexDirection: 'column',
  },
  item: {
    width: '100%',
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
  },
  contentTitle: {
    fontSize: 18,
  },
  mr0: {
    margin: 0,
  },
  mb10: {
    marginBottom: 10,
  },
  point: {
    fontSize: 36,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'calc(100% - 30px)',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    backgroundColor: '#fff',
    padding: '20px',
    position: 'absolute',
    margin: 15,
    bottom: -50,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      background: '#f4f5f6',
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
    marginLeft: 'auto',
  },
  titleCard: {
    padding: '15px 20px',
    margin: 0,
    fontSize: 16,
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
    margin: '10px 13px',
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
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#fff',
    },
  },
  mt50: {
    marginTop: 50,
  },
  backIcon: {
    color: '#fff',
    fontSize: 24,
  },
  nav: {
    marginLeft: -15,
  },
}));

export { useStyles };
