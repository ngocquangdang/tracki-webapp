import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  colorActive: {
    color: theme.palette.primary.main,
  },
  w500: {
    fontWeight: 500,
  },
  borderActive: {
    border: `1px solid ${theme.palette.primary.main} !important`,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
  },
  fs32: {
    fontSize: 32,
  },
  border: {
    border: '1px solid #e0e0e0',
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    borderRadius: 4,
  },
  pd71: {
    padding: '15px 71px',
  },
  mr0: {
    margin: 0,
  },
  mb10: {
    marginBottom: 10,
  },
  btn: {
    width: '100%',
    margin: '15px 0',
  },
  borderbottom: {
    borderBottom: '1px solid #e0e0e0',
  },
  pb15: {
    paddingBottom: 15,
  },
  anmount: {
    fontSize: 50,
    fontWeight: 500,
  },
  col: {
    flexDirection: 'column',
  },
  fz15: {
    fontSize: 15,
  },
  cardItem: {
    padding: '17px 15px',
    '&:first-child': {
      borderBottom: 0,
    },
  },
  bgFFF: {
    backgroundColor: '#fff',
  },
  bgf456: {
    backgroundColor: '#f4f5f6',
  },
  fx13: {
    fontSize: 13,
  },
  redText: {
    color: '#cc2c2c',
  },
}));

export { useStyles };
