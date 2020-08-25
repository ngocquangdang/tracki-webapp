import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    '& ul': {
      marginBottom: 0,
      padding: '0 0 6px 0',
      '& li:before': {
        flex: 0,
        padding: 0,
      },
    },
  },
  empty: {
    paddingLeft: 48,
    flex: 0,
  },
  empty2: {
    paddingLeft: 60,
    flex: 0,
  },
  height40: {
    minHeight: 40,
  },
  stop: {
    backgroundColor: 'red',
    color: '#fff',
  },
  loadMore: {
    fontSize: 14,
    lineHeight: '17px',
    cursor: 'pointer',
  },
}));

export default useStyles;
