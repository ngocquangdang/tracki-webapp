import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  cashInContent: {
    padding: '0 15px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  valueItem: {
    width: 110,
    height: 90,
    backgroundColor: '#f4f5f6',
    justifyContent: 'center',
    marginBottom: 8,
    fontSize: 28,
    color: '#1a1a1a',
    cursor: 'pointer',
  },
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
  pd15: {
    padding: 15,
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
  h192: {
    height: 192,
  },
  anmount: {
    fontSize: 50,
    fontWeight: 500,
  },
  col: {
    flexDirection: 'column',
  },
  icon: {
    marginRight: 6,
    width: 17,
    height: 17,
  },
  grayColor: {
    color: '#666666',
  },
  wrapperPayment: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapperImage: {
    marginRight: 6,
    width: 20,
    height: 20,
  },
  paymentName: {
    fontSize: 14,
  },
  imagePayment: {
    width: 20,
    height: 20,
  },
}));

export { useStyles };
