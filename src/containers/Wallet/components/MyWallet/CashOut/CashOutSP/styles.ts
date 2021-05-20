import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 56,
    backgroundColor: '#e9e9e9',
    height: '100%',
  },
  card: {
    padding: '19px 15px 15px',
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
  },
  pd15: {
    padding: 15,
  },
  icon: {
    width: 16,
    height: 24,
    color: '#999',
  },
  mb5: {
    marginBottom: 5,
  },
  wrapperPayment: {
    display: 'flex',
  },
  wrapperImage: {
    marginRight: 10,
  },
  imagePayment: {
    width: 20,
    height: 20,
  },
}));

export { useStyles };
