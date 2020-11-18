import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: '1px solid #e0e0e0',
    padding: '15px 0',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  skeleton: {
    backgroundColor: '#f2f2f2',
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
  },
  flexRowBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}));

export { useStyles };
