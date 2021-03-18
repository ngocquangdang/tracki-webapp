import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 799,
    borderRadius: 4,
    margin: 'auto',
    border: '1px solid #e0e0e0',
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    backgroundColor: '#fff',
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
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
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
  direction: {
    flexDirection: 'column',
  },
  item: {
    width: 'calc((100% - 15px)/2)',
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
    fontSize: 50,
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
      background: '#f4f5f6',
      padding: 5,
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
      width: 292,
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
      fontSize: 17,
    },
  },
  settingIcon: {
    position: 'absolute',
    top: 18,
    right: 30,
    cursor: 'pointer',
  },
  selection: {
    width: 'calc((100% - 20px)/2)',
  },
  pd20: {
    padding: 20,
  },
}));

export { useStyles };
