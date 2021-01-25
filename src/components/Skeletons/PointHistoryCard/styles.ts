import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '13px 20px',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
  mrr10: {
    marginRight: 10,
  },
}));
export { useStyles };
