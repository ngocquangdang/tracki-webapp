import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 56,
    height: 'calc(100% - 56px)',
  },
  bgfff: {
    backgroundColor: '#fff',
  },
  bgf1f1: {
    backgroundColor: '#f1f1f1',
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
  mr0: {
    margin: 0,
  },
  mb10: {
    marginBottom: 10,
  },
  mb5: {
    marginBottom: 5,
  },
  borderBottom: {
    borderBottom: '1px solid #e0e0e0',
  },
  primaryColor: {
    color: theme.palette.primary.main,
  },
  f14: {
    fontSize: 14,
  },
  f12: {
    fontSize: 12,
  },
  f16: {
    fontSize: 16,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    border: '1px solid #e0e0e0',
    marginRight: 10,
  },
  card: {
    borderBottom: '1px solid #e0e0e0',
    padding: '10px 15px',
  },
  pd15: {
    padding: 15,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  w500: {
    fontWeight: 500,
  },
  w300: {
    fontWeight: 300,
  },
  pd20: {
    padding: '20px 15px',
  },
  textOverflow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 282,
    whiteSpace: 'nowrap',
  },
  redColor: {
    color: '#cc2c2c',
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
  fullwidth: {
    width: '100%',
  },
}));

export { useStyles };
