import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  cashInContainer: {
    marginTop: 56,
    backgroundColor: '#e9e9e9',
    height: '100%',
  },
  cashInContent: {
    padding: '7px 15px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  valueItem: {
    width: 'calc((100% - 16px) / 3)',
    height: 90,
    backgroundColor: '#f4f5f6',
    justifyContent: 'center',
    marginBottom: 8,
    fontSize: 28,
    color: '#1a1a1a',
    cursor: 'pointer',
    '&:last-child': {
      display: 'none',
    },
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
    padding: '0 10px 15px 10px',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    margin: 0,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  fs15: {
    fontSize: 15,
  },
  fs14: {
    fontSize: 14,
  },
  borderbottom: {
    borderBottom: '1px solid #e0e0e0',
  },
  wrapperPayment: {
    display: 'flex',
    marginTop: 5,
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
