import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: 0,
    height: 55,
    boxShadow: '0 3px 4px 0 rgba(0, 0, 0, 0.12)',
    background: 'linear-gradient(rgba(0,0,0,0.5) -50%, rgba(0,0,0,0) 8%)',
  },
  tabs: {
    height: '100%',
    '& div div': {
      height: '100%',
    },
  },
  tabItem: {
    padding: 0,
    width: '25%',
    minWidth: '25%',
    flexDirection: 'row',
    fontWeight: 300,
    fontSize: 14,
    lineHeight: '17px',
  },
  containerCart: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 30,
  },
  cartHeader: {
    display: 'flex',
    paddingLeft: 20,
  },
  textAdd: {
    paddingRight: 10,
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 0.89,
    color: '#1a1a1a',
  },
  iconShopping: {
    width: 22,
    height: 22,
    objectFit: 'contain',
    color: '#1a1a1a',
  },
  contentNumberCart: {
    position: 'relative',
  },
  numberCart: {
    width: 20,
    height: 20,
    objectFit: 'contain',
    backgroundColor: '#ce1c1c',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 12,
    alignItems: 'center',
    color: '#fff',
    position: 'absolute',
    top: '-36%',
    left: '58%',
  },
  listCardBuy: {},
  selectCoupon: {
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textCoupon: {
    paddingRight: 165,
  },
  totalMoney: {
    marginTop: 35,
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 15px 0 15px',
  },
  textTotal: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.19,
    color: '#1a1a1a',
    textTransform: 'uppercase',
  },
  numberTotal: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.19,
    color: '#328557',
  },
  containerButton: {
    padding: 15,
  },
  btn: {
    fontSize: 16,
    fontWeight: 400,
    whiteSpace: 'nowrap',
  },
  selectCouponButton: {
    color: '#1a1a1a',
    fontWeight: 'normal',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    padding: 0,
    margin: 0,
  },
  iconTag: {
    display: 'flex',
    fontSize: 30,
    color: '#168449',
    marginRight: 30,
  },
  iconNext: {
    fontSize: 32,
    padding: 0,
    margin: 0,
  },
}));

export { useStyles };
