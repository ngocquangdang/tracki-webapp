import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '35px 71px',
  },
  bgFFF: {
    backgroundColor: '#fff',
  },
  bgf456: {
    backgroundColor: '#f4f5f6',
  },

  card: {
    height: 129,
  },
  cardItem: {
    padding: '17px 15px',
    '&:first-child': {
      borderBottom: 0,
    },
  },
  mr0: {
    margin: 0,
  },
  mb10: {
    marginBottom: 10,
  },
  borderBottom: {
    borderBottom: '1px solid #e0e0e0',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  primaryColor: {
    color: theme.palette.primary.main,
  },
  column: {
    flexDirection: 'column',
  },
  total: {
    fontSize: 40,
    fontWeight: 500,
  },
  fz15: {
    fontSize: 15,
  },
  fz14: {
    fontSize: 14,
  },
  fx13: {
    fontSize: 13,
  },
  w500: {
    fontWeight: 500,
  },
  img: {
    marginRight: 5,
  },
  mb5: {
    marginBottom: 5,
  },
  btnBackground: {
    marginBottom: 7,
    width: '100%',
    color: '#fff',
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      width: 292,
    },
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#fff',
    },
  },
}));

export { useStyles };
