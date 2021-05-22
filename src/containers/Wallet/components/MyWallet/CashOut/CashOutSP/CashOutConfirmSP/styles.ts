import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 56,
    backgroundColor: '#e9e9e9',
    height: '100%',
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
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
  center: {
    justifyContent: 'center',
  },
  backIcon: {
    color: '#fff',
    fontSize: 24,
  },
  mr0: {
    margin: 0,
  },
  mb5: {
    marginBottom: 5,
  },
  borderbottom: {
    borderBottom: '1px solid #e0e0e0',
  },
  pb15: {
    paddingBottom: 15,
  },
  fs40: {
    fontSize: 40,
  },
  fs14: {
    fontSize: 14,
  },
  fs15: {
    fontSize: 15,
  },
  fs18: {
    fontSize: 18,
  },
  colorActive: {
    color: theme.palette.primary.main,
  },
  btn: {
    width: '100%',
    padding: 15,
  },
  pd15: {
    padding: 15,
  },
  grayColor: {
    color: '#666666',
  },
  icon: {
    marginRight: 6,
    width: 17,
    height: 17,
  },
  description: {
    display: 'flex',
    justifyContent: 'center',
    color: '#666666',
    padding: '5px 15px ',
  },
  wrapperPayment: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
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
