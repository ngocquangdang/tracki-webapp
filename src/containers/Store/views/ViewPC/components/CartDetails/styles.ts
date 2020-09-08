import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    width: '100%',
    height: 100,
    maxHeight: 100,
    padding: '20px 15px 22px 15px',
    borderBottom: '1px solid #e0e0e0',
  },
  productImage: {
    width: 50,
    height: 50,
    objectFit: 'contain',
    border: 'solid 1px #e0e0e0',
    borderRadius: '50%',
    marginRight: 20,
  },
  contentCard: {},
  deviceName: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.21,
    marginBottom: 5,
  },
  iconPlus: {
    width: 18,
    height: 18,
    border: '1px solid #666666',
    color: '#666666',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  iconMinus: {
    width: 18,
    height: 18,
    border: '1px solid #666666',
    color: '#666666',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  quantity: {
    display: 'flex',
  },
  plusBtn: {
    height: 'auto',
    minWidth: 18,
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberQuantity: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  price: {
    color: '#328557',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.21,
    marginBottom: 14,
  },
  rightItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  removeBtn: {
    color: '#1a1a1a',
    padding: 0,
    height: 'auto',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 1.43,
  },
}));

export { useStyles };
