import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  cashInCard: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    boxShadow: '0 8px 14px 0 rgba(0, 0, 0, 0.12)',
    borderRadius: 4,
    marginBottom: 15,
  },
  cashInTitle: {
    padding: 15,
    backgroundColor: '#f4f5f6',
  },
  cashInChildren: {
    padding: 15,
  },
}));

export { useStyles };
