import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {},
  card: {
    height: 170,
    borderRadius: 4,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.25)',
    border: '1px solid #fefefe',
  },
  btnBackground: {
    height: 40,
    width: '100%',
    color: '#6a3c02',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
    backgroundImage: 'linear-gradient(98deg, #ffda8f, #ffba31 100%)',
  },
  itemName: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  coin: {
    margin: '0 5px',
    fontSize: 16,
    fontWeight: 500,
    color: '#e99313',
  },
  cointLine: {
    marginBottom: 20,
    color: '#e99313',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  planName: {
    padding: '3px 18px',
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    textTransform: 'capitalize',
  },
  caption: {
    fontWeight: 500,
    margin: '5px 0',
  },
  mr0: {
    margin: 0,
  },
  subTitle: {
    fontWeight: 300,
    textTransform: 'lowercase',
  },
  smsTitle: {
    fontSize: 37,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 23,
      fontWeight: 'bold',
    },
  },
  smsPlan: {
    fontSize: 15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  smsPrice: {
    fontSize: 19,
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      fontWeight: 'bold',
    },
  },
  title: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  },
}));

export { useStyles };
