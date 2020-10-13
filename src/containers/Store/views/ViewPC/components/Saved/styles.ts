import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: '48%',
    maxWidth: 735,
    borderRadius: 4,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px #fefefe',
    backgroundColor: '#ffffff',
    marginLeft: 20,
    marginBottom: 12,
    '&:hover': {
      backgroundColor: '#fafafa',
    },
  },
  productImage: {
    width: 50,
    height: 50,
    objectFit: 'contain',
    border: 'solid 1px #e0e0e0',
    borderRadius: '50%',
    marginRight: 10,
  },
  content: {
    padding: '15px 20px 15px 15px',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.39,
    color: '#1a1a1a',
    display: 'flex',
    marginRight: 25,
  },
  iconFavorite: {
    fontSize: 36,
    color: '#cc2c2c',
  },
  btnViewStore: {
    color: '#999999',
    fontSize: 14,
    padding: '0 10px',
    fontWeight: 500,
  },
  icon: {
    display: 'flex',
    padding: 15,
  },
  leftItem: {
    display: 'flex',
    alignItems: 'center',
  },
  rightItem: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export { useStyles };
